const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;
const PERCENT_DIVIDER = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueFieldElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const applyScale = () => {
  scaleValueFieldElement.value = `${currentScale}%`;
  previewImageElement.style.transform = `scale(${currentScale / PERCENT_DIVIDER})`;
};

const onSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= STEP;
    applyScale();
  }
};

const onBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += STEP;
    applyScale();
  }
};

const initScale = () => {
  applyScale();
  smallerButtonElement.addEventListener('click', onSmallerClick);
  biggerButtonElement.addEventListener('click', onBiggerClick);
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  applyScale();
};

export { initScale, resetScale };
