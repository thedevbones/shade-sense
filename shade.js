var typeCB;

chrome.runtime.onMessage.addListener(

  function (request, sender, sendResponse) {

    if(request.simulation === "none"){
      applyDeuteranomaly(0);
    }

    var num = request.simulatorStrength;

    if (request.simulation === "deuteranomaly") {
      typeCB = "deuteranomaly";
      applyDeuteranomaly(10);
    }
    if (request.simulation === "protanomaly") {
      typeCB = "protanomaly";
      applyProtanomaly(10);
    }
    if (request.simulation === "tritanomaly") {
      typeCB = "tritanomaly";
      applyTritanomaly(10);
    }

    if (num) {
      var x = Number(num);
      if (typeCB == "deuteranomaly") {
        applyDeuteranomaly(x);
      } else if (typeCB == "protanomaly") {
        applyProtanomaly(x);
      } else {
        applyTritanomaly(x);
      }
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

function applyDeuteranomaly(val) {
  var arr;

  //https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
  const zeroDeut = [1.000000, 0.000000, -0.000000, 0.000000, 1.000000, 0.000000, -0.000000, -0.000000, 1.000000];
  const oneDeut = [0.866435, 0.177704, -0.044139, 0.049567, 0.939063, 0.011370, -0.003453, 0.007233, 0.996220];
  const twoDeut = [0.760729, 0.319078, -0.079807, 0.090568, 0.889315, 0.020117, -0.006027, 0.013325, 0.992702];
  const threeDeut = [0.675425, 0.433850, -0.109275, 0.125303, 0.847755, 0.026942, -0.007950, 0.018572, 0.989378];
  const fourDeut = [0.605511, 0.528560, -0.134071, 0.155318, 0.812366, 0.032316, -0.009376, 0.023176, 0.986200];
  const fiveDeut = [0.547494, 0.607765, -0.155259, 0.181692, 0.781742, 0.036566, -0.010410, 0.027275, 0.983136];
  const sixDeut = [0.498864, 0.674741, -0.173604, 0.205199, 0.754872, 0.039929, -0.011131, 0.030969, 0.980162];
  const sevenDeut = [0.457771, 0.731899, -0.189670, 0.226409, 0.731012, 0.042579, -0.011595, 0.034333, 0.977261];
  const eightDeut = [0.422823, 0.781057, -0.203881, 0.245752, 0.709602, 0.044646, -0.011843, 0.037423, 0.974421];
  const nineDeut = [0.392952, 0.823610, -0.216562, 0.263559, 0.690210, 0.046232, -0.011910, 0.040281, 0.971630];
  const tenDeut = [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.011820, 0.042940, 0.968881];

  switch (val) {
    case 0:
      arr = zeroDeut;
      break;
    case 1:
      arr = oneDeut;
      break;
    case 2:
      arr = twoDeut;
      break;
    case 3:
      arr = threeDeut;
      break;
    case 4:
      arr = fourDeut;
      break;
    case 5:
      arr = fiveDeut;
      break;
    case 6:
      arr = sixDeut;
      break;
    case 7:
      arr = sevenDeut;
      break;
    case 8:
      arr = eightDeut;
      break;
    case 9:
      arr = nineDeut;
      break;
    case 10:
      arr = tenDeut;
      break;
  }

  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    //https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
    //because of cors error
    oneImage.crossOrigin = "Anonymous";

    toDeuteranomaly(oneImage, arr);
  }
}

function toDeuteranomaly(srcImage, arr) {

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

    /*
    //https://www.geeksforgeeks.org/how-to-multiply-a-3-x-3-matrix-with-a-3-x-1-matrix/
    const newRed = 0.367322 * red + 0.860646 * green + -0.227968 * blue;
    const newGreen = 0.280085 * red + 0.672501 * green + 0.047413 * blue;
    const newBlue = -0.011820 * red + 0.042940 * green + 0.968881 * blue;
    */
    const newRed = arr[0] * red + arr[1] * green + arr[2] * blue;
    const newGreen = arr[3] * red + arr[4] * green + arr[5] * blue;
    const newBlue = arr[6] * red + arr[7] * green + arr[8] * blue;

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

function applyProtanomaly(val) {
  var arr;

  const zeroProt = [1.000000, 0.000000, -0.000000, 0.000000, 1.000000, 0.000000, -0.000000, -0.000000, 1.000000];
  const oneProt = [0.856167, 0.182038, -0.038205, 0.029342, 0.955115, 0.015544, -0.002880, -0.001563, 1.004443];
  const twoPro = [0.734766, 0.334872, -0.069637, 0.051840, 0.919198, 0.028963, -0.004928, -0.004209, 1.009137];
  const threeProt = [0.630323, 0.465641, -0.095964, 0.069181, 0.890046, 0.040773, -0.006308, -0.007724, 1.014032];
  const fourProt = [0.539009, 0.579343, -0.118352, 0.082546, 0.866121, 0.051332, -0.007136, -0.011959, 1.019095];
  const fiveProt = [0.458064, 0.679578, -0.137642, 0.092785, 0.846313, 0.060902, -0.007494, -0.016807, 1.024301];
  const sixProt = [0.385450, 0.769005, -0.154455, 0.100526, 0.829802, 0.069673, -0.007442, -0.022190, 1.029632];
  const sevenProt = [0.319627, 0.849633, -0.169261, 0.106241, 0.815969, 0.077790, -0.007025, -0.028051, 1.035076];
  const eightProt = [0.259411, 0.923008, -0.182420, 0.110296, 0.804340, 0.085364, -0.006276, -0.034346, 1.040622];
  const nineProt = [0.203876, 0.990338, -0.194214, 0.112975, 0.794542, 0.092483, -0.005222, -0.041043, 1.046265];
  const tenProt = [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998];

  switch (val) {
    case 0:
      arr = zeroProt;
      break;
    case 1:
      arr = oneProt;
      break;
    case 2:
      arr = twoPro;
      break;
    case 3:
      arr = threeProt;
      break;
    case 4:
      arr = fourProt;
      break;
    case 5:
      arr = fiveProt;
      break;
    case 6:
      arr = sixProt;
      break;
    case 7:
      arr = sevenProt;
      break;
    case 8:
      arr = eightProt;
      break;
    case 9:
      arr = nineProt;
      break;
    case 10:
      arr = tenProt;
      break;
  }

  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    toProtanomaly(oneImage, arr);

  }
}

function toProtanomaly(srcImage, arr) {

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

    const newRed = arr[0] * red + arr[1] * green + arr[2] * blue;
    const newGreen = arr[3] * red + arr[4] * green + arr[5] * blue;
    const newBlue = arr[6] * red + arr[7] * green + arr[8] * blue;

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

function applyTritanomaly(val) {

  var arr;

  const zeroTrit = [1.000000, 0.000000, -0.000000, 0.000000, 1.000000, 0.000000, -0.000000, -0.000000, 1.000000];
  const oneTrit = [0.926670, 0.092514, -0.019184, 0.021191, 0.964503, 0.014306, 0.008437, 0.054813, 0.936750];
  const twoTrit = [0.895720, 0.133330, -0.029050, 0.029997, 0.945400, 0.024603, 0.013027, 0.104707, 0.882266];
  const threeTrit = [0.905871, 0.127791, -0.033662, 0.026856, 0.941251, 0.031893, 0.013410, 0.148296, 0.838294];
  const fourTrit = [0.948035, 0.089490, -0.037526, 0.014364, 0.946792, 0.038844, 0.010853, 0.193991, 0.795156];
  const fiveTrit = [1.017277, 0.027029, -0.044306, -0.006113, 0.958479, 0.047634, 0.006379, 0.248708, 0.744913];
  const sixTrit = [1.104996, -0.046633, -0.058363, -0.032137, 0.971635, 0.060503, 0.001336, 0.317922, 0.680742];
  const sevenTrit = [1.193214, -0.109812, -0.083402, -0.058496, 0.979410, 0.079086, -0.002346, 0.403492, 0.598854];
  const eightTrit = [1.257728, -0.139648, -0.118081, -0.078003, 0.975409, 0.102594, -0.003316, 0.501214, 0.502102];
  const nineTrit = [1.278864, -0.125333, -0.153531, -0.084748, 0.957674, 0.127074, -0.000989, 0.601151, 0.399838];
  const tenTrit = [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.303900];

  switch (val) {
    case 0:
      arr = zeroTrit;
      break;
    case 1:
      arr = oneTrit;
      break;
    case 2:
      arr = twoTrit;
      break;
    case 3:
      arr = threeTrit;
      break;
    case 4:
      arr = fourTrit;
      break;
    case 5:
      arr = fiveTrit;
      break;
    case 6:
      arr = sixTrit;
      break;
    case 7:
      arr = sevenTrit;
      break;
    case 8:
      arr = eightTrit;
      break;
    case 9:
      arr = nineTrit;
      break;
    case 10:
      arr = tenTrit;
      break;
  }

  const filterImages = document.querySelectorAll("img, video, canvas, svg, iframe, object");

  for (let i = 0; i < filterImages.length; i++) {
    const oneImage = filterImages[i];

    oneImage.crossOrigin = "Anonymous";

    toTritanomaly(oneImage, arr);

  }
}

function toTritanomaly(srcImage, arr) {

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

    const newRed = arr[0] * red + arr[1] * green + arr[2] * blue;
    const newGreen = arr[3] * red + arr[4] * green + arr[5] * blue;
    const newBlue = arr[6] * red + arr[7] * green + arr[8] * blue;

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
function daltonize(srcImage, toDaltonize) {

  if (toDaltonize == 1) {
    toDaltonize = deuteranomaly;
  } else if (toDaltonize == 2) {
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

    /*
    TODO: ORIGINAL VALUES
    rr = (0.0 * r) + (0.0 * g) + (0.0 * b);
    gg = (0.7 * r) + (1.0 * g) + (0.0 * b);
    bb = (0.7 * r) + (0.0 * g) + (1.0 * b);
    */

    //TODO: Added 0.5 to r to 0.5 to g and 0 to b
    //have to press prot daltonization then deuter daltonization to see effect, why?
    rr = (0.0 * r) + (0.0 * g) + (0.0 * b);
    gg = (1.2 * r) + (1.5 * g) + (0.0 * b);
    bb = (1.2 * r) + (0.0 * g) + (1.0 * b);

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