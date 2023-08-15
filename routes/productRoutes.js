const express = require('express');
const { createProduct, getProducts, getOneProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { isAuth, userById, isOwner, isAdmin } = require('../middlewares/authorization_cbo');
const router = express.Router();

router.get('/showall', getProducts);
router.get('/show', getOneProduct);
router.post('/create/:idUser', isAuth, isOwner, isAdmin, createProduct);
router.delete('/delete/:idUser',isAuth, isOwner, isAdmin, deleteProduct );
router.put('/update/:idUser',isAuth, isOwner, isAdmin, updateProduct );

router.param('idUser', userById)
module.exports = router;
