import {
  getAllAlbums,
  deleteAlbum,
  updateAlbum,
  createAlbum,
} from './web_service.js';

/**
 * @fileoverview Utility functions for the client side.
 */

/**
 * Create main html page header and
 * append it to the root element
 */
export function createHeader() {
  const root = document.querySelector('#root');
  const header = document.createElement('h1');
  header.textContent = 'Albums';
  header.id = 'header';
  root.appendChild(header);
}

/**
 * Create a table with all albums retrieved from MongoDB
 */
export async function createTable() {
  const root = document.querySelector('#root');
  const albums = await getAllAlbums();
  const tableHead = `
    <thead>
      <tr>
        <th>Title</th>
        <th class='artist-header' style='display: none;'>Artist</th> 
        <th class='year-header' style='display: none;'>Year</th>
        <th class='genre-header' style='display: none;'>Genre</th>
        <th class='track-header' style='display: none;'>Tracks</th>
        <th>Edit</th>
      </tr>
    </thead>
  `;
  const tableRows = Array.from(albums, (album, index) => {
    return `
      <tr id='album-${index}' data-album-id='${album._id}'>
        <td contentEditable>${album.title}</td>
        <td class='artist' style='display: none;' contentEditable>${album.artist}</td>
        <td class='year' style='display: none;' contentEditable>${album.year}</td>
        <td class='genre' style='display: none;' contentEditable>${album.genre}</td>
        <td class='tracks' style='display: none;' contentEditable>${album.tracks}</td>
        <td style="line-height: 50px; text-align: center;">
          <button class='button show-details-button' id='show-details-${index}'>Show details</button>
          <button class='button-update' id='update-${index}'>Update</button>
          <button class='button-delete' id='delete-${index}'>Delete</button>
        </td>
      </tr>
    `;
  });
  const content = `
    <table id='album-table' class="styled-table">
      ${tableHead}
      <tbody>
        ${tableRows.join('')}
      </tbody>
    </table>
  `;
  const table = document.createElement('div');
  table.innerHTML = content;
  root.appendChild(table);
  addButtonListeners();
}

/**
 * Creates the table for creating a new album
 * @param {string} id
 */
export async function createNewAlbumTable() {
  const root = document.querySelector('#root');
  const createAlbumTable = document.createElement('div');
  createAlbumTable.id = 'create-album-table';
  const content = `
    <table class="styled-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th> 
          <th>Year</th>
          <th>Genre</th>
          <th>Tracks</th>
          <th>Create</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td contentEditable></td>
          <td contentEditable></td>
          <td contentEditable></td>
          <td contentEditable></td>
          <td contentEditable></td>
          <td style="line-height: 50px; text-align: center;">
            <button class='button' id='create-album'>Create album</button>
          </td>
        </tr>
      </tbody>
      `;
  createAlbumTable.innerHTML = content;
  root.appendChild(createAlbumTable);
  addCreateAlbumButtonListener();
}

/**

Adds event listeners to all buttons in album-table
*/
function addButtonListeners() {
  const updateButtons = document.querySelectorAll('.button-update');
  const deleteButtons = document.querySelectorAll('.button-delete');
  const showDetailsButtons = document.querySelectorAll('.show-details-button');
  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log('Pressed delete button for album ${index}');
      deleteAlbum(index, () => {
        // Delete the album-table and create a new one
        const albumTable = document.querySelector('#album-table');
        albumTable.parentNode.removeChild(albumTable);
        createTable();
      });
    });
  });
  updateButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log('Pressed update button for album ${index}');
      updateAlbum(index);
    });
  });
  showDetailsButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tableRow = button.parentNode.parentNode;
      const artistCell = tableRow.querySelector('.artist');
      const yearCell = tableRow.querySelector('.year');
      const genreCell = tableRow.querySelector('.genre');
      const artistHeader = document.querySelector('.artist-header');
      const yearHeader = document.querySelector('.year-header');
      const genreHeader = document.querySelector('.genre-header');
      const tracksHeader = document.querySelector('.track-header');
      const tracksCell = tableRow.querySelector('.tracks');
      if (artistCell.style.display === 'none') {
        artistCell.style.display = 'table-cell';
        yearCell.style.display = 'table-cell';
        genreCell.style.display = 'table-cell';
        tracksCell.style.display = 'table-cell';
        artistHeader.style.display = 'table-cell';
        yearHeader.style.display = 'table-cell';
        genreHeader.style.display = 'table-cell';
        tracksHeader.style.display = 'table-cell';
        button.textContent = 'Hide details';
      } else {
        artistCell.style.display = 'none';
        yearCell.style.display = 'none';
        genreCell.style.display = 'none';
        tracksCell.style.display = 'none';
        artistHeader.style.display = 'none';
        yearHeader.style.display = 'none';
        genreHeader.style.display = 'none';
        tracksHeader.style.display = 'none';
        button.textContent = 'Show details';
      }
    });
  });
}
/**

Adds event listener to 'Create album' button
*/
function addCreateAlbumButtonListener() {
  const createAlbumButton = document.querySelector('#create-album');
  createAlbumButton.addEventListener('click', async () => {
    console.log('Pressed create album button');
    const [title, artist, year, genre, tracks] = Array.from(
      document.querySelectorAll('#create-album-table td'),
      (td) => td.textContent.trim()
    );
    await createAlbum(title, artist, year, genre, tracks.split(', '), () => {
      clearCreateAlbumTable();
      // Delete the album-table and create a new one
      const albumTable = document.querySelector('#album-table');
      albumTable.parentNode.removeChild(albumTable);
      createTable();
    });
  });
}
/**

Clears the table for creating a new album
*/
function clearCreateAlbumTable() {
  document.querySelector('#create-album-table td:nth-child(1)').textContent =
    '';
  document.querySelector('#create-album-table td:nth-child(2)').textContent =
    '';
  document.querySelector('#create-album-table td:nth-child(3)').textContent =
    '';
  document.querySelector('#create-album-table td:nth-child(4)').textContent =
    '';
  document.querySelector('#create-album-table td:nth-child(5)').textContent =
    '';
}
