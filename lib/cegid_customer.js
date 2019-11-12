'use strict';

const util = require('./util');
const Cegid = require('./cegid');
const HOST = 'http://www.cegid.fr/Retail/1.0/ICustomerWcfService/';

class CegidCustomer extends Cegid {

    /**
     *
     * @param data
     * @return {Promise<*>}
     */
    async create(data) {
        const method = 'AddNewCustomer';
        const dataArr = [{
            key: 'customerData',
            value: data,
        }];
        const obj = util.formatObj(method, dataArr, this.database_id);
        return await util.soap(obj, this.auth, method, this.req_url, HOST);
    }

    async detail(customerId) {
        const method = 'GetCustomerDetail';
        const dataArr = [{
            key: 'customerId',
            value: customerId,
        }];
        const obj = util.formatObj(method, dataArr, this.database_id);
        return await util.soap(obj, this.auth, method, this.req_url, HOST);
    }

    async findByReference(Reference) {
        const method = 'GetCustomerIdByReference';
        const dataArr = [{
            key: 'customerReference',
            value: Reference,
        }];
        const obj = util.formatObj(method, dataArr, this.database_id);
        return await util.soap(obj, this.auth, method, this.req_url, HOST);
    }

    async search(data) {
        const method = 'SearchCustomerIds';
        const dataArr = [{
            key: 'searchData',
            value: data,
        }];
        const obj = util.formatObj(method, dataArr, this.database_id);
        return await util.soap(obj, this.auth, method, this.req_url, HOST);
    }

    async update(customerId, data) {
        const method = 'UpdateCustomer';
        const dataArr = [{
            key: 'customerId',
            value: customerId,
        }, {
            key: 'modifiedData',
            value: data,
        }];
        const obj = util.formatObj(method, dataArr, this.database_id);
        return await util.soap(obj, this.auth, method, this.req_url, HOST);
    }
}

module.exports = CegidCustomer;
