chrome.runtime.onMessage.addListener(

  function (request, sender, sendResponse) {
    if (request.simulation === "deuteranomaly") {
      applyDeuteranomaly();
    }
    if (request.simulation === "protanomaly") {
      applyProtanomaly();
    }
    if (request.simulation === "tritanomaly") {
      applyTritanomaly();
    }
    if (request.daltonize === "deuteranomaly") {
      daltonizeDeut();
    }
    if (request.daltonize === "protanomaly") {
      daltonizeProt();
    }
    if (request.daltonize === "tritanomaly") {
      daltonizeTrit();
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

    toDeuteranomaly(oneImage);
  }
}

function toDeuteranomaly(srcImage) {

  const draw = document.createElement("canvas");

  draw.width = srcImage.naturalWidth;
  draw.height = srcImage.naturalHeight;

  if (draw.width == 0 || draw.height == 0) {
    return;
  }

  const context = draw.getContext("2d");

  context.drawImage(srcImage, 0, 0);

  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  let rgb = grabCanvas.data;

  if (srcImage.origrgb != undefined) {
    rgb = srcImage.origrgb.slice();
  } else {
    srcImage.origrgb = rgb.slice();
  }

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
  for (let i = 0; i < rgb.length; i += 4) {
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

  //putImageData(imageData, dx, dy)
  //apply changes to image
  context.putImageData(grabCanvas, 0, 0);

  srcImage.onload = function () {
    //fails without try-catch because image has not loaded
    try {
      context.drawImage(srcImage, 0, 0);
    } catch (e) {
      console.error("error", e);
    }

  };

  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  //apply changes to page
  srcImage.src = draw.toDataURL();
}

/* ******************************************************************************************

  End of Deuteranomaly Simulator

********************************************************************************************* */

/* ******************************************************************************************

  Protanomaly Simulator

********************************************************************************************* */

function applyProtanomaly() {
  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    toProtanomaly(oneImage);

  }
}

function toProtanomaly(srcImage) {

  const draw = document.createElement("canvas");

  draw.width = srcImage.naturalWidth;
  draw.height = srcImage.naturalHeight;

  if (draw.width == 0 || draw.height == 0) {
    return;
  }

  const context = draw.getContext("2d");

  context.drawImage(srcImage, 0, 0);

  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  var rgb = grabCanvas.data;

  for (let i = 0; i < rgb.length; i += 4) {
    const red = rgb[i];
    const green = rgb[i + 1];
    const blue = rgb[i + 2];

    //0.152286 added 1 to see difference
    const newRed = 1.152286 * red + 1.052583 * green + -0.204868 * blue;
    const newGreen = 0.114503 * red + 0.786281 * green + 0.099216 * blue;
    const newBlue = -0.003882 * red + -0.048116 * green + 1.051998 * blue;

    rgb[i] = newRed;
    rgb[i + 1] = newGreen;
    rgb[i + 2] = newBlue;
  }

  context.putImageData(grabCanvas, 0, 0);

  srcImage.onload = function () {
    try {
      context.drawImage(srcImage, 0, 0);
    } catch (e) {
      console.error("error", e);
    }

  };

  srcImage.src = draw.toDataURL();

}

/* ******************************************************************************************

  End of Protanomaly Simulator

********************************************************************************************* */

/* ******************************************************************************************

  Tritanomaly Simulator

********************************************************************************************* */

function applyTritanomaly() {
  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    toTritanomaly(oneImage);

  }
}

function toTritanomaly(srcImage) {

  const draw = document.createElement("canvas");

  draw.width = srcImage.naturalWidth;
  draw.height = srcImage.naturalHeight;

  if (draw.width == 0 || draw.height == 0) {
    return;
  }

  const context = draw.getContext("2d");

  context.drawImage(srcImage, 0, 0);

  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  var rgb = grabCanvas.data;

  for (let i = 0; i < rgb.length; i += 4) {
    const red = rgb[i];
    const green = rgb[i + 1];
    const blue = rgb[i + 2];

    const newRed = 1.255528 * red + -0.076749 * green + -0.178779 * blue;
    const newGreen = -0.078411 * red + 0.930809 * green + 0.147602 * blue;
    const newBlue = 0.004733 * red + 0.691367 * green + 0.303900 * blue;

    rgb[i] = newRed;
    rgb[i + 1] = newGreen;
    rgb[i + 2] = newBlue;
  }

  context.putImageData(grabCanvas, 0, 0);

  srcImage.onload = function () {
    try {
      context.drawImage(srcImage, 0, 0);
    } catch (e) {
      console.error("error", e);
    }

  };

  srcImage.src = draw.toDataURL();

}

/* ******************************************************************************************

  End of Tritanomaly Simulator

********************************************************************************************* */


/* ******************************************************************************************

  Deuteranomaly Daltonize

********************************************************************************************* */

function daltonizeDeut() {
  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    daltDeut(oneImage);
  }
}

function daltDeut(srcImage) {

  const draw = document.createElement("canvas");

  draw.width = srcImage.naturalWidth;
  draw.height = srcImage.naturalHeight;

  if (draw.width == 0 || draw.height == 0) {
    return;
  }

  const context = draw.getContext("2d");

  context.drawImage(srcImage, 0, 0);

  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  let rgb = grabCanvas.data;

  if (srcImage.origrgb != undefined) {
    rgb = srcImage.origrgb.slice();
  } else {
    srcImage.origrgb = rgb.slice();
  }

  for (let i = 0; i < rgb.length; i += 4) {
    const red = rgb[i];
    const green = rgb[i + 1];
    const blue = rgb[i + 2];

    //FIX: NEED TO ADD PROPER VALUES
    const newRed = 0 * red + 0 * green + 0 * blue;
    const newGreen = 0 * red + 0 * green + 0 * blue;
    const newBlue = 0 * red + 0 * green + 0 * blue;

    rgb[i] = newRed;
    rgb[i + 1] = newGreen;
    rgb[i + 2] = newBlue;
  }

  context.putImageData(grabCanvas, 0, 0);

  srcImage.onload = function () {
    try {
      context.drawImage(srcImage, 0, 0);
    } catch (e) {
      console.error("error", e);
    }

  };

  srcImage.src = draw.toDataURL();
}

/* ******************************************************************************************

  End of Deuteranomaly Daltonize

********************************************************************************************* */

/* ******************************************************************************************

  Protanomaly Daltonize

********************************************************************************************* */

function daltonizeProt() {
  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    daltProt(oneImage);

  }
}

function daltProt(srcImage) {

  const draw = document.createElement("canvas");

  draw.width = srcImage.naturalWidth;
  draw.height = srcImage.naturalHeight;

  if (draw.width == 0 || draw.height == 0) {
    return;
  }

  const context = draw.getContext("2d");

  context.drawImage(srcImage, 0, 0);

  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  var rgb = grabCanvas.data;

  for (let i = 0; i < rgb.length; i += 4) {
    const red = rgb[i];
    const green = rgb[i + 1];
    const blue = rgb[i + 2];

    //FIX: NEED TO ADD PROPER VALUES
    const newRed = 0 * red + 0 * green + 0 * blue;
    const newGreen = 0 * red + 0 * green + 0 * blue;
    const newBlue = 0 * red + 0 * green + 0 * blue;

    rgb[i] = newRed;
    rgb[i + 1] = newGreen;
    rgb[i + 2] = newBlue;
  }

  context.putImageData(grabCanvas, 0, 0);

  srcImage.onload = function () {
    try {
      context.drawImage(srcImage, 0, 0);
    } catch (e) {
      console.error("error", e);
    }

  };

  srcImage.src = draw.toDataURL();

}

/* ******************************************************************************************

  End of Protanomaly Daltonize

********************************************************************************************* */

/* ******************************************************************************************

  Tritanomaly Daltonize

********************************************************************************************* */

function daltonizeTrit() {
  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    daltTrit(oneImage);

  }
}

function daltTrit(srcImage) {

  const draw = document.createElement("canvas");

  draw.width = srcImage.naturalWidth;
  draw.height = srcImage.naturalHeight;

  if (draw.width == 0 || draw.height == 0) {
    return;
  }

  const context = draw.getContext("2d");

  context.drawImage(srcImage, 0, 0);

  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  var rgb = grabCanvas.data;

  for (let i = 0; i < rgb.length; i += 4) {
    const red = rgb[i];
    const green = rgb[i + 1];
    const blue = rgb[i + 2];

    //FIX: NEED TO ADD PROPER VALUES
    const newRed = 0 * red + 0 * green + 0 * blue;
    const newGreen = 0 * red + 0 * green + 0 * blue;
    const newBlue = 0 * red + 0 * green + 0 * blue;

    rgb[i] = newRed;
    rgb[i + 1] = newGreen;
    rgb[i + 2] = newBlue;
  }

  context.putImageData(grabCanvas, 0, 0);

  srcImage.onload = function () {
    try {
      context.drawImage(srcImage, 0, 0);
    } catch (e) {
      console.error("error", e);
    }

  };

  srcImage.src = draw.toDataURL();

}

/* ******************************************************************************************

  End of Tritanomaly Daltonize

********************************************************************************************* */
