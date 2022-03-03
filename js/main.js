const DESCRIPTION_ARRAY = [
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
const MESSAGE = [
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
const ID_ARRAY = createArray(25);
const IMG_ARRAY = createArray(25);
const AVATAR_ARRAY = createArray(6);
const PHOTOS_COUNT = 25;

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
getRandomNumber(12,15);

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
createArray(14);

function getRandomElement (elements)  {
  return elements[getRandomNumber(0, elements.length - 1)];
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
shuffle(ID_ARRAY);

function getUrl (numberImg) {
  const imgNumber = numberImg;
  const string = 'photos/';
  const format = '.jpg';
  const url = string + imgNumber + format;
  return url;
}
getUrl(IMG_ARRAY);

function getDescription(numberDescription) {
  const description =  DESCRIPTION_ARRAY[numberDescription];
  return description;
}
getDescription(DESCRIPTION_ARRAY);

function getMessage(listMessage) {
  const firstSentence = getRandomElement(listMessage);
  const secondSentence = getRandomElement(listMessage);
  const message = firstSentence + secondSentence;
  return message;
}

function getName(listName) {
  const name = getRandomElement(listName);
  return name;
}

function getRandomAvatar(listAvatar) {
  const randomAvatar = getRandomElement(listAvatar);
  const string = 'img/avatar-';
  const format = '.svg';
  const url = string + randomAvatar + format;
  return url;
}

function getPhotos () {
  const randomArray = shuffle(ID_ARRAY);
  for (let i = 0;i < randomArray.length;i++) {
    const id = randomArray[i];
    const photo = {
      id: id,
      url: getUrl(id),
      description: getDescription(id),
      likes: getRandomNumber(15,200),
      comments: createComment(),
    };
    return photo;
  }
}

function createComment() {
  return {
    id: getRandomNumber(0,1000),
    avatar: getRandomAvatar(AVATAR_ARRAY),
    message: getMessage(MESSAGE),
    name: getName(NAMES),
  };
}
createComment();
// eslint-disable-next-line no-unused-vars
const photos = Array.from({length: PHOTOS_COUNT}, getPhotos);


