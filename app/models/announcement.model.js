import mongoose from "mongoose";

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    topic:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;