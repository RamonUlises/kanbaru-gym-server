import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_CONNECTION ?? '';

function connec() {
  mongoose
    .connect(url)
    .then(() => {
      console.log('Conectado a la base de datos');
    })
    .catch(() => {
      console.log('Error al conectar a la base de datos');
    });
};

connec();
