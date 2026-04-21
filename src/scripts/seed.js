require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Bacalla = require('../models/bacallaModel');

const sampleBacalla = [
  {
    id: 1,
    nom: 'Bacalla Islandia curat',
    origen: 'Islandia',
    tipus: 'salat',
    descripcio: 'Lloms curats en sal marina, ideals per dessalar i cuinar al forn.'
  },
  {
    id: 2,
    nom: 'Esqueixada tradicional',
    origen: 'Catalunya',
    tipus: 'esqueixat',
    descripcio: 'Bacalla esmicolat i dessalat, preparat per amanides fredes.'
  },
  {
    id: 3,
    nom: 'Morro de bacalla premium',
    origen: 'Noruega',
    tipus: 'salat',
    descripcio: 'Peça gruixuda amb textura melosa, apta per confitat i pil-pil.'
  },
  {
    id: 4,
    nom: 'Filet fresc de bacalla',
    origen: 'Atlantic Nord',
    tipus: 'fresc',
    descripcio: 'Tall fresc per planxa o vapor, de sabor suau i net.'
  },
  {
    id: 5,
    nom: 'Bacalla fumat laminat',
    origen: 'Escocia',
    tipus: 'fumat',
    descripcio: 'Llesques fines amb toc fumat per tapes i entrants.'
  }
];

async function seedDatabase() {
  try {
    await connectDB();

    await Bacalla.deleteMany({});

    await Bacalla.insertMany(sampleBacalla);

    console.log('Seed completado: varietats de bacalla inserides a Atlas');
  } catch (error) {
    console.error('Error ejecutando seed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
