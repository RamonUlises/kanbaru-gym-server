import { Router } from 'express';
import PagosControllers from '@/controllers/pagos';
const router = Router();

router.get('/', (req, res) => {
  void PagosControllers.obtenerPagos(req, res);
});

router.post('/', (req, res) => {
  void PagosControllers.crearPago(req, res);
});

router.delete('/:id', (req, res) => {
  void PagosControllers.eliminarPago(req, res);
});

router.get('/cliente/:idCliente', (req, res) => {
  void PagosControllers.obtenerPagosCliente(req, res);
});

export default router;