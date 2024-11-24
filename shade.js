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
      applyDaltonization(1);
    }
    if (request.daltonize === "protanomaly") {
      applyDaltonization(2);
    }
    if (request.daltonize === "tritanomaly") {
      applyDaltonization(3);
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


  if (srcImage.origImage == undefined) {
    srcImage.origImage = document.createElement("canvas");
    srcImage.origImage.width = srcImage.naturalWidth;
    srcImage.origImage.height = srcImage.naturalHeight;
    const ctx = srcImage.origImage.getContext("2d");
    ctx.drawImage(srcImage, 0, 0);
  }

  const context = draw.getContext("2d");
  context.drawImage(srcImage.origImage, 0, 0);


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

  if (srcImage.origImage == undefined) {
    srcImage.origImage = document.createElement("canvas");
    srcImage.origImage.width = srcImage.naturalWidth;
    srcImage.origImage.height = srcImage.naturalHeight;
    const ctx = srcImage.origImage.getContext("2d");
    ctx.drawImage(srcImage, 0, 0);
  }

  const context = draw.getContext("2d");
  context.drawImage(srcImage.origImage, 0, 0);


  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  let rgb = grabCanvas.data;

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

  if (srcImage.origImage == undefined) {
    srcImage.origImage = document.createElement("canvas");
    srcImage.origImage.width = srcImage.naturalWidth;
    srcImage.origImage.height = srcImage.naturalHeight;
    const ctx = srcImage.origImage.getContext("2d");
    ctx.drawImage(srcImage, 0, 0);
  }

  const context = draw.getContext("2d");
  context.drawImage(srcImage.origImage, 0, 0);


  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  let rgb = grabCanvas.data;

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

Daltonize

********************************************************************************************* */

function applyDaltonization(num) {
  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    daltonize(oneImage, num);

  }
}

//https://stacks.stanford.edu/file/druid:yj296hj2790/Woods_Assisting_Color_Blind_Viewers.pdf
const deuteranomaly = [1.0, 0.0, 0.0, 0.494207, 0.0, 1.24827, 0.0, 0.0, 1.0];
const protanomaly = [0.0, 2.02344, -2.52581, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
const tritanomaly = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.395913, 0.801109, 0.0];

//https://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf
function daltonize(srcImage,toDaltonize) {

  if (toDaltonize == 1){
    toDaltonize = deuteranomaly;
  } else if (toDaltonize == 2){
    toDaltonize = protanomaly;
  } else {
    toDaltonize = tritanomaly;
  }

  //console.log(toDaltonize);

  const draw = document.createElement("canvas");

  draw.width = srcImage.naturalWidth;
  draw.height = srcImage.naturalHeight;

  if (draw.width == 0 || draw.height == 0) {
    return;
  }


  if (srcImage.origImage == undefined) {
    srcImage.origImage = document.createElement("canvas");
    srcImage.origImage.width = srcImage.naturalWidth;
    srcImage.origImage.height = srcImage.naturalHeight;
    const ctx = srcImage.origImage.getContext("2d");
    ctx.drawImage(srcImage, 0, 0);
  }

  const context = draw.getContext("2d");
  context.drawImage(srcImage.origImage, 0, 0);


  const grabCanvas = context.getImageData(0, 0, draw.width, draw.height);

  let rgb = grabCanvas.data;

  var L, M, S, simL, simM, simS, r, g, b, red, green, blue, rr, gg, bb;

  for (let i = 0; i < rgb.length; i += 4) {
    var red = rgb[i];
    var green = rgb[i + 1];
    var blue = rgb[i + 2];

		L = (17.8824 * red) + (43.5161 * green) + (4.11935 * blue);
		M = (3.45565 * red) + (27.1554 * green) + (3.86714 * blue);
		S = (0.0299566 * red) + (0.184309 * green) + (1.46709 * blue);
    simL = (toDaltonize[0] * L) + (toDaltonize[1] * M) + (toDaltonize[2] * S);
    simM = (toDaltonize[3] * L) + (toDaltonize[4] * M) + (toDaltonize[5] * S);
    simS = (toDaltonize[6] * L) + (toDaltonize[7] * M) + (toDaltonize[8] * S);

    r = (0.0809444479 * simL) + (-0.130504409 * simM) + (0.116721066 * simS);
		g = (-0.0102485335 * simL) + (0.0540193266 * simM) + (-0.113614708 * simS);
		b = (-0.000365296938 * simL) + (-0.00412161469 * simM) + (0.693511405 * simS);
    r = (red - r);
    g = (green - g);
    b = (blue - b);

    //TODO: Added 1 to 0.7 and 1.0
    //have to press prot daltonization then deuter daltonization to see effect, why?
    rr = (0.0 * r) + (0.0 * g) + (0.0 * b);
		gg = (1.7 * r) + (2.0 * g) + (0.0 * b);
		bb = (1.7 * r) + (0.0 * g) + (2.0 * b);
    r = rr + red;
    g = gg + green;
    b = bb + blue;

    rgb[i] = Math.min(255, Math.max(0, r));
    rgb[i + 1] = Math.min(255, Math.max(0, g));
    rgb[i + 2] = Math.min(255, Math.max(0, b));
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