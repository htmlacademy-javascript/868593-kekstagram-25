const MAX_LENGTH_HASHTAG = 20;
const MAX_QUANTITY_HASHTAGS = 5;
const REGEX_HASHTAG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const formUploadPhoto = document.querySelector('.img-upload__form');
const hashTagsField = document.querySelector('.text__hashtags');

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
  if (validCountHashTags(hashTags,MAX_QUANTITY_HASHTAGS) && validHashTagsRegex(hashTags) && !validHashTagsDubllicate(hashTags) && validHashTagsElementLength(hashTags)) {
    hashTagsField.classList.add('error__field');
    return false;
  }
  hashTagsField.classList.remove('error__field');
  return true;
}
formUploadPhoto.addEventListener('submit', (evt) => {
  if(!testValid()){
    evt.preventDefault();
  }
});
