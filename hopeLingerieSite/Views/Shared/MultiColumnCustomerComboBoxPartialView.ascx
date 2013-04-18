<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% Html.DevExpress().ComboBox(
                settings =>
                {
                    settings.Name = "CustomerID";
                    settings.Width = 200;
                    settings.SelectedIndex = 0;
                    settings.Properties.DropDownWidth = 550;
                    settings.Properties.DropDownStyle = DropDownStyle.DropDownList;
                    settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "MultiColumnCustomerComboBoxPartialView" };
                    settings.Properties.EnableCallbackMode = true;
                    settings.Properties.CallbackPageSize = 30;
                    settings.Properties.IncrementalFilteringMode = IncrementalFilteringMode.StartsWith;
                    settings.Properties.TextFormatString = "{0}";
                    settings.Properties.ValueField = "CustomerID";
                    settings.Properties.ValueType = typeof(string);

                    settings.Properties.Columns.Add("LastName", "Apellido", 130);
                    settings.Properties.Columns.Add("FirstName", "Nombre", 100);
                    settings.Properties.Columns.Add("EMail", "EMail", Unit.Percentage(100));
                    settings.Properties.Columns.Add("Telephone1", "Teléfono", 100);
                }).BindList(ViewData["Customers"]).Render();
%>