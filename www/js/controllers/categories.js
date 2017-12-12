$(document).ready(function () {
    InjectView("loader", "loader");
    InjectView("slidemenu", "header");
    var data = { action: "getcontents", ctype: "Category" };
    callApi(data, "GET", categories_loaded, categories_err);
});

function categories_loaded(data)
{
    EmptyView("loader");
    var ul = $("#categories-list")

    for (var i = 0; i < data.length; i ++)
    {
        var icon = data[i].Icon[0].MediaUrl;
        var title = data[i].Title;
        ul.append("<li class=\"cat\"><a href=\"#\"><div class=\"image-holder\"><img src=\"" + icon + "\" alt=\"image description\"></div><div class=\"text-holder\"><strong class=\"title\">" + title + "</strong><span class=\"count\">0 Causes</span></div></a></li>");
    }
    initCustomForms();
    initMobileNav();
}

function categories_err(e)
{
    alert("Error");
}