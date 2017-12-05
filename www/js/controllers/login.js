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
    $("#email").val("JohnDoe");
    $("#password").val("test");
    initFormValidation();
});

function SignIn() {
    $("#btn-signin").attr('disabled', true);
    $("#btn-signin").text('Signing In...');

    var username = $("#email").val();
    var password = $("#password").val();
    callApi("scusers?$filter=Username eq '" + username + "'", null, null, "GET", signin_response, null);
}

function GPlusSignIn()
{

}

function signin_response(data)
{
    if(data.value.length > 0)
    {
        var user = data.value[0];
        if (user.Password != $("#password").val())
        {
            $("#btn-signin").attr('disabled', false);
            $("#btn-signin").text('Sign In');
            alert('Invalid email/password combination');
        }
        else
        {
            debugger;
            $("#btn-signin").attr('disabled', false);
            $("#btn-signin").text('Sign In');
            localStorage.setItem("username", user.Username);
            localStorage.setItem("email", user.Email);
            LoadView("categories", null, null, "up");
        }
    }
    else {
        $("#btn-signin").attr('disabled', false);
        $("#btn-signin").text('Sign In');
        alert('Invalid email/password combination');
    }
}