<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvNewsLetters";
            settings.KeyFieldName = "NewsLetterId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "NewsLetterGridView" };

            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.CommandColumn.Width = 30;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.CommandColumn.Visible = true;
            
            settings.Width = Unit.Percentage(100);
            settings.Columns.Add("Name", "Nombre y Apellido");
            settings.Columns.Add("Email");
            var columnAddedDate = settings.Columns.Add("AddedDate", "Fecha Alta");
            columnAddedDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnAddedDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy";

            settings.Columns["AddedDate"].Width = 50;
            
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
        })
        .Bind(Model)
        .Render();
%>