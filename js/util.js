import {DESCRIPTIONS,MESSAGES,NAMES,AVATARS,MAXIMAL_ID} from './data.js';

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

getCommentFieldSize(12,15);
export {getRandomNumber,createArray,getRandomElement,shuffle,getDescription,getMessage,createComment};
