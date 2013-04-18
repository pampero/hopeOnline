<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvSizes";
            settings.KeyFieldName = "SizeId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "SizeGridView" };
             var commandColumn = settings.Columns.Add("", "#");
             commandColumn.Width = new Unit(50, UnitType.Pixel);
             commandColumn.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Editar", "SizeUpdate", new { Id = DataBinder.Eval(c.DataItem, "SizeId") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
                <%= Html.ActionLink("Eliminar", "SizeDelete", new { Id = DataBinder.Eval(c.DataItem, "SizeId") }).ToHtmlString().Replace("Eliminar", "<img title='Eliminar' src=\'/Content/imgs/backoffice/delete.gif\' onclick='return fConfirm();' style='border:0px' />")%> 
            <%});
            settings.CommandColumn.Visible = false;
            settings.CommandColumn.ShowSelectCheckbox = false;
            settings.Width = Unit.Percentage(100);

            settings.Columns.Add("Code", "Código");
            settings.Columns.Add("Description", "Descripción");
            
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
        })
        .Bind(Model)
        .Render();
%>
