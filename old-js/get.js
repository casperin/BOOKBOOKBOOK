/**
 * About a lo-fi as you can possibly get.
 */

function cb () {}

window.jsonCallback = function jsonCallback (data) {
  cb(data);
}

export default function get (isbn, callback) {
  if (isbn.length != 10) return;
  cb = callback;
  var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + '&callback=jsonCallback';
  var script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}


