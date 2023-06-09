const express = require('express');
const path = require('path');
const { ObjectId } = require('mongodb');
const { connectToDatabase, getDb } = require('./database');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '/etc/secrets/config.env' });

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'), _, _);
});

/**
 * Get all the albums stored in MongoDB
 */
app.get('/api/albums', async (_, res) => {
  const db = getDb();
  const albums = await db.collection('albums').find().toArray();
  res.json(albums);
});

/**
 * Get an album by title
 */
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

/**
 * Create a new album
 */
app.post('/api/albums', async (req, res) => {
  try {
    const db = getDb();
    const album = req.body;
    const albumExists = await db
      .collection('albums')
      .findOne({ title: album.title });
    if (albumExists) {
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

/**
 * Update an album by id
 */
app.put('/api/albums/:id', async (req, res) => {
  try {
    const db = getDb();
    const albumExists = await db
      .collection('albums')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!albumExists) {
      res.status(404).json({ message: 'Album not found' });
      return;
    } else {
      const album = req.body;
      await db
        .collection('albums')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: album });
      res.status(201).json({ message: 'Album updated successfully' });
    }
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: 'Error updating album' });
  }
});

/**
 * Delete an album by id
 */
app.delete('/api/albums/:id', async (req, res) => {
  try {
    const db = getDb();
    const albumExists = await db
      .collection('albums')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!albumExists) {
      res.status(404).json({ message: 'Album not found' });
      return;
    } else {
      await db
        .collection('albums')
        .deleteOne({ _id: new ObjectId(req.params.id) });
      res.status(201).json({ message: 'Album deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: 'Error deleting album' });
  }
});

/**
 * Start the server
 */
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`App available at https://fullstack-lab-2-rksf.onrender.com`);
});
