import mongoose from "mongoose";

const bikesSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: true
    },
    status: { // Estado para badge de color
        type: String,
        enum: ['disponible', 'en uso', 'en mantenimiento'],
        default: 'disponible'
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    availableBikes: {
        type: Number,
        required: true,
        min: 0
    },
}, { timestamps: true, versionKey: false });

const bikesModel = mongoose.model('bikes', bikesSchema);
export default bikesModel;