const MASSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Миша',
  'Андрей',
  'Дима',
  'Оля',
  'Света',
  'Катя',
  'Иван',
  'Сергей',
  'Алексей',
  'Никита',
  'Егор',
  'Кирилл',
  'Анна',
  'Мария',
  'Елена',
  'Татьяна',
  'Полина',
  'Ксения',
  'Юлия',
  'Наташа'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createRandomIdMsg = createRandomIdFromRangeGenerator(1, 1000);
const createRandomId = createRandomIdFromRangeGenerator(1, 5);
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
  description: 'Описание',
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, getComments),
});

export { getImageDescription };
