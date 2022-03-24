import { getCommentFieldSize } from './util.js';
const MAX_LENGTH_HASHTAG = 20;
const MAX_LENGTH_COMMENTS = 140;
const MAX_QUANTITY_HASHTAGS = 5;
const REGEX_HASHTAG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const formUploadPhoto = document.querySelector('.img-upload__form');
const hashTagsField = document.querySelector('.text__hashtags');
const CommentField = document.querySelector('.text__description');

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
  if(uniqueHashTags.length !== array.length) {
    return false;
  }
  else {
    return true;
  }
}

formUploadPhoto.addEventListener('submit', (evt) => {
  const hashTags = getHashTags();

  if(!testValid()) {
    evt.preventDefault();
  }
  function testValid() {
    if(validCountHashTags(hashTags,MAX_QUANTITY_HASHTAGS) && validHashTagsRegex(hashTags) && validHashTagsDubllicate(hashTags) && validHashTagsElementLength(hashTags)) {
      hashTagsField.classList.remove('error__field');
      return true;
    }
    else {
      hashTagsField.classList.add('error__field');
    }
  }
  testValid();
});
formUploadPhoto.addEventListener('submit', (evt) => {
  if(getCommentFieldSize(CommentField,MAX_LENGTH_COMMENTS)) {
    evt.preventDefault();
  }
});
