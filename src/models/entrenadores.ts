import { EntrenadoresSchemas } from '@/schemas/entrenadores';
import { EntrenadorType } from '@/types/entrenadores';
import crypto from 'node:crypto';

class EntrenadorModel {
  async obtenerEntrenadores() {
    try {
      const entrenadores = await EntrenadoresSchemas.find();

      return entrenadores;
    } catch {
      return 'Error al obtener entrenadores';
    }
  }
  async crearEntrenador({
    nombres,
    fechaNacimiento,
    especialidad,
    experiencia,
    correoElectronico,
    telefono,
    sexo,
  }: {
    nombres: string;
    fechaNacimiento: string;
    especialidad: string;
    experiencia: number;
    correoElectronico: string;
    telefono: string;
    sexo: string;
  }) {
    try {
      const id = crypto.randomUUID();

      const entrenador1 = await EntrenadoresSchemas.findOne({ correoElectronico });

      if (entrenador1?.correoElectronico === correoElectronico) {
        return 'El correo electrónico ya está en uso';
      }

      const entrenador2 = await EntrenadoresSchemas.findOne({ telefono });

      if (entrenador2?.telefono === telefono) {
        return 'El telefono ya está en uso';
      }

      await EntrenadoresSchemas.create({
        id,
        nombres,
        fechaNacimiento,
        especialidad,
        experiencia,
        correoElectronico,
        telefono,
        sexo,
      });

      return 'Entrenador creado';
    } catch {
      return 'Error al crear entrenador';
    }
  }
  async actualizarEntrenador({
    id,
    nombres,
    fechaNacimiento,
    especialidad,
    experiencia,
    correoElectronico,
    telefono,
    sexo,
  }: EntrenadorType) {
    try {
      const entrenador = await EntrenadoresSchemas.findOne({ id });

      if (!entrenador) {
        return 'No existe el entrenador';
      }

      const entrenador1 = await EntrenadoresSchemas.findOne({ correoElectronico });

      if (entrenador1?.correoElectronico === correoElectronico && entrenador1.id !== id) {
        return 'El correo electrónico ya está en uso';
      }

      const entrenador2 = await EntrenadoresSchemas.findOne({ telefono });

      if (entrenador2?.telefono === telefono && entrenador2.id !== id) {
        return 'El telefono ya está en uso';
      }

      await EntrenadoresSchemas.findOneAndUpdate(
        { id },
        {
          nombres,
          fechaNacimiento,
          especialidad,
          experiencia,
          correoElectronico,
          telefono,
          sexo,
        },
      );

      return 'Entrenador actualizado';
    } catch {
      return 'Error al actualizar entrenador';
    }
  }
  async eliminarEntrenador(id: string) {
    try {
      const entrenador = await EntrenadoresSchemas.findOne({ id });

      if (!entrenador) {
        return 'No existe el entrenador';
      }

      await EntrenadoresSchemas.findOneAndDelete({ id });

      return 'Entrenador eliminado';
    } catch {
      return 'Error al eliminar entrenador';
    }
  }
}

export default new EntrenadorModel();
