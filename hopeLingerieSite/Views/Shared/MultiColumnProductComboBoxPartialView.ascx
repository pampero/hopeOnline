<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% Html.DevExpress().ComboBox(
                settings =>
                {
                    settings.Name = "ProductId";
                    settings.Width = 200;
                    settings.SelectedIndex = 0;
                    settings.Properties.DropDownWidth = 550;
                    settings.Properties.DropDownStyle = DropDownStyle.DropDownList;
                    settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "MultiColumnProductComboBoxPartialView" };
                    settings.Properties.EnableCallbackMode = true;
                    settings.Properties.CallbackPageSize = 30;
                    settings.Properties.IncrementalFilteringMode = IncrementalFilteringMode.StartsWith;
                    settings.Properties.TextFormatString = "{0}";
                    settings.Properties.ValueField = "ProductId";
                    settings.Properties.ValueType = typeof(int);
                    settings.Properties.Columns.Add("Code", "Código", 130);
                    settings.Properties.Columns.Add("CurrentPrice", "Precio Actual", 50);
                    settings.Properties.Columns.Add("Description", "Descripción", Unit.Percentage(100));
                    settings.Properties.ClientSideEvents.SelectedIndexChanged = "function(s, e) { ColorId.PerformCallback(); SizeId.PerformCallback(); }";
                }).BindList(ViewData["Products"]).Render();
%>