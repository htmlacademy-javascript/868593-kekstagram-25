import {getPhotos} from './data.js';
const photos = getPhotos();
const photosTemplate = document.querySelector('#picture').content;
const photosListFragment = document.createDocumentFragment();
const img = document.querySelector('.pictures');

photos.forEach(({url,likes,comments,id}) => {
  const photoElement = photosTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__img').setAttribute('data-index-number',id);
  photosListFragment.appendChild(photoElement);
});
img.appendChild(photosListFragment);
export {photos};
