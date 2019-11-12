# node-cegid-api


## 安装
```bash
$ npm install node-cegid-api --save
```

##
```javascript
const Cegid = require('node-cegid-api');


/**
 * Customer 初始化
 * @param {object} options
 * @param {object} options.req_url 请求地址 eg:http://x.x.x.x/Y2_TEST/CustomerWcfService.svc
 * @param {object} options.user_id 用户ID
 * @param {object} options.password 密码
 * @param {object} options.database_id 数据库ID
 * @constructor
 */
const customer = new Cegid.Customer(options);

/**
 * 测试 options是否有效
 * 
 */
customer.helloworld();
```
