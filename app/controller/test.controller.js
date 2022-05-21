const Members = require("../models/member.js");


// 전체 조회
exports.findAll = (req,res)=>{
    console.log("-----")
    
    Members.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

