const express = require('express');
const { getOrders, deleteOrder } = require('../controllers/orderController');
const { isAuth, isOwner, isAdmin, userById } = require('../middlewares/authorization_cbo');
const router = express.Router();

router.get('/showall',getOrders);
router.delete('/delete/:idUser',isAuth, isOwner, isAdmin, deleteOrder);

router.param('idUser', userById)

module.exports = router;