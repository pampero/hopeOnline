<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvOrders";
            settings.KeyFieldName = "OrderID";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "OrdersToDeliverGridView" };
            
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

            var columnAddedDate = settings.Columns.Add("AddedDate", "Alta");
            columnAddedDate.UnboundType = DevExpress.Data.UnboundColumnType.DateTime;
            columnAddedDate.PropertiesEdit.DisplayFormatString = "dd/MM/yyyy";
            columnAddedDate.Settings.AutoFilterCondition = AutoFilterCondition.Equals;

            settings.Columns.Add("OrderStatus", "Estado");
            
            var commandColumnAction = settings.Columns.Add("", "Acción");
            commandColumnAction.Width = 20;
            commandColumnAction.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Entregar", "DeliverOrder", new { id = DataBinder.Eval(c.DataItem, "OrderID") }).ToHtmlString().Replace("Entregar", "<img title='Entregar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
            <%});
              
            settings.Columns["OrderID"].Width = 30;
            settings.Columns["Telephone"].Width = 90;
            settings.Columns["Cellular"].Width = 90;
            settings.Columns["AddedDate"].Width = 90;
            //settings.Columns["AddedDate"].Settings.FilterMode = ColumnFilterMode.DisplayText;
            settings.Columns["OrderStatus"].Width = 90;
            settings.Columns["Discount"].Width = 50;
            
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
