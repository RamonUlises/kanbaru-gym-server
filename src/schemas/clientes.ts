import mongoose from 'mongoose';

const clientesSchema = new mongoose.Schema({
  id: { type: String, required: true },
  nombres: { type: String, required: true },
  fechaNacimiento: { type: String, required: true },
  correoElectronico: { type: String },
  telefono: { type: String },
  sexo: { type: String, required: true },
});

export const ClientesSchemas = mongoose.model('Clientes', clientesSchema);