import Course from '../models/course.model.js';

export const getAllCourses = async () => {
    return await Course.find().populate('notices').populate('content');
}

export const getCourseById = async (id) => {
    return await Course.findById(id).
    populate('notices').populate('content');
}

export const createCourse = async (course) => {
    return await Course.create(course);
}

export const updateCourse = async (id, course) => {
    return await Course.findByIdAndUpdate(id, course, { new: true });
}

export const deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
}

export default {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
