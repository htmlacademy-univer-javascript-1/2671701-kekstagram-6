import { renderPictures } from './pictures.js';
import { initImageUpload } from './upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { validate } from './validate.js';
import { showLoadError } from './utils.js';
import { getPhotos } from './api.js';
import { getFilters } from './filters.js';

function init() {
  getPhotos()
    .then((photos) => {
      renderPictures(photos);
      getFilters(photos, renderPictures);
    })
    .catch((error) => {
      showLoadError(`Не удалось загрузить данные: ${error.message}`);
    });


  initImageUpload();
  initScale();
  initEffects();
  validate();
  showLoadError();
}

init();
