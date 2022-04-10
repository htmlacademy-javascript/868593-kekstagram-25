const  LINK_DOWNLOAD = 'https://25.javascript.pages.academy/kekstagram/data';
const LINK_UPLOAD = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess) =>{
  fetch(LINK_DOWNLOAD)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    LINK_UPLOAD,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
