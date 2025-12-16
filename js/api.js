const REQUEST_TIMEOUT = 10000;

const getBaseUrl = () => document.querySelector('meta[name="baseUrl"]').content;

const buildUrl = (baseUrl, path) => `${baseUrl.replace(/\/$/, '')}${path}`;

const request = (method, url, body = null) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
        return;
      }
      reject(new Error(`Ошибка ${method}: ${xhr.status} ${xhr.statusText}`));
    });

    xhr.addEventListener('error', () => reject(new Error(`Ошибка ${method}: соединение не установлено`)));
    xhr.addEventListener('timeout', () => reject(new Error(`Ошибка ${method}: таймаут ${REQUEST_TIMEOUT}мс`)));

    xhr.open(method, url);
    xhr.send(body);
  });

const getPhotos = () => {
  const baseUrl = getBaseUrl();
  return request('GET', buildUrl(baseUrl, '/data'));
};

const sendFormData = (formData) => {
  const baseUrl = getBaseUrl();
  return request('POST', `${baseUrl.replace(/\/$/, '')}/`, formData);
};

export { getPhotos, sendFormData };
