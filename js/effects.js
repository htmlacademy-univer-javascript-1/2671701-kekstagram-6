const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.effects');
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelWrapper = document.querySelector('.img-upload__effect-level');

const EFFECTS = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    apply: () => ''
  },
  chrome: {
    min: 0, max: 1, step: 0.1, unit: '',
    apply: (v) => `grayscale(${v})`
  },
  sepia: {
    min: 0, max: 1, step: 0.1, unit: '',
    apply: (v) => `sepia(${v})`
  },
  marvin: {
    min: 0, max: 100, step: 1, unit: '%',
    apply: (v) => `invert(${v}%)`
  },
  phobos: {
    min: 0, max: 3, step: 0.1, unit: 'px',
    apply: (v) => `blur(${v}px)`
  },
  heat: {
    min: 1, max: 3, step: 0.1, unit: '',
    apply: (v) => `brightness(${v})`
  }
};

let currentEffect = 'none';

function updateSlider(effect) {
  const { min, max, step } = EFFECTS[effect];

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step
  });

  effectLevelValue.value = max;
}

function applyEffect(value) {
  const effect = EFFECTS[currentEffect];
  previewImage.style.filter = effect.apply(value);
}

function initEffects() {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  effectLevelSlider.noUiSlider.on('update', (values) => {
    const value = values[0];
    effectLevelValue.value = value;

    if (currentEffect === 'none') {
      previewImage.style.filter = '';
      return;
    }

    applyEffect(value);
  });

  effectsContainer.addEventListener('change', (evt) => {
    if (!evt.target.classList.contains('effects__radio')) {
      return;
    }

    currentEffect = evt.target.value;

    if (currentEffect === 'none') {
      effectLevelWrapper.classList.add('hidden');
      previewImage.style.filter = '';
    } else {
      effectLevelWrapper.classList.remove('hidden');
      updateSlider(currentEffect);
    }
  });

  effectLevelWrapper.classList.add('hidden');
}

function resetEffects() {
  currentEffect = 'none';
  effectLevelWrapper.classList.add('hidden');
  previewImage.style.filter = '';
  effectLevelValue.value = 100;
  effectLevelSlider.noUiSlider.set(100);
}

export { initEffects, resetEffects };
