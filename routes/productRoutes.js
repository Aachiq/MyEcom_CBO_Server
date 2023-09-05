const express = require('express');
const { createProduct, getProducts, getOneProduct, deleteProduct, updateProduct, getProductImage, searchProduct, paginationProduct, getProductsByCategory, getProductsByCategoryPrice } = require('../controllers/productController');
const { isAuth, userById, isOwner, isAdmin } = require('../middlewares/authorization_cbo');
const router = express.Router();

router.get('/showall', getProducts);
router.get('/show', getOneProduct);
router.post('/create/:idUser', isAuth, isOwner, isAdmin, createProduct);
router.delete('/delete/:idUser',isAuth, isOwner, isAdmin, deleteProduct );
router.put('/update/:idUser',isAuth, isOwner, isAdmin, updateProduct );
router.post('/search', searchProduct );
router.get('/paginate', paginationProduct );
router.get('/show-image/:idUser',isAuth, isOwner, getProductImage );
router.get('/show/:idCategory',getProductsByCategory );
router.post('/show/filter-price',getProductsByCategoryPrice );

router.param('idUser', userById)
module.exports = router;
