import mongoose from "mongoose";


async function dbConnect() {
    try {
        // Usar variable de entorno si existe
        const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/bikeapp";
        
        console.log('Intentando conectar a MongoDB Atlas...');
        console.log('URL de conexión:', mongoUrl.replace(/\/\/.*@/, '//***:***@')); // Ocultar credenciales en logs
        
        await mongoose.connect(mongoUrl, {
            // Opciones de conexión actualizadas para MongoDB Atlas
            maxPoolSize: 10, // Máximo número de conexiones en el pool
            serverSelectionTimeoutMS: 5000, // Timeout para selección de servidor
            socketTimeoutMS: 45000, // Timeout para operaciones de socket
        });

        console.log('✅ Base de datos MongoDB Atlas conectada correctamente');
        console.log('📊 Base de datos:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Puerto:', mongoose.connection.port);
        
    } catch (error) {
        console.error('❌ Error al conectarse a MongoDB Atlas:');
        console.error('Detalles del error:', error.message);
        process.exit(1); // Salir del proceso si no se puede conectar
    }
}

export default dbConnect;