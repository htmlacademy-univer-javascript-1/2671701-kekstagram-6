const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectsContainerElement = document.querySelector('.effects');
const previewImageElement = document.querySelector('.img-upload__preview img');
const effectLevelWrapperElement = document.querySelector('.img-upload__effect-level');

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

const updateSlider = (effect) => {
  const { min, max, step } = EFFECTS[effect];

  effectLevelSliderElement.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step
  });

  effectLevelValueElement.value = max;
};

const applyEffect = (value) => {
  const effect = EFFECTS[currentEffect];
  previewImageElement.style.filter = effect.apply(value);
};

const initEffects = () => {
  noUiSlider.create(effectLevelSliderElement, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  effectLevelSliderElement.noUiSlider.on('update', (values) => {
    const value = values[0];
    effectLevelValueElement.value = value;

    if (currentEffect === 'none') {
      previewImageElement.style.filter = '';
      return;
    }

    applyEffect(value);
  });

  effectsContainerElement.addEventListener('change', (evt) => {
    if (!evt.target.classList.contains('effects__radio')) {
      return;
    }

    currentEffect = evt.target.value;

    if (currentEffect === 'none') {
      effectLevelWrapperElement.classList.add('hidden');
      previewImageElement.style.filter = '';
    } else {
      effectLevelWrapperElement.classList.remove('hidden');
      updateSlider(currentEffect);
    }
  });

  effectLevelWrapperElement.classList.add('hidden');
};

const resetEffects = () => {
  currentEffect = 'none';
  effectLevelWrapperElement.classList.add('hidden');
  previewImageElement.style.filter = '';
  effectLevelValueElement.value = 100;
  effectLevelSliderElement.noUiSlider.set(100);
};

export { initEffects, resetEffects };
