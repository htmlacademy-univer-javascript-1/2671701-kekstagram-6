function validate(imageUploadForm) {
  const hashtagField = imageUploadForm.querySelector('.text__hashtags');
  const commentField = imageUploadForm.querySelector('.text__description');

  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;
  const MAX_HASHTAGS = 5;

  const pristine = new Pristine(imageUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  // ---------- Проверка хэштегов ----------
  function validateHashtags(hashtagsString) {
    if (hashtagsString.trim() === '') {
      return true; // пусто — значит ок
    }

    const hashtags = hashtagsString
      .trim()
      .split(/\s+/)
      .filter((hashtag) => hashtag !== '');

    // Количество
    if (hashtags.length > MAX_HASHTAGS) {
      return false;
    }

    const seenHashtags = new Set();

    for (const hashtag of hashtags) {
      // Проверка формата
      if (!hashtagReg.test(hashtag)) {
        return false;
      }

      const lowerHashtag = hashtag.toLowerCase();

      // Проверка дубликатов
      if (seenHashtags.has(lowerHashtag)) {
        return false;
      }

      seenHashtags.add(lowerHashtag);
    }

    return true;
  }

  // ---------- Проверка комментария ----------
  function validateComment(commentString) {
    return commentString.length <= 140;
  }

  // Регистрируем валидаторы
  pristine.addValidator(
    hashtagField,
    validateHashtags,
    'Некорректные хэштеги'
  );

  pristine.addValidator(
    commentField,
    validateComment,
    'Максимум 140 символов'
  );

  return pristine;
}

export { validate };
