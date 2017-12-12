var mobile = {};
var apiUrl = "http://localhost:444/scservice";
var client_id = "SelfieCause";
var client_secret = "ssecret";

var spinner = $("<div class=\"spinner\"><div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div></div>");

function LoadView(View, CallBack, Data, Transition) {
    if (Transition == null)
        Transition = "up";
    if (!window.navigator.simulator) {
        window.plugins.nativepagetransitions.slide({
            "direction": Transition, // 'left|right|up|down', default 'right' (Android currently only supports left and right)
            "duration": 600, // in milliseconds (ms), default 400
            "iosdelay": 50, // ms to wait for the iOS webview to update before animation kicks in, default 60
            "androiddelay": 100,  // same as above but for Android, default 70
            "winphonedelay": 150 // same as above but for Windows Phone, default 200
        });
    };
    mobile.passedData = Data;
    $("#main-placeholder").load("views/" + View + ".html");
    if (CallBack !== null) {
        CallBack();
    }
}

function InjectView(View, PlaceHolderId) {
    $("#" + PlaceHolderId).load("views/" + View + ".html");
}

function EmptyView(PlaceHolderId) {
    $("#" + PlaceHolderId).empty();
}

function callApi(data, method, callBack, errCallBack) {
    $.ajax({
        url: apiUrl,
        method: method,
        data: data,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            callBack(data);
        },
        error: function (err) {
            if (errCallBack != null)
                errCallBack(err);
            else
                alert(err.responseText);
        }
    })
}
function getAuthToken(success, fail)
{
    $.ajax({
        url: tokenEndPoint,
        data: {
            username: "karen@uxsolutions.cz",
            password: "admin",
            grant_type: 'password',
            scope: 'openid offline_access',
            client_id: client_id,
            client_secret: client_secret
        },
        method: 'POST',
        success: function (data) {
            localStorage.setItem("access_token", data.access_token);
            success(data);
        },
        error: function (err) {
            fail(err);
        }
    })
}

function showNotification(message)
{
    $("#notification").empty();
    $("#notification").append(message);
    var element = document.getElementById("notification");
    transition.begin(element, [
        ["transform", "translateX(0)", "translateY(20px)", "1s", "ease-in-out"],
        ["background-color", "#ffffff", "#ADB5C7", "500ms", "linear"]
    ]);
    element._timeout = window.setTimeout(function () {
        transition.begin(element, [
            ["transform", "translateX(0)", "translateY(-20px)", "1s", "ease-in-out"],
        ]);
    }, 4000);
}