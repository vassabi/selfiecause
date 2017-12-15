$(document).ready(function () {

    var x = window.screen.width;
    debugger;
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

    $("#swith-camera").on("click", function () {
        CameraPreview.switchCamera();
    });

    $("#btn-flash").on("click", function () {
        CameraPreview.getFlashMode(function (currentFlashMode) {
            if (currentFlashMode == CameraPreview.FLASH_MODE.ON)
                CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.OFF);
            else
                CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.ON);
        });
    });

    $("#btn-close").on("click", function () {
        $('img#my-img').attr('src', '');
        $('img#my-img').attr('style', 'display:none;');
    });

    $("#btn-take-picture").on("click", function () {
        CameraPreview.takePicture({ width: window.screen.width, height: window.screen.height, quality: 85 }, function (base64PictureData) {
            imageSrcData = 'data:image/jpeg;base64,' + base64PictureData;
            $('img#my-img').attr('src', imageSrcData);
            $('img#my-img').attr('style', 'display:block;');
        });
    });
});

