$(document).ready(function () {
    var data = mobile.passedData
    $("#img").src = 'data:image/jpeg;base64,' + data.base64PictureData;
    $("#btn_back").on("click", function () {
        LoadView("camera", null, data.campaignid, "down");
    });
});