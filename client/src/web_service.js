const url = 'http://localhost:8080/api';

/**
 * Retrieves all albums from MongoDB
 * @returns Array of all albums
 */
export async function getAllAlbums() {
  let response = await fetch(`${url}/albums/`);
  let albums = await response.json();
  return albums;
}

/**
 * Creates an album based on object data
 * @param {string} title
 * @param {string} artist
 * @param {string} year
 * @param {string} genre
 * @param {Array} tracks
 */
export async function createAlbum(
  title,
  artist,
  year,
  genre,
  tracks,
  callback
) {
  await fetch(`${url}/albums/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, artist, year, genre, tracks }),
  });
  callback();
}

/**
 * Deletes an album based on id
 * @param {string} id
 */
export async function deleteAlbum(id, callback) {
  const tableRow = document.querySelector(`#album-${id}`);
  const albumId = tableRow.dataset.albumId;
  await fetch(`${url}/albums/${albumId}`, {
    method: 'DELETE',
  });
  callback();
}

/**
 * Updates an album based on id
 * @param {int} index
 */
export async function updateAlbum(index) {
  const tableRow = document.querySelector(`#album-${index}`);
  const id = tableRow.dataset.albumId;
  const title = tableRow.querySelector('td:nth-child(1)').textContent.trim();
  const artist = tableRow.querySelector('td:nth-child(2)').textContent.trim();
  const year = tableRow.querySelector('td:nth-child(3)').textContent.trim();
  const genre = tableRow.querySelector('td:nth-child(4)').textContent.trim();
  const tracks = tableRow.querySelector('td:nth-child(5)').textContent.trim();

  await fetch(`${url}/albums/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, artist, year, genre, tracks }),
  });
}
