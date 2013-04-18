<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieServices.Model.Color>" %>

<%
Html.DevExpress().ComboBox(settings => {
    settings.Name = "SizeId";
    settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CascadingComboSizePartialView" };
    settings.Properties.ValueType = typeof(int);
    settings.Properties.TextField = "Code";
    settings.Properties.ValueField = "SizeId";
    settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
    settings.Properties.ClientSideEvents.Validation = "OnComboRequiredValidation";
    settings.Properties.ValidationSettings.ValidationGroup = "Grilla";
    settings.SelectedIndex = 0;
    settings.Properties.EnableCallbackMode = true;
    settings.Properties.CallbackPageSize = 20;
    settings.Properties.ClientSideEvents.BeginCallback = "function(s, e) { e.customArgs['ColorId'] = ColorId.GetValue(); }";
})
 .BindList(HopeLingerieSite.Controllers.Backoffice.BackOfficeController.GetSizes(Model.ColorId))
 .Render();    
%>