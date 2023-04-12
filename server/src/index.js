const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase, getDb } = require('./database');
const cors = require('cors');
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');
dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.redirect('/api/albums');
});

app.get('/api/albums', async (_, res) => {
  const db = getDb();
  const albums = await db.collection('albums').find().toArray();
  res.json(albums);
});

app.get('/api/albums/:title', async (req, res) => {
  try {
    const db = getDb();
    const album = await db
      .collection('albums')
      .findOne({ title: req.params.title });
    if (!album) {
      res.status(404).json({ message: 'Album not found' });
    } else {
      res.json(album);
    }
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ message: 'Error fetching album' });
  }
});

app.post('/api/albums', async (req, res) => {
  try {
    const db = getDb();
    const album = req.body;
    if (db.collection('albums').findOne({ title: album.title })) {
      res.status(409).json({ message: 'Album already exists' });
    } else {
      const result = await db.collection('albums').insertOne(album);
      res.status(201).json(result);
    }
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: 'Error fetching albums' });
  }
});

app.put('/api/albums/:id', async (req, res) => {
  try {
    const db = getDb();
    if (
      await db
        .collection('albums')
        .findOne({ _id: new ObjectId(req.params.id) })
    ) {
      const album = req.body;
      await db
        .collection('albums')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: album });
      console.log('Album updated successfully');
    } else {
      console.error('Album not found');
      res.status(404).json({ message: 'Album not found' });
    }
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: 'Error updating album' });
  }
});

app.delete('/api/albums/:id', async (req, res) => {
  try {
    const db = getDb();
    if (
      await db
        .collection('albums')
        .findOne({ _id: new ObjectId(req.params.id) })
    ) {
      await db
        .collection('albums')
        .deleteOne({ _id: new ObjectId(req.params.id) });
    } else {
      res.status(404).json({ message: 'Album not found' });
    }
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: 'Error deleting album' });
  }
});

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Example app listening at http://localhost:${port}`);
});
