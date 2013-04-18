<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IEnumerable<HopeLingerieServices.Model.OrderDetail>>" %>

<% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvOrderDetail";
            settings.KeyFieldName = "OrderDetailID";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "OrderDetailOrderGridView" };
            var commandColumn = settings.Columns.Add("", "#");
            commandColumn.Width = 20;
           
            settings.CommandColumn.Visible = true;
            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.Columns.Add("Product.Code", "Código");
            settings.Columns.Add("Product.Description", "Descripción");
            settings.Columns.Add("Size.Description", "Medida");
            settings.Columns.Add("Color.Code", "Color");
            settings.Columns.Add("Quantity", "Cantidad");
            
            var columnPrecio = settings.Columns.Add("Price", "Precio");
            columnPrecio.UnboundType = DevExpress.Data.UnboundColumnType.Decimal;
            columnPrecio.PropertiesEdit.DisplayFormatString = "c";

            var columnDescuento = settings.Columns.Add("Descuento");
            columnDescuento.UnboundType = DevExpress.Data.UnboundColumnType.Decimal;
            columnDescuento.PropertiesEdit.DisplayFormatString = "c";

            
            var column = settings.Columns.Add("Total");
            column.UnboundType = DevExpress.Data.UnboundColumnType.Decimal;
            column.PropertiesEdit.DisplayFormatString = "c";
            
            settings.CustomUnboundColumnData = (sender, e) =>
            {
                if (e.Column.FieldName == "Total")
                {
                    decimal price = (decimal)e.GetListSourceFieldValue("Price");
                    int quantity = Convert.ToInt32(e.GetListSourceFieldValue("Quantity"));
                    e.Value = price * quantity - (price * quantity * Convert.ToDecimal(ViewData["Discount"]));
                }
                
                if (e.Column.FieldName == "Descuento")
                {
                    decimal price = (decimal)e.GetListSourceFieldValue("Price");
                    int quantity = Convert.ToInt32(e.GetListSourceFieldValue("Quantity"));
                    e.Value = price * quantity * Convert.ToDecimal(ViewData["Discount"]);
                }
            };
            
            settings.TotalSummary.Add(DevExpress.Data.SummaryItemType.Sum, "Quantity");
            settings.TotalSummary.Add(DevExpress.Data.SummaryItemType.Sum, "Total").DisplayFormat = "c";
                        
            settings.Settings.ShowFooter = true;

            commandColumn.Settings.AllowSort = DefaultBoolean.False; 
            commandColumn.Settings.AllowDragDrop = DefaultBoolean.False;
            settings.Width = Unit.Percentage(100);
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 25;
            settings.Settings.ShowFilterRow = false;
            settings.Settings.ShowFilterRowMenu = false;
            settings.CommandColumn.Visible = false;
        })
        .Bind(Model)
        .Render();
%>