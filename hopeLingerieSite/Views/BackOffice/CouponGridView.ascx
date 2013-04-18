<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
    <% 
        Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvCoupons";
            settings.KeyFieldName = "CouponId";
            settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CouponGridView" };
            
            settings.CommandColumn.Visible = true;
            settings.CommandColumn.Width = 25;
            settings.CommandColumn.ShowSelectCheckbox = true;
            settings.ClientSideEvents.SelectionChanged = "SelectionChanged";
            settings.Width = Unit.Percentage(100);

            settings.Columns.Add("Campaign", "Campaña");
            settings.Columns.Add("Code", "Código");
            settings.Columns.Add("Percentage", "Porcentaje");
            settings.Columns.Add("OrderId", "Orden ID");
            settings.Columns.Add("ExpirationDate", "Vencimiento");
            
            var commandColumnAtions = settings.Columns.Add("", "Acción");
            commandColumnAtions.Width = 50;

            commandColumnAtions.SetDataItemTemplateContent(c =>
            {%>
                <%= Html.ActionLink("Editar", "CouponUpdate",new { Id = DataBinder.Eval(c.DataItem, "CouponId") }).ToHtmlString().Replace("Editar", "<img title='Editar' src=\'/Content/imgs/backoffice/edit.png\' style='border:0px' />")%> 
                <%= Html.ActionLink("Eliminar", "CouponDelete", new { Id = DataBinder.Eval(c.DataItem, "CouponId") }).ToHtmlString().Replace("Eliminar", "<img title='Eliminar' src=\'/Content/imgs/backoffice/delete.gif\' onclick='return fConfirm();' style='border:0px' />")%> 
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
