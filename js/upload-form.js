import { validate } from './validate.js';
import { sendFormData } from './api.js';
import { showSuccess, showSubmitError } from './message.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const HIDDEN_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';
const ESC_KEY = 'Escape';
const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';
const SUBMITTING_TEXT = 'Отправка...';
const SUBMIT_TEXT = 'Опубликовать';

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const uploadImage = () => {
  const uploadInputElement = document.querySelector('.img-upload__input');
  const imageUploadOverlayElement = document.querySelector('.img-upload__overlay');
  const closeButtonElement = document.querySelector('#upload-cancel');
  const imageUploadFormElement = document.querySelector('.img-upload__form');
  const submitButtonElement = imageUploadFormElement.querySelector('#upload-submit');
  const hashtagFieldElement = imageUploadFormElement.querySelector('.text__hashtags');
  const commentFieldElement = imageUploadFormElement.querySelector('.text__description');
  const previewImageElement = imageUploadFormElement.querySelector('.img-upload__preview img');
  const effectsPreviewElements = imageUploadFormElement.querySelectorAll('.effects__preview');

  let pristine = null;
  let previewObjectUrl = null;

  const revokePreviewUrl = () => {
    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = null;
    }
  };

  const updateSubmitButton = () => {
    const isValid = pristine.validate(true);
    submitButtonElement.disabled = !isValid;
  };

  const closePhoto = () => {
    imageUploadOverlayElement.classList.add(HIDDEN_CLASS);
    imageUploadFormElement.querySelectorAll('.pristine-error').forEach((errorElement) => {
      errorElement.remove();
    });

    document.body.classList.remove(MODAL_OPEN_CLASS);
    document.removeEventListener('keydown', onDocumentKeydown);

    uploadInputElement.value = '';
    previewImageElement.src = DEFAULT_PREVIEW_SRC;

    effectsPreviewElements.forEach((previewElement) => {
      previewElement.style.backgroundImage = '';
    });

    imageUploadFormElement.reset();
    resetScale();
    resetEffects();

    revokePreviewUrl();
  };

  const openPhoto = () => {
    imageUploadOverlayElement.classList.remove(HIDDEN_CLASS);
    document.body.classList.add(MODAL_OPEN_CLASS);

    if (!pristine) {
      pristine = validate(imageUploadFormElement);
      hashtagFieldElement.addEventListener('input', updateSubmitButton);
      commentFieldElement.addEventListener('input', updateSubmitButton);
    }

    updateSubmitButton();
    document.addEventListener('keydown', onDocumentKeydown);
  };

  const setPreview = (file) => {
    revokePreviewUrl();
    previewObjectUrl = URL.createObjectURL(file);

    previewImageElement.src = previewObjectUrl;
    effectsPreviewElements.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url(${previewObjectUrl})`;
    });
  };

  function onDocumentKeydown (evt){
    if (evt.key !== ESC_KEY) {
      return;
    }

    const activeElement = document.activeElement;
    if (activeElement === hashtagFieldElement || activeElement === commentFieldElement) {
      evt.preventDefault();
      return;
    }

    evt.preventDefault();
    closePhoto();
  }

  const onOverlayClick = (evt) => {
    if (evt.target === imageUploadOverlayElement) {
      closePhoto();
    }
  };

  const onUploadInputChange = () => {
    const file = uploadInputElement.files[0];
    if (!file) {
      return;
    }

    if (!isValidFileType(file)) {
      uploadInputElement.value = '';
      showSubmitError();
      return;
    }

    setPreview(file);
    openPhoto();
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (pristine && !pristine.validate()) {
      pristine.validate(true);
      return;
    }

    const formData = new FormData(imageUploadFormElement);
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = SUBMITTING_TEXT;

    sendFormData(formData)
      .then(() => {
        showSuccess();
        closePhoto();
      })
      .catch(() => {
        showSubmitError();
      })
      .finally(() => {
        submitButtonElement.disabled = false;
        submitButtonElement.textContent = SUBMIT_TEXT;
        updateSubmitButton();
      });
  };

  imageUploadOverlayElement.addEventListener('click', onOverlayClick);
  uploadInputElement.addEventListener('change', onUploadInputChange);
  imageUploadFormElement.addEventListener('submit', onFormSubmit);
  closeButtonElement.addEventListener('click', closePhoto);
};

export { uploadImage };
