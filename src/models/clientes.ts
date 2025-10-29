import { ClientesSchemas } from '@/schemas/clientes';
import crypto from 'node:crypto';

class ClienteModel {
  async obtenerClientes() {
    try {
      const clientes = await ClientesSchemas.find();

      return clientes;
    } catch {
      return 'Error al obtener clientes';
    }
  }
  async obtenerCliente(id: string) {
    try {
      const cliente = await ClientesSchemas.findOne({ id });

      return cliente;
    } catch {
      return 'Error al obtener cliente';
    }
  }
  async crearCliente({
    nombres,
    fechaNacimiento,
    correoElectronico,
    telefono,
    sexo,
  }: {
    nombres: string;
    fechaNacimiento: string;
    correoElectronico: string;
    telefono: string;
    sexo: string;
  }) {
    try {
      const cliente1 = await ClientesSchemas.find({ correoElectronico });
      
      if (cliente1.length > 0) {
        return { error: 'El correo electrónico ya está en uso', id: null };
      }
      
      const cliente2 = await ClientesSchemas.find({ telefono });
      
      if (cliente2.length > 0) {
        return { error: 'El telefono ya está en uso', id: null };
      }

      const id = crypto.randomUUID();

      await ClientesSchemas.create({
        id,
        nombres,
        fechaNacimiento,
        correoElectronico,
        telefono,
        sexo,
      });

      return { error: 'Cliente creado' , id };
    } catch {
      return { error: 'Error al crear cliente', id: null };
    }
  }
  async actualizarCliente({
    id,
    nombres,
    fechaNacimiento,
    correoElectronico,
    telefono,
    sexo,
  }: {
    id: string;
    nombres: string;
    fechaNacimiento: string;
    correoElectronico: string;
    telefono: string;
    sexo: string;
  }) {
    try {
      const cliente = await ClientesSchemas.findOne({ id });

      if (!cliente) {
        return 'No existe el cliente';
      }

      const cliente1 = await ClientesSchemas.findOne({ correoElectronico });

      if (cliente1?.correoElectronico === correoElectronico && cliente1.id !== id) {
        return 'El correo electrónico ya está en uso';
      }

      const cliente2 = await ClientesSchemas.findOne({ telefono });

      if (cliente2?.telefono === telefono && cliente2.id !== id) {
        return 'El telefono ya está en uso';
      }

      await ClientesSchemas.findOneAndUpdate(
        { id },
        {
          nombres,
          fechaNacimiento,
          correoElectronico,
          telefono,
          sexo,
        },
      );

      return 'Cliente actualizado';
    } catch {
      return 'Error al actualizar cliente';
    }
  }
  async eliminarCliente(id: string) {
    try {
      const cliente = await ClientesSchemas.findOne({ id });

      if (!cliente) {
        return 'No existe el cliente';
      }

      await ClientesSchemas.deleteOne({ id });

      return 'Cliente eliminado';
    } catch {
      return 'Error al eliminar cliente';
    }
  }
}

export default new ClienteModel();
