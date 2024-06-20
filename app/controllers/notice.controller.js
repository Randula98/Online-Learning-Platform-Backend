import noticeService from "../services/notice.service.js";
import courseService from "../services/course.service.js";

const getAllNotices = async (req, res) => {
    try {
        const notices = (await noticeService.getAllNotices()).reverse();
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
        //add notice to course
        const course = await courseService.getCourseById(req.body.course);
        course.notices.push(notice._id);
        await course.save();
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
        //remove notice from course
        const course = await courseService.getCourseById(notice.course);
        course.notices = course.notices.filter(noticeId => noticeId != notice._id);
        await course.save();
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