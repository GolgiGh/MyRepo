const express = require('express');
const maincontroller = require('../controllers/mainController');
const router = express.Router();

router.get('/',maincontroller.home);
router.get('/about',maincontroller.about);
router.get('/contact',maincontroller.contact);

module.exports = router;