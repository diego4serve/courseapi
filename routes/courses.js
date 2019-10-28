const router = require('express').Router();
const coursesController = require('../controllers/courses');

router.get('/', coursesController.getAllCourses);
router.get('/top3', coursesController.getTop3Courses);
router.get('/:id', coursesController.getCourse);
router.post('/', coursesController.createCourse);
router.put('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);
router.post('/:id/enroll', coursesController.enrollToCourse);
router.post('/:id/unenroll', coursesController.unenrollToCourse);

module.exports = router;