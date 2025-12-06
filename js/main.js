import { createPhotos } from './generate.js';
import { renderPictures } from './pictures.js';
import { initImageUpload } from './upload-form.js';


initImageUpload();
function init() {
  const photos = createPhotos(25);
  renderPictures(photos);
}

init();
