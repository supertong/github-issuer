function saveOptions() {
  var token = document.querySelector('#token').value;

  chrome.storage.sync.set({'token': token}, function() {
    console.log('Token saved as ' + token)
  })
}

function showTokens() {
  chrome.storage.sync.get('token', function(item) {
    document.querySelector('#token').value = item.token;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#save').addEventListener('click', saveOptions);

  // show tokens in input field
  showTokens();
})


