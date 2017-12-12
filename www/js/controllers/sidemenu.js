$(document).ready(function () {
    $("#btn-logout").on("click", function () {
        localStorage.setItem("username", null);
        localStorage.setItem("email", null);
        LoadView("login", null, null, "down");
    });
});