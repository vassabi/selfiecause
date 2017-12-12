$(document).ready(function () {
    $("#btn-signup").on("click", function () {
        LoadView("signup", null, null, "left");
    });
    $("#btn-password-recovery").on("click", function () {
        LoadView("password-recovery", null, null, "left");
    });
    $("#btn-signin").on("click", function () {
        SignIn();
    });
    $("#btn-gplus").on("click", function () {
        GPlusSignIn();
    });
    //set the password for quick login, remove this part later
    $("#email").val("karen.aghajanyan@gmail.com");
    $("#password").val("kasper");
    initFormValidation();
});

function SignIn() {
    $("#btn-signin").attr('disabled', true);
    $("#btn-signin").text('Signing In...');

    var email = $("#email").val();
    var password = $("#password").val();
    var data = { email: email, password: password, action: "login"};
    callApi(data, "GET", signin_response, service_err);
}

function GPlusSignIn()
{

}

function signin_response(data)
{
    if (data.OK == true)
    {
        $("#btn-signin").attr('disabled', false);
        $("#btn-signin").text('Sign In');
        localStorage.setItem("id", data.ID);
        localStorage.setItem("name", data.Name);
        localStorage.setItem("email", data.Email);
        LoadView("categories", null, null, "up");
    }
    else
    {
        $("#btn-signin").attr('disabled', false);
        $("#btn-signin").text('Sign In');
        showNotification(data.ResponseMessage);
    }
}

function service_err(data)
{
    $("#btn-signin").attr('disabled', false);
    $("#btn-signin").text('Sign In');
    showNotification("Network error, please check your internet connection");
}