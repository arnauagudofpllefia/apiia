require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bacallaRoutes = require('./routes/bacallaRoutes');

const app = express();

const PORT = process.env.PORT || 3000;
const DATA_MODE = process.env.DATA_MODE || 'memory';
const allowedOrigins = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

allowedOrigins.push('http://localhost:3000', 'http://localhost:5173');

app.use(
  cors({
    origin(origin, callback) {
      // Accepta clients sense origin (curl/Postman) i els orígens web autoritzats.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origen no autoritzat per CORS'));
    }
  })
);

app.use(express.json());

app.use('/api/bacalla', bacallaRoutes);

app.get('/health', (req, res) => {
  res.json({ ok: true, mode: DATA_MODE });
});

app.use((err, req, res, next) => {
  if (err.message === 'Origen no autoritzat per CORS') {
    return res.status(403).json({ error: 'Origen no autorizado por CORS' });
  }

  return next(err);
});

async function startServer() {
  try {
    if (DATA_MODE === 'mongo') {
      await connectDB();
    }

    app.listen(PORT, () => {
      console.log(`API activa a http://localhost:${PORT}`);
      console.log(`Mode de dades: ${DATA_MODE}`);
      console.log(`CORS habilitat per a: ${allowedOrigins.join(', ') || 'cap origen configurat'}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar la API:', error.message);
    process.exit(1);
  }
}

startServer();
