const ESC_KEY = 'Escape';

const showMessage = (templateId, rootClass, innerClass, buttonClass) => {
  const messageTemplateFragment = document
    .querySelector(templateId)
    .content
    .cloneNode(true);

  const messageElement = messageTemplateFragment.querySelector(`.${rootClass}`);
  document.body.append(messageElement);

  const onDocumentKeydown = (evt) => {
    if (evt.key === ESC_KEY) {
      closeMessage();
    }
  };

  const onMessageElementClick = (evt) => {
    const isClickOutsideInner = !evt.target.closest(`.${innerClass}`);
    const isClickOnButton = Boolean(evt.target.closest(`.${buttonClass}`));

    if (isClickOutsideInner || isClickOnButton) {
      closeMessage();
    }
  };

  function closeMessage () {
    document.removeEventListener('keydown', onDocumentKeydown);
    messageElement.remove();
  }

  messageElement.addEventListener('click', onMessageElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccess = () => {
  showMessage('#success', 'success', 'success__inner', 'success__button');
};

const showSubmitError = () => {
  showMessage('#error', 'error', 'error__inner', 'error__button');
};

export { showSuccess, showSubmitError };
