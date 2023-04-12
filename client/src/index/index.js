import '../scss/styles.scss';
import { createTable, createNewAlbumButton, createHeader } from './utils.js';

const url = 'http://localhost:8080/api';

async function start() {
  createHeader();
  createNewAlbumButton();
  createTable();
}

async function getAlbumsByTitle(title) {
  let response = await fetch(`${url}/albums/${title}`);
  let albums = await response.json();
  return albums;
}

async function createNewAlbum(title, artist, year, genre, tracks) {
  let response = await fetch(`${url}/albums/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      artist: artist,
      year: year,
      genre: genre,
      tracks: tracks,
    }),
  });
  let album = await response.json();
  return album;
}

start();
