import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import './database/connection';

import clientes from './router/clientes';
import pagos from './router/pagos';
import entrenadores from './router/entrenadores';
import administradores from './router/administradores';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/clientes', clientes);
app.use('/pagos', pagos);
app.use('/entrenadores', entrenadores);
app.use('/administradores', administradores);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port.toString()}`);
});
