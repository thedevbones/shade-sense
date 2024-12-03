////////////////////////////////
// Simulation event listeners //
////////////////////////////////

document.getElementById("noneSim").addEventListener("click", function() {
  saveSetting("simulation", "none");
  sendMessageToActiveTab({ simulation: "none" });
  updateBackgroundGradient("none");
});

document.getElementById("deuteranomalySim").addEventListener("click", function() {
  saveSetting("simulation", "deuteraomaly");
  sendMessageToActiveTab({ simulation: "deuteranomaly" });
  updateBackgroundGradient("deuteranomaly");
});

document.getElementById("protanomalySim").addEventListener("click", function() {
  saveSetting("simulation", "protanomaly");
  sendMessageToActiveTab({ simulation: "protanomaly" });
  updateBackgroundGradient("protanomaly");
});

document.getElementById("tritanomalySim").addEventListener("click", function() {
  saveSetting("simulation", "tritanomaly");
  sendMessageToActiveTab({ simulation: "tritanomaly" });
  updateBackgroundGradient("tritanomaly");
});

document.getElementById("simulatorStrength").addEventListener("input", function(event) {
  saveSetting("simulatorStrength", event.target.value);
  sendMessageToActiveTab({ simulatorStrength: event.target.value });
});

///////////////////////////////
// Daltonize event listeners //
///////////////////////////////

document.getElementById("noneDal").addEventListener("click", function() {
  saveSetting("daltonize", "none");
  sendMessageToActiveTab({ daltonize: "none" });
  updateBackgroundGradient("none");
});

document.getElementById("deuteranomalyDal").addEventListener("click", function() {
  saveSetting("daltonize", "deuteranomaly");
  sendMessageToActiveTab({ daltonize: "deuteranomaly" });
  updateBackgroundGradient("deuteranomaly");
});

document.getElementById("protanomalyDal").addEventListener("click", function() {
  saveSetting("daltonize", "protanomaly");
  sendMessageToActiveTab({ daltonize: "protanomaly" });
  updateBackgroundGradient("protanomaly");
});

document.getElementById("tritanomalyDal").addEventListener("click", function() {
  saveSetting("daltonize", "tritanomaly");
  sendMessageToActiveTab({ daltonize: "tritanomaly" });
  updateBackgroundGradient("tritanomaly");
});

document.getElementById("daltonizationStrength").addEventListener("input", function(event) {
  saveSetting("daltonizationStrength", event.target.value);
  sendMessageToActiveTab({ daltonizationStrength: event.target.value });
});

///////////////////////////
// Popup event listeners //
///////////////////////////

//https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

document.addEventListener("DOMContentLoaded", function() {
  // Just in case, was getting alot of errors
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(["simulation", "simulatorStrength", "daltonize", "daltonizationStrength"], function(data) {
      if (data.simulation) {
        const simElement = document.getElementById(data.simulation + "Sim");
        if (simElement) simElement.checked = true;
      }
      if (data.simulatorStrength !== undefined) {
        const simStrengthElement = document.getElementById("simulatorStrength");
        if (simStrengthElement) simStrengthElement.value = data.simulatorStrength;
      }
      if (data.daltonize) {
        const dalElement = document.getElementById(data.daltonize + "Dal");
        if (dalElement) dalElement.checked = true;
      }
      if (data.daltonizationStrength !== undefined) {
        const dalStrengthElement = document.getElementById("daltonizationStrength");
        if (dalStrengthElement) dalStrengthElement.value = data.daltonizationStrength;
      }
    });
  }
});

///////////////////////////
//    Handy Functions    //
///////////////////////////

// Function for saving state with input
function saveSetting(key, value) {
  const obj = {};
  obj[key] = value;
  chrome.storage.sync.set(obj);
}

// Function for sending a message to the active tab
function sendMessageToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(queryTabs) {
    let currTab = queryTabs[0];
    chrome.tabs.sendMessage(currTab.id, message);
  });
}

function updateBackgroundGradient(type) {
  const body = document.body;
  let gradient;

  switch (type) {
    case "deuteranomaly":
        gradient = "linear-gradient(135deg, #86a3cc, #92c778, #d6d66a, #ccc451)";
        break;
    case "protanomaly":
        gradient = "linear-gradient(135deg, #5a6eb4, #c0a45f, #e2d962, #c7a05e)";
        break;
    case "tritanomaly":
        gradient = "linear-gradient(135deg, #f093a7, #fab7d6, #85cbe9, #b0e3e6)";
        break;
    default:
        gradient = "linear-gradient(135deg, #ff7eb3, #ff758f, #fc6e51, #ffcd57, #7be495, #4ac3ff, #7b87ff, #b17fff)";
        break;
  }

  // https://www.geeksforgeeks.org/how-to-create-gradient-background-animation-using-html-and-css/
  body.style.background = gradient;
  body.style.backgroundSize = "200% 200%";
  body.style.animation = "gradientShift 10s ease infinite";
}