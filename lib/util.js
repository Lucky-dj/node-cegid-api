'use strict';

const crypto = require('crypto');
const uuid = require('uuid');
const moment = require('moment');
const randomStr = require('string-random');
const xml2js = require('xml2js');
const zlib = require('zlib');
const objtree = require('objtree');
const soapRequest = require('easy-soap-request');

const EPS = 1e-6;
const Objtree = new objtree();

const Util = {
    md5(text) {
        return crypto.createHash('md5').update(text, 'utf8').digest('hex');
    },

    sha1(text) {
        return crypto.createHash('sha1').update(text, 'utf8').digest('hex');
    },

    uuid(line) {
        const id = uuid.v4();
        return line ? id.replace(/-/g, '') : id;
    },

    base64(value) {
        const buf = new Buffer(value);
        return buf.toString('base64');
    },

    randomIntStr(number = 6) {
        const chars = '0123456789';
        const str_len = chars.length;
        let int_str = '';

        for (let i = 0; i < len; i++) {
            const idx = Math.floor(Math.random() * str_len);
            int_str += chars[idx];
        }

        return int_str;
    },

    randomString(number = 10) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const str_len = chars.length;
        let str = '';

        for (let i = 0; i < len; i++) {
            const idx = Math.floor(Math.random() * str_len);
            str += chars[idx];
        }

        return str;
    },

    dateFormat(date = new Date(), fmt = 'YYYY-MM-DD HH:mm:ss', timeZone = 8) {
        return moment(date).utcOffset(timeZone).format(fmt);
    },

    rightInteger(number) {
        return Math.floor(number + EPS);
    },

    makeNoncestr(len = 16) {
        return randomStr(len);
    },

    parseXML(xml, option) {
        return new Promise((resolve, reject) => {
            const parseString = xml2js.parseString;
            parseString(xml, option, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    buildXML(json, option) {
        const builder = new xml2js.Builder(option);
        return builder.buildObject(json);
    },

    unzip(buffer) {
        return new Promise((resolve, reject) => {
            zlib.unzip(buffer, (err, buffer) => {
                if (!err) {
                    resolve(buffer.toString());
                } else {
                    reject(err);
                }
            });
        });
    },

    base64Decode(str) {
        const result = new Buffer(str, 'base64').toString();
        return result;
    },

    utf8_encode(str) {
        str = str.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < str.length; n++) {
            let c = str.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    },

    toBase64(input) {
        const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = this.utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    },

    formatObj(method, dataArr, database_id) {
        const obj = {
            'soapenv:Envelope': {
                $: {
                    'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
                    'xmlns:ns': 'http://www.cegid.fr/Retail/1.0',
                },
                'soapenv:Header': {},
                'soapenv:Body': {
                    [`ns:${method}`]: {
                        'ns:clientContext': {
                            'ns:DatabaseId': database_id,
                        },
                    },
                },
            },
        };

        for (const data of dataArr) {
            obj['soapenv:Envelope']['soapenv:Body'][`ns:${method}`][`ns:${data.key}`] = data.value;
        }

        return obj;
    },

    async soap(obj, auth, method, url, host) {

        const objXml = this.buildXML(obj);
        const headers = {
            'Content-Type': 'text/xml',
            'SOAPAction': `${host}${method}`,
            'Authorization': `Basic ${auth}`
        };

        console.log('objXml', objXml);

        const { response: { body, statusCode } } = await soapRequest({
            url,
            headers,
            xml: objXml,
            timeout: 10000
        });

        if (statusCode !== 200) {
            throw new Error('request error!');
        }

        return body;
    }
};

module.exports = Util;
