const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController')

router.get('/', UserController.getUsers)
router.get('/user', UserController.getMyUser)

module.exports = router;
