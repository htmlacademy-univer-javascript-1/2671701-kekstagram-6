const showSuccess = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  const successElement = template.querySelector('.success');
  document.body.append(successElement);

  const close = () => successElement.remove();

  successElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner') || evt.target.closest('.success__button')) {
      close();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      close();
    }
  });
};

const showSubmitError = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  const errorElement = template.querySelector('.error');
  document.body.append(errorElement);

  const close = () => errorElement.remove();

  errorElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner') || evt.target.closest('.error__button')) {
      close();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      close();
    }
  });
};

export { showSuccess, showSubmitError };
