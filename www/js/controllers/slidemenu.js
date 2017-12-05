$(document).ready(function () {
    $("#btn-logout").on("click", function () {
        localStorage.setItem("username", null);
        localStorage.setItem("email", null);
        $('body').removeClass('nav-active');
        LoadView("login", null, null, "down");
    });
    $("#btn-home").on("click", function () {
        $('body').removeClass('nav-active');
        LoadView("categories", null, null, "down");
    });
});