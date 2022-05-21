const db = require("../models")
const Members = db.Member;
const Op = db.Sequelize.Op;

// 전체 조회
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}`}} : null;
    
    Members.findAll({ where: condition} ).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}
