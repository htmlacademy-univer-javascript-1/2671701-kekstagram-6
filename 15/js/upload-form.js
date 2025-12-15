import { validate } from './validate.js';
import { sendFormData } from './api.js';
import { showSuccess, showSubmitError } from './message.js';
import { resetScale, resetEffects } from './form-helpers.js';

const uploadImage = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  const imageUploadOverlay = document.querySelector('.img-upload__overlay');
  const closeButton = document.querySelector('#upload-cancel');
  const imageUploadForm = document.querySelector('.img-upload__form');
  const submitButton = imageUploadForm.querySelector('#upload-submit');
  const hashtagField = imageUploadForm.querySelector('.text__hashtags');
  const commentField = imageUploadForm.querySelector('.text__description');
  const previewImage = imageUploadForm.querySelector('.img-upload__preview img');
  const effectsPreviews = imageUploadForm.querySelectorAll('.effects__preview');

  const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

  let pristine;

  function closePhoto() {
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyDown);

    uploadInput.value = '';
    previewImage.src = 'img/upload-default-image.jpg';

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = '';
    });

    imageUploadForm.reset();
    resetScale();
    resetEffects();
  }

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape') {
      const active = document.activeElement;

      if (active === hashtagField || active === commentField) {
        evt.preventDefault();
        return;
      }

      evt.preventDefault();
      closePhoto();
    }
  }

  function updateSubmitButton() {
    const isValid = pristine.validate();
    submitButton.disabled = !isValid;
  }

  imageUploadOverlay.addEventListener('click', (evt) => {
    if (evt.target === imageUploadOverlay) {
      closePhoto();
    }
  });

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (!matches) {
      uploadInput.value = '';
      showSubmitError();
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    previewImage.src = imageUrl;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });

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

export { uploadImage };
