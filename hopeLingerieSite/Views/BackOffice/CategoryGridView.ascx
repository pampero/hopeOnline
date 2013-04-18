<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvCategories";
            settings.KeyFieldName = "CategoryID";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CategoryGridView" };
           
            settings.CommandColumn.Visible = false;
            settings.CommandColumn.ShowSelectCheckbox = false;
            settings.Width = Unit.Percentage(100);
            
            var displayOrder = settings.Columns.Add("DisplayOrder", "Orden");
            displayOrder.Width = Unit.Pixel(100);
            
            var isEnabled= settings.Columns.Add("Enabled", "Habilitada");
            isEnabled.Width = Unit.Pixel(100);
            
            settings.Columns.Add("Description", "Categoría");
            settings.Columns.Add("Parent", "Padre");
            
            var commandColumn = settings.Columns.Add("", "Acción");
             commandColumn.Width = 50;
             commandColumn.SetDataItemTemplateContent(c =>
            {%>
				<%= Html.ActionLink("Editar", "CategoryUpdate", new { id = DataBinder.Eval(c.DataItem, "CategoryID") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
                <%= Html.ActionLink("Eliminar", "CategoryDelete", new { id = DataBinder.Eval(c.DataItem, "CategoryID") }).ToHtmlString().Replace("Eliminar", "<img title='Eliminar' src=\'/Content/imgs/backoffice/delete.gif\' onclick='return fConfirm();' style='border:0px' />")%> 
            <%});
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
            settings.CommandColumn.ClearFilterButton.Text = "Limpiar";
            settings.ClientSideEvents.SelectionChanged = "grid_SelectionChanged";
        })
        .Bind(Model)
        .Render();
%>
