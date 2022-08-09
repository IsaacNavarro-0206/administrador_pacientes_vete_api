import express from 'express';
import dotvenv from 'dotenv';
import cors from 'cors';
import conectarBD from './database/db.js';
import veterinarioRoutes from './routes/veterinario.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';

dotvenv.config({ path: '.env' });

const app = express();
app.use(express.json());

conectarBD();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request está permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// app.use(cors({ origin: [whiteList] }));

app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

app.use('/veterinarios', veterinarioRoutes);
app.use('/pacientes', pacienteRoutes);

app.listen(port, () => console.log(`Servidor funcionando en el puerto ${4000}`));

