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

  function validateHashtags(hashtagsString) {
    if (hashtagsString.trim() === '') {
      return true;
    }

    const hashtags = hashtagsString
      .trim()
      .split(/\s+/)
      .filter((hashtag) => hashtag !== '');

    if (hashtags.length > MAX_HASHTAGS) {
      return false;
    }

    const seenHashtags = new Set();

    for (const hashtag of hashtags) {
      if (!hashtagReg.test(hashtag)) {
        return false;
      }

      const lowerHashtag = hashtag.toLowerCase();

      if (seenHashtags.has(lowerHashtag)) {
        return false;
      }

      seenHashtags.add(lowerHashtag);
    }

    return true;
  }

  function validateComment(commentString) {
    return commentString.length <= 140;
  }

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
