import {isEscapeKey } from './util.js';
import { FILTERS } from './data.js';
const imgUploadInput = document.querySelector('.img-upload__input');
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
const MAX_ZOOM = 100;
const MIN_ZOOM = 25;
const STEP_ZOOM = 0.25;

const isHashTagsFieldFocus = () => document.activeElement === hashtagsField;

const isDesriptionsFieldFocus = () => document.activeElement === descriptionField;

const onPopupOverlayEscKeydown = (evt) =>  {
  if (isEscapeKey(evt) && !isHashTagsFieldFocus() && !isDesriptionsFieldFocus()) {
    evt.preventDefault();
    closePopupOverlay();
  }
};

const zoomDefault = () => {
  zoomValue.value = '100%';
  const zoomStyle = 1;
  preview.setAttribute('style',`transform:scale(${  zoomStyle  })`);
};

const openPopupOverlay  = () => {
  popupOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupOverlayEscKeydown);
  zoomDefault();
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

const getZoom =  () => {
  let currentZoom = zoomValue.value;
  const re = /%/;
  currentZoom = currentZoom.replace(re ,'');
  return currentZoom;
};

btnZoomOut.addEventListener('click', () => {
  let currentZoom = getZoom();
  if(currentZoom > MIN_ZOOM) {
    currentZoom = currentZoom /MAX_ZOOM - STEP_ZOOM;
    zoomValue.value = `${currentZoom * MAX_ZOOM}%`;
    preview.setAttribute('style',`transform:scale(${  currentZoom  })`);
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
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
sliderElement.setAttribute('disabled', true);

function getStyleEffect() {
  const filterStyle = window.getComputedStyle(preview).filter;
  return filterStyle;
}

function onListClick() {
  effectList.addEventListener('click', (evt)=>{
    zoomDefault();
    if(evt.target.nodeName  === 'INPUT') {
      preview.className = 'img-upload__preview';
      const clickEffect = evt.target.id;
      const re = /effect-/;
      const effect = clickEffect.replace(re ,'');
      if (effect !== 'none'){
        sliderElement.removeAttribute('disabled');
        preview.classList.add(FILTERS[effect].class);
        const filterOption = FILTERS[effect].filterOptions;
        sliderElement.noUiSlider.updateOptions(filterOption);
      }
      else {
        sliderElement.setAttribute('disabled', true);
        preview.setAttribute('style', '');
      }
    }
  });
}
sliderElement.noUiSlider.on('update', () => {
  preview.setAttribute('style','');
  effectLevelValue.value = sliderElement.noUiSlider.get();
  const effectStyle = getStyleEffect();
  const re = /[0-9]+/;
  const effectStr = effectStyle.replace(re ,effectLevelValue.value);
  if(effectStr !=='none'){
    preview.setAttribute('style',`filter:${  effectStr}`);
  }
});

onListClick();

