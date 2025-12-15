const SHOW_ERROR_TIME = 10;
const DEFAULT_DEBOUNCE_DELAY = 500;

const showLoadError = (message) => {
  const old = document.querySelector('.load-error');
  if (old) {
    old.remove();
  }

  const errorBlock = document.createElement('div');
  errorBlock.classList.add('load-error');
  errorBlock.textContent = message;
  errorBlock.style.cssText = `
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff6b6b;
    color: white;
    padding: 12px 20px;
    font-size: 18px;
    z-index: 1000;
  `;

  document.body.append(errorBlock);

  setTimeout(() => errorBlock.remove(), SHOW_ERROR_TIME);
};

const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

export { showLoadError, debounce };
