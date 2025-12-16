const MAX_HASHTAGS = 5;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_LENGTH = 140;

const validate = (imageUploadForm) => {
  if (!imageUploadForm) {
    return null;
  }

  const hashtagFieldElement = imageUploadForm.querySelector('.text__hashtags');
  const commentFieldElement = imageUploadForm.querySelector('.text__description');

  const pristine = new Pristine(imageUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  const splitHashtags = (value) => {
    const trimmed = value.trim();
    if (trimmed === '') {
      return [];
    }
    return trimmed.split(/\s+/);
  };

  const isValidHashtags = (value) =>
    splitHashtags(value).every((tag) => HASHTAG_REGEXP.test(tag));

  const isValidCount = (value) =>
    splitHashtags(value).length <= MAX_HASHTAGS;

  const isUniqueHashtags = (value) => {
    const tags = splitHashtags(value).map((tag) => tag.toLowerCase());
    return new Set(tags).size === tags.length;
  };

  const isValidComment = (value) => value.length <= MAX_LENGTH;

  pristine.addValidator(
    hashtagFieldElement,
    isValidHashtags,
    'Хэш-тег введён неверно'
  );

  pristine.addValidator(
    hashtagFieldElement,
    isValidCount,
    `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`
  );

  pristine.addValidator(
    hashtagFieldElement,
    isUniqueHashtags,
    'Хэш-теги повторяются'
  );

  pristine.addValidator(
    commentFieldElement,
    isValidComment,
    'Максимум 140 символов'
  );

  return pristine;
};

export { validate };
