const showLoadError = (message) => {
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
};

export { showLoadError };
