<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gOperators";
            settings.KeyFieldName = "CustomerId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "OperatorGridView" };
             
            settings.CommandColumn.Visible = true;
            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.CommandColumn.Width = 25;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.Width = Unit.Percentage(100);
            
            settings.Columns.Add("LastName", "Apellido");
            settings.Columns.Add("FirstName", "Nombre");
            settings.Columns.Add("Email", "EMail");
            
            var commandColumnAction = settings.Columns.Add("", "Acción");
             commandColumnAction.Width = 50;
             commandColumnAction.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Editar", "OperatorUpdate", new { id = DataBinder.Eval(c.DataItem, "CustomerID") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
                <%= Html.ActionLink("Eliminar", "OperatorDelete", new { id = DataBinder.Eval(c.DataItem, "CustomerID") }).ToHtmlString().Replace("Eliminar", "<img title='Eliminar' src=\'/Content/imgs/backoffice/delete.gif\' onclick='return fConfirm();' style='border:0px' />")%> 
            <%});
            
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
        })
        .Bind(Model)
        .Render();
%>
