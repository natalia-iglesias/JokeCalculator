import dotenv from 'dotenv';
dotenv.config(); // Esto carga las variables del archivo .env

import { Sequelize } from 'sequelize';

// Configura tu base de datos usando las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME!,     // Nombre de la base de datos
  process.env.DB_USER!,     // Usuario de la base de datos
  process.env.DB_PASSWORD!, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,
  }
);

// Función para conectar a la base de datos
const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos MySQL establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos MySQL:', error);
  }
};

export { sequelize, connectDB };
