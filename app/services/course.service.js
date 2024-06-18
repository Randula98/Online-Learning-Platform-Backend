import Course from '../models/course.model.js';

const getAllCourses = async () => {
    return await Course.find().populate('notices').populate('content');
}

const getCourseById = async (id) => {
    return await Course.findById(id).
    populate('notices').populate('content');
}

const createCourse = async (course) => {
    return await Course.create(course);
}

const updateCourse = async (id, course) => {
    return await Course.findByIdAndUpdate(id, course, { new: true });
}

const deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
}

export default {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
