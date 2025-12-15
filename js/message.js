const ESC_KEY = 'Escape';

let isOpen = false;

const isMessageOpen = () => isOpen;

const showMessage = (templateId, rootClass, innerClass, buttonClass) => {
  const messageTemplateFragment = document
    .querySelector(templateId)
    .content
    .cloneNode(true);

  const messageElement = messageTemplateFragment.querySelector(`.${rootClass}`);
  document.body.append(messageElement);
  isOpen = true;

  const closeMessage = () => {
    document.removeEventListener('keydown', onDocumentKeydown, true);
    messageElement.remove();
    isOpen = false;
  };

  function onDocumentKeydown (evt) {
    if (evt.key === ESC_KEY) {
      // ✅ не даём событию дойти до обработчика Esc формы
      evt.preventDefault();
      evt.stopImmediatePropagation();
      closeMessage();
    }
  }

  const onMessageElementClick = (evt) => {
    const isClickOutsideInner = !evt.target.closest(`.${innerClass}`);
    const isClickOnButton = Boolean(evt.target.closest(`.${buttonClass}`));

    if (isClickOutsideInner || isClickOnButton) {
      closeMessage();
    }
  };

  messageElement.addEventListener('click', onMessageElementClick);
  // ✅ capture:true чтобы сработать раньше обработчика формы
  document.addEventListener('keydown', onDocumentKeydown, true);
};

const showSuccess = () => {
  showMessage('#success', 'success', 'success__inner', 'success__button');
};

const showSubmitError = () => {
  showMessage('#error', 'error', 'error__inner', 'error__button');
};

export { showSuccess, showSubmitError, isMessageOpen };
