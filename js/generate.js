import { createRandomIdFromRangeGenerator, getRandomInteger } from './utils.js';
import { MASSAGE, NAMES, DISCRIPTION } from './const.js';

const createRandomIdMsg = createRandomIdFromRangeGenerator(1, 1000);
const createRandomId = createRandomIdFromRangeGenerator(1, 25);
const createRandomUrl = createRandomIdFromRangeGenerator(1, 25);

const getComments = () => {
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  const randomeMassageIndex = getRandomInteger(0, MASSAGE.length -1);

  return {
    id: createRandomIdMsg(),
    avatar: `mg/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MASSAGE[randomeMassageIndex],
    name: NAMES[randomNameIndex],
  };
};

const getImageDescription = () => ({
  id: createRandomId(),
  url: `photos/${createRandomUrl()}.jpg`,
  description: DISCRIPTION[getRandomInteger(0, DISCRIPTION.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, getComments)
});

const createPhotos = (count) =>
  Array.from({ length: count }, getImageDescription);

export { createPhotos };
