import {sendData} from './api.js';
import {blockSubmitButton,unblockSubmitButton,getSuccessMessage,getErrorMessage} from './util.js';
import {formReset,closePopupOverlay} from './form-upload.js';

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

function getHashTags() {
  const hashTagsString = hashTagsField.value.toUpperCase();
  const hashTag = hashTagsString.split(' ');
  return hashTag;
}

function validateCountHashTags(arr ,maxCount) {
  return arr.length <= maxCount;
}

function validateHashTagsElementLength(arr) {
  const arrLength = arr.map((a) => a.length);
  return arrLength.some((x) => x < MAX_LENGTH_HASHTAG);
}

function validateHashTagsRegex(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!REGEX_HASHTAG.test(arr[i])) {
      return false;
    }
  }
  return true;
}

function validHashTagsDubllicate(array) {
  const uniqueHashTags = array.filter((val,ind,arr) => arr.indexOf(val) === ind);
  return uniqueHashTags.length === array.length;
}

function testValidate() {
  const hashTags = getHashTags();
  if (validateCountHashTags(hashTags,MAX_QUANTITY_HASHTAGS) && validateHashTagsRegex(hashTags) && validHashTagsDubllicate(hashTags) && validateHashTagsElementLength(hashTags) || checkHashTagFieldEmpty()) {
    hashTagsField.classList.remove('error__field');
    return true;
  }
  hashTagsField.classList.add('error__field');
  return false;
}

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
          formReset();
        },
        () => {
          unblockSubmitButton();
          getErrorMessage();
          closePopupOverlay();
          formReset();
        },
        new FormData(evt.target),
      );
    }
  });
};
setUserFormSubmit();

pristine.addValidator(hashTagsField, testValidate,'не валидный хештег');
export{setUserFormSubmit};

