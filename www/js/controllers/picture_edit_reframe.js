$(document).ready(function () {
    var data = mobile.passedData
    $("#img").attr("src", data.base64PictureData);
    $("#btn_back").on("click", function () {
        LoadView("camera", null, data.campaignid, "down");
    });
});