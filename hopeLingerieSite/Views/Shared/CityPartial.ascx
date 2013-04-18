﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<E2844.Models.Customer>" %>
<%
    Html.DevExpress().ComboBox(settings => {
        settings.Name = "City";
        settings.CallbackRouteValues = new { Controller = "Home", Action = "CityPartial" };
        settings.Properties.ValueType = typeof(int);
        settings.Properties.TextField = "Name";
        settings.Properties.ValueField = "ID";
        settings.Properties.EnableCallbackMode = true;
        settings.Properties.CallbackPageSize = 20;
        settings.Properties.ClientSideEvents.BeginCallback = "function(s, e) { e.customArgs['Country'] = Country.GetValue(); }";
    })
    .BindList(E2844.Models.City.GetCities(Model.Country))
    .Bind(Model.City)
    .Render();    
%>