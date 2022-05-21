var UserService = require('../services/userService')

exports.getUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    console.log(req)
    let page = req.params.page ? req.params.page : 1;
    let limit = req.params.limit ? req.params.limit : 10;
    // console.log(" --- ")
    console.log("page", page)
    console.log("limit", limit)
    
    try {
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getMyUser = async function (req, res, next) {
    console.log("getMyUser()::::::::::::::", UserService.getMyUser())
    console.log("getUsers()::::::::::::::", UserService.getUsers())
    let users = await UserService.getMyUser;
    return res.status(200).json({ status: 200, data: users, message: "success"});
}
