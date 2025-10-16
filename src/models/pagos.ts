import { PagosSchemas } from '@/schemas/pagos';
import crypto from 'node:crypto';

class PagosModel {
  async obtenerPagos() {
    try {
      const pagos = await PagosSchemas.find();

      return pagos;
    } catch {
      return 'Error al obtener pagos';
    }
  }
  async crearPago({
    idCliente,
    cliente,
    fechaInicio,
    fechaFin,
    membresia,
    monto,
    administrador,
  }: {
    idCliente: string;
    cliente: string;
    fechaInicio: string;
    fechaFin: string;
    membresia: string;
    monto: number;
    administrador: string;
  }) {
    try {
      const pagoExistente = await PagosSchemas.find({ idCliente, activo: true });
      
      if (pagoExistente.length > 0) {
        for (const pago of pagoExistente) { 
          if (fechaInicio > pago.fechaFin) {
            return 'La fecha inicio no puede ser mayor a la fecha fin de los pagos existentes';
          }
        }
      }

      const id = crypto.randomUUID();

      await PagosSchemas.create({
        id,
        idCliente,
        cliente,
        fechaInicio,
        fechaFin,
        membresia,
        monto,
        administrador,
      });

      return 'Pago creado';
    } catch {
      return 'Error al crear pago';
    }
  }
  async eliminarPago(id: string) {
    try {
      const pago = await PagosSchemas.findOne({ id });

      if (!pago) {
        return 'No existe el pago';
      }

      await PagosSchemas.findOneAndDelete({ id });

      return 'Pago eliminado';
    } catch {
      return 'Error al eliminar pago';
    }
  }
}

export default new PagosModel();
