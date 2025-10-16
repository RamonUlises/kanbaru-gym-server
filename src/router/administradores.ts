import { Router } from 'express';
import AdministradoresController from '../controllers/administradores';

const router = Router();

router.get('/', (req, res) => {
  void AdministradoresController.obtenerAdministradores(req, res);
});

router.post('/', (req, res) => {
  void AdministradoresController.crearAdministrador(req, res);
});

router.put('/:id', (req, res) => {
  void AdministradoresController.actualizarAdministrador(req, res);
});

router.delete('/:id', (req, res) => {
  void AdministradoresController.eliminarAdministrador(req, res);
}); 

router.post('/login', (req, res) => {
  void AdministradoresController.loginAdministrador(req, res);
});

export default router;