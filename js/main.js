function getRandomNumber(min, max) {
  min = Math.ceil(min);
  if (min < 0) {
    // eslint-disable-next-line no-console
    console.log('отрицательное значение min');
    return;
  }
  max = Math.floor(max);
  if (max < 0) {
    // eslint-disable-next-line no-console
    console.log('отрицательное значение max');
    return;
  }
  if (min > max) {
    // eslint-disable-next-line no-console
    console.log('Минимальное значение больше максимального');
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber();

function getCommentFieldSize(commentField ,maxLength) {
  const string = document.querySelector(commentField);
  const counter = string.value.length;
  if (counter < maxLength) {
    return true;
  }
  // eslint-disable-next-line no-console
  return false;
}
getCommentFieldSize();
