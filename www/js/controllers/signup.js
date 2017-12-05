$(document).ready(function () {
    $("#btn-signin").on("click", function () {
        LoadView("login", null, null, "right");
    });

    $("#btn-signup").on("click", function () {
        SignUp();
    });
});

function SignUp()
{
    var data = {
        "PublicationDate": "2017-11-24T07:35:18.3637969Z",
        "ExpirationDate": "2017-11-24T07:35:18.3637969Z",
        "UrlName": $("#email").val().replace("@", "_").replace(".", "_").replace("-", "_"),
        "Email": $("#email").val(),
        "Username": $("#username").val(),
        "Password": $("#password").val()
    }

    //var data = {
    //    PublicationDate: '2017-11-18T23:35:06.3269788Z',
    //    ExpirationDate: '2018-11-18T23:35:06.3269788Z',
    //    UrlName: $("#email").val().replace("@", "_").replace(".", "_").replace("-", "_"),
    //    Activated: false,
    //    Suspended: false,
    //    Email: $("#email").val(),
    //    Password: $("#password").val(),
    //    Username: $("#username").val()
    //}
    getAuthToken(function (tokendata) {
        callApi("scusers", tokendata.access_token, data, "POST", signup_success, signup_fail);
    }, function (err) {
        alert(err.responseText);
    });


    //$.ajax({
    //    url: 'http://go-app.cz/api/default/scusers',
    //    type: 'POST',
    //    data: JSON.stringify(data),
    //    dataType: "json",
    //    contentType: "application/json; charset=utf-8",
    //    beforeSend: function (xhr) {
    //        xhr.setRequestHeader("Authorization", "Bearer " + data.access_token);
    //    },
    //    success: function (data) {
    //        debugger;
    //    },
    //    error: function (err) {
    //        debugger;
    //    }
    //});

    //callApi("scusers", localStorage.getItem("access_token"), data, "POST", signup_success, signup_fail);
}

function signup_success(data) {
    debugger;
}

function signup_fail(err) {
    debugger;
}