'use strict';
const util = require('./util');
const HOST = 'http://www.cegid.fr/Retail/1.0/ICbrBasicWebServiceInterface/';

class Cegid {
    constructor(config) {
        if (typeof config.req_url !== 'string') {
            throw new Error('req_url not null!');
        }
        if (typeof config.user_id !== 'string') {
            throw new Error('user_id not null!');
        }
        if (typeof config.password !== 'string') {
            throw new Error('password not null!');
        }
        if (typeof config.database_id !== 'string') {
            throw new Error('database_id not null!');
        }
        if (typeof config.wsdl === 'string') {
            this.wsdl = config.wsdl;
        }
        this.req_url = config.req_url;
        this.user_id = config.user_id;
        this.password = config.password;
        this.database_id = config.database_id;
        this.auth = util.toBase64(`${this.database_id}\\${this.user_id}:${this.password}`);
    }

    static instance(...args) {
        return new Cegid(...args);
    }

    /**
     * HelloWorld 用来测试user_id和password、database_id 的方法
     * @param text 任意值
     * @return {Promise<*>} 返回XML对象
     */
    async helloworld(text) {
        const method = 'HelloWorld';
        const dataArr = [{
            key: 'text',
            value: text,
        }];
        const obj = util.formatObj(method, dataArr, this.database_id);
        return await util.soap(obj, this.auth, method, this.req_url, HOST);
    }
}

module.exports = Cegid;
