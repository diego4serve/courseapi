const router = require('express').Router();
const studentsController = require('../controllers/students');

router.get('/:id', studentsController.getStudent);
router.get('/', studentsController.getAllStudents);
router.post('/', studentsController.createStudent);
router.put('/:id', studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;