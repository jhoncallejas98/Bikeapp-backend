import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
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

const stationModel = mongoose.model('stations', stationSchema);
export default stationModel;