import { sendData } from './api.js';
import { blockSubmitButton, unblockSubmitButton, getSuccessMessage, getErrorMessage } from './util.js';
import {resetForm, closePopupOverlay} from './form-upload.js';

const MAX_LENGTH_HASHTAG = 20;
const MAX_QUANTITY_HASHTAGS = 5;
const REGEX_HASHTAG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const formUploadPhoto = document.querySelector('.img-upload__form');
const hashTagsField = document.querySelector('.text__hashtags');

const checkHashTagFieldEmpty = () => {
  if(hashTagsField.value ==='') {
    return true;
  }
};

const getHashTags = () => {
  const hashTagsString = hashTagsField.value.toUpperCase();
  const hashTag = hashTagsString.split(' ');
  return hashTag;
};

const validateCountHashTags = (data, maxCount) => data.length <= maxCount;

const validateHashTagsElementLength = (data) => {
  const arrLength = data.map((a) => a.length);
  return arrLength.some((x) => x < MAX_LENGTH_HASHTAG);
};

const validateHashTagsRegex = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (!REGEX_HASHTAG.test(data[i])) {
      return false;
    }
  }
  return true;
};

const validateHashTagsDubllicate = (data) => {
  const uniqueHashTags = data.filter((val, ind, arr) => arr.indexOf(val) === ind);
  return uniqueHashTags.length === data.length;
};

const testValidate = () => {
  const hashTags = getHashTags();
  if (validateCountHashTags(hashTags, MAX_QUANTITY_HASHTAGS) && validateHashTagsRegex(hashTags) && validateHashTagsDubllicate(hashTags) && validateHashTagsElementLength(hashTags) || checkHashTagFieldEmpty()) {
    hashTagsField.classList.remove('error__field');
    return true;
  }
  hashTagsField.classList.add('error__field');
  return false;
};

const pristine = new Pristine(formUploadPhoto, {
  classTo: 'text__hashtags-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'text__hashtags-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const setUserFormSubmit = () => {
  formUploadPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    if(pristine.validate()){
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          closePopupOverlay();
          getSuccessMessage();
          resetForm();
        },
        () => {
          unblockSubmitButton();
          getErrorMessage();
          closePopupOverlay();
          resetForm();
        },
        new FormData(evt.target),
      );
    }
  });
};
setUserFormSubmit();

pristine.addValidator(hashTagsField, testValidate, 'не валидный хештег');

export{setUserFormSubmit};

