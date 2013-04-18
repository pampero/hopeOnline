<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieServices.Model.Color>" %>

<%
Html.DevExpress().ComboBox(settings => {
    settings.Name = "ColorId";
    settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CascadingComboColorPartialView" };
    settings.Properties.ValueType = typeof(int);
    settings.Properties.TextField = "Code";
    settings.Properties.ValueField = "ColorId";
    settings.SelectedIndex = 0;
    settings.Properties.EnableCallbackMode = true;
    settings.Properties.CallbackPageSize = 20;
    settings.Properties.ClientSideEvents.SelectedIndexChanged = "function(s, e) { SizeId.PerformCallback(); }";
    settings.Properties.ClientSideEvents.BeginCallback = "function(s, e) { e.customArgs['ProductId'] = ProductId.GetValue(); }";
})
 .BindList(HopeLingerieSite.Controllers.Backoffice.BackOfficeController.GetColors(Model.ProductId))
 .Render();    
%>