function saveOptions() {
  var token = document.querySelector('#token').value;

  chrome.storage.sync.set({'token': token}, function() {
    console.log('Token saved as ' + token)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#save').addEventListener('click', saveOptions);
})


