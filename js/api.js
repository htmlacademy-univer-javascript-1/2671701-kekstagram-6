const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const DATA_URL = `${SERVER_URL}/data`;

const getPhotos = () =>
  fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }
      return response.json();
    });

const sendFormData = (formData) =>
  fetch(SERVER_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка отправки: ${response.status}`);
      }
      return response.json();
    });

export { getPhotos, sendFormData };
