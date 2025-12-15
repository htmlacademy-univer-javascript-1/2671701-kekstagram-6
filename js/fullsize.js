const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const imgElement = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');

const commentsCounterBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;

let allComments = [];
let renderedCount = 0;

function createComment({ avatar, name, message }) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  li.append(img, p);
  return li;
}

function renderNextComments() {
  const nextChunk = allComments.slice(renderedCount, renderedCount + COMMENTS_PER_PORTION);

  nextChunk.forEach((comment) => {
    commentsList.append(createComment(comment));
  });

  renderedCount += nextChunk.length;

  updateCounter();

  if (renderedCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function updateCounter() {
  commentsCounterBlock.textContent = `${renderedCount} из ${allComments.length} комментариев`;
}

export function openBigPicture(photo) {
  imgElement.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  allComments = photo.comments;
  renderedCount = 0;

  commentsList.innerHTML = '';

  commentsCounterBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderNextComments();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKey);
}

export function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKey);
}

function onEscKey(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

commentsLoader.addEventListener('click', () => {
  renderNextComments();
});

closeButton.addEventListener('click', closeBigPicture);

bigPicture.addEventListener('click', (evt) => {
  if (!evt.target.closest('.big-picture__preview')) {
    closeBigPicture();
  }
});
