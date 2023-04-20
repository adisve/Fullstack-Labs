import './styles.scss';
import { createTable, createHeader, createNewAlbumTable } from './utils.js';

const url = 'http://localhost:8080/api';

/**
 * Initial function loading header and two tables,
 * one for all albums and one for creating a new album
 */
async function start() {
  createHeader();
  createNewAlbumTable();
  createTable();
}

/**
 *
 * @param {string} title
 * @returns Album object
 */
async function getAlbumsByTitle(title) {
  let response = await fetch(`${url}/albums/${title}`);
  let albums = await response.json();
  return albums;
}

/**
 * Creates a new album given the parameters,
 * builds the object and sends it to the server
 * @param {string} title
 * @param {string} artist
 * @param {string} year
 * @param {string} genre
 * @param {string} tracks
 * @returns
 */
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
