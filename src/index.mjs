import express from 'express';
import cors from 'cors';
import dbConnect from './config/mongo.config.mjs';
import bikeRouter from './routes/bike.route.mjs';
import bookRouter from './routes/book.route.mjs';
import stationRouter from './routes/station.route.mjs';
// import todayRouter from './routes/today.routes.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors()); // Usamos cors para permitir peticiones desde el frontend

// Configuración de la ruta para el frontend







//invocar la cofiguracion de la conexion a la base de datos. 

// app.use(todayRouter);
//invocar la cofiguracion de la conexion a la base de datos. 
dbConnect();
app.use(bikeRouter);
app.use(bookRouter);
app.use(stationRouter);


// Paso 4: Lanzar el servidor web en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor lanzado exitosamente ;)   http://localhost:${ PORT }`);
});