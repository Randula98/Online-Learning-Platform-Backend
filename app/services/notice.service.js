import Notice from "../models/notice.model.js";

const getAllNotices = async () => {
    return await Notice.find().populate('course');
}

const getNoticeById = async (id) => {
    return await Notice.findById(id).populate('course');
}

const createNotice = async (notice) => {
    return await Notice.create(notice);
}

const updateNotice = async (id, notice) => {
    return await Notice.findByIdAndUpdate(id
        , notice
        , { new: true });
}

const deleteNotice = async (id) => {
    return await Notice.findByIdAndDelete(id);
}

const getNoticesByCourseId = async (courseId) => {
    return await Notice.find({ course: courseId });
}

export default {
    getAllNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice,
    getNoticesByCourseId
};

