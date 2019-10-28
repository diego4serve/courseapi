/**
 * @typedef { import('express').Request } Request
 * @typedef { import('express').Response } Response
 * @typedef { import('express').NextFunction } NextFunction
 */

const courssSchema = require('./../schemas/courses');
const Course = require('./../models/course');
const Student = require('./../models/student');

class CoursesController {

    /**
     * Get an course by id
     * @param {Request} req
     * @param {Response} res
     */
    static async getAllCourses(req, res) {
        try {
            const courses = await Course.find();
            if (!courses) return res.status(404).json({ message: 'No hya estudiantes' })
            res.status(200).json(courses)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    /**
     * Get an Course by id
     * @param {Request} req
     * @param {Response} res
     */
    static async getCourse(req, res) {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) return res.status(404).json({ message: 'Curso no encontrada' })
            res.status(200).json(course)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    /**
     * Create an Course by id
     * @param {Request} req
     * @param {Response} res
     */
    static async createCourse(req, res) {
        const { value, error } = courssSchema.validate(req.body);
        if (error) res.status(400).json(error);

        const course = new Course(value);

        try {
            const result = await course.save();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }

        res.status(200).json(value);
    }

    /**
     * Update an Course by id
     * @param {Request} req
     * @param {Response} res
     */
    static async updateCourse(req, res) {
        const { value, error } = courssSchema.validate(req.body);
        if (error) res.status(400).json(error);

        try {
            const course = await Course.findByIdAndUpdate(req.params.id, value, { new: true });
            if (!course) res.status(404).json({ "error": "Course not found" });
            res.status(200).json(course);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    /**
     * Delete an Course by id
     * @param {Request} req
     * @param {Response} res
     */
    static async deleteCourse(req, res) {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) res.status(404).json({ "error": "Course not found" });
            res.status(200).json(course);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    /**
     * enroll to Course
     * @param {Request} req
     * @param {Response} res
     */
    static async enrollToCourse(req, res) {
        const studentId = req.body.studentId;
        const courseId = req.params.id;

        try {
            const student = await Student.findById(studentId);
            if (!student) res.status(404).json({ "error": "Student not found" });
            const course = await Course.findById(courseId);
            if (!course) res.status(404).json({ "error": "Course not found" });

            // @ts-ignore
            course.students.addToSet(studentId);
            // @ts-ignore
            student.courses.addToSet(courseId);
            student.save();
            const result = await course.save();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    /**
     * enroll to Course
     * @param {Request} req
     * @param {Response} res
     */
    static async unenrollToCourse(req, res) {
        const studentId = req.body.studentId;
        const courseId = req.params.id;

        try {
            const student = await Student.findById(studentId);
            if (!student) res.status(404).json({ "error": "Student not found" });
            const course = await Course.findById(courseId);
            if (!course) res.status(404).json({ "error": "Course not found" });

            // @ts-ignore
            course.students.pull(studentId);
            // @ts-ignore
            student.courses.pull(courseId);
            student.save();
            const result = await course.save();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    /**
     * Get top 3 courses with more students
     * @param {Request} req
     * @param {Response} res
     */
    static async getTop3Courses(req, res) {
        try {
            const top3 = await Course.find().sort("-numOfStudents").limit(3);
            if (!top3) res.status(404).json({ "error": "No courses found" });
            res.status(200).json(top3);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = CoursesController;