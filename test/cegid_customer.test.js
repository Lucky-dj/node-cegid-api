'use strict';
const CegidCustomer = require('../lib/cegid_customer');

describe('test/cegid_customer.test.js', () => {

    let cegidCustomer;

    before(() => {
        cegidCustomer = new CegidCustomer({
            req_url: 'http://40.73.73.57/Y2_TEST/CustomerWcfService.svc',
            user_id: 'ECINTERFACE',
            password: 'pink123',
            database_id: 'Y2_THOMASPINK_TEST',
        });
    });

    it('should hello word', async () => {
        const result = await cegidCustomer.helloworld('Hello World');
        console.log(result)
    });

    it('should create Customer', async () => {
        const params = {
            // 'ns:ActivitySectorCode': '', // 客户活动部门的代码
            'ns:AddressData': {
                'ns:City': '深圳', // 城市 *
                'ns:RegionId': '518000', // 区域ID *
            },
            'ns:FirstName': 'dajun', // 名字 *
            'ns:LastName': 'xiao', // 姓氏 *
            'ns:EmailData': {
                'ns:Email': 'xiaodajun@yeezon.com', // 邮箱 *
            },
            // 'ns:AlternateFirstName': '', // 显著特征
            // 'ns:AlternateLastName': '', // 昵称
            // 'ns:IsCompany': true, // 公司
            // 'ns:TitleId': '', // 客户头部
            // 'ns:UserDefinedBooleans': {
            //     'ns:UserDefinedBoolean': {
            //         'ns:Id': 1,
            //         'ns:Value': true,
            //     }
            // },
            // 'ns:UserDefinedData': {
            //     'ns:UserDefinedTable0Value': '', // 最多添加至九个
            // },
            // 'ns:UsualStoreId': '', // 商店ID
            // 'ns:ActivityCode': '', // 销售代码
            // 'ns:Barcode': '', // 条码
            // 'ns:CompanyIdNumber': '', // 公司注册号
        };
        const result = await cegidCustomer.create(params);
        console.log(result)
    });
});
