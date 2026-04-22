const Bacalla = require('../models/bacallaModel');
const bacallaData = require('../data/bacallaData');

const isMongoMode = process.env.DATA_MODE === 'mongo';

function parseId(rawId) {
  const id = Number.parseInt(rawId, 10);
  return Number.isNaN(id) ? null : id;
}

function validatePayload(body) {
  const { nom, origen, tipus, descripcio } = body;

  if (!nom || !origen || !tipus || !descripcio) {
    return 'Els camps nom, origen, tipus i descripcio son obligatoris';
  }

  return null;
}

async function listBacalla(req, res) {
  try {
    if (isMongoMode) {
      const items = await Bacalla.find().sort({ id: 1 });
      return res.json(items);
    }

    return res.json(bacallaData);
  } catch (error) {
    return res.status(500).json({ error: 'Error obtenint el llistat de bacalla' });
  }
}

async function getBacallaById(req, res) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "L'id ha de ser numeric" });
  }

  try {
    const item = isMongoMode
      ? await Bacalla.findOne({ id })
      : bacallaData.find((entry) => entry.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Varietat de bacalla no trobada' });
    }

    return res.json(item);
  } catch (error) {
    return res.status(500).json({ error: 'Error obtenint el detall de bacalla' });
  }
}

async function createBacalla(req, res) {
  const validationError = validatePayload(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { nom, origen, tipus, descripcio } = req.body;

  try {
    if (isMongoMode) {
      const lastItem = await Bacalla.findOne().sort({ id: -1 });
      const nextId = lastItem ? lastItem.id + 1 : 1;

      const created = await Bacalla.create({
        id: nextId,
        nom,
        origen,
        tipus,
        descripcio
      });

      return res.status(201).json(created);
    }

    const nextId = bacallaData.length
      ? Math.max(...bacallaData.map((entry) => entry.id)) + 1
      : 1;

    const created = {
      id: nextId,
      nom,
      origen,
      tipus,
      descripcio
    };

    bacallaData.push(created);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ error: 'Error creant la varietat de bacalla' });
  }
}

async function updateBacalla(req, res) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "L'id ha de ser numeric" });
  }

  const validationError = validatePayload(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { nom, origen, tipus, descripcio } = req.body;

  try {
    if (isMongoMode) {
      const updated = await Bacalla.findOneAndUpdate(
        { id },
        { nom, origen, tipus, descripcio },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Varietat de bacalla no trobada' });
      }

      return res.json(updated);
    }

    const index = bacallaData.findIndex((entry) => entry.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Varietat de bacalla no trobada' });
    }

    bacallaData[index] = { id, nom, origen, tipus, descripcio };
    return res.json(bacallaData[index]);
  } catch (error) {
    return res.status(500).json({ error: 'Error actualitzant la varietat de bacalla' });
  }
}

async function deleteBacalla(req, res) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "L'id ha de ser numeric" });
  }

  try {
    if (isMongoMode) {
      const deleted = await Bacalla.findOneAndDelete({ id });

      if (!deleted) {
        return res.status(404).json({ error: 'Varietat de bacalla no trobada' });
      }

      return res.status(204).send();
    }

    const index = bacallaData.findIndex((entry) => entry.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Varietat de bacalla no trobada' });
    }

    bacallaData.splice(index, 1);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error eliminant la varietat de bacalla' });
  }
}

module.exports = {
  listBacalla,
  getBacallaById,
  createBacalla,
  updateBacalla,
  deleteBacalla
};
