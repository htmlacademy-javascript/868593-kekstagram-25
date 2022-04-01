import {getRandomNumber,createArray,shuffle,getDescription,createComment} from './util.js';

const DESCRIPTIONS = [
  'Пляж',
  'Указатель',
  'Море',
  'Девушка',
  'Суп',
  'Суперкар',
  'Клубника',
  'Напиток',
  'Самолет',
  'Обувь',
  'Пляж',
  'Ауди',
  'Овощи',
  'Суши из кота',
  'Ботинки',
  'Небо',
  'Оркестр',
  'Старая Машина',
  'Тапки с подсветкой',
  'Пальмы',
  'Еда',
  'Закат',
  'Краб',
  'Концерт',
  'Сафари'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const FILTERS ={
  'chrome': {
    class: 'effects__preview--chrome',
    filterOptions:{
      range: {
        min: 0,
        max: 1,
      },
      start:1,
      step: 0.1,
    },
  },
  'sepia': {
    class:'effects__preview--sepia',
    filterOptions:{
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  'marvin': {
    class:'effects__preview--marvin',
    filterOptions:{
      range: {
        min: 1,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  'phobos': {
    class:'effects__preview--phobos',
    filterOptions:{
      range: {
        min: 0,
        max: 3,
      },
      start:3,
      step: 0.1,
    },
  },
  'heat': {
    class:'effects__preview--heat',
    filterOptions:{
      range: {
        min: 1,
        max: 3,
      },
      start:3,
      step: 0.1,
    },
  },
  'none':{
    class:'effects__preview--none',
    filterOptions:{
      range: {
        min: 0,
        max: 10,
      },
      start:0,
      step: 0.1,
    }
  }
};

const PHOTOS = 25;
const MINIMAL_LIKES = 15;
const MAXIMAL_LIKES = 200;
const AVATARS = 6;
const MAXIMAL_ID = 1000;
const MAXIMAL_COMMENTS = 4;
const ids = createArray(PHOTOS);

function getPhotos () {
  const randomArray = shuffle(ids);
  const photo = [];
  for (let i = 0;i < randomArray.length;i++) {
    const id = randomArray[i];
    photo.push( {
      id: id,
      url: `photos/${ id }.jpg`,
      description: getDescription(id-1),
      likes: getRandomNumber(MINIMAL_LIKES,MAXIMAL_LIKES),
      comments: Array.from({length: getRandomNumber(0,MAXIMAL_COMMENTS)}, createComment),
    });
  }
  return photo;
}

export {DESCRIPTIONS,MESSAGES,NAMES,AVATARS,MAXIMAL_ID,FILTERS};
export {getPhotos};