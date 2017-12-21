$(document).ready(function () {
    var options = { dimBackground: true };
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
        SpinnerPlugin.activityStart("Loading...", options);
        GPlusSignIn();
    });
    $("#btn-fb").on("click", function () {
        SpinnerPlugin.activityStart("Loading...", options);
        FacebookSignIn();
    });
    $("#btn-twitter").on("click", function () {
        SpinnerPlugin.activityStart("Loading...", options);
        TwitterSignIn();
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
function signin_response(data)
{    // Hide spinner dialog
     SpinnerPlugin.activityStop();
    if (data.OK == true)
    {
        $("#btn-signin").attr('disabled', false);
        $("#btn-signin").text('Sign In');
        localStorage.setItem("id", data.Id);
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
/******************************************************************Twitter Login Starts *****************************************************************/
// Twitter Login
function TwitterSignIn()
{
//fabric key : c765ab025a91029b2437f91fac4426efcd544757
    TwitterConnect.login(
  function(result) {
    var data = { action: "sociallogin", name: result.userName, email: "twitter@gmail.com",socialservice:"twitter",socialid : result.userId };
    callApi(data, "GET", signin_response, service_err);
  },failure
);

}
/******************************************************************Twitter Login Ends *******************************************************************/

/******************************************************************Google Plus Login Starts *************************************************************/
// Google Plus Login
function GPlusSignIn()
{
window.plugins.googleplus.login(
    {
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '189250919275-r0k1j7epv4nus08ej2fkgdg1d9hs6ept.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    },
    function (obj) {
      var data = { action: "sociallogin", name: obj.displayName, email: obj.email,socialservice:"google plus",socialid : obj.userId };
      callApi(data, "GET", signin_response, service_err);
    },failure
);
}
/******************************************************************Google Plus Login Ends****************************************************************/

/******************************************************************Facebook Login Starts ****************************************************************/

//Facebook Login
function FacebookSignIn(){
          facebookConnectPlugin.login(["public_profile","email"],fbCheckConnection, failure);
            }

//facebook success token 
function fbCheckConnection(token){
     if(token['status'] == 'connected'){  
				successFbLogin(token);       
			}
}

// Facebook Success Login
function successFbLogin(token){
    facebookConnectPlugin.api(token['authResponse']['userID'] + "/?fields=id,name,email,first_name,last_name,birthday", ["public_profile"], function (response) {
			var image = "https://graph.facebook.com/"+token['authResponse']['userID']+"/picture?width=140&height=140";
			if (response && !response.error) {
                                 var data = { action: "sociallogin", name: response.name, email: response.email,socialservice:"facebook",socialid : response.id };
                                 callApi(data, "GET", signin_response, service_err);
			}
                        else{
                                // Hide spinner dialog
                             SpinnerPlugin.activityStop();
                             alert(JSON.stringify(response));
                        }
		},failure);
}
/******************************************************************Facebook Login Ends *****************************************************************/

//error of facebook,twitter,googleplus 
function failure(err){
    // Hide spinner dialog
    SpinnerPlugin.activityStop();
    alert(JSON.stringify(err));
    }
//http://jailexchange.elabry.com/scservice?action=sociallogin&name=Cool+Team&email=coolteam573%40gmail.com&socialservice=google+plus&socialid=118323977285784439237
//jailexchange.elabry.com/scservice?email=karen.aghajanyan%40gmail.com&password=kasper&action=login