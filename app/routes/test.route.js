const test = require("../controller/test.controller");
module.exports = app => {
    const test_member = require("../controller/test.controller.js");
    
    // 전체 조회
    app.get("/test", test_member.findAll);
    
 
    
}
