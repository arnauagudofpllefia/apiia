const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Falta la variable MONGODB_URI en el entorno');
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  });
  console.log('MongoDB Atlas conectado');
}

module.exports = connectDB;
