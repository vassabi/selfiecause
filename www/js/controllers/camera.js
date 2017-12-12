$(document).ready(function () {
    let options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        previewDrag: false
    };
    debugger;
    CameraPreview.startCamera(options);

    $("#btn-take-picture").on("click", function () {
        CameraPreview.takePicture({ width: 640, height: 640, quality: 85 }, function (base64PictureData) {
            /*
              base64PictureData is base64 encoded jpeg image. Use this data to store to a file or upload.
              Its up to the you to figure out the best way to save it to disk or whatever for your application.
            */

            // One simple example is if you are going to use it inside an HTML img src attribute then you would do the following: 
            imageSrcData = 'data:image/jpeg;base64,' + base64PictureData;
            $('img#my-img').attr('src', imageSrcData);
            $("#image-holder").empty().append($('img#my-img'));
        });
    });
});

