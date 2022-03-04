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
const PHOTOS_COUNT = 25;
const MINIMAL_LIKES = 15;
const MAXIMAL_LIKES = 200;
const AVATAR_COUNT = 6;
const ids = createArray(PHOTOS_COUNT);
const imgs = createArray(PHOTOS_COUNT);
const avatars= createArray(AVATAR_COUNT);


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
getCommentFieldSize(12,15);

function createArray (lengthArray) {
  const array =[];
  for (let i=1;lengthArray+1 > i; i++) {
    const counter = i;
    array.push(counter);
  }
  return array;
}

function getRandomElement (elements)  {
  const elementsCopy = elements.slice();
  return elementsCopy[getRandomNumber(0, elementsCopy.length - 1)];
}

function shuffle(arr){
  let j;
  let temp;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function getDescription(numberDescription) {
  const description =  DESCRIPTIONS[numberDescription];
  return description;
}
getDescription(DESCRIPTIONS);

function getMessage(listMessage) {
  const firstSentence = getRandomElement(listMessage);
  const secondSentence = getRandomElement(listMessage);
  const message = firstSentence + secondSentence;
  return message;
}

function getName(listName) {
  return getRandomElement(listName);
}

function createComment() {
  return {
    id: getRandomNumber(0,1000),
    avatar: `img/avatar-${ getRandomNumber(0,AVATAR_COUNT) }.svg`,
    message: getMessage(MESSAGES),
    name: getName(NAMES),
  };
}
const comments = Array.from({length: getRandomNumber(0,4)}, createComment);

function getPhotos () {
  const randomArray = shuffle(ids);
  for (let i = 0;i < randomArray.length;i++) {
    const id = randomArray[i];
    const photo = {
      id: id,
      url: `photos/${ id }.jpg`,
      description: getDescription(id),
      likes: getRandomNumber(MINIMAL_LIKES,MAXIMAL_LIKES),
      comments: comments,
    };
    return photo;
  }
}

// eslint-disable-next-line no-unused-vars
const photos = Array.from({length: PHOTOS_COUNT}, getPhotos);


