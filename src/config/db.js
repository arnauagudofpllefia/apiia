const mongoose = require('mongoose');

function formatMongoError(error) {
  return {
    name: error.name,
    message: error.message,
    code: error.code || null,
    codeName: error.codeName || null,
    cause: error.cause ? error.cause.message : null
  };
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Falta la variable MONGODB_URI en el entorno');
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('MongoDB Atlas conectado');
  } catch (error) {
    console.error('Error conectando con MongoDB Atlas:', formatMongoError(error));
    throw error;
  }
}

module.exports = connectDB;
