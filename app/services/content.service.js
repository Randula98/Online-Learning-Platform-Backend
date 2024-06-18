import Content from "../models/content.model.js";

const getAllContents = async () => {
    return await Content.find().populate('course');
}

const getContentById = async (id) => {
    return await Content.findById(id).populate('course');
}

const createContent = async (content) => {
    return await Content.create(content);
}

const updateContent = async (id, content) => {
    return await Content.findByIdAndUpdate(id 
        , content
        , { new: true });
}

const deleteContent = async (id) => {
    return await Content.findByIdAndDelete(id);
}

const getContentsByCourseId = async (courseId) => {
    return await Content.find({
        course: courseId
    });
}

export default {
    getAllContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
    getContentsByCourseId
};