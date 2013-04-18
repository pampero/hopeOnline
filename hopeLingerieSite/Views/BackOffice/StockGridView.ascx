<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvStock";
            settings.KeyFieldName = "StockId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "StockGridView" };

            settings.CommandColumn.Width = 30;

            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.CommandColumn.Visible = true;
                      
            settings.Width = Unit.Percentage(100);
            settings.Columns.Add("Code", "Código");
            settings.Columns.Add("Name", "Nombre Producto");
            settings.Columns.Add("Color");
            settings.Columns.Add("Size", "Talle");
            settings.Columns.Add("RealQuantity", "Cantidad Real");
            settings.Columns.Add("VirtualQuantity", "Cantidad Virtual");
            
             var commandColumn = settings.Columns.Add("", "Acción");
             commandColumn.Width = 35;
             commandColumn.SetDataItemTemplateContent(c =>
            {%>
				<%= Html.ActionLink("Editar", "ProductColorUpdate", "BackOffice", new { productId = DataBinder.Eval(c.DataItem, "ProductId"), colorId = DataBinder.Eval(c.DataItem, "ColorId") }, new { }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
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