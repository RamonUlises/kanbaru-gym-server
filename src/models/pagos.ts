import { ClientesSchemas } from '@/schemas/clientes';
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
  async obtenerPagoCliente(idCliente: string) {
    try {
      const pagos = await PagosSchemas.find({ idCliente });

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
      const clientee = await ClientesSchemas.findOne({ id: idCliente });

      if (!clientee) return 'No existe el cliente';

      const nuevaInicio = new Date(fechaInicio);
      const nuevaFin = new Date(fechaFin);

      const pagosActivos = await PagosSchemas.find({ idCliente, activo: true });

      for (const pago of pagosActivos) {
        const pagoInicio = new Date(pago.fechaInicio);
        const pagoFin = new Date(pago.fechaFin);

        const seSolapan = nuevaInicio <= pagoFin && nuevaFin >= pagoInicio;

        if (seSolapan) {
          return `Ya existe un pago activo entre ${pago.fechaInicio} y ${pago.fechaFin}`;
        }

        if (pago.membresia === 'semanal') {
          const limite = new Date(pagoFin);
          limite.setDate(limite.getDate() + 7);

          if (nuevaInicio <= limite && nuevaInicio >= pagoInicio) {
            return `Ya existe un pago semanal activo o dentro del rango de 7 días posteriores (${pago.fechaInicio} - ${pago.fechaFin})`;
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

      //await ClientesSchemas.findOneAndUpdate({ id: idCliente }, { activo: true });

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

      const fechaInicio = new Date(pago.fechaInicio);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (hoy >= fechaInicio) {
        return 'No se puede eliminar el pago ya que está activo';
      }

      await PagosSchemas.findOneAndDelete({ id });

      return 'Pago eliminado';
    } catch {
      return 'Error al eliminar pago';
    }
  }
}

export default new PagosModel();
