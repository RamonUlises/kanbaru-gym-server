import { AdministradoresSchemas } from '@/schemas/administradores';
import crypto from 'node:crypto';

class AdministradorModel {
  async obtenerAdministradores() {
    try {
      const administradores = await AdministradoresSchemas.find();

      return administradores;
    } catch {
      return 'Error al obtener administradores';
    }
  }
  async obtenerAdministrador(usuario: string) {
    try {
      const administrador = await AdministradoresSchemas.findOne({ usuario });

      return administrador;
    } catch {
      return 'Error al obtener administrador';
    }
  }
  async crearAdministrador({
    usuario,
    contrasena,
  }: {
    usuario: string;
    contrasena: string;
  }) {
    try {
      const id = crypto.randomUUID();

      const usuarioExistente = await AdministradoresSchemas.findOne({ usuario });

      if (usuarioExistente) {
        return 'Usuario ya existe';
      }

      await AdministradoresSchemas.create({
        id,
        usuario,
        contrasena,
      });

      return 'Administrador creado';
    } catch {
      return 'Error al crear administrador';
    }
  }
  async actualizarAdministrador({
    id,
    usuario,
    contrasena,
  }: {
    id: string;
    usuario: string;
    contrasena: string;
  }) {
    try {
      const administrador = await AdministradoresSchemas.findOne({ id });

      if (!administrador) {
        return 'Administrador no encontrado';
      }

      const usuarioExistente = await AdministradoresSchemas.findOne({ usuario });

      if (usuarioExistente && usuarioExistente.id !== id) {
        return 'Usuario ya existe';
      }

      await AdministradoresSchemas.updateOne({ id }, { usuario, contrasena });

      return 'Administrador actualizado';
    } catch {
      return 'Error al actualizar administrador';
    }
  }
  async eliminarAdministrador(id: string) {
    try {
      const administrador = await AdministradoresSchemas.findOne({ id });

      if (!administrador) {
        return 'Administrador no encontrado';
      }

      await AdministradoresSchemas.deleteOne({ id });

      return 'Administrador eliminado';
    } catch {
      return 'Error al eliminar administrador';
    }
  }
}

export default new AdministradorModel();
