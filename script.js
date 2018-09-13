window.addEventListener('load', function load(event) {

  var currentValue;

  chrome.storage.sync.get({'ShaqtivateEnabled': ''}, function(result) {
    var status = result.ShaqtivateEnabled
    if (status === 'enabled') {
      currentValue = 'enabled'
      document.getElementById('ShaqtivateToggle').checked = true
    }
    if (status === 'disabled') {
      currentValue = 'disabled'
      document.getElementById('ShaqtivateToggle').checked = false
    }
  });

    document.getElementById('ShaqtivateToggle').onclick = function() {

      // window.open(`mailto:""?subject=""&body=""`);

      chrome.storage.sync.get('ShaqtivateEnabled', function(result) {
        var newValue
        var status = result.ShaqtivateEnabled
        // alert("The value currently is set to " + currentValue)
        if (status === "enabled") {
          newValue = "disabled" }
        else if (status === "disabled") {
          newValue = "enabled"
        }
        else {
          newValue = "enabled"
        }
        // alert("the new value is " + newValue)
        chrome.storage.sync.set({'ShaqtivateEnabled': newValue}, function() {
          if (chrome.runtime.error) {
            alert("Runtime error.");
          }
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
          });
        })
      })
    }
})
