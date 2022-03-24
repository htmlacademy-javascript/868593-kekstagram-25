import {isEscapeKey} from './util.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const popupOverlay = document.querySelector('.img-upload__overlay');
const popupOverlayCloseBtn = document.querySelector('.img-upload__cancel');
const hashtagsField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const onPopupOverlayEscKeydown = (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopupOverlay();
  }
};
const openPopupOverlay  = () => {
  popupOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupOverlayEscKeydown);
};

function closePopupOverlay () {
  popupOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onPopupOverlayEscKeydown);
  document.removeEventListener('focus', hashtagsField);
  document.removeEventListener('focus', descriptionField);
}

imgUploadInput.addEventListener ('change', () => {
  openPopupOverlay();
});

popupOverlayCloseBtn.addEventListener('click', () => {
  closePopupOverlay();
});
