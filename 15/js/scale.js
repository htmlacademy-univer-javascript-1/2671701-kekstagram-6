const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

function applyScale() {
  scaleValueField.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

function onSmallerClick() {
  if (currentScale > MIN_SCALE) {
    currentScale -= STEP;
    applyScale();
  }
}

function onBiggerClick() {
  if (currentScale < MAX_SCALE) {
    currentScale += STEP;
    applyScale();
  }
}

function initScale() {
  applyScale();
  smallerButton.addEventListener('click', onSmallerClick);
  biggerButton.addEventListener('click', onBiggerClick);
}

function resetScale() {
  currentScale = MAX_SCALE;
  applyScale();
}

export { initScale, resetScale };
