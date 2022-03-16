import {photos} from './miniature.js';
import { removeComments } from './util.js';

const fullSizePicture = document.querySelector('.big-picture');
const pictureId = document.querySelectorAll('.picture__img');
const commentsTemplate = document.querySelector('#comments').content;
const commentListFragment = document.createDocumentFragment();

function getFullSizePhoto(){
  removeComments();
  for (let i = 0; i < pictureId.length; i++) {
    pictureId[i].onclick = function(e) {
      const clickTarget = e.target.dataset.indexNumber;
      const clickTargetNumber = Number(clickTarget);
      const imgId = photos.find((item) => item.id === clickTargetNumber);
      const imgUrl = imgId.url;
      const imglikes = imgId.likes;
      const imgCommentsLength = imgId.comments.length;
      const imgDescription = imgId.description;
      fullSizePicture.querySelector('img').src = imgUrl;
      fullSizePicture.querySelector('.likes-count').textContent =  imglikes;
      fullSizePicture.querySelector('.comments-count').textContent = imgCommentsLength;
      fullSizePicture.querySelector('.social__caption').textContent = imgDescription;
      fullSizePicture.classList.remove('hidden');
      document.querySelector('.social__comment-count').classList.add('hidden');
      document.querySelector('.comments-loader').classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
      imgId.comments.forEach(({avatar,name,message}) =>{
        const commentList = document.querySelector('.social__comments');
        const commentListCopy = commentsTemplate.cloneNode(true);
        commentListCopy.querySelector('.social__picture').src = avatar;
        commentListCopy.querySelector('.social__picture').alt = name;
        commentListCopy.querySelector('.social__text').textContent = message;
        commentListFragment.appendChild(commentListCopy);
        commentList.appendChild(commentListFragment);
      });
    };
  }
}
getFullSizePhoto();

function closePopup () {
  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.onclick = function () {
    fullSizePicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    removeComments();
  };
}
closePopup();
