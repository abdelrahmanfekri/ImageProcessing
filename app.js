
//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}
//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
  const increaseContrastForm = document.getElementById("increaseContrastForm");
  const decreaseContrastForm = document.getElementById("decreaseContrastForm");
  const Inverse = document.getElementById("Inverse");
  
  //Write your code here for the other forms

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInput").style.display = "none";

  } else if (transformType == "Decrease Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInput").style.display = "none";
  
  } else if (transformType == "Increase Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInput").style.display = "none";

  } else if (transformType == "Decrease Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial";
    document.getElementById("InverseInput").style.display = "none";

  }
  else if(transformType == "Inverse")
  {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("InverseInput").style.display = "initial";
  }

  Inverse.addEventListener("submit", (e) => {
    e.preventDefault()
    Brightness(255,true,true);
  });
  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib").value
    try{
      ib = Number(ib);
    }
    catch(err){
      alert("Please add Integer Number");
      return;
    }
    Brightness(Number(ib),true,false);
  });
  //Write your code here for EventListeners for the other forms using the constants you will create in the transform function
  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib1").value
    try{
      ib = Number(ib);
    }
    catch(err){
      alert("Please add Integer Number");
      return;
    }
    Brightness(ib,false,false);
  });

  increaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var X1 = document.getElementById("ICX1").value
    var X2 = document.getElementById("ICX2").value
    var Y1 = document.getElementById("ICY1").value
    var Y2 = document.getElementById("ICY2").value
    try{
      X1 = Number(X1);
      X2 = Number(X2);
      Y1 = Number(Y1);
      Y2 = Number(Y2);
    }
    catch(err){
      alert("Please add Integer Number");
      return;
    }
    Constrast(X1,X2,Y1,Y2);
  });

  decreaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var X1 = document.getElementById("DCX1").value
    var X2 = document.getElementById("DCX2").value
    var Y1 = document.getElementById("DCY1").value
    var Y2 = document.getElementById("DCY2").value
    try{
      X1 = Number(X1);
      X2 = Number(X2);
      Y1 = Number(Y1);
      Y2 = Number(Y2);
    }
    catch(err){
      alert("Please add Integer Number");
      return;
    }
    Constrast(X1,X2,Y1,Y2);
  });

  //Applies pixel-wise transformations to increase brightness
  function Brightness(ib,increase,Inverse) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;
    let vactor = 1;
    if(Inverse){
      vactor = -1;
    }
    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);
    if(!increase){
        ib = -1*ib;
    }
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = vactor * rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
      else if(val<0){
        val = 0;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }
   
  function Constrast(X1,X2,Y1,Y2){
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);
    var slope1 = (Y1/X1*1.0);
    var slope2 = (Y2-Y1)/(X2-X1);
    var slope3 = (255-Y2)/(255-X2);
    for(let i =0;i<img.width * img.height * 4;i+=4){
        var value = rgba[i];
        if(value<=X1){
           value = value * slope1;
        }
        else if(value >X1 && value <= X2){
          value = (value-X1) * slope2 + Y1;
        }
        else if(value >X2 && value <= 255){
          value = (value - X2) * slope3 + Y2;
        }
        transformedImage.push(value,value,value,rgba[i+3]);
    }
    displayResultImage(img, transformedImage, ctx);
  }
  //Write your code here for three more functions for the other transformations



  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }
}  