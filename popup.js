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

/* document.getElementById("simulatorStrength").addEventListener("input", function(event) {
  sendMessageToActiveTab({ simulatorStrength: event.target.value });
}); */


//deut strength buttons
document.getElementById("deutZeroB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutZero" });
});
document.getElementById("deutOneB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutOne" });
});
document.getElementById("deutTwoB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutTwo" });
});
document.getElementById("deutThreeB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutThree" });
});
document.getElementById("deutFourB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutFour" });
});
document.getElementById("deutFiveB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutFive" });
});
document.getElementById("deutSixB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutSix" });
});
document.getElementById("deutSevenB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutSeven" });
});
document.getElementById("deutEightB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutEight" });
});
document.getElementById("deutNineB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutNine" });
});
document.getElementById("deutTenB").addEventListener("click", function() {
  sendMessageToActiveTab({ deutSimulation: "deutTen" });
});

//prot strength buttons
document.getElementById("protZeroB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protZero" });
});
document.getElementById("protOneB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protOne" });
});
document.getElementById("protTwoB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protTwo" });
});
document.getElementById("protThreeB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protThree" });
});
document.getElementById("protFourB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protFour" });
});
document.getElementById("protFiveB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protFive" });
});
document.getElementById("protSixB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protSix" });
});
document.getElementById("protSevenB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protSeven" });
});
document.getElementById("protEightB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protEight" });
});
document.getElementById("protNineB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protNine" });
});
document.getElementById("protTenB").addEventListener("click", function() {
  sendMessageToActiveTab({ protSimulation: "protTen" });
});

//trit strength buttons
document.getElementById("tritZeroB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritZero" });
});
document.getElementById("tritOneB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritOne" });
});
document.getElementById("tritTwoB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritTwo" });
});
document.getElementById("tritThreeB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritThree" });
});
document.getElementById("tritFourB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritFour" });
});
document.getElementById("tritFiveB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritFive" });
});
document.getElementById("tritSixB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritSix" });
});
document.getElementById("tritSevenB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritSeven" });
});
document.getElementById("tritEightB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritEight" });
});
document.getElementById("tritNineB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritNine" });
});
document.getElementById("tritTenB").addEventListener("click", function() {
  sendMessageToActiveTab({ tritSimulation: "tritTen" });
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

document.getElementById("imageOnly").addEventListener("change", function(event) {
  sendMessageToActiveTab({ imageOnly: event.target.checked });
});

document.getElementById("darkMode").addEventListener("change", function(event) {
  sendMessageToActiveTab({ darkMode: event.target.checked });
});

document.getElementById("colorPicker").addEventListener("input", function(event) {
  sendMessageToActiveTab({ overlayColor: event.target.value });
});

// Function for sending a message to the active tab
function sendMessageToActiveTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(queryTabs) {
    let currTab = queryTabs[0];
    chrome.tabs.sendMessage(currTab.id, message);
  });
}


/*

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
*/

