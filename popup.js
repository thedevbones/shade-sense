////////////////////////////////
// Simulation event listeners //
////////////////////////////////

document.getElementById("noneSim").addEventListener("click", function() {
  sendMessageToActiveTab({ simulation: "none" });
});

document.getElementById("deuteranomalySim").addEventListener("click", function() {
  sendMessageToActiveTab({ simulation: "deuteranomaly" });
});

document.getElementById("protanomalySim").addEventListener("click", function() {
  sendMessageToActiveTab({ simulation: "protanomaly" });
});

document.getElementById("tritanomalySim").addEventListener("click", function() {
  sendMessageToActiveTab({ simulation: "tritanomaly" });
});

document.getElementById("simulatorStrength").addEventListener("input", function(event) {
  sendMessageToActiveTab({ simulatorStrength: event.target.value });
});

///////////////////////////////
// Daltonize event listeners //
///////////////////////////////

document.getElementById("noneDal").addEventListener("click", function() {
  sendMessageToActiveTab({ daltonize: "none" });
});

document.getElementById("deuteranomalyDal").addEventListener("click", function() {
  sendMessageToActiveTab({ daltonize: "deuteranomaly" });
});

document.getElementById("protanomalyDal").addEventListener("click", function() {
  sendMessageToActiveTab({ daltonize: "protanomaly" });
});

document.getElementById("tritanomalyDal").addEventListener("click", function() {
  sendMessageToActiveTab({ daltonize: "tritanomaly" });
});

document.getElementById("daltonizationStrength").addEventListener("input", function(event) {
  sendMessageToActiveTab({ daltonizationStrength: event.target.value });
});

///////////////////////////
// Misc event listeners //
///////////////////////////

/*document.getElementById("imageOnly").addEventListener("change", function(event) {
  sendMessageToActiveTab({ imageOnly: event.target.checked });
});

document.getElementById("darkMode").addEventListener("change", function(event) {
  sendMessageToActiveTab({ darkMode: event.target.checked });
});

document.getElementById("colorPicker").addEventListener("input", function(event) {
  sendMessageToActiveTab({ overlayColor: event.target.value });
});*/

// Function for sending a message to the active tab
function sendMessageToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(queryTabs) {
    let currTab = queryTabs[0];
    chrome.tabs.sendMessage(currTab.id, message);
  });
}