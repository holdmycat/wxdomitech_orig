'use strict';
const util = require('../../../utils/util.js');

const defaultData={

};

class register {
    constructor(pageContext, key = '') {
        console.log('pageContext',pageContext);
        console.log ('key', key);
        this.page = pageContext;
        this.data = this.page.data[key];
        
        this.data._testme = this.data._testme + key;
        this.page[this.data._testme]=this.testme.bind(this);
    }

    testme (e) {
      console.log('123',e);
    }
}


register.mergeData = function (data) {
  return util.mergeDeep({}, defaultData, data);
};

module.exports = register;