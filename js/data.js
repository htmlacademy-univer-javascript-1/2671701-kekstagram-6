import {createRandomIdFromRangeGenerator, getRandomInteger} from '/js/util.js';

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

const DISCRIPTION = [
  'Тихий рассвет над озером, лёгкий туман.',
  'Уличное кафе в солнечный день.',
  'Кошка спит на подоконнике.',
  'Горная тропа среди хвойного леса.',
  'Ночной город с огнями и отражениями в реке.',
  'Дерево в поле под грозовым небом.',
  'Чашка кофе рядом с раскрытой книгой.',
  'Песчаный пляж и следы на мокром берегу.',
  'Старый велосипед у кирпичной стены.',
  'Смеющийся ребёнок с воздушным змеем.'
]

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

const getImageDescription = () => {
  return {
    id: createRandomId(),
    url: `photos/${createRandomUrl()}.jpg`,
    description: DISCRIPTION[getRandomInteger(0, DISCRIPTION.length -1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, getComments),
  };
};

export {getImageDescription};
