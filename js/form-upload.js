import { isEscapeKey } from './util.js';
import { filters } from './data.js';

const MAX_ZOOM = 100;
const MIN_ZOOM = 25;
const STEP_ZOOM = 0.25;
const REGEX_ZOOM = /%/;
const REGEX_EFFECT = /effect-/;
const REGEX_SLIDER = /[0-9]+/;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const imgOploadForm = document.querySelector('.img-upload__form');
const popupOverlay = document.querySelector('.img-upload__overlay');
const popupOverlayCloseBtn = document.querySelector('.img-upload__cancel');
const hashtagsField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const effectList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const preview = document.querySelector('.img-upload__preview');
const btnZoomOut = document.querySelector('.scale__control--smaller');
const btnZoomIn = document.querySelector('.scale__control--bigger');
const zoomValue = document.querySelector('.scale__control--value');
const fileChooser = document.querySelector('.img-upload__input[type=file]');

const isHashTagsFieldFocus = () => document.activeElement === hashtagsField;

const isDesriptionsFieldFocus = () => document.activeElement === descriptionField;

const resetForm = () => {
  preview.className = 'img-upload__preview';
  descriptionField.textContent = '';
  preview.value = '';
  imgOploadForm.reset();
};

const resetZoom = () => {
  zoomValue.value = '100%';
  const zoomStyle = 1;
  preview.setAttribute('style', `transform:scale(${  zoomStyle  })`);
};

const openPopupOverlay  = () => {
  popupOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderElement.classList.add('img-filters--inactive');
  document.addEventListener('keydown', onPopupOverlayEscKeydown);
  resetZoom();
};

const closePopupOverlay = () => {
  popupOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onPopupOverlayEscKeydown);
  resetForm();
};

function onPopupOverlayEscKeydown(evt) {
  if (isEscapeKey(evt) && !isHashTagsFieldFocus() && !isDesriptionsFieldFocus()) {
    evt.preventDefault();
    closePopupOverlay();
  }
}

const getZoom =  () => {
  let currentZoom = zoomValue.value;
  currentZoom = currentZoom.replace(REGEX_ZOOM, '');
  return currentZoom;
};

const getStyleEffect = () => {
  let filterStyle = getComputedStyle(preview).filter;
  if(filterStyle === 'invert(1)') {
    filterStyle = 'invert(100%)';
  }
  return filterStyle;
};

imgUploadInput.addEventListener ('change', () => {
  openPopupOverlay();
});

popupOverlayCloseBtn.addEventListener('click', () => {
  closePopupOverlay();
});

btnZoomOut.addEventListener('click', () => {
  let currentZoom = getZoom();
  if(currentZoom > MIN_ZOOM) {
    currentZoom = currentZoom /MAX_ZOOM - STEP_ZOOM;
    zoomValue.value = `${currentZoom * MAX_ZOOM}%`;
    preview.setAttribute('style', `transform:scale(${  currentZoom  })`);
  }
});

btnZoomIn.addEventListener('click', () => {
  let currentZoom = getZoom();
  if(currentZoom < MAX_ZOOM) {
    currentZoom = currentZoom /MAX_ZOOM + STEP_ZOOM;
    zoomValue.value = `${currentZoom * MAX_ZOOM}%`;
    preview.setAttribute('style',`transform:scale(${  currentZoom  })`);
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min:0,
    max:0,
  },
  start: 0,
  step:0,
  connect: 'lower',
});
sliderElement.setAttribute('disabled', true);

effectList.addEventListener('click', (evt)=>{
  resetZoom();
  if(evt.target.nodeName  === 'INPUT') {
    preview.className = 'img-upload__preview';
    const clickEffect = evt.target.id;
    const effect = clickEffect.replace(REGEX_EFFECT, '');
    if (effect !== 'none'){
      sliderElement.classList.remove('img-filters--inactive');
      sliderElement.removeAttribute('disabled');
      preview.classList.add(filters[effect].class);
      const filterOption = filters[effect].filterOptions;
      sliderElement.noUiSlider.updateOptions(filterOption);
    }
    else {
      sliderElement.setAttribute('disabled', true);
      sliderElement.classList.add('img-filters--inactive');
      preview.setAttribute('style', '');
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
  preview.setAttribute('style', '');
  effectLevelValue.value = sliderElement.noUiSlider.get();
  const effectStyle = getStyleEffect();
  const effectStr = effectStyle.replace(REGEX_SLIDER, effectLevelValue.value);
  if(effectStr !=='none'){
    preview.setAttribute('style', `filter:${  effectStr}`);
  }
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const previewImg = preview.querySelector('img');
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImg.src = URL.createObjectURL(file);
  }
});

export { closePopupOverlay,resetForm };
