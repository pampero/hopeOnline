<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<HopeLingerieServices.Model.Customer>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">

        var Id;

        function fCrear() {
            window.location = "/BackOffice/CustomerUpdate/-1";
        }

        function grid_SelectionChanged(s, e) {

            s.GetSelectedFieldValues("CustomerId", GetSelectedFieldValuesCallback);
        }

        function GetSelectedFieldValuesCallback(value) {

            Id = value;
        }

        function SelectionChanged(s, e) {
            s.GetSelectedFieldValues("CustomerId", GetSelectedFieldValuesCallback);
        }

        function GetSelectedFieldValuesCallback(values) {
            document.getElementById('printItems_I').value = values;
        } 

    </script>
    <h2>
        Listado de Clientes
    </h2>
    <br />
    <% 
        using (Html.BeginForm("ExportCustomersToXls", "Print"))
        {
            Html.DevExpress().TextBox(
              settings =>
              {
                  settings.Name = "printItems";
                  settings.ControlStyle.CssClass = "button";
                  settings.ClientVisible = false;
              })
              .Render();

            Html.DevExpress().Menu(
                settings =>
                {
                    settings.Name = "mFeatures";
                    settings.AllowSelectItem = true;
                    settings.ShowPopOutImages = DefaultBoolean.True;
                    settings.Items.Add("Crear", "Crear", "/Content/imgs/backoffice/add.gif", "javascript:fCrear();");
                })
                .Render();
    %>
    <br />
    <table>
        <tr>
            <td>
                <%
    Html.DevExpress().Button(
    settings =>
    {
        settings.Name = "cmdPrint";
        settings.ControlStyle.CssClass = "button";
        settings.Text = "Exportar";
        settings.UseSubmitBehavior = false;
        settings.ClientSideEvents.Click = "function(s, e) { if($('#printItems_I').val() != '') document.forms[0].submit(); }";
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
                settings.ClientSideEvents.Click = "function(s, e) { gvCustomers.SelectRows(); }";
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
                settings.ClientSideEvents.Click = "function(s, e) { gvCustomers.UnselectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            </td>
        </tr>
    </table>
    <%     }
    %>
    <%
        Html.RenderPartial("CustomerGridView", Model); 
    %>
</asp:Content>
