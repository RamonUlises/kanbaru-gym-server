import mongoose from 'mongoose';

const pagosSchema = new mongoose.Schema({
  id: { type: String, required: true },
  idCliente: { type: String, required: true },
  cliente: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  membresia: { type: String, required: true },
  monto: { type: Number, required: true },
  administrador: { type: String, required: true },
});

export const PagosSchemas = mongoose.model('Pagos', pagosSchema);