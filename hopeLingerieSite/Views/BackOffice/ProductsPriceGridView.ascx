<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvProducts";
            settings.KeyFieldName = "ProductID";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "ProductsPriceGridView" };
           
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
