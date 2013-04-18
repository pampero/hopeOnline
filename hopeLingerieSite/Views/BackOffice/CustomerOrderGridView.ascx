<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvOrders";
            settings.KeyFieldName = "OrderID";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CustomerOrderGridView", Id = Model };
             var commandColumn = settings.Columns.Add("", "#");
             commandColumn.Width = 20;
             commandColumn.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Editar", "OrderUpdate", new { id = DataBinder.Eval(c.DataItem, "OrderID") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
            <%});
            settings.CommandColumn.Visible = false;
            settings.CommandColumn.ShowSelectCheckbox = false;
            settings.Width = Unit.Percentage(100);

            settings.Columns.Add("OrderID", "#ID");
            settings.Columns.Add("LastName", "Apellido");
            settings.Columns.Add("FirstName", "Nombre");
            settings.Columns.Add("Telephone", "Teléfono");
            settings.Columns.Add("Cellular", "Celular");
            settings.Columns.Add("Email", "Email");

            var columnPrecio = settings.Columns.Add("Discount", "Desc.");
            columnPrecio.UnboundType = DevExpress.Data.UnboundColumnType.Decimal;
            columnPrecio.PropertiesEdit.DisplayFormatString = "{0}%";
            
            settings.Columns.Add("DeliveryAddress", "Dirección Envio");
            
            var columnDeliveryDate = settings.Columns.Add("DeliveryDate", "Fecha Envío");
            columnDeliveryDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnDeliveryDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy";

            var columnAddedDate = settings.Columns.Add("AddedDate", "Alta");
            columnAddedDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnAddedDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy";
            
            settings.Columns.Add("OrderStatus", "Estado");

            settings.Columns["OrderID"].Width = 30;
            settings.Columns["Telephone"].Width = 80;
            settings.Columns["Cellular"].Width = 80;
            settings.Columns["AddedDate"].Width = 80;
            settings.Columns["DeliveryDate"].Width = 80;
            settings.Columns["Discount"].Width = 50;
            settings.Columns["OrderStatus"].Width = 90;
            
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = false;
            settings.SettingsPager.FirstPageButton.Visible = false;
            settings.SettingsPager.LastPageButton.Visible = false;
            settings.SettingsPager.PageSize = 40;
        })
        .Bind(ViewData["Orders"])
        .Render();
%>
