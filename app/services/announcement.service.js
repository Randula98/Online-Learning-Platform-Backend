import Announcement from "../models/announcement.model.js";

export const getAllAnnouncements = async () => {
    return await Announcement.find();
}

export const getAnnouncementById = async (id) => {
    return await Announcement.findById(id);
}

export const createAnnouncement = async (announcement) => {
    return await Announcement.create(announcement);
}

export const updateAnnouncement = async (id, announcement) => {
    return await Announcement.findByIdAndUpdate(id
        , announcement
        , { new: true });
}

export const deleteAnnouncement = async (id) => {
    return await Announcement.findByIdAndDelete(id);
}

export default {
    getAllAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};