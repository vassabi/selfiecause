$(document).ready(function () {
    var id = mobile.passedData;
    var data = { id: id, action: "cause" };
    callApi(data, "GET", cause_response, service_err);
    $("#go-back").on("click", function () {
        LoadView("causes", null, null, "right");
    });

    
});

function service_err(data) {
    showNotification("Network error, please check your internet connection");
}

function cause_response(data)
{
    if (data.OK == true) {
        $("#cause-title").empty().append(data.Title);
        $("#author").empty().append(data.CreatedBy + " / " + data.City);
        $("#funded").empty().append(data.FundedPercent + "%");
        $("#funded-progress").attr("style", "width:" + data.FundedPercent +"%;");
        $("#funded-amount").empty().append("$" + data.Funded + " pledged of " + data.TargetAmount);
        $("#views").empty().append(data.Views);
        $("#backers").empty().append(data.Backers);
        $("#days-left").empty().append(data.DaysLeft + " days left");
        $("#about").empty().append(data.About);
        $("#contact-email").empty().append(data.ContactEmail);
        $("#contact-phone").empty().append(data.ContactPhone);
        $("#contact-skype").empty().append(data.ContactSkype);
        $("#video").attr("src", data.VideoUrl);

        $("#take-selfie-btn").on("click", function () {
            LoadView("camera", null, data.Id, "up");
        });
    }
    else {
        showNotification(data.ResponseMessage);
    }
}