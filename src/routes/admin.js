const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const adminInstituteController = require('../app/controllers/admin/InstituteController');
const adminFacultieController = require('../app/controllers/admin/FacultieController');
const adminClassController = require('../app/controllers/admin/ClassController');

router.get('/users/create', adminController.create);
router.post('/users/store', adminController.store);
router.get('/users/:id/edit', adminController.edit);
router.put('/users/:id', adminController.update);
router.patch('/users/:id/restore', adminController.restore);
router.delete('/users/:id', adminController.destroy);
router.delete('/users/:id/force', adminController.forceDestroy);
router.get('/users/show', adminController.show);

router.get('/institutes/create', adminInstituteController.create);
router.post('/institutes/store', adminInstituteController.store);
router.get('/institutes/:id/edit', adminInstituteController.edit);
router.put('/institutes/:id', adminInstituteController.update);
router.delete('/institutes/:id', adminInstituteController.destroy);
router.get('/institutes/show', adminInstituteController.show);

router.get('/faculties/create', adminFacultieController.create);
router.post('/faculties/store', adminFacultieController.store);
router.get('/faculties/:id/edit', adminFacultieController.edit);
router.put('/faculties/:id', adminFacultieController.update);
router.delete('/faculties/:id', adminFacultieController.destroy);
router.get('/faculties/show', adminFacultieController.show);

router.get('/classes/create', adminClassController.create);
router.post('/classes/store', adminClassController.store);
router.get('/classes/:id/edit', adminClassController.edit);
router.put('/classes/:id', adminClassController.update);
router.delete('/classes/:id', adminClassController.destroy);
router.get('/classes/show', adminClassController.show);

module.exports = router;