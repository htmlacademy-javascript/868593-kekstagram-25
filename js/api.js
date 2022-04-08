import {setUserFormSubmit} from './validation.js';
import {closePopupOverlay} from './form-upload.js';
import {getSuccessMessage,getErrorMessage} from './util.js';
import {formReset} from './form-upload.js';

const getData = (onSuccess) =>{
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        getSuccessMessage();
        formReset();
      } else {
        getErrorMessage();
        closePopupOverlay();
        formReset();
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

setUserFormSubmit(closePopupOverlay);


export {getData, sendData};
