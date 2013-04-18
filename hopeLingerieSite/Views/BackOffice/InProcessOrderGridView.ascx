<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvOrders";
            settings.KeyFieldName = "OrderID";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "InProcessOrderGridView" };
            
            settings.CommandColumn.Visible = true;
            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.CommandColumn.Width = 25;
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

         //   settings.Columns.Add("PaymentStatus", "Estado del Pago");
            
            settings.Columns.Add("DeliveryAddress", "Dirección Envio");
            
            var columnDeliveryDate = settings.Columns.Add("DeliveryDate", "Fecha Envío");
            columnDeliveryDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnDeliveryDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy";

            var columnAddedDate = settings.Columns.Add("AddedDate", "Alta");
            columnAddedDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnAddedDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy hh:mm tt";
            columnAddedDate.Settings.AutoFilterCondition = AutoFilterCondition.Equals;

            var commandColumnAction = settings.Columns.Add("", "Acción");
            commandColumnAction.Width = 50;
            commandColumnAction.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Editar", "OrderUpdate", new { id = DataBinder.Eval(c.DataItem, "OrderID") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
                <%= Html.ActionLink("Eliminar", "OrderDelete", new { id = DataBinder.Eval(c.DataItem, "OrderID") }).ToHtmlString().Replace("Eliminar", "<img title='Eliminar' src=\'/Content/imgs/backoffice/delete.gif\' onclick='return fConfirm();' style='border:0px' />")%> 
            <%});
              
            settings.Columns["OrderID"].Width = 30;
            settings.Columns["Telephone"].Width = 90;
            settings.Columns["Cellular"].Width = 90;
            settings.Columns["AddedDate"].Width = 140;
            //settings.Columns["AddedDate"].Settings.FilterMode = ColumnFilterMode.DisplayText;
            settings.Columns["DeliveryDate"].Width =90;
            //settings.Columns["OrderStatus"].Width = 90;
            settings.Columns["Discount"].Width = 50;
            //    settings.Columns["PaymentStatus"].Width = 100;
            
            settings.Settings.ShowFilterRow = true;
            settings.Settings.ShowFilterRowMenu = true;
            settings.SettingsPager.FirstPageButton.Visible = true;
            settings.SettingsPager.LastPageButton.Visible = true;
            settings.SettingsPager.PageSize = 40;
            settings.CommandColumn.ClearFilterButton.Text = "Limpiar";
        })
        .Bind(Model)
        .Render();
%>
