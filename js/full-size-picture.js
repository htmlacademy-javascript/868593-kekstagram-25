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
  for(let i = comments.length;i > maxComment ;i--) {
    comments[i-1].classList.add('hidden');
    const commentCount = document.querySelector('.social__comment-count');
    commentCount.textContent = `${5 } из ${  comments.length} комментариев`
  }
};
const unHiddenComments = (maxComment) => {
  const comments = document.querySelectorAll('.social__comment');
  for(let i = 0;i < maxComment ;i++) {
    comments[i].classList.remove('hidden');
    const commentCount = document.querySelector('.social__comment-count');
    commentCount.textContent = `${i+1 } из ${  comments.length} комментариев` ;
  }
};

const getMoreComments = () => {
  const btnCommentsDownload = document.querySelector('.comments-loader');
  btnCommentsDownload.addEventListener('click', () => {
    maxComments = maxComments+5;
    unHiddenComments(maxComments);
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
  fullSizePicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('click', btnClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  removeComments();
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
