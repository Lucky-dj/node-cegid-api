'use strict';

const util = require('./util');
const Cegid = require('./cegid');
const HOST = 'http://www.cegid.fr/Retail/1.0/IItemInventoryWcfService/';

class CegidItemInventory extends Cegid {

    async getAllInventory(itemId, identifier) {
        const method = 'GetAvailableCumulativeQtyAllStores';
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
