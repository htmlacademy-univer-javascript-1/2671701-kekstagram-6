import { debounce } from './utils.js';

const FILTER_RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const picturesContainerElement = document.querySelector('.pictures');

const clearPictures = () => {
  picturesContainerElement.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const setActiveButton = (buttonId) => {
  filtersFormElement.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  filtersFormElement.querySelector(`#${buttonId}`).classList.add('img-filters__button--active');
};

const getRandomUnique = (photos, count) => {
  const copy = photos.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
};

const getDiscussed = (photos) =>
  photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const getFilters = (photos, renderPictures) => {
  filtersContainerElement.classList.remove('img-filters--inactive');

  const renderWithClear = (list) => {
    clearPictures();
    renderPictures(list);
  };

  const debouncedRender = debounce(renderWithClear, RERENDER_DELAY);

  filtersFormElement.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }

    setActiveButton(button.id);

    if (button.id === 'filter-default') {
      debouncedRender(photos);
      return;
    }

    if (button.id === 'filter-random') {
      debouncedRender(getRandomUnique(photos, FILTER_RANDOM_COUNT));
      return;
    }

    if (button.id === 'filter-discussed') {
      debouncedRender(getDiscussed(photos));
    }
  });
};

export { getFilters };
