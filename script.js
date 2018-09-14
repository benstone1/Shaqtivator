window.addEventListener('load', function load(event) {
  setInitialToggleState()
  document.getElementById('ShaqtivateToggle').onclick = function() {
    handleClick()
    }
})

function setInitialToggleState() {
  chrome.storage.sync.get({'ShaqtivateEnabled': ''}, function(result) {
    document.getElementById('ShaqtivateToggle').checked = result.ShaqtivateEnabled
  });
}

function handleClick() {
  chrome.storage.sync.get('ShaqtivateEnabled', function(result) {
    var status = result.ShaqtivateEnabled
    chrome.storage.sync.set({'ShaqtivateEnabled': !result.ShaqtivateEnabled}, function() {
      refreshTab()
    })
  })
}

function refreshTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
  })
}
