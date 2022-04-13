import {removeComments,isEscapeKey} from './util.js';
import {getData} from './api.js';

const STEP_DOWNLOAD_COMMENTS = 5;

const fullSizePicture = document.querySelector('.big-picture');
const pictureCollection = document.querySelector('.pictures');
const commentListFragment = document.createDocumentFragment();
const closeButton = document.querySelector('.big-picture__cancel');
let maxComments = STEP_DOWNLOAD_COMMENTS - 1;
let countViewComments;
const btnCommentsDownloadWrapper = document.querySelector('.social__comments-loader-wrapper');
let btnCommentsDownload = document.querySelector('.comments-loader');

const createBtnDownloadComments = () => {
  if (!btnCommentsDownload) {
    btnCommentsDownload = document.createElement('button');
    btnCommentsDownload.classList.add('social__comments-loader');
    btnCommentsDownload.classList.add('comments-loader');
    btnCommentsDownload.textContent = 'Загрузить еще';
    btnCommentsDownloadWrapper.append(btnCommentsDownload);
  }
};

const destroyBtnDownloadComments = () => {
  if (btnCommentsDownload) {
    btnCommentsDownload.remove();
    btnCommentsDownload = null;
  }
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  const commentAvatar = document.createElement('img');
  const commentText = document.createElement('p');
  commentElement.classList.add('social__comment');
  commentAvatar.classList.add('social__picture');
  commentText.classList.add('social__text');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentText.textContent = comment.message;
  commentElement.append(commentAvatar);
  commentElement.append(commentText);
  return commentElement;
};

const createCommentList = (comment,min,max) => {
  createBtnDownloadComments();
  const commentCountMax = document.querySelector('.comments-count');
  const commentsCountShow = document.querySelector('.comments-count-show');
  if(max > comment.comments.length) {
    max = comment.comments.length;
    btnCommentsDownload.classList.add('hidden');
    commentsCountShow.textContent = max;
    commentCountMax.textContent = comment.comments.length;
  }
  const commentList = document.querySelector('.social__comments');
  for(let i = min;i < max ;i++){
    const commentItem = createCommentElement(comment.comments[i]);
    commentListFragment.appendChild(commentItem);
    countViewComments = i;
    commentsCountShow.textContent = max;
    commentCountMax.textContent = comment.comments.length;
  }
  commentList.appendChild(commentListFragment);
  return countViewComments;
};

const checkLengthComments = (comment) => {
  countViewComments = countViewComments +1;
  const commentsCountShow = document.querySelector('.comments-count-show');
  if(comment.comments.length > countViewComments + STEP_DOWNLOAD_COMMENTS) {
    maxComments = countViewComments + STEP_DOWNLOAD_COMMENTS;
    createCommentList(comment,countViewComments,maxComments);
    commentsCountShow.textContent = maxComments;
    return countViewComments;
  }
  else {
    const restComments = comment.comments.length - countViewComments;
    maxComments = countViewComments + restComments;
    createCommentList(comment,countViewComments,maxComments);
    btnCommentsDownload.classList.add('hidden');
    commentsCountShow.textContent = maxComments;
  }
};

const getMoreComments = (comment) => {
  if (btnCommentsDownload) {
    btnCommentsDownload.addEventListener('click', () => {
      checkLengthComments(comment);
    });
  }
};

const onPopupEscKeydown = (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onBtnClose = () => {
  closePopup();
};

function closePopup() {
  fullSizePicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('click', onBtnClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', checkLengthComments);
  removeComments();
  const comments = document.querySelectorAll('.social__comment');
  comments.innerHTMl = '';
  countViewComments = STEP_DOWNLOAD_COMMENTS-1;
  destroyBtnDownloadComments();
  return countViewComments;
}

const openPopup = (clickTarget,photos) => {
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
  createBtnDownloadComments();
  document.querySelector('body').classList.add('modal-open');
  createCommentList(imgId,0,STEP_DOWNLOAD_COMMENTS);
  getMoreComments(imgId);
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', onBtnClose);
};

const getFullSizePhoto = () => {
  removeComments();
  pictureCollection.addEventListener('click', (evt) => {
    if (evt.target.className === 'picture__img') {
      const clickTarget = evt.target.dataset.indexNumber;
      getData((data) =>{
        openPopup(clickTarget,data);
      });
    }
  });
};

getFullSizePhoto();
