$(document).ready(function () {
    $("#img").attr("src", mobile.passedData.base64PictureData);
	
    $("#btn_back").on("click", function () {
        LoadView("photo", null, mobile.passedData, "down");
    });

    $("#btn_save").on("click", function () {
        SpinnerPlugin.activityStart("Saving...", options);
        var data = { action: "awscreds" };
    
    callApi(data, "GET", function success(d) {
      //     alert('api call success ' + d.accessKeyId);
          

    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var img = document.getElementById('img');
    ctx.drawImage(img, 0, 0);
    var base64String = c.toDataURL();


    // const type = mobile.passedData.base64PictureData.match(/image\/[^;]+/);
    // const base64 = mobile.passedData.base64PictureData.replace(/^[^,]+,/, '');
    // const arrayBuffer = new ArrayBuffer(base64.length);
    // const typedArray = new Uint8Array(arrayBuffer);

    // for (let i = 0; i < base64.length; i++) {
        // typedArray[i] = base64.charCodeAt(i);
    // }
	
b64toBlob(mobile.passedData.base64PictureData,
   function(blob) {
    var url = window.URL.createObjectURL(blob);
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", url, true );
    xhr.responseType = "arraybuffer";
    xhr.onload = function( ev ) {
    // Obtain a blob: URL for the image data.
    var arrayBufferView = new Uint8Array( this.response );
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
   };
   
   xhr.send();

 
  uploadToS3(blob,d, function (err, data) {
	 if (data) {
		    SpinnerPlugin.activityStop();
            showNotification("Image saved successfully");
       }
       else{
            SpinnerPlugin.activityStop();
            showNotification("Unable to save image");
	    }
   });

       // do something with url
   }, function(error) {
       // handle error
	    console.log('n');
	    });
        }, function error(d) {
            SpinnerPlugin.activityStop();
            showNotification("Network error, please check your internet connection");
        });
    });
});

function b64toBlob(b64, onsuccess, onerror) {
    var img = new Image();
    img.onerror = onerror;
    img.onload = function onload() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(onsuccess);
    };
}

function uploadToS3(blob, awscreds, callback) {
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = awscreds.accessKeyId;
    AWS.config.secretAccessKey = awscreds.secretAccessKey;
    AWS.config.region = 'us-east-2';
    var id = localStorage.getItem("id"); // current user id, appropriate album name will be created
    let s3 = new AWS.S3();
    createAlbum(id, s3);
    var d = new Date();
    var t = d.getTime();
    let options = { Bucket: 'selfiecausebucket', Key: encodeURIComponent(id) + '/myFile' + t + '.jpg', Body: blob };// <--
    s3.upload(options, callback);
}

function b64toBlob(b64, onsuccess, onerror) {
    var img = new Image();
    img.onerror = onerror;
    img.onload = function onload() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(onsuccess);
    };
    img.src = b64;
}

function createAlbum(albumName, s3) {
    albumName = albumName.trim();
    var albumKey = encodeURIComponent(albumName) + '/';
    s3.headObject({ Key: albumKey }, function (err, data) {
        if (!err) {
            return true;
        }
        if (err.code !== 'NotFound') {
            return false;
        }
        s3.putObject({ Key: albumKey }, function (err, data) {
            if (err) {
                return false;
            }
        });
    });
}


