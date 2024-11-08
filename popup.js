
document.getElementById("toggleButton").addEventListener("click", function() {
    chrome.tabs.query({
      active: true, 
      currentWindow: true
    }, function (queryTabs) {
      let currTab = queryTabs[0];
      chrome.tabs.sendMessage(
        currTab.id, { 
          thisOne: "changeColor",
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
  