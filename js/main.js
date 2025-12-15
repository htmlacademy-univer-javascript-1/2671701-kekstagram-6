import { renderPictures } from './pictures.js';
import { initImageUpload } from './upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { validate } from './validate.js';
import { showLoadError } from './utils.js';
import { getPhotos } from './api.js';

function init() {
  getPhotos()
    .then((photos) => {
      renderPictures(photos);
    })
    .catch((error) => {
      showLoadError(`Ошибка загрузки данных: ${error.message}`);
    });

  initImageUpload();
  initScale();
  initEffects();
  validate();
  showLoadError();
}

init();
