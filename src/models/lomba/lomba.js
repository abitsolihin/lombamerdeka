import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const lombaSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4,
        required: true,
    },
    title: {
        type: String,
        maxlength: 15,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    tatacara: {
        type: String,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    },
    videourl: {
        type: String,
        required: true
    },
    kategori: [
        {
            type: String,
            enum: ["dewasa", "anak-anak"],
            required: true
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Lomba = mongoose.models.lomba || mongoose.model('lomba', lombaSchema);

export default Lomba;