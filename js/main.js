import { renderPictures } from './pictures.js';
import { uploadImage } from './upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { showDataError } from './utils.js';
import { getPhotos } from './api.js';
import { getFilters } from './filters.js';

function init() {
  getPhotos()
    .then((photos) => {
      renderPictures(photos);
      getFilters(photos, renderPictures);
    })
    .catch(() => {
      showDataError();
    });

  uploadImage();
  initScale();
  initEffects();
}

init();
