const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', usersController.findAll);
router.get('/find', usersController.findUserByName);
router.get('/list', usersController.listUsers);
router.get('/query', usersController.queryUser);
router.post('/', usersController.createUser);
router.get('/:id', usersController.findById);
router.patch('/:id', usersController.updateUser);
router.delete('/:id', usersController.removeUser);

module.exports = router;