const DEFAULT_DEBOUNCE_DELAY = 500;
const DATA_ERROR_CLASS = 'data-error';
const DATA_ERROR_TEXT = 'Не удалось загрузить данные. Попробуйте обновить страницу.';

const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

const showDataError = () => {
  if (document.querySelector(`.${DATA_ERROR_CLASS}`)) {
    return;
  }

  const errorElement = document.createElement('div');
  errorElement.classList.add(DATA_ERROR_CLASS);
  errorElement.textContent = DATA_ERROR_TEXT;
  document.body.append(errorElement);
};

export { showDataError, debounce };
