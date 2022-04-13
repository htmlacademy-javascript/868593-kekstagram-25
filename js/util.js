const RERENDER_DELAY = 500;
const TIME_SHOW_ERROR = 3000;

const removeComment =  document.querySelector('.social__comments');
const submitButton = document.querySelector('.img-upload__submit');
const succesTamplate = document.querySelector('#success').content;
const messageWrapper = document.querySelector('.message__wrapper');
const errorTamplate = document.querySelector('#error').content;

const shuffle = (data) => {
  let j;
  let temp;
  const dataCopy = data.slice();
  for(let i = dataCopy.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = dataCopy[j];
    dataCopy[j] = dataCopy[i];
    dataCopy[i] = temp;
  }
  return dataCopy;
};

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

const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), RERENDER_DELAY);
  };
};

const getDownloadMessageError = () => {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('download__error');
  errorMessage.textContent = 'Ошибка загрузки';
  messageWrapper.append(errorMessage);
  setTimeout(() => errorMessage.remove(), TIME_SHOW_ERROR);
};

export { shuffle,
  removeComments,
  isEscapeKey,
  blockSubmitButton,
  unblockSubmitButton,
  getSuccessMessage,
  getErrorMessage,
  closeErrorMessage,
  debounce,
  getDownloadMessageError };
