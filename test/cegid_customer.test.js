'use strict';
const CegidCustomer = require('../lib/cegid_customer');

describe('test/cegid_customer.test.js', () => {

    let cegidCustomer;

    before(() => {
        cegidCustomer = new CegidCustomer({
            req_url: 'http://40.73.73.57/Y2_TEST/CustomerWcfService.svc?wsdl',
            user_id: 'ECINTERFACE',
            password: 'pink123',
            database_id: 'Y2_THOMASPINK_TEST',
        });
    });

    it('should hello word', async () => {
        // const xml_original = {
        //     HelloWorld: {
        //         text: 'hello world',
        //         clientContext: {
        //             DatabaseId: 'A201',
        //         },
        //     },
        // };
        const xml_original = `<?xml version="1.0" encoding="UTF-8"?>
        `;
        const result = await cegidCustomer.helloword(xml_original);
        console.log('result', result);
    });
});
