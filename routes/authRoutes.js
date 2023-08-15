const express = require('express');
const { Signin, Signout } = require('../controllers/authController');
const router = express.Router();

router.post('/signin', Signin);
router.get('/signout', Signout);

module.exports = router;
