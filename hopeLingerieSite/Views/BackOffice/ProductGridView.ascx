<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvProducts";
            settings.KeyFieldName = "ProductID";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "ProductGridView" };
           
            settings.CommandColumn.Visible = true;
            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.CommandColumn.Width = 25;
                
            settings.Width = Unit.Percentage(100);
            settings.Columns.Add("Code", "Cod.");
            settings.Columns.Add("Name", "Nombre");
            settings.Columns.Add("Description", "Descripción");
            
            var columnPrecio = settings.Columns.Add("CurrentPrice", "Precio Actual");
            columnPrecio.UnboundType = DevExpress.Data.UnboundColumnType.Decimal;
            columnPrecio.PropertiesEdit.DisplayFormatString = "c2";

            var columnOldPrice = settings.Columns.Add("OldPrice", "Precio Anterior");
            columnOldPrice.UnboundType = DevExpress.Data.UnboundColumnType.Decimal;
            columnOldPrice.PropertiesEdit.DisplayFormatString = "c2";
            
            settings.Columns.Add("CategoryDescription", "Categoría");


            settings.Columns.Add("OnSale", "Liquidación", MVCxGridViewColumnType.CheckBox);
            settings.Columns.Add("IsNew", "Novedad", MVCxGridViewColumnType.CheckBox);
            settings.Columns.Add("Published", "Publicado", MVCxGridViewColumnType.CheckBox);
          
             var commandColumnAction = settings.Columns.Add("", "Acción");
             commandColumnAction.Width = 50;
            
             commandColumnAction .SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Editar", "ProductUpdate", new { id = DataBinder.Eval(c.DataItem, "ProductID") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
                <%= Html.ActionLink("Eliminar", "ProductDelete", new { id = DataBinder.Eval(c.DataItem, "ProductID") }).ToHtmlString().Replace("Eliminar", "<img title='Eliminar' src=\'/Content/imgs/backoffice/delete.gif\' onclick='return fConfirm();' style='border:0px' />")%> 
            <%});

            settings.Columns["OnSale"].Width = 50;
            settings.Columns["IsNew"].Width = 50;
            settings.Columns["Published"].Width = 50;
            
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
            settings.ClientSideEvents.EndCallback = "PageChanged";
        })
        .Bind(Model)
        .Render();
%>
