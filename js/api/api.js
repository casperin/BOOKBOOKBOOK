import xhr from 'xhr';

const BASE = '/api/';
const headers = {'Content-Type': 'application/json'};

const wrapCallback = cb => (err, res, body) => {
  try {
    cb(err, JSON.parse(body));
  } catch (e) {
    cb(e);
  }
};

export const get = (url, cb) => {
  xhr({url: BASE + url}, wrapCallback(cb));
};

export const post = (url, data, cb) => {
  xhr({
    url: BASE + url,
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }, wrapCallback(cb));
};

function cb () {}
window.jsonCallback = function jsonCallback (data) {
  cb(data);
}
export const fetchBookData = (isbn, callback) => {
  if (isbn.length !== 10) return;
  cb = callback;
  var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + '&callback=jsonCallback';
  var script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

