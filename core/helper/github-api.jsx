const Fetch = require('whatwg-fetch');

function formUrl(route, token) {
  return 'https://api.github.com' + route + '?access_token=' + token;
}

function retriveIssues(token, repos, callback) {
  var promiseAll = repos.split(',').map(function(repo) {
    const url = formUrl('/repos/' + repo + '/issues', token);
    return fetch(url)
      .then(function(res) {
        return res.json();
      })
      .catch(function(err) {
        //console.log(err);
      })
  });

  Promise.all(promiseAll)
    .then(function(value) {
      var issueList = [];
      value.forEach(function(data) {
        if (data.message === 'Not Found') {
          return ;
        }
        issueList = issueList.concat(data);
      });
      callback(null, issueList);
    })
    .catch(function(err) {
      callback(err);
    });
}

module.exports = {
  retriveIssues: retriveIssues
}
