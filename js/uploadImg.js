import {isEscapeKey} from './util.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const popupOverlay = document.querySelector('.img-upload__overlay');
const popupOverlayCloseBtn = document.querySelector('.img-upload__cancel');
const hashtagsField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const onHashTagsFieldFocus = () => document.activeElement === hashtagsField;
const onDesriptionsFieldFocus = () => document.activeElement === descriptionField;

const onPopupOverlayEscKeydown = (evt) =>  {
  if (isEscapeKey(evt) && !onHashTagsFieldFocus() && !onDesriptionsFieldFocus()) {
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
}

imgUploadInput.addEventListener ('change', () => {
  openPopupOverlay();
});

popupOverlayCloseBtn.addEventListener('click', () => {
  closePopupOverlay();
});
