import { validate } from './validate.js';
import { sendFormData } from './api.js';
import { showSuccess, showSubmitError } from './message.js';
import { resetScale, resetEffects } from './form-helpers.js';

const initImageUpload = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  const imageUploadOverlay = document.querySelector('.img-upload__overlay');
  const closeButton = document.querySelector('#upload-cancel');
  const imageUploadForm = document.querySelector('.img-upload__form');
  const submitButton = imageUploadForm.querySelector('#upload-submit');
  const hashtagField = imageUploadForm.querySelector('.text__hashtags');
  const commentField = imageUploadForm.querySelector('.text__description');

  let pristine;

  function closePhoto() {
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyDown);
    uploadInput.value = '';
    imageUploadForm.reset();
    resetScale();
    resetEffects();
  }

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape') {
      const active = document.activeElement;

      if (active === hashtagField || active === commentField) {
        evt.preventDefault();
      } else {
        evt.preventDefault();
        closePhoto();
      }
    }
  }

  function updateSubmitButton() {
    const isValid = pristine.validate();
    submitButton.disabled = !isValid;
  }

  uploadInput.addEventListener('change', (evt) => {
    evt.preventDefault();

    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    pristine = validate(imageUploadForm);

    updateSubmitButton();

    document.addEventListener('keydown', onEscKeyDown);
    closeButton.addEventListener('click', closePhoto, { once: true });
  });

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine && !pristine.validate()) {
      pristine.validate(true);
      return;
    }

    const formData = new FormData(imageUploadForm);
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    sendFormData(formData)
      .then(() => {
        showSuccess();
        closePhoto();
      })
      .catch(() => {
        showSubmitError();
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      });
  });

  closeButton.addEventListener('click', closePhoto);
};

export { initImageUpload };
