const express = require('express');
const { getOrders, deleteOrder, searchOrder, paginationOrder, generateAndDowlaodExcel, getOrdersByPaymentType, getOrdersByDate } = require('../controllers/orderController');
const { isAuth, isOwner, isAdmin, userById } = require('../middlewares/authorization_cbo');
const router = express.Router();

router.get('/showall',getOrders);
router.delete('/delete/:idUser',isAuth, isOwner, isAdmin, deleteOrder);
router.post('/delete/:idUser',isAuth, isOwner, isAdmin, deleteOrder);
router.post('/search', searchOrder );
router.get('/paginate', paginationOrder );
router.get('/generate-dowload-excel', generateAndDowlaodExcel );
router.get('/filter',getOrdersByPaymentType);
router.post('/filter-date',getOrdersByDate);

router.param('idUser', userById)

module.exports = router;