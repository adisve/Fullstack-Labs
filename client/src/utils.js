const url = 'http://localhost:8080/api';

export function createHeader() {
  const root = document.querySelector('#root');
  const header = document.createElement('h1');
  header.innerHTML = 'Albums';
  header.id = 'header';
  root.appendChild(header);
}

export function createTable() {
  const root = document.querySelector('#root');
  getAllAlbums().then((albums) => {
    const tableHead = `
            <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th> 
                  <th>Year</th>
                  <th>Genre</th>
                  <th>Edit</th>
                </tr>
            </thead>
        `;
    const tableRows = albums.map((album, index) => {
      return `
            <tr id='album-${index}' data-album-id='${album._id}'>
                <td contentEditable>${album.title}</td>
                <td contentEditable>${album.artist}</td>
                <td contentEditable>${album.year}</td>
                <td contentEditable>${album.genre}</td>
                <td style="line-height: 50px; text-align: center;">
                  <button class='button' id='show-details-${index}'>Details</button>
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

    // add event listeners to the update buttons
    const updateButtons = document.querySelectorAll('.button-update');
    const deleteButtons = document.querySelectorAll('.button-delete');
    deleteButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        console.log(`Pressed delete button for album ${index}`);
        deleteAlbum(index);
      });
    });
    updateButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        console.log(`Pressed update button for album ${index}`);
        updateAlbum(index);
      });
    });
  });
}

export async function getAllAlbums() {
  let response = await fetch(`${url}/albums/`);
  let albums = await response.json();
  return albums;
}

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
        </table>
    `;
  createAlbumTable.innerHTML = content;
  root.appendChild(createAlbumTable);
  document.querySelector('#create-album').addEventListener('click', () => {
    console.log('Pressed create album button');
    let title = document
      .querySelector('#create-album-table td:nth-child(1)')
      .textContent.trim();
    let artist = document
      .querySelector('#create-album-table td:nth-child(2)')
      .textContent.trim();
    let year = document
      .querySelector('#create-album-table td:nth-child(3)')
      .textContent.trim();
    let genre = document
      .querySelector('#create-album-table td:nth-child(4)')
      .textContent.trim();
    let tracks = document
      .querySelector('#create-album-table td:nth-child(5)')
      .textContent.trim();
    createAlbum(title, artist, year, genre, tracks.split());
  });
}

async function createAlbum(title, artist, year, genre, tracks) {
  await fetch(`${url}/albums/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, artist, year, genre, tracks }),
  });

  // Clear content in create-album-table
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
  createTable();
}

async function deleteAlbum(id) {
  const tableRow = document.querySelector(`#album-${id}`);
  const albumId = tableRow.dataset.albumId;
  await fetch(`${url}/albums/${albumId}`, {
    method: 'DELETE',
  });
  document.querySelector('#album-table').remove();
  createTable();
}

export async function updateAlbum(index) {
  const tableRow = document.querySelector(`#album-${index}`);
  const id = tableRow.dataset.albumId;
  const title = tableRow.querySelector('td:nth-child(1)').textContent.trim();
  const artist = tableRow.querySelector('td:nth-child(2)').textContent.trim();
  const year = tableRow.querySelector('td:nth-child(3)').textContent.trim();
  const genre = tableRow.querySelector('td:nth-child(4)').textContent.trim();

  await fetch(`${url}/albums/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, artist, year, genre }),
  });
}
