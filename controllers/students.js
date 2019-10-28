/**
 * @typedef { import('express').Request } Request
 * @typedef { import('express').Response } Response
 * @typedef { import('express').NextFunction } NextFunction
 */

const studentSchema = require('./../schemas/student');
const Student = require('./../models/student');

class StudentsController {

    /**
     * Get an student by id
     * @param {Request} req
     * @param {Response} res
     */
    static async getAllStudents(req, res) {
        try {
            const students = await Student.find();
            if (!students) return res.status(404).json({ message: 'No hya estudiantes' })
            res.status(200).json(students)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    /**
     * Get an student by id
     * @param {Request} req
     * @param {Response} res
     */
    static async getStudent(req, res) {
        try {
            const student = await Student.findById(req.params.id);
            if (!student) return res.status(404).json({ message: 'Estudiante no encontrada' })
            res.status(200).json(student);
        } catch (error) {
            res.status(400).json(error)
        }
    }

    /**
     * Create an student by id
     * @param {Request} req
     * @param {Response} res
     */
    static async createStudent(req, res) {
        const { value, error } = studentSchema.validate(req.body);
        if (error) res.status(400).json(error);

        const student = new Student(value);

        try {
            const result = await student.save();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }

        res.status(200).json(value);
    }

    /**
     * Update an student by id
     * @param {Request} req
     * @param {Response} res
     */
    static async updateStudent(req, res) {
        const { value, error } = studentSchema.validate(req.body);
        if (error) res.status(400).json(error);

        try {
            const student = await Student.findByIdAndUpdate(req.params.id, value, { new: true });
            if (!student) res.status(404).json({ "error": "Student not found" });
            res.status(200).json(student);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    /**
     * Delete an student by id
     * @param {Request} req
     * @param {Response} res
     */
    static async deleteStudent(req, res) {
        try {
            const student = await Student.findByIdAndDelete(req.params.id);
            if (!student) res.status(404).json({ "error": "Student not found" });
            res.status(200).json(student);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = StudentsController;