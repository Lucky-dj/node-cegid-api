'use strict';
const CegidCustomer = require('../lib/cegid_customer');

describe('test/cegid_customer.test.js', () => {

    let cegidCustomer;

    before(() => {
        cegidCustomer = new CegidCustomer();
    });

    it('should hello word', async () => {
        const xml_original = {
            HelloWorld: {
                text: 'hello world',
                clientContext: {
                    DatabaseId: 'A201',
                },
            },
        };
        const result = await cegidCustomer.helloword(xml_original);
        console.log('result', result);
    });
});
