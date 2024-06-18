import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    topic:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;