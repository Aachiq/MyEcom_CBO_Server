const express = require('express');
const { createCategory, deleteCategory, updateCategory, getCategories, getCategory, searchCategory, paginationCatgeory } = require('../controllers/categoryController');
const { isAuth, userById, isOwner, isAdmin } = require('../middlewares/authorization_cbo');
const router = express.Router();

router.get('/showall',getCategories);
router.get('/show', getCategory);
router.post('/create/:idUser', isAuth, isOwner, isAdmin, createCategory);
router.delete('/delete/:idUser',isAuth, isOwner, isAdmin, deleteCategory);
router.post('/search', searchCategory);
router.get('/paginate', paginationCatgeory);
router.put('/update/:idUser',isAuth, isOwner, isAdmin, updateCategory);

router.param('idUser', userById)
module.exports = router;
