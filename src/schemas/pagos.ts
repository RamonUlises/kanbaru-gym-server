import mongoose from 'mongoose';

const pagosSchema = new mongoose.Schema({
  id: { type: String, required: true },
  idCliente: { type: String, required: true },
  cliente: { type: String, required: true },
  fechaInicio: { type: String, required: true },
  fechaFin: { type: String, required: true },
  membresia: { type: String, required: true },
  monto: { type: Number, required: true },
  administrador: { type: String, required: true },
  activo: { type: Boolean, required: true, default: true },
});

export const PagosSchemas = mongoose.model('Pagos', pagosSchema);