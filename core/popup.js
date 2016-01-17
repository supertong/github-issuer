
function renderStatus(msg) {
  document.getElementById('status').textContent = msg;
}

function formUrl(route, token) {
  return 'https://api.github.com' + route + '?access_token=' + token;
}

function retriveIssues(token, callback) {
  var url = formUrl('/issues', token);

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
    var data = JSON.parse(request.responseText);
    callback(null, data);
    } else {
      // We reached our target server, but it returned an error 
      callback(request.status);
    }
  };
        
  request.onerror = function(err) {
    // There was a connection error of some sort
    callback(err);
  };
  
  request.send();
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('token', function(item) {
    if (typeof item === 'undefined') {
      renderStatus('Please set up a token in options');
    }

    var token = item.token;
    retriveIssues(token, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(data);
    })
  });
});












