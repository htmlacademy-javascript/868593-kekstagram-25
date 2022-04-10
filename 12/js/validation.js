import {sendData} from './api.js';
import {blockSubmitButton,unblockSubmitButton,getSuccessMessage,getErrorMessage} from './util.js';
import {formReset,closePopupOverlay} from './form-upload.js';

const MAX_LENGTH_HASHTAG = 20;
const MAX_QUANTITY_HASHTAGS = 5;
const REGEX_HASHTAG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const formUploadPhoto = document.querySelector('.img-upload__form');
const hashTagsField = document.querySelector('.text__hashtags');


const hashTagFieldEmpty = () => {
  if(hashTagsField.value ==='') {
    return true;
  }
};

function getHashTags() {
  const hashTagsString = hashTagsField.value.toUpperCase();
  const hashTag = hashTagsString.split(' ');
  return hashTag;
}

function validCountHashTags(arr ,maxCount) {
  return arr.length <= maxCount;
}

function validHashTagsElementLength(arr) {
  const arrLength = arr.map((a) => a.length);
  return arrLength.some((x) => x < MAX_LENGTH_HASHTAG);
}

function validHashTagsRegex(arr) {
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

function testValid() {
  const hashTags = getHashTags();
  if (validCountHashTags(hashTags,MAX_QUANTITY_HASHTAGS) && validHashTagsRegex(hashTags) && validHashTagsDubllicate(hashTags) && validHashTagsElementLength(hashTags) || hashTagFieldEmpty()) {
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
pristine.addValidator(hashTagsField, testValid,'не валидный хештег');

const setUserFormSubmit = (onSuccess,onFail) => {
  formUploadPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    if(pristine.validate()){
      blockSubmitButton();
      sendData(
        () => {
          onSuccess(unblockSubmitButton(),getSuccessMessage(),formReset());

        },
        () => {
          onFail(unblockSubmitButton(),getErrorMessage(),closePopupOverlay(),formReset());
        },
        new FormData(evt.target),
      );
    }
  });
};

export{setUserFormSubmit};

