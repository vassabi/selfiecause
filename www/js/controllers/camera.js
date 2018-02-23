$(document).ready(function () {
    var x = window.screen.width;
    let options = {
        x: 1,
        y: 40,
        width: window.screen.width-1,
        height: window.screen.height-120,
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
        SpinnerPlugin.activityStart("Loading...", options);
        $('img#my-img').attr('src', '');
        $('img#my-img').attr('style', 'display:none;');
        CameraPreview.stopCamera();
        var id = mobile.passedData;
        SpinnerPlugin.activityStop();
        LoadView("cause_campaign", null, id, "down");
    });

    $("#btn-take-picture").on("click", function () {
        SpinnerPlugin.activityStart("Loading...", options);
        var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
        var physicalScreenHeight = window.screen.height * window.devicePixelRatio;
        CameraPreview.takePicture({ width: physicalScreenWidth, height: physicalScreenHeight, quality: 100 }, function (base64PictureData) {
		            imageSrcData = 'data:image/jpeg;base64,' + base64PictureData;
		            CameraPreview.stopCamera();
                    var data = { campaignid: mobile.passedData, base64PictureData: imageSrcData };
                    SpinnerPlugin.activityStop();
                    LoadView("photo", null, data, "left");
            });
        });
});
