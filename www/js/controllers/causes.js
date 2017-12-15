$(document).ready(function () {
    InjectView("loader", "loader");
    InjectView("slidemenu", "header");
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: apiUrl + "?action=causes",
                dataType: "json"
            }
        }
    });
    $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())
    });

    debugger;
    EmptyView("loader");
    setTitle("Causes");
    initCustomForms();
    initMobileNav();
});