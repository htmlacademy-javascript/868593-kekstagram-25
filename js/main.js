function getRandomNumber(min, max) {
  min = Math.ceil(min);
  if (min < 0) {
    return console.log('отрицательное значение min');
  }
  max = Math.floor(max);
  if (max < 0) {
    return console.log('отрицательное значение max');
  }
  if (min > max) {
    return console.log('Минимальное значение больше максимального');
  }
  return console.log( Math.floor(Math.random() * (max - min + 1)) + min);
}
getRandomNumber();

function getCommentFieldSize(commentField ,maxLength) {
  const string = document.querySelector(commentField);
  const counter = string.value.length;
  if (counter < maxLength) {
    return console.log('true');
  }
  return console.log('false');
}
getCommentFieldSize();
