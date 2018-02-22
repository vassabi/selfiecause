$(document).ready(function () {
    $("#btn_back").on("click", function () {
        LoadView("camera", null, mobile.passedData.campaignid, "down");
    });
    $("#btn_edit").on("click", function () {
        LoadView("picture_edit_reframe", null, mobile.passedData, "left");
    });
    alert(mobile.passedData.base64PictureData);
    $("#img-holder").attr("src", mobile.passedData.base64PictureData);
});

