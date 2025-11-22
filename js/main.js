import { createPhotos } from './generate.js';
import { renderPictures } from './pictures.js';

function init() {
  const photos = createPhotos(25);
  renderPictures(photos);
}

init();
