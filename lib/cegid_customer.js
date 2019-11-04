'use strict';

const fetch = require('node-fetch');
const soap = require('soap');
const Wsdlrdr = require('wsdlrdr');
const util = require('./util');
const Cegid = require('./cegid');
const HOST = 'http://www.cegid.fr/Retail/1.0/ICustomerWcfService/';

class CegidCustomer extends Cegid {

    /**
     *
     * @param params
     * @return {Promise<void>}
     */
    async create(params) {
        return null;
    }

    async helloword(auth ,bodyReq) {

        // const _this = this;

        // const url = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl';
        // const args = { byProvinceName: '浙江'};

        // soap.createClient(this.req_url, (err, client) => {
        //      // client.getSupportCity(args, (err, result) => {
        //      //     if (err) {
        //      //         console.log('err:::', err);
        //      //     }
        //      //     console.log('result:::', result)
        //      // });
        //     if (err) {
        //         console.log('err:::', err);
        //     }
        //     console.log('client', client);
        // });

        const soapR = await soap.createClientAsync(this.req_url);

        console.log('soapR', soapR);

        const POST = {
            method: 'POST',
            header: {
                'Content-Type': 'text/xml;charset=utf-8',
                'Accept': 'text/xml',
                'Cache-Control': 'no-cache',
                'SOAPAction': 'http://www.cegid.fr/Retail/1.0/ICbrBasicWebServiceInterface/HelloWorld',
                'Authorization': `Basic ${this.user_id}:${this.password}`
            },
            bodyReq,
        };

        let result = await fetch(this.req_url, POST);

        console.log('result', result);

        if(!result.ok){
            result = await result.text();
            console.log('result:::', result);
            const resultObj = Wsdlrdr.getXmlDataAsJson(result);
            throw new Error(`${resultObj.Fault[1].faultstring}`);
        }

        result = await result.text();

        const resultObj = Wsdlrdr.getXmlDataAsJson(result);
        console.log('resultObj', resultObj);
        console.log('result lll', result);
        return resultObj;
    }
}

module.exports = CegidCustomer;
