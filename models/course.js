const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    schedule: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numOfStudents: Number,
    students: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } ]
});

// @ts-ignore
courseSchema.pre("save", function(next) {
    // @ts-ignore
    this.numOfStudents = this.students.length;
    next();
});

const Model = mongoose.model('Course', courseSchema);

module.exports = Model;