const express = require('express');
const router = express.Router();
const { getPackages, getFeaturedPackages, createPackage } = require('../controllers/packageController');

router.get('/', getPackages);
router.get('/featured', getFeaturedPackages);
router.post('/', createPackage);

module.exports = router;
