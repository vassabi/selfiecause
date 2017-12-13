$(document).ready(function () {
    let options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: true,
        tapPhoto: true,
        previewDrag: false
    };

    CameraPreview.startCamera(options);

    $("#btn-take-picture").on("click", function () {
        CameraPreview.takePicture({ width: 640, height: 640, quality: 85 }, function (base64PictureData) {
            imageSrcData = 'data:image/jpeg;base64,' + base64PictureData;
            $('img#my-img').attr('src', imageSrcData);
            $('img#my-img').attr('style', 'display:block;');
        });
        CameraPreview.stopCamera();
    });
});

