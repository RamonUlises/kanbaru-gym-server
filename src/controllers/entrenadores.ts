import { Request, Response } from 'express';
import EntrenadoresModels from '../models/entrenadores';
import { dateRegex, emailRegex, nameRegex, phoneRegex } from '@/utils/regex';

class EntrenadoresController {
  async obtenerEntrenadores(req: Request, res: Response) {
    try {
      const entrenadores = await EntrenadoresModels.obtenerEntrenadores();

      res.status(200).json({ entrenadores });
    } catch {
      res.status(500).json({ message: 'Error al obtener entrenadores' });
    }
  }
  async crearEntrenador(req: Request, res: Response) {
    try {
      const {
        nombres,
        fechaNacimiento,
        especialidad,
        experiencia,
        correoElectronico,
        telefono,
        sexo,
      } = req.body as {
        nombres: string;
        fechaNacimiento: string;
        especialidad: string;
        experiencia: number;
        correoElectronico: string;
        telefono: string;
        sexo: string;
      };

      if (
        !nombres ||
        !fechaNacimiento ||
        !especialidad ||
        !correoElectronico ||
        !telefono ||
        !sexo
      ) {
        return res.status(400).json({ message: 'Faltan datos' });
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

      const response = await EntrenadoresModels.crearEntrenador({
        nombres,
        fechaNacimiento,
        especialidad,
        experiencia,
        correoElectronico,
        telefono,
        sexo,
      });

      if (response === 'Error al crear entrenador') {
        return res.status(500).json({ message: 'Error al crear entrenador' });
      }

      res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al crear entrenador' });
    }
  }
  async actualizarEntrenador(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        nombres,
        fechaNacimiento,
        especialidad,
        experiencia,
        correoElectronico,
        telefono,
        sexo,
      } = req.body as {
        nombres: string;
        fechaNacimiento: string;
        especialidad: string;
        experiencia: number;
        correoElectronico: string;
        telefono: string;
        sexo: string;
      };

      if (
        !nombres ||
        !fechaNacimiento ||
        !especialidad ||
        !correoElectronico ||
        !telefono ||
        !sexo
      ) {
        return res.status(400).json({ message: 'Faltan datos' });
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

      const response = await EntrenadoresModels.actualizarEntrenador({
        id,
        nombres,
        fechaNacimiento,
        especialidad,
        experiencia,
        correoElectronico,
        telefono,
        sexo,
      });

      if (response === 'No existe el entrenador') {
        return res.status(400).json({ message: 'No existe el entrenador' });
      }

      if (response === 'Error al actualizar entrenador') {
        return res
          .status(500)
          .json({ message: 'Error al actualizar entrenador' });
      }

      return res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al actualizar entrenador' });
    }
  }
  async eliminarEntrenador(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await EntrenadoresModels.eliminarEntrenador(id);

      if (response === 'No existe el entrenador') {
        return res.status(400).json({ message: 'No existe el entrenador' });
      }

      if (response === 'Error al eliminar entrenador') {
        return res
          .status(500)
          .json({ message: 'Error al eliminar entrenador' });
      }

      return res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al eliminar entrenador' });
    }
  }
}

export default new EntrenadoresController();
