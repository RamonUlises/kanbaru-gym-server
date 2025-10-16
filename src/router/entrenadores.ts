import { Router } from 'express';
import EntrenadoresController from '../controllers/entrenadores';

const router = Router();

router.get('/', (req, res) => {
  void EntrenadoresController.obtenerEntrenadores(req, res);
});

router.post('/', (req, res) => {
  void EntrenadoresController.crearEntrenador(req, res);
});

router.put('/:id', (req, res) => {
  void EntrenadoresController.actualizarEntrenador(req, res);
});

router.delete('/:id', (req, res) => {
  void EntrenadoresController.eliminarEntrenador(req, res);
});

export default router;