import courseService from "../services/course.service.js";

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses().reverse();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCourseById = async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCourse = async (req, res) => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCourse = async (req, res) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await courseService.deleteCourse(req.params.id);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};