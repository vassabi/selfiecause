$(document).ready(function () {
    var data = mobile.passedData
    alert('campaign id = ' + data.campaignid + ' , url = ' + data.base64PictureData);
    $("#img").src = 'data:image/jpeg;base64,' + data.base64PictureData;
    $("#btn_back").on("click", function () {
        LoadView("camera", null, data.campaignid, "down");
    });
});