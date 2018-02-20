$(document).ready(function () {
    $("#img").attr("src", mobile.passedData.base64PictureData);
    $("#btn_back").on("click", function () {
        LoadView("camera", null, data.campaignid, "down");
    });

    $("#btn_save").on("click", function () {
        SpinnerPlugin.activityStart("Saving...", options);
        var data = { action: "awscreds" };
        callApi(data, "GET", function success(d) {
            b64toBlob(mobile.passedData.base64PictureData,
                function (blob) {
                    var url = window.URL.createObjectURL(blob);
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = function (ev) {
                        // Obtain a blob: URL for the image data.
                        var arrayBufferView = new Uint8Array(this.response);
                        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
                    };
                    xhr.send();

                    uploadToS3(blob, d, function (err, data) {
                        if (data) {
                            SpinnerPlugin.activityStop();
                            showNotification("Image saved successfully");
                        }
                        else {
                            SpinnerPlugin.activityStop();
                            showNotification("Unable to save image");
                        }
                    });
                }, function (error) {
                    SpinnerPlugin.activityStop();
                    showNotification("Unable to save image");
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
    let options = { Bucket: 'selfiecausebucket', Key: 'myFile' + t + '.jpg', Body: blob };// <--
    s3.upload(options, callback);
}