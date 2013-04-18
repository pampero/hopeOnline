<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IEnumerable<HopeLingerieServices.Model.Color>>" %>

         <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvColors";
            settings.KeyFieldName = "ColorId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "ProductColorGridView", productId = Convert.ToInt32(ViewData["ProductId"]) };
             var commandColumn = settings.Columns.Add("", "#");
             commandColumn.Width = 60;
             commandColumn.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Nuevo", "ProductColorUpdate", new { productId = DataBinder.Eval(c.DataItem, "ProductId"), colorId = -1 }).ToHtmlString().Replace("Nuevo", "<img title='Nuevo' src=\'/Content/imgs/backoffice/add.gif\' style='border:0px' />")%>
                <%= Html.ActionLink("Editar", "ProductColorUpdate", new { productId = DataBinder.Eval(c.DataItem, "ProductId"), colorId = DataBinder.Eval(c.DataItem, "ColorID") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%>
                <a href="" onclick="handleColorDelete('<%: DataBinder.Eval(c.DataItem, "ColorID ") %>'); return false;"><img title='Eliminar' src='/Content/imgs/backoffice/delete.gif' style="border:0px;" /></a>
            <%});
            settings.CommandColumn.Visible = false;
            settings.CommandColumn.ShowSelectCheckbox = false;
            settings.Width = Unit.Percentage(100);
            settings.Columns.Add("Code", "Código");
            settings.Columns.Add("Description", "Descripción");
            settings.SettingsText.EmptyDataRow = Html.ActionLink("Agregar", "ProductColorUpdate", new { productId = ViewData["ProductId"], colorId = -1 }).ToHtmlString();
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
        })
        .Bind(Model)
        .Render();
%>
      
