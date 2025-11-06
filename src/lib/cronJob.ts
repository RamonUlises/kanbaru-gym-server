import cron from 'node-cron';
import { ClientesSchemas } from '@/schemas/clientes';
import { PagosSchemas } from '@/schemas/pagos';

cron.schedule('0 1 * * *', async () => {
  try {
    const clientes = await ClientesSchemas.find();

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    for (const cliente of clientes) {
      const pagos = await PagosSchemas.find({ idCliente: cliente.id });
      let clienteActivo = false;

      for (const pago of pagos) {
        const fechaInicio = new Date(pago.fechaInicio);
        const fechaFin = new Date(pago.fechaFin);
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(0, 0, 0, 0);

        const pagoActivo = hoy >= fechaInicio && hoy <= fechaFin;

        if (pago.activo !== pagoActivo) {
          await PagosSchemas.updateOne(
            { id: pago.id },
            { $set: { activo: pagoActivo } }
          );
        }

        if (pagoActivo) clienteActivo = true;
      }

      await ClientesSchemas.updateOne(
        { id: cliente.id },
        { $set: { activo: clienteActivo } }
      );
    }
  } catch (error) {
    console.error('Error en cronJob de pagos:', error);
  }
});
