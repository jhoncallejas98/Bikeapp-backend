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
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stations',
        required: true
    }
}, { timestamps: true, versionKey: false });

const bikesModel = mongoose.model('bikes', bikesSchema);
export default bikesModel;