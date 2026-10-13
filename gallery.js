const gallery = document.querySelector('#gallery');
const grid = document.querySelector('.gallery-grid');

for (const photo of photos) {
  const figure = document.createElement('figure');
  const link = document.createElement('a');
  const image = document.createElement('img');
  const caption = document.createElement('figcaption');

  link.href = photo.src;
  image.src = photo.src;
  image.alt = photo.alt;
  image.loading = 'lazy';
  caption.textContent = photo.caption;

  link.append(image);
  figure.append(link, caption);
  grid.append(figure);
}

gallery.hidden = photos.length === 0;
