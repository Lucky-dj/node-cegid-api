'use strict';

const soapRequest = require('easy-soap-request');
const util = require('./util');
const HOST = 'http://www.cegid.fr/Retail/1.0/ICustomerWcfService/';

class CegidCustomer {

    constructor() {

    }

    static instance() {
        return new CegidCustomer();
    }

    /**
     *
     * @param params
     * @return {Promise<void>}
     */
    async create(params) {
        return null;
    }

    async helloword(xml_original) {

        // const xml = util.buildXML(xml_original);

        console.log('xml', xml_original);

        const xml = require('./test.xml');

        console.log('mmmm', xml);

        const result = await soapRequest({
            // url: `${HOST}HelloWorld`,
            url: 'http://40.73.73.57/Y2_TEST/CustomerWcfService.svc',
            xml,
            timeout: 1000,
        });

        console.log('result', result);

        return result;
    }
}

module.exports = CegidCustomer;
