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
    $("#btn-signup").attr('disabled', true);
    $("#btn-signup").text('Signing Up...');
    var data = {
        "email": $("#email").val(),
        "action": "signup",
        "name": $("#username").val(),
        "password": $("#password").val()
    }
    callApi(data, "GET", signup_response, service_err);
}

function signup_response(data) {
    if (data.OK == true)
    {
        localStorage.setItem("id", data.ID);
        localStorage.setItem("name", data.Name);
        localStorage.setItem("email", data.Email);
        LoadView("categories", null, null, "up");
    }
    else
    {
        showNotification(data.ResponseMessage);
    }
    $("#btn-signup").attr('disabled', false);
    $("#btn-signup").text('Sign Up');
}

function service_err(err) {
    $("#btn-signup").attr('disabled', false);
    $("#btn-signup").text('Sign Up');
    showNotification("Network error, please check your internet connection");
}