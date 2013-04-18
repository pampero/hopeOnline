<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">

        var Id;

        function GetSelectedFieldValuesCallback(value) {

            Id = value;
        }

        function SelectionChanged(s, e) {
            s.GetSelectedFieldValues("OrderID", GetSelectedFieldValuesCallback);
        }

        function GetSelectedFieldValuesCallback(values) {
            document.getElementById('printItems_I').value = values;
            document.getElementById('checkOrders_I').value = values;
        } 

    </script>
    <h2>
        Ventas En Proceso
    </h2>
    <br />
  <% 
      using (Html.BeginForm("UpdatePayments", "Payment"))
    {       
        Html.DevExpress().TextBox(
    settings =>
    {
        settings.Name = "ViewName";
        settings.ControlStyle.CssClass = "button";
        settings.ClientVisible = false;
        settings.Text = "/BackOffice/InProcessOrders";
    })
    .Render();
        
        Html.DevExpress().TextBox(
  settings =>
  {
      settings.Name = "checkOrders";
      settings.ControlStyle.CssClass = "button";
      settings.ClientVisible = false;
  })
  .Render();%>
  <br />
    <table>
        <tr>
            <td>
                <%
              Html.DevExpress().Button(
              settings =>
              {
                  settings.Name = "cmdCheckOrders";
                  settings.ControlStyle.CssClass = "button";
                  settings.Text = "Chequear Pagos";
                  settings.UseSubmitBehavior = false;
                  settings.ClientSideEvents.Click = "function(s, e) { if($('#checkOrders_I').val() != '') document.forms[0].submit(); }";
              })
              .Render();    %>
            </td>

<%
    }
             using (Html.BeginForm("ExportOrdersToXls", "Print"))
        {%>
            <td>
                <%
            Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdPrint";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Exportar";
                settings.UseSubmitBehavior = false;
                settings.ClientSideEvents.Click = "function(s, e) { if($('#printItems_I').val() != '') document.forms[1].submit(); }";
            })
            .Render();    %>
            </td>
            <td>
                <%  Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdSelectAll";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Seleccionar Todo";
                settings.ClientSideEvents.Click = "function(s, e) { gvOrders.SelectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            </td>
            <td>
                <%  Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdDeSelectAll";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Deseleccionar Todo";
                settings.ClientSideEvents.Click = "function(s, e) { gvOrders.UnselectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            </td>
        </tr>
    </table>
    <%    Html.DevExpress().TextBox(
  settings =>
  {
      settings.Name = "printItems";
      settings.ControlStyle.CssClass = "button";
      settings.ClientVisible = false;
  })
  .Render();%>
    <%
        }
   
        Html.RenderPartial("InProcessOrderGridView", Model); 
    %>
</asp:Content>
