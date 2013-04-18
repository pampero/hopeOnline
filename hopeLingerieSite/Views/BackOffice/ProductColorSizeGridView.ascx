<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieServices.Model.Color>" %>
<% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvProductColorSize";
            settings.KeyFieldName = "SizeId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "ProductColorSizeGridView", productId = Convert.ToInt32(ViewData["ProductId"]) };
            settings.Settings.ShowPreview = true;
             var commandColumn = settings.Columns.Add("", "#");
             commandColumn.Width = 40;
             commandColumn.SetDataItemTemplateContent(c =>
            {%>
                <a href="" onclick="handleDelete(<%: DataBinder.Eval(c.DataItem, "SizeID ") %>, <%: Convert.ToInt32(Model.ColorId) %>); return false;"><img title='Eliminar' src='/Content/imgs/backoffice/delete.gif' style="border:0px;" /></a>
                <%= Html.ActionLink("Editar", "ProductStockUpdate", new { sizeId = DataBinder.Eval(c.DataItem, "SizeID"), colorId = DataBinder.Eval(c.DataItem, "ColorID") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%>
            <%});
            settings.CommandColumn.Visible = false;
            settings.CommandColumn.ShowSelectCheckbox = false;
            settings.Width = Unit.Percentage(50);
            settings.Columns.Add("Code", "Cod.");
            settings.Columns.Add("Description", "Descripción");
            settings.Columns.Add("RealQuantity", "Cantidad Real");
            settings.Columns.Add("VirtualQuantity", "Cantidad Virtual");
            settings.Columns["Code"].Width = 50;
            settings.Columns["RealQuantity"].Width = 50;
            settings.Columns["VirtualQuantity"].Width = 50;
            
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
        })
        .Bind(ViewData["sizeList"])
        .Render();
%>
