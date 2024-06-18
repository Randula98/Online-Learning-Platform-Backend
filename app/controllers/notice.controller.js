import noticeService from "../services/notice.service.js";

const getAllNotices = async (req, res) => {
    try {
        const notices = await noticeService.getAllNotices();
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNoticeById = async (req, res) => {
    try {
        const notice = await noticeService.getNoticeById(req.params.id);
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createNotice = async (req, res) => {
    try {
        const notice = await noticeService.createNotice(req.body);
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateNotice = async (req, res) => {
    try {
        const notice = await noticeService.updateNotice(req.params.id, req.body);
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteNotice = async (req, res) => {
    try {
        const notice = await noticeService.deleteNotice(req.params.id);
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNoticesByCourseId = async (req, res) => {
    try {
        const notices = await noticeService.getNoticesByCourseId(req.params.courseId);
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice,
    getNoticesByCourseId
};