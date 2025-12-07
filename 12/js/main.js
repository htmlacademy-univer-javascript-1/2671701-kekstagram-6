import { createPhotos } from './generate.js';
import { renderPictures } from './pictures.js';
import { initImageUpload } from './upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { validate } from './validate.js';

function init() {
  const photos = createPhotos(25);
  renderPictures(photos);

  initImageUpload();
  initScale();
  initEffects();
  validate();
}

init();
