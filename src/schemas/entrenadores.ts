import mongoose from 'mongoose';

const entrenadoresSchema = new mongoose.Schema({
  id: { type: String, required: true },
  nombres: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  especialidad: { type: String, required: true },
  experiencia: { type: Number, required: true },
  correoElectronico: { type: String },
  telefono: { type: String },
  sexo: { type: String, required: true },
});

export const EntrenadoresSchemas = mongoose.model('Entrenadores', entrenadoresSchema);