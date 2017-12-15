$(document).ready(function () {
    InjectView("loader", "loader");
    InjectView("slidemenu", "header");
    var data = { action: "categories" };
    callApi(data, "GET", categories_loaded, categories_err);
    $("#btn-all-causes").on("click", function () {
        LoadView("causes", null, null, "down");
    });
    setTitle("Categories");
});

function categories_loaded(data)
{
    var ul = $("#categories-list")

    for (var i = 0; i < data.length; i ++)
    {
        var icon = data[i].Icon.MediaUrl;
        var title = data[i].Title;
        ul.append("<li class=\"cat\"><a href=\"#\"><div class=\"image-holder\"><img src=\"" + icon + "\" alt=\"image description\"></div><div class=\"text-holder\"><strong class=\"title\">" + title + "</strong><span class=\"count\">0 Causes</span></div></a></li>");
    }
    initCustomForms();
    initMobileNav();
    EmptyView("loader");
}

function categories_err(e)
{
    alert("Error");
}