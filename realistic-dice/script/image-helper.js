var resize = function(url, callback) {
    var image = new Image();
    image.onload = function (imageEvent) {

    // Resize the image
    var canvas = document.createElement('canvas'),
    max_size = 32,// TODO : pull max size from a site config
    width = image.width,
    height = image.height;
    if (width > height) {
       if (width > max_size) {
           height *= max_size / width;
           width = max_size;
       }
   } else {
       if (height > max_size) {
           width *= max_size / height;
           height = max_size;
       }
   }
   canvas.width = width;
   canvas.height = height;
   canvas.getContext('2d').drawImage(image, 0, 0, width, height);
       var dataUrl = canvas.toDataURL('image/jpeg');
       callback(dataUrl)
   }
   image.src = url;
}

var cropSquare = function(url, callback) {
    var image = new Image();
    image.onload = function (imageEvent) {

    // Resize the image
    var canvas = document.createElement('canvas');
    canvas.width = numPixels;
    canvas.height = numPixels;

    max_size = numPixels,// TODO : pull max size from a site config
    width = image.width,
    height = image.height;
    offsetX = 0;
    offsetY = 0;

    if (width > height) {
       if (height > max_size) {
           width *= max_size / height;
           height = max_size;
       }
       offsetX = ((width-max_size)/2)*-1;
       //console.log(offsetX, width, height);
   } else {
       if (width > max_size) {
           height *= max_size / width;
           width = max_size;
       }
       offsetY = ((height-max_size)/2)*-1;
   }
   //canvas.width = width;
   //canvas.height = height;
   canvas.getContext('2d').drawImage(
       image, offsetX, offsetY, width, height);
       var dataUrl = canvas.toDataURL('image/jpeg');
       callback(dataUrl)
   }
   image.src = url;
}