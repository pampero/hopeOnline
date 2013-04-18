<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvFranchises";
            settings.KeyFieldName = "FranchiseId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "FranchiseGridView" };
            
            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.CommandColumn.Width = 25;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.CommandColumn.Visible = true;

            settings.Width = Unit.Percentage(100);
            settings.Columns.Add("FirstName", "Nombre");
            settings.Columns.Add("LastName", "Apellido");
            settings.Columns.Add("Address", "Dirección");
            settings.Columns.Add("Telephone1", "Teléfono");
            settings.Columns.Add("Cellular", "Celular");
            var columnAddedDate = settings.Columns.Add("AddedDate", "Fecha Alta");
            columnAddedDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnAddedDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy";

             var commandColumnAtions = settings.Columns.Add("", "Acción");
             commandColumnAtions.Width = 25;
             commandColumnAtions.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Ver", "Display", "Franquicias", new { Id = DataBinder.Eval(c.DataItem, "FranchiseID") }, new { @width = "20px" }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
            <%});
              
            settings.Columns["Telephone1"].Width = 70;
            settings.Columns["Cellular"].Width = 70;
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