import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    week:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    fileUrl:{
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

const Content = mongoose.model('Content', contentSchema);

export default Content;