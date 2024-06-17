import announcementServices from "../services/announcement.services.js";

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementServices.getAllAnnouncements();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await announcementServices.getAnnouncementById(req.params.id);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementServices.createAnnouncement(req.body);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementServices.updateAnnouncement(req.params.id, req.body);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await announcementServices.deleteAnnouncement(req.params.id);
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
