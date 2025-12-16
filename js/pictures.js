import { openBigPicture } from './full-size.js';

export const renderPictures = (photos) => {
  const picturetemplateelement = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  const picturescontainerelement = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, description, likes, comments } = photo;

    const pictureElement = picturetemplateelement.cloneNode(true);

    const pictureImageElement = pictureElement.querySelector('.picture__img');
    pictureImageElement.src = url;
    pictureImageElement.alt = description;

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturescontainerelement.appendChild(fragment);
};
