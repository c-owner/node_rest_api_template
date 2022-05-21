var User = require('../models/userModel')

exports.getUsers = async function (query, page, limit) {
    
    try {
        let users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
