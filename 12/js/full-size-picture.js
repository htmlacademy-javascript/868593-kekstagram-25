import {removeComments,isEscapeKey} from './util.js';
import {getData} from './api.js';

const fullSizePicture = document.querySelector('.big-picture');
const pictureCollection = document.querySelector('.pictures');
const commentsTemplate = document.querySelector('#comments').content;
const commentListFragment = document.createDocumentFragment();
const closeButton = document.querySelector('.big-picture__cancel');
let maxComments = 5;

const getComment = (arr) => {
  arr.comments.forEach(({avatar,name,message}) =>{
    const commentList = document.querySelector('.social__comments');
    const commentListCopy = commentsTemplate.cloneNode(true);
    commentListCopy.querySelector('.social__picture').src = avatar;
    commentListCopy.querySelector('.social__picture').alt = name;
    commentListCopy.querySelector('.social__text').textContent = message;
    commentListFragment.appendChild(commentListCopy);
    commentList.appendChild(commentListFragment);
  });
};

const hiddenComments = (maxComment) => {
  const comments = document.querySelectorAll('.social__comment');
  const btnCommentsDownload = document.querySelector('.comments-loader');
  if(comments.length < maxComment){
    btnCommentsDownload.classList.add('hidden');
    const commentsCountShow = document.querySelector('.comments-count-show');
    commentsCountShow.textContent = comments.length;
    return;
  }
  for(let i = comments.length;i > maxComment ;i--) {
    comments[i-1].classList.add('hidden');
    const commentCountMax = document.querySelector('.comments-count');
    const commentsCountShow = document.querySelector('.comments-count-show');
    commentsCountShow.textContent = i-1;
    commentCountMax.textContent = comments.length;
  }
};
const showMoreComments = (maxComment) => {
  const comments = document.querySelectorAll('.social__comment');
  for(let i = 0;i < maxComment ;i++) {
    if(i===maxComment) {
      return;
    }
    if(i===comments.length) {
      const btnCommentsDownload = document.querySelector('.comments-loader');
      btnCommentsDownload.classList.add('hidden');
      return;
    }
    comments[i].classList.remove('hidden');
    const commentCountMax = document.querySelector('.comments-count');
    const commentsCountShow = document.querySelector('.comments-count-show');
    commentsCountShow.textContent = i+1;
    commentCountMax.textContent = comments.length;
  }
};

const getMoreComments = () => {
  const btnCommentsDownload = document.querySelector('.comments-loader');
  btnCommentsDownload.addEventListener('click', () => {
    maxComments = maxComments+5;
    showMoreComments(maxComments);
    return maxComments;
  });
};

const onPopupEscKeydown = (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const btnClose = () => {
  closePopup();
};

function closePopup() {
  const btnCommentsDownload = document.querySelector('.comments-loader');
  fullSizePicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('click', btnClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  removeComments();
  const comments = document.querySelectorAll('.social__comment');
  comments.innerHTMl = '';
  maxComments = 5;
  btnCommentsDownload.classList.remove('hidden');
  return maxComments;
}

function openPopup(clickTarget,photos) {
  const clickTargetNumber = Number(clickTarget);
  const imgId = photos.find((item) => item.id === clickTargetNumber);
  const imgUrl = imgId.url;
  const imglikes = imgId.likes;
  const imgCommentsLength = imgId.comments.length;
  const imgDescription = imgId.description;

  fullSizePicture.querySelector('img').src = imgUrl;
  fullSizePicture.querySelector('.likes-count').textContent = imglikes;
  fullSizePicture.querySelector('.comments-count').textContent = imgCommentsLength;
  fullSizePicture.querySelector('.social__caption').textContent = imgDescription;
  fullSizePicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  getComment(imgId);
  hiddenComments(maxComments);
  getMoreComments();
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', btnClose);
}

function getFullSizePhoto() {
  removeComments();
  pictureCollection.addEventListener('click', (evt) => {
    if (evt.target.className === 'picture__img') {
      const clickTarget = evt.target.dataset.indexNumber;
      getData((data) =>{
        openPopup(clickTarget,data);
      });
    }
  });
}

getFullSizePhoto();
