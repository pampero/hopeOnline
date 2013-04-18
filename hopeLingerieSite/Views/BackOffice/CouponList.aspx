<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<script type="text/javascript">

    var Id;

    function fEditar() {
        setTimeout(fnEditar, 500);
    }

    function fEliminar() {
        setTimeout(fnEliminar, 500);
    }

    function fnEditar() {

        if (gvProducto.GetSelectedRowCount() == 1) {
            window.location = "/BackOffice/CouponUpdate/" + Id;
        }
        else
            alert("Seleccione un Cupón");
    }

    function fnEliminar() {

        if (gvProducto.GetSelectedRowCount() == 1)
            if (confirm("Está seguro de eliminar el cupón?"))
                window.location = "/BackOffice/CouponDelete/" + Id;
            else
                alert("Seleccione un Cupón");
    }

    function fCrear() {
        window.location = "/BackOffice/CouponUpdate/-1";
    }

    function fCrear() {
        window.location = "/BackOffice/CouponCreate";
    }

    function grid_SelectionChanged(s, e) {

        s.GetSelectedFieldValues("CouponID", GetSelectedFieldValuesCallback);
    }

    function GetSelectedFieldValuesCallback(value) {

        Id = value;
    }

    function SelectionChanged(s, e) {
        //alert(s.GetRowKey(e.visibleIndex));
        s.GetSelectedFieldValues("CouponId", GetSelectedFieldValuesCallback);
    }

    function GetSelectedFieldValuesCallback(values) {
        document.getElementById('printItems_I').value = values;
    } 

    </script>

   <h2>
        Listado de Cupones
    </h2>
    <br />
     <% 
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
    <% 
        using (Html.BeginForm("ExportCouponsToXls", "Print"))
        {%>


        <%    Html.DevExpress().TextBox(
  settings =>
  {
      settings.Name = "printItems";
      settings.ControlStyle.CssClass = "button";
      settings.ClientVisible = false;
  })
  .Render();%>

  <table>
  <tr>
  <td><%
            Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdPrint";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Exportar";
                settings.UseSubmitBehavior = false;
                settings.ClientSideEvents.Click = "function(s, e) { if($('#printItems_I').val() != '') document.forms[0].submit(); }";
            })
            .Render();    %></td>
            <td>
            
    <%  Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdSelectAll";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Seleccionar Todo";
                settings.ClientSideEvents.Click = "function(s, e) { gvCoupons.SelectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            
            </td>
            <td>
            <%              Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdDeSelectAll";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Deseleccionar Todo";
                settings.ClientSideEvents.Click = "function(s, e) { gvCoupons.UnselectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            </td>
  </tr>
  </table>

   <% } %>
    
<%
    Html.RenderPartial("CouponGridView", Model); 
%>

</asp:Content>
