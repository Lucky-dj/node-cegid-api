'use strict';

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
    }

    static instance(...args) {
        return new Cegid(...args);
    }


}

module.exports = Cegid;
