import Announcement from "../models/announcement.model.js";

const getAllAnnouncements = async () => {
    return await Announcement.find();
}

const getAnnouncementById = async (id) => {
    return await Announcement.findById(id);
}

const createAnnouncement = async (announcement) => {
    return await Announcement.create(announcement);
}

const updateAnnouncement = async (id, announcement) => {
    return await Announcement.findByIdAndUpdate(id
        , announcement
        , { new: true });
}

const deleteAnnouncement = async (id) => {
    return await Announcement.findByIdAndDelete(id);
}

export default {
    getAllAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};