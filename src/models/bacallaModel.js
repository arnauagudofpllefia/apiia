const mongoose = require('mongoose');

const bacallaSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    nom: { type: String, required: true, trim: true },
    origen: { type: String, required: true, trim: true },
    tipus: { type: String, required: true, trim: true },
    descripcio: { type: String, required: true, trim: true }
  },
  {
    versionKey: false,
    collection: 'bacalla'
  }
);

module.exports = mongoose.model('Bacalla', bacallaSchema);
