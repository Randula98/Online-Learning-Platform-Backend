import contentService from "../services/content.service.js";
import courseService from "../services/course.service.js";

const getAllContents = async (req, res) => {
    try {
        const contents = await contentService.getAllContents();
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getContentById = async (req, res) => {
    try {
        const content = await contentService.getContentById(req.params.id);
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createContent = async (req, res) => {
    try {
        const content = await contentService.createContent(req.body);
        //add content to course
        const course = await courseService.getCourseById(req.body.course);
        course.content.push(content._id);
        await course.save();
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateContent = async (req, res) => {
    try {
        const content = await contentService.updateContent(req.params.id, req.body);
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteContent = async (req, res) => {
    try {
        const content = await contentService.deleteContent(req.params.id);
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getContentsByCourseId = async (req, res) => {
    try {
        const contents = await contentService.getContentsByCourseId(req.params.courseId);
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
    getContentsByCourseId
};