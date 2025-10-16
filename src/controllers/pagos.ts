import PagosModel from '@/models/pagos';
import { Request, Response } from 'express';

class PagoController {
  async obtenerPagos(req: Request, res: Response) {
    try {
      const pagos = await PagosModel.obtenerPagos();

      return pagos;
    } catch {
      res.status(500).json({ message: 'Error al obtener pagos' });
    }
  }
  async crearPago(req: Request, res: Response) {
    try {
      const { idCliente, cliente, fechaInicio, fechaFin, membresia, monto, administrador } = req.body as {
        idCliente: string;
        cliente: string;
        fechaInicio: string;
        fechaFin: string;
        membresia: string;
        monto: number;
        administrador: string;
      };

      if(!idCliente || !cliente || !fechaInicio || !fechaFin || !membresia || !monto || !administrador) {
        return res.status(400).json({ message: 'Faltan datos' });
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

      if(response !== 'Pago creado') {
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

      if(!id) {
        return res.status(400).json({ message: 'Falta el id del pago' });
      }

      const response = await PagosModel.eliminarPago(id);

      if(response !== 'Pago eliminado') {
        return res.status(500).json({ message: response });
      }

      return res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al eliminar pago' });
    }
  }
}

export default new PagoController();
