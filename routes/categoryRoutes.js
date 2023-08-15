const express = require('express');
const { createCategory, deleteCategory, updateCategory, getCategories, getCategory } = require('../controllers/categoryController');
const { isAuth } = require('../middlewares/authorization_cbo');
const router = express.Router();

router.get('/show',getCategories );
router.get('/show/:id', getCategory);
router.post('/create', isAuth, createCategory);
router.delete('/delete/:id',isAuth, deleteCategory);
router.put('/update/:id',isAuth, updateCategory);

module.exports = router;
