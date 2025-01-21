import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10 * 24 * 60 * 60, // Automatically deletes after 10 days (in seconds)
    },
})

const File = mongoose.model('file', FileSchema);

export default File;