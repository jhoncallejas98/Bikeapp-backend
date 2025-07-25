import express from 'express';
import cors from 'cors';
import dbConnect from './config/mongo.config.mjs';
import estacionesRouter from './routes/estaciones.route.mjs';
import bicicletasRouter from './routes/bicicletas.route.mjs';
import alquilarRouter from './routes/alquilar.route.mjs';
import devolverRouter from './routes/devolver.route.mjs';
// import todayRouter from './routes/today.routes.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors()); // Usamos cors para permitir peticiones desde el frontend



//invocar la cofiguracion de la conexion a la base de datos. 

// app.use(todayRouter);
//invocar la cofiguracion de la conexion a la base de datos. 
dbConnect();
app.use(estacionesRouter);
app.use(bicicletasRouter);
app.use(alquilarRouter);
app.use(devolverRouter);


// Paso 4: Lanzar el servidor web en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor lanzado exitosamente ;)   http://localhost:${ PORT }`);
});