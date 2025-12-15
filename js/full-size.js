const COMMENTS_PER_PORTION = 5;
const AVATAR_SIZE = 35;
const MODAL_OPEN_CLASS = 'modal-open';
const ESC_KEY = 'Escape';
const HIDDEN_CLASS = 'hidden';
const PREVIEW_SELECTOR = '.big-picture__preview';
const SHOWN_COUNT_SELECTOR = '.social__comment-shown-count';
const TOTAL_COUNT_SELECTOR = '.social__comment-total-count';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.body;

const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');

const commentsCounterElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let allComments = [];
let renderedCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = AVATAR_SIZE;
  avatarElement.height = AVATAR_SIZE;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);
  return commentElement;
};

const renderCommentChunk = (comments) => {
  comments.forEach((comment) => {
    commentsListElement.append(createCommentElement(comment));
  });
};

const updateCommentsCounter = () => {
  const shownCountElement = commentsCounterElement.querySelector(SHOWN_COUNT_SELECTOR);
  const totalCountElement = commentsCounterElement.querySelector(TOTAL_COUNT_SELECTOR);

  if (shownCountElement && totalCountElement) {
    shownCountElement.textContent = renderedCount;
    totalCountElement.textContent = allComments.length;
    return;
  }

  commentsCounterElement.textContent = `${renderedCount} из ${allComments.length} комментариев`;
};

const updateLoaderVisibility = () => {
  if (renderedCount >= allComments.length) {
    commentsLoaderElement.classList.add(HIDDEN_CLASS);
  } else {
    commentsLoaderElement.classList.remove(HIDDEN_CLASS);
  }
};

const renderNextComments = () => {
  const nextChunk = allComments.slice(renderedCount, renderedCount + COMMENTS_PER_PORTION);
  renderCommentChunk(nextChunk);

  renderedCount += nextChunk.length;

  updateCommentsCounter();
  updateLoaderVisibility();
};

const resetComments = (comments) => {
  allComments = comments;
  renderedCount = 0;

  commentsListElement.innerHTML = '';

  commentsCounterElement.classList.remove(HIDDEN_CLASS);
  commentsLoaderElement.classList.remove(HIDDEN_CLASS);
};

const fillPhotoData = ({ url, likes, comments, description }) => {
  bigPictureImageElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  captionElement.textContent = description;
};

const openModal = () => {
  bigPictureElement.classList.remove(HIDDEN_CLASS);
  bodyElement.classList.add(MODAL_OPEN_CLASS);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  bigPictureElement.classList.add(HIDDEN_CLASS);
  bodyElement.classList.remove(MODAL_OPEN_CLASS);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPicture = (photo) => {
  fillPhotoData(photo);
  resetComments(photo.comments);
  renderNextComments();
  openModal();
};

const closeBigPicture = () => {
  closeModal();
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onBigPictureClick = (evt) => {
  const isClickInsidePreview = evt.target.closest(PREVIEW_SELECTOR);
  if (!isClickInsidePreview) {
    closeBigPicture();
  }
};

function onDocumentKeydown (evt) {
  if (evt.key === ESC_KEY) {
    closeBigPicture();
  }
}

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
closeButtonElement.addEventListener('click', onCloseButtonClick);
bigPictureElement.addEventListener('click', onBigPictureClick);

export { openBigPicture, closeBigPicture };
