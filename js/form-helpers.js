function resetScale() {
  const scaleControl = document.querySelector('.scale__control--value');
  const imagePreview = document.querySelector('.img-upload__preview img');

  if (scaleControl) {
    scaleControl.value = '100%';
  }
  if (imagePreview) {
    imagePreview.style.transform = 'scale(1)';
  }
}

function resetEffects() {
  const effectRadios = document.querySelectorAll('.effects__radio');
  const imagePreview = document.querySelector('.img-upload__preview img');
  const effectLevel = document.querySelector('.effect-level');

  if (imagePreview) {
    imagePreview.className = '';
    imagePreview.style.filter = '';
  }
  if (effectLevel) {
    effectLevel.classList.add('hidden');
  }

  effectRadios.forEach((input) => {
    if (input.value === 'none') {
      input.checked = true;
    }
  });
}

export { resetScale, resetEffects };
