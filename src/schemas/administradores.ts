import mongoose from 'mongoose';

const administradoresSchema = new mongoose.Schema({
  id: { type: String, required: true },
  usuario: { type: String, required: true },
  contrasena: { type: String, required: true },
});

export const AdministradoresSchemas = mongoose.model('Administradores', administradoresSchema);