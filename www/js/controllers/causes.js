$(document).ready(function () {
    InjectView("loader", "loader");
    InjectView("slidemenu", "header");
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: apiUrl + "?action=causes",
                dataType: "json",
            }
        }
    });
  
    $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())
    });
    
setTimeout(function(){
      setTitle("Causes");
     initCustomForms();
      initMobileNav();
      EmptyView("loader");  
  },300)
   
});

function loadcause(id)
{
    LoadView("cause_campaign", null, id, "left");
}