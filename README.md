# node-cegid-api


## 安装
```bash
$ npm install node-cegid-api --save
```

## 初始化
```javascript
const Cegid = require('node-cegid-api');


/**
 * Customer 初始化
 * @param {object} options
 * @param {string} options.req_url 请求地址 eg:http://x.x.x.x/Y2_TEST/CustomerWcfService.svc
 * @param {string} options.user_id 用户ID
 * @param {string} options.password 密码
 * @param {string} options.database_id 数据库ID
 * @constructor
 */
const customer = new Cegid.Customer(options);

/**
 * 测试 options是否有效
 * @param {string} text 测试输入，可以输入任意值
 */
customer.helloworld(text);
```

## 完成度

因本人对接cegid只包含 CustomerWcfService 和 ItemInventoryWcfService 所以目前API只包含此2大类，以下为接口对接情况

- [x] Web Service: ItemInventoryWcfService
    - [x] AddNewCustomer
    - [x] GetCustomerDetail
    - [x] GetCustomerIdByReference
    - [x] SearchCustomerIds
    - [x] UpdateCustomer

- [ ] Web Service: ItemInventoryWcfService
    - [ ] GetAvailableCumulativeQtyAllStores
    - [ ] GetAvailableQty
    - [ ] GetInventoryDetailByStore
    - [ ] GetListItemInventoryDetailByStore
    - [ ] ResetShoppingCart
    - [ ] UpdateShoppingCart
