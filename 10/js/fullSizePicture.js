import {photos} from './miniature.js';
import {removeComments,isEscapeKey} from './util.js';

const fullSizePicture = document.querySelector('.big-picture');
const pictureCollection = document.querySelector('.pictures');
const commentsTemplate = document.querySelector('#comments').content;
const commentListFragment = document.createDocumentFragment();
const closeButton = document.querySelector('.big-picture__cancel');

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

function openPopup(clickTarget) {
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
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  getComment(imgId);
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', btnClose);
}

function getFullSizePhoto() {
  removeComments();
  pictureCollection.addEventListener('click', (evt) => {
    if (evt.target.className === 'picture__img') {
      const clickTarget = evt.target.dataset.indexNumber;
      openPopup(clickTarget);
    }
  });
}

getFullSizePhoto();
