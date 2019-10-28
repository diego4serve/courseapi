const mongoose = require('mongoose');
const Course = require('./../schemas/courses')

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    courses: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Course' } ]
});

const Model = mongoose.model('Student', studentSchema);

module.exports = Model;