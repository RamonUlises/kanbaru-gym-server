import { Request, Response } from 'express';
import AdminstradoresModels from '../models/administradores';
import { comparePassword, encryptPassword } from '@/lib/encripts';
import { AdministradorType } from '@/types/administradores';

class AdministradorController {
  async obtenerAdministradores(req: Request, res: Response) {
    try {
      const administradores = await AdminstradoresModels.obtenerAdministradores();

      res.status(200).json({ administradores });
    } catch {
      res.status(500).json({ message: 'Error al obtener administradores' });
    }
  }
  async crearAdministrador(req: Request, res: Response) {
    try {
      const { usuario, contrasena } = req.body as {
        usuario: string;
        contrasena: string;
      };
      
      if (!usuario || !contrasena) {
        res.status(400).json({ message: 'Faltan datos' });
        return;
      }

      const contrasenaEncrypt = await encryptPassword(contrasena);

      const response = await AdminstradoresModels.crearAdministrador({ usuario, contrasena: contrasenaEncrypt });

      if(response !== 'Administrador creado') {
        res.status(500).json({ message: response });
        return;
      }

      res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al crear administrador' });
    }
  }
  async actualizarAdministrador(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { usuario, contrasena } = req.body as {
        usuario: string;
        contrasena: string;
      };

      if (!id || !usuario || !contrasena) {
        res.status(400).json({ message: 'Faltan datos' });
        return;
      }

      const contrasenaEncrypt = await encryptPassword(contrasena);

      const response = await AdminstradoresModels.actualizarAdministrador({ id, usuario, contrasena: contrasenaEncrypt });

      if(response !== 'Administrador actualizado') {
        res.status(500).json({ message: response });
        return;
      }

      res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al actualizar administrador' });
    }
  }
  async eliminarAdministrador(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await AdminstradoresModels.eliminarAdministrador(id);

      if(response !== 'Administrador eliminado') {
        res.status(500).json({ message: response });
        return;
      }

      res.status(200).json({ message: response });
    } catch {
      res.status(500).json({ message: 'Error al eliminar administrador' });
    }
  }
  async loginAdministrador(req: Request, res: Response) {
    try {
      const { usuario, contrasena } = req.body as {
        usuario: string;
        contrasena: string;
      };

      if (!usuario || !contrasena) {
        res.status(400).json({ message: 'Faltan datos' });
        return;
      }

      const user = await AdminstradoresModels.obtenerAdministrador(usuario) as AdministradorType | null;

      if (!user) {
        res.status(400).json({ message: 'Usuario no encontrado' });
        return;
      }

      const response = await comparePassword(contrasena, user.contrasena);

      if (!response) {
        res.status(400).json({ message: 'Contraseña incorrecta' });
        return;
      }

      res.status(200).json({ message: 'Login exitoso' });
    } catch {
      res.status(500).json({ message: 'Error al login' });
    }
  }
}

export default new AdministradorController();
