import './styles.scss';
import { createTable, createHeader, createNewAlbumTable } from './utils.js';

/**
 * Initial function loading header and two tables,
 * one for all albums and one for creating a new album
 */
async function start() {
  createHeader();
  createNewAlbumTable();
  createTable();
}

start();
