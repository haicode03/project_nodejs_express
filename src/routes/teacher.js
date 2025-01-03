const express = require('express');
const router = express.Router();

const teacherController = require('../app/controllers/TeacherController');

router.get('/stored/student', teacherController.storedStudent);
router.get('/trash/student', teacherController.trashStudent);

module.exports = router;