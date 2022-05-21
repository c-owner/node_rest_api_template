// var User = require('../../models/member.js')
var User = require('../../models/member.js')
const express = require("express");
const app = express();

exports.getUsers = async function (query, page, limit) {
    
    try {
        let users = User;
        // let users = await User.find(query)
        // return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.getMyUser = async function (query, page, limit) {
    console.log("User:::::::::::: ", User);
    try {
        // let users = await User(query)
        // return users;
    } catch (e) {
        // Log Errors
        // throw Error('Error while Paginating Users')
    }
}

exports.getMembers = async function (query, page, limit) {
    // let users = await User.find(query)
}
