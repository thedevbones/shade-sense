chrome.runtime.onMessage.addListener(

  function (request, sender, sendResponse) {
    if (request.simulation === "deuteranomaly") {
      applyDeuteranomaly();
    }
  }
);

/* ******************************************************************************************

  Deuteranomaly Simulator

********************************************************************************************* */

function applyDeuteranomaly() {
  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];
    
    //https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
    //because of cors error
    oneImage.crossOrigin = "Anonymous";

    //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
    //drawImage, getImageData,putImageData built in functions
    oneImage.onload = function () {
      //fails without try-catch because image has not loaded
      try {
        //on load we want to draw (drawImage, getImageData)
        const thisImage = drawCanvas(oneImage);
        //create the rgb value, how to apply the changes (putImageData)
        const changeDeuter = toDeuteranomaly(thisImage, oneImage);

      } catch (e) {
        console.error("error line 53", e);
      }
    };
  }
}

function drawCanvas(image) {

  //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
  //create canvas
  const draw = document.createElement("canvas");
  const ctx = draw.getContext("2d");

  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  //setting the drawing dimensions
  draw.width = image.naturalWidth;
  draw.height = image.naturalHeight;
  //drawImage(image, x, y, width, height)
  //draw image on coordinate
  ctx.drawImage(image, 0, 0);

  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
  //to grab the canvas to return
  const grabCanvas = ctx.getImageData(0, 0, draw.width, draw.height);

  return grabCanvas;
}

function toDeuteranomaly(oneImage, srcImage) {
  const rgb = oneImage.data;
  /*
  const deuterMatrix = {
    deuter: [
      0.367322, 0.860646, -0.227968,
      0.280085, 0.672501, 0.047413,
      -0.011820, 0.042940, 0.968881
    ]
  };*/

  //https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43
  //every 4th pixels for "full alpha", alpha channel
  for (let i = 0; i < rgb.length; i+=4) {
    const red = rgb[i];
    const green = rgb[i + 1];
    const blue = rgb[i + 2];

    //https://www.geeksforgeeks.org/how-to-multiply-a-3-x-3-matrix-with-a-3-x-1-matrix/
    const newRed = 0.367322 * red + 0.860646 * green + -0.227968 * blue;
    const newGreen = 0.280085 * red + 0.672501 * green + 0.047413 * blue;
    const newBlue = -0.011820 * red + 0.042940 * green + 0.968881 * blue;

    rgb[i] = newRed;
    rgb[i + 1] = newGreen;
    rgb[i + 2] = newBlue;
  }

  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
  //to apply the changes to the images and such
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  //putImageData(imageData, dx, dy)
  //apply changes to image
  ctx.putImageData(oneImage, 0, 0);

  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  //apply changes to page
  srcImage.src = canvas.toDataURL();
}

/* ******************************************************************************************

  End of Deuteranomaly Simulator

********************************************************************************************* */



/* doesnt work anymore, need to find a way to remove 
    or just work on other buttons
*/

function removeColor() {
  const filterImage = document.querySelectorAll("img, video, canvas, svg, iframe, object");
  for (let i = 0; i < filterImage.length; i++) {
    filterImage[i].style.filter = "none";
  }
}