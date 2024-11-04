const express = require('express');
const router = express.Router();

const facultieController = require('../app/controllers/FacultieController');

router.get('/:slug', facultieController.show);

module.exports = router;