<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvContacts";
            settings.KeyFieldName = "ContactId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "ContactGridView" };

            settings.CommandColumn.Width = 30;

            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.CommandColumn.Visible = true;
                      
            settings.Width = Unit.Percentage(100);
            var columnAddedDate = settings.Columns.Add("AddedDate", "Fecha");
            columnAddedDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnAddedDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy";
            
            settings.Columns.Add("Name", "Nombre");
            settings.Columns.Add("Subject", "Asunto");
            settings.Columns.Add("EMail");
            settings.Columns.Add("Telephone", "Teléfono");
            settings.Columns.Add("Description", "Descripción");
            settings.Columns["Name"].Width = 160;
            settings.Columns["Subject"].Width = 120;
            settings.Columns["EMail"].Width = 200;
            settings.Columns["Telephone"].Width = 70;
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