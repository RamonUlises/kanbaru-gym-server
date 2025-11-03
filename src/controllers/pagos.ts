import PagosModel from '@/models/pagos';
import { dateRegex } from '@/utils/regex';
import { Request, Response } from 'express';

class PagoController {
  async obtenerPagos(req: Request, res: Response) {
    try {
      const pagos = await PagosModel.obtenerPagos();

      if(pagos.length === 0) {
        return res.status(404).json({ message: 'No hay pagos' });
      }

      return res.status(200).json({ pagos });
    } catch {
      res.status(500).json({ message: 'Error al obtener pagos' });
    }
  }
  async crearPago(req: Request, res: Response) {
    try {
      const {
        idCliente,
        cliente,
        fechaInicio,
        fechaFin,
        membresia,
        monto,
        administrador,
      } = req.body as {
        idCliente: string;
        cliente: string;
        fechaInicio: string;
        fechaFin: string;
        membresia: string;
        monto: number;
        administrador: string;
      };

      if (
        !idCliente ||
        !cliente ||
        !fechaInicio ||
        !fechaFin ||
        !membresia ||
        !monto ||
        !administrador
      ) {
        return res.status(400).json({ message: 'Faltan datos' });
      }

      if (!dateRegex.test(fechaInicio)) {
        res.status(400).json({ message: 'Fecha de inicio inválida' });
        return;
      }

      if (!dateRegex.test(fechaFin)) {
        res.status(400).json({ message: 'Fecha de fin inválida' });
        return;
      }

      if (isNaN(monto)) {
        res.status(400).json({ message: 'Monto inválido' });
        return;
      }

      const response = await PagosModel.crearPago({
        idCliente,
        cliente,
        fechaInicio,
        fechaFin,
        membresia,
        monto,
        administrador,
      });

      if (response !== 'Pago creado') {
        return res.status(500).json({ message: response });
      }

      return res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al crear pago' });
    }
  }
  async eliminarPago(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        return res.status(400).json({ message: 'Falta el id del pago' });
      }

      const response = await PagosModel.eliminarPago(id);

      if (response !== 'Pago eliminado') {
        return res.status(500).json({ message: response });
      }

      return res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al eliminar pago' });
    }
  }
  async obtenerPagosCliente(req: Request, res: Response) {
    try {
      const { idCliente } = req.params as { idCliente: string };

      const pagos = await PagosModel.obtenerPagoCliente(idCliente);

      if (pagos.length === 0) {
        return res.status(404).json({ message: 'No hay pagos' });
      }

      return res.status(200).json({ pagos });
    } catch {
      res.status(500).json({ message: 'Error al obtener pagos' });
    }
  }
}

export default new PagoController();
