// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
};

function render(arr) {
  const markup = arr
    .map(
      ({ original, preview, description }) =>
        `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" title="${description}" /></a>`,
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

render(galleryItems);

let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
