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
const PHOTOS = 25;
const MINIMAL_LIKES = 15;
const MAXIMAL_LIKES = 200;
const AVATARS = 5;
const MAXIMAL_ID = 1000;
const MAXIMAL_COMMENTS = 4;
const ids = createArray(PHOTOS);
const comments = Array.from({length: getRandomNumber(0,MAXIMAL_COMMENTS)}, createComment);

function getPhotos () {
  const randomArray = shuffle(ids);
  const photo = [];
  for (let i = 0;i < randomArray.length;i++) {
    const id = randomArray[i];
    photo.push( {
      id: id,
      url: `photos/${ id }.jpg`,
      description: getDescription(id),
      likes: getRandomNumber(MINIMAL_LIKES,MAXIMAL_LIKES),
      comments: comments,
    });
  }
  return photo;
}

export {DESCRIPTIONS,MESSAGES,NAMES,AVATARS,MAXIMAL_ID};
export {getPhotos};
