import announcementService from "../services/announcement.service.js";

const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementService.getAllAnnouncements();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await announcementService.getAnnouncementById(req.params.id);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.createAnnouncement(req.body);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementService.deleteAnnouncement(req.params.id);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};
