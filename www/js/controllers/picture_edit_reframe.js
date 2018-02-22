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
ctx.drawImage(img, 0, 0, c.width,c.height);
var base64String = c.toDataURL();

//alert(base64String);


    // const type = mobile.passedData.base64PictureData.match(/image\/[^;]+/);
    // const base64 = mobile.passedData.base64PictureData.replace(/^[^,]+,/, '');
    // const arrayBuffer = new ArrayBuffer(base64.length);
    // const typedArray = new Uint8Array(arrayBuffer);

    // for (let i = 0; i < base64.length; i++) {
        // typedArray[i] = base64.charCodeAt(i);
    // }
	
b64toBlob(base64String,
  
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
           console.log('yay!');
		   SpinnerPlugin.activityStop();
							 alert('Image Uploaded');
                            showNotification("Image saved successfully");
       }
       else{
           console.log('not successful');
    
                    SpinnerPlugin.activityStop();
                              alert('not Uploaded');
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
    alert("uploading to AWS...");
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = awscreds.accessKeyId;
    AWS.config.secretAccessKey = awscreds.secretAccessKey;
    AWS.config.region = 'us-east-2';
    let s3 = new AWS.S3();
    var d = new Date();
    var t = d.getTime();
    let options = {Bucket: 'selfiecausebucket', Key: 'myFile' + t + '.jpg', Body: blob };// <--
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


