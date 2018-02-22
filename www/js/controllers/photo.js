$(document).ready(function () {
    $("#btn_back").on("click", function () {
        LoadView("camera", null, mobile.passedData.campaignid, "down");
    });
    $("#btn_edit").on("click", function () {
        LoadView("picture_edit_reframe", null, mobile.passedData, "left");
    });
    $("#img-holder").attr("src", mobile.passedData.base64PictureData);
});