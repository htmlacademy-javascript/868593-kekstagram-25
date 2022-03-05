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

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  if (min < 0) {
    // eslint-disable-next-line no-console
    console.log('отрицательное значение min');
    return;
  }
  max = Math.floor(max);
  if (max < 0) {
    // eslint-disable-next-line no-console
    console.log('отрицательное значение max');
    return;
  }
  if (min > max) {
    // eslint-disable-next-line no-console
    console.log('Минимальное значение больше максимального');
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCommentFieldSize(commentField ,maxLength) {
  return commentField.length <= maxLength;
}

function createArray (lengthArray) {
  const array =[];
  for (let i = 1;lengthArray + 1 > i; i++) {
    array.push(i);
  }
  return array;
}

function getRandomElement (elements)  {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function shuffle(arr){
  let j;
  let temp;
  const arrCopy = arr.slice();
  for(let i = arrCopy.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arrCopy[j];
    arrCopy[j] = arrCopy[i];
    arrCopy[i] = temp;
  }
  return arrCopy;
}

function getDescription(numberDescription) {
  const description =  DESCRIPTIONS[numberDescription];
  return description;
}

function getMessage(listMessage) {
  const random = getRandomNumber(1,2) % 2;
  if(!random){
    return `${getRandomElement(listMessage)  } ${  getRandomElement(listMessage)}`;
  }
  return getRandomElement(listMessage);
}

function getName(listName) {
  return getRandomElement(listName);
}

function createComment() {
  return {
    id: getRandomNumber(0,MAXIMAL_ID),
    avatar: `img/avatar-${ getRandomNumber(0,AVATARS) }.svg`,
    message: getMessage(MESSAGES),
    name: getName(NAMES),
  };
}

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

// eslint-disable-next-line no-unused-vars
const photos= getPhotos();
getCommentFieldSize(12,15);

