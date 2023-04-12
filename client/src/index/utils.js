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
          <td style='line-height: 50px; text-align: center;'>
            <button class='button' id='show-details-${index}'>Details</button>
            <button class='button-update' id='update-${index}'>Update</button>
            <button class='button-delete' id='delete-${index}'>Delete</button>
          </td>
        </tr>
      `;
    });
    const content = `
      <table id='album-table' class='styled-table'>
        ${tableHead}
        <tbody>
          ${tableRows.join('')}
        </tbody>
      </table>
    `;
    const table = document.createElement('div');
    table.innerHTML = content;
    root.appendChild(table);

    const updateButtons = document.querySelectorAll('.button-update');
    const deleteButtons = document.querySelectorAll('.button-delete');
    updateButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        updateAlbum(index);
      });
    });
    deleteButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        deleteAlbum(index);
      });
    });
  });
}

export function createNewAlbumButton() {
  const root = document.querySelector('#root');
  const createAlbumButton = document.createElement('button');
  createAlbumButton.innerHTML = 'Create Album';
  createAlbumButton.id = 'create-album-button';
  createAlbumButton.className = 'button';
  root.appendChild(createAlbumButton);
}

export async function getAllAlbums() {
  try {
    const response = await fetch(`${url}/albums/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function updateAlbum(index) {
  const tableRow = document.querySelector(`#album-${index}`);
  const id = tableRow.dataset.albumId;
  const title = tableRow.querySelector('td:nth-child(1)').textContent.trim();
  const artist = tableRow.querySelector('td:nth-child(2)').textContent.trim();
  const year = tableRow.querySelector('td:nth-child(3)').textContent.trim();
  const genre = tableRow.querySelector('td:nth-child(4)').textContent.trim();

  fetch(`${url}/albums/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, artist, year, genre }),
  })
    .then((response) => {
      console.log(`Updated album: ${response}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteAlbum(index) {
  const tableRow = document.querySelector(`#album-${index}`);
  const id = tableRow.dataset.albumId;
  fetch(`${url}/albums/${id}`, {
    method: 'DELETE',
  })
    .then((_) => {
      tableRow.remove();
      createTable(albums);
    })
    .catch((error) => {
      console.error(error);
    });
}
