const Fetch = require('whatwg-fetch');

function formUrl(route, token) {
  return 'https://api.github.com' + route + '?access_token=' + token;
}

function retriveIssues(token, callback) {
  var url = formUrl('/repos/TabDigital/backlog-platform-team/issues', token);

  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(err) {
      callback(err);
    });
}

module.exports = {
  retriveIssues: retriveIssues
}
