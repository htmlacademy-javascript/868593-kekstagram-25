
const removeComment =  document.querySelector('.social__comments');
const submitButton = document.querySelector('.img-upload__submit');
const succesTamplate = document.querySelector('#success').content;
const messageWrapper = document.querySelector('.message__wrapper');
const errorTamplate = document.querySelector('#error').content;

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  if (min < 0) {
    return;
  }
  max = Math.floor(max);
  if (max < 0) {
    return;
  }
  if (min > max) {
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

const removeComments = () => {
  removeComment.innerHTML = '';
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


const closeSuccessMessage = () => {
  const successClass = document.querySelector('.success');
  successClass.addEventListener('click', (evt) => {
    if(evt.target === successClass) {
      destroySuccess();
    }
  });
  const btnCloseSuccess = document.querySelector('.success__button');
  btnCloseSuccess.addEventListener('click', () => {
    destroySuccess();
  });
};

const closeErrorMessage = () => {
  const errorClass = document.querySelector('.error');
  errorClass.addEventListener('click', (evt) => {
    if(evt.target === errorClass) {
      destroyError();
    }
  });
  const btnCloseError = document.querySelector('.error__button');
  btnCloseError.addEventListener('click', () => {
    destroyError();
  });
};
const onSuccessEscKeydown = (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    destroySuccess();
  }
};

const onErrorEscKeydown = (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    destroyError();
  }
};

const getSuccessMessage = () => {
  const successElement = succesTamplate.cloneNode(true);
  messageWrapper.appendChild(successElement);
  closeSuccessMessage();
  document.addEventListener('keydown', onSuccessEscKeydown);
};

const getErrorMessage = () => {
  const errorElement = errorTamplate.cloneNode(true);
  messageWrapper.appendChild(errorElement);
  closeErrorMessage();
  document.addEventListener('keydown', onErrorEscKeydown);
};
function destroySuccess () {
  const successClass = document.querySelector('.success');
  successClass.remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
}
function destroyError () {
  const errorClass = document.querySelector('.error');
  errorClass.remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
}

export {getRandomNumber,
  createArray,
  getRandomElement,
  shuffle,
  removeComments,
  isEscapeKey,
  getCommentFieldSize,
  blockSubmitButton,
  unblockSubmitButton,
  getSuccessMessage,
  getErrorMessage,
  closeErrorMessage};
