$(document).ready(function () {
    InjectView("loader", "loader");
    InjectView("slidemenu", "header");
    callApi("sccategories?$expand=Icon", localStorage.getItem("access_token"), null, "GET", categories_loaded, null);
});

function categories_loaded(data)
{
    EmptyView("loader");
    var list = data.value;
    var ul = $("#categories-list")

    for(var i = 0; i < list.length; i ++)
    {
        var icon = list[i].Icon[0].Url;
        var title = list[i].Name;
        ul.append("<li class=\"cat\"><a href=\"#\"><div class=\"image-holder\"><img src=\"" + icon + "\" alt=\"image description\"></div><div class=\"text-holder\"><strong class=\"title\">" + title + "</strong><span class=\"count\">0 Causes</span></div></a></li>");
    }
    initCustomForms();
    initMobileNav();
}