import {getData} from './api.js';
import {shuffle,debounce} from './util.js';

const MIN_PHOTO = 1;
const MAX_PHOTO = 11;

let photos = [];
const photosTemplate = document.querySelector('#picture').content;
const photosListFragment = document.createDocumentFragment();
const img = document.querySelector('.pictures');
const imgFilter = document.querySelector('.img-filters');
const btnFilterDefault = document.querySelector('#filter-default');
const btnFilterRandom = document.querySelector('#filter-random');
const btnFilterDiscussed = document.querySelector('#filter-discussed');

const deleteImg = () => {
  const imgs = img.querySelectorAll('.picture');
  imgs.innerHTML ='';
  imgs.forEach((elem)=> {
    elem.parentNode.removeChild(elem);
  });
};

const deleteActiveClass = () => {
  const btnFilters = document.querySelectorAll('.img-filters__button');
  btnFilters.forEach((elem)=> {
    elem.classList.remove('img-filters__button--active');
  });
};

const renderPhoto = (data) => {
  data.forEach(({url,likes,comments,id}) => {
    const photoElement = photosTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__img').setAttribute('data-index-number',id);
    photosListFragment.appendChild(photoElement);
  });
  img.appendChild(photosListFragment);
};

const sortDefault = () => {
  renderPhoto(photos);
  imgFilter.classList.remove('img-filters--inactive');
};
sortDefault();

const sortTenRandomImg = () => {
  renderPhoto(shuffle(photos.slice([MIN_PHOTO],[MAX_PHOTO])));
  imgFilter.classList.remove('img-filters--inactive');
};

const sortPopularImg = () => {
  photos.sort((a, b) => {
    if (a.comments < b.comments) {
      return 1;
    }
    if (a.comments > b.comments) {
      return -1;
    }
    return 0;
  });
  renderPhoto(photos);
  imgFilter.classList.remove('img-filters--inactive');
};

btnFilterDefault.addEventListener('click', debounce (() => {
  deleteActiveClass();
  deleteImg();
  sortDefault();
  btnFilterDefault.classList.add('img-filters__button--active');
}));

btnFilterRandom.addEventListener('click', debounce (() => {
  deleteActiveClass();
  deleteImg();
  sortTenRandomImg();
  btnFilterRandom.classList.add('img-filters__button--active');
}));

btnFilterDiscussed.addEventListener('click', debounce (() => {
  deleteActiveClass();
  deleteImg();
  sortPopularImg();
  btnFilterDiscussed.classList.add('img-filters__button--active');
}));

getData((data) => {
  photos = data.slice();
  renderPhoto(photos);
  imgFilter.classList.remove('img-filters--inactive');
  return photos;
});

export {photos};
