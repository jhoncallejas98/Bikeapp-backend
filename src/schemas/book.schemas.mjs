import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true
    },
    horaInicio: {
        type: String,                            // formato 'HH:mm'
        required: [true, "es obligatorio que se ponga la hora de inicio"]
    },
    horaFin: {
        type: String,                            // formato 'HH:mm'
    },
    activo: {
        type: Boolean,
        default: true
    },
}, { timestamps: true, versionKey: false });

//define el modelo y vincula la estrutura de datos a una coleccion 
const bookModel = mongoose.model(
    "book",                   //nombre de la coleccion
    bookSchema                  //nombre de la estructura de datos
);

export default bookModel;