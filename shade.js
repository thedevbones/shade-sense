
let color = false;
let bg = false;

//let chromaColor = chroma('hotpink');

chrome.runtime.onMessage.addListener(

  function (request, sender, sendResponse) {
    if (request.thisOne === "changeColor") {
      if (color) {
        removeColor();
        color = false;
      } else {
        addColor();
        color = true;
      }
    }
    if (request.makeDark === "darkdark") {
      if (bg){
        document.body.style.backgroundColor = "transparent";
        bg = false;
      } else {
        document.body.style.backgroundColor = "black";
        bg = true;
      }
    }
  
//this will apply the overlay color from color picker
if (request.overlayColor) {
  document.body.style.backgroundColor = request.overlayColor;
  bg = true;
    }
  }
);

function addColor() {
  const filterImage = document.querySelectorAll("img, video"); // what else?
  for (let i = 0; i < filterImage.length; i++) {
    filterImage[i].style.filter = "grayscale(100%)";
  }
}

function removeColor() {
  const filterImage = document.querySelectorAll("img, video");
  for (let i = 0; i < filterImage.length; i++) {
    filterImage[i].style.filter = "none";
  }
}