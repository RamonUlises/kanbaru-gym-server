import ClientesModels from '@/models/clientes';
import { dateRegex, emailRegex, nameRegex, phoneRegex } from '@/utils/regex';
import { Request, Response } from 'express';

class ClienteController {
  async obtenerClientes(req: Request, res: Response) {
    try {
      const clientes = await ClientesModels.obtenerClientes();

      res.status(200).json({ clientes });
    } catch {
      res.status(500).json({ message: 'Error al obtener clientes' });
    }
  }
  async obtenerCliente(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const cliente = await ClientesModels.obtenerCliente(id);

      if (!cliente) {
        res.status(400).json({ message: 'No existe el cliente' });
        return;
      }

      res.status(200).json({ cliente });
    } catch {
      res.status(500).json({ message: 'Error al obtener cliente' });
    }
  }
  async crearCliente(req: Request, res: Response) {
    try {
      const { nombres, fechaNacimiento, correoElectronico, telefono, sexo } =
        req.body as {
          nombres: string;
          fechaNacimiento: string;
          correoElectronico: string;
          telefono: string;
          sexo: string;
        };

      if (
        !nombres ||
        !fechaNacimiento ||
        !correoElectronico ||
        !telefono ||
        !sexo
      ) {
        res.status(400).json({ message: 'Faltan datos' });
        return;
      }

      if (!nameRegex.test(nombres)) {
        res.status(400).json({ message: 'Nombres inválidos' });
        return;
      }

      if (!emailRegex.test(correoElectronico)) {
        res.status(400).json({ message: 'Correo inválido' });
        return;
      }

      if (!dateRegex.test(fechaNacimiento)) {
        res.status(400).json({ message: 'Fecha de nacimiento inválida' });
        return;
      }

      if (!phoneRegex.test(telefono)) {
        res.status(400).json({ message: 'Telefono inválido' });
        return;
      }

      if (sexo !== 'M' && sexo !== 'F') {
        res.status(400).json({ message: 'Sexo inválido' });
        return;
      }

      const response = await ClientesModels.crearCliente({
        nombres,
        fechaNacimiento,
        correoElectronico,
        telefono,
        sexo,
      });

      if (response.error !== 'Cliente creado') {
        res.status(500).json({ message: response.error });
        return;
      }

      res.status(200).json({ message: response.error, id: response.id });
    } catch {
      res.status(500).json({ message: 'Error al crear cliente' });
    }
  }
  async actualizarCliente(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombres, fechaNacimiento, correoElectronico, telefono, sexo } =
        req.body as {
          nombres: string;
          fechaNacimiento: string;
          correoElectronico: string;
          telefono: string;
          sexo: string;
        };

      if (
        !nombres ||
        !fechaNacimiento ||
        !correoElectronico ||
        !telefono ||
        !sexo
      ) {
        res.status(400).json({ message: 'Faltan datos' });
        return;
      }

      if (!nameRegex.test(nombres)) {
        res.status(400).json({ message: 'Nombres inválidos' });
        return;
      }

      if (!emailRegex.test(correoElectronico)) {
        res.status(400).json({ message: 'Correo inválido' });
        return;
      }

      if (!dateRegex.test(fechaNacimiento)) {
        res.status(400).json({ message: 'Fecha de nacimiento inválida' });
        return;
      }

      if (!phoneRegex.test(telefono)) {
        res.status(400).json({ message: 'Telefono inválido' });
        return;
      }

      if (sexo !== 'M' && sexo !== 'F') {
        res.status(400).json({ message: 'Sexo inválido' });
        return;
      }

      const response = await ClientesModels.actualizarCliente({
        id,
        nombres,
        fechaNacimiento,
        correoElectronico,
        telefono,
        sexo,
      });

      if (response === 'Error al actualizar cliente') {
        res.status(500).json({ message: response });
        return;
      }

      if (response === 'No existe el cliente') {
        res.status(400).json({ message: response });
        return;
      }

      if(response !== 'Cliente actualizado'){
        res.status(500).json({ message: response });
        return;
      }

      res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al actualizar cliente' });
    }
  }
  async eliminarCliente(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await ClientesModels.eliminarCliente(id);

      if (response === 'Error al eliminar cliente') {
        res.status(500).json({ message: response });
        return;
      }
      if (response === 'No existe el cliente') {
        res.status(400).json({ message: response });
        return;
      }
      
      res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al eliminar cliente' });
    }
  }
}

export default new ClienteController();
