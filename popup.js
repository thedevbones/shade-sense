//Deuteranomaly event listener
document.getElementById("deuteranomaly").addEventListener("click", function() {
  chrome.tabs.query({
    active: true, 
    currentWindow: true
  }, function (queryTabs) {
    let currTab = queryTabs[0];
    chrome.tabs.sendMessage(
      currTab.id, { 
        thisOne: "applyDeuteranomaly",
      });
  });
});


//Protanomaly event listener
document.getElementById("protanomaly").addEventListener("click", function() {
  chrome.tabs.query({
    active: true, 
    currentWindow: true
  }, function (queryTabs) {
    let currTab = queryTabs[0];
    chrome.tabs.sendMessage(
      currTab.id, { 
        thisOne: "applyProtanomaly",
      });
  });
});
  
  document.getElementById("darkMode").addEventListener("click", function() {
    chrome.tabs.query({
      active: true, 
      currentWindow: true
    }, function (queryTabs) {
      let currTab = queryTabs[0];
      chrome.tabs.sendMessage(
        currTab.id, { 
          makeDark: "darkdark"
        });
    });
  });

  //hey, this will let the user to pick a color for the overlay
  document.getElementById("colorPicker").addEventListener("input", function (event) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (queryTabs) {
        let currTab = queryTabs[0];
        chrome.tabs.sendMessage(currTab.id, { overlayColor: event.target.value });
    });
});
