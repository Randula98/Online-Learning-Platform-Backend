import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    moduleCode: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    academicSemester: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    courseYear: {
        type: String,
        required: true
    },
    courseMonth: {
        type: String,
        required: true
    },
    notices: [{
        type: Schema.Types.ObjectId,
        ref: 'Notice'
    }],
    content: [{
        type: Schema.Types.ObjectId,
        ref: 'Content'
    }],
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;