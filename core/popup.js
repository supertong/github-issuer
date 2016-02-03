'use strict';
function renderStatus(msg) {
  document.getElementById('status').textContent = msg;
}

function formUrl(route, token) {
  return 'https://api.github.com' + route + '?access_token=' + token;
}

function retriveIssues(token, callback) {
  var url = formUrl('/repos/TabDigital/backlog-platform-team/issues', token);

  console.log('url is ' + url);

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
        renderStatus('Something wrong~');
        console.log(err);
        return;
      }

      renderStatus(`${data.length} issues found`);
      console.log('data is following...');
      console.log(data);

      // Inserting data into html list
      for (let i = 0; i < data.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML=`${data[i].title} <button class="button" id="clipcopy${i}" data-clipboard-text="${data[i].url}">Copy link</button>`;

        let clipboard = new Clipboard(`#clipcopy${i}`);

        clipboard.on('success', function(e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);

          e.clearSelection();
        });

        clipboard.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
        document.getElementById('issue-result-list').appendChild(listItem);
      }
    })
  });
});
