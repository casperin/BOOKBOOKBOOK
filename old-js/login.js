const xhr = require('xhr');

document.querySelector('.submit-btn').addEventListener('click', function (e) {
  const email = document.querySelector('.email-input').value;
  console.log(email);
  xhr({
    headers: {'Content-Type': 'application/json'},
    url: '/get-token',
    body: JSON.stringify({email}),
    method: 'POST'
  }, (err, res, body) => {
    if (err) throw err;
    window.location.href = '/';
  });
}, false);

