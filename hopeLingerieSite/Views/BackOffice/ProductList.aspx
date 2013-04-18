<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">

        $(document).ready(function () {
            checkCookie();
        });

        function PageChanged(s, e) {
            setCookie("currentPage", s.pageIndex, 1);    
        }

        function setCookie(c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        }

        function checkCookie() {
            var currentPage = getCookie("currentPage");
            if (currentPage != null && currentPage != "") {
                aspxGVPagerOnClick('gvProducts', 'PN' + currentPage);
            }
        }

        function getCookie(c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
        }

        
        var Id;

        function fEditar() {
            setTimeout(fnEditar, 500);
        }

        function fEliminar() {
            setTimeout(fnEliminar, 500);
        }

        function fnEditar() {

            if (gvProducto.GetSelectedRowCount() == 1) {
                window.location = "/BackOffice/ProductUpdate/" + Id;
            }
            else
                alert("Seleccione un Producto");
        }

        function fnEliminar() {

            if (gvProducto.GetSelectedRowCount() == 1)
                if (confirm("Está seguro de eliminar el producto?"))
                    window.location = "/BackOffice/ProductDelete/" + Id;
                else
                    alert("Seleccione un Producto");
        }

        function fCrear() {
            window.location = "/BackOffice/ProductUpdate/-1";
        }

        function grid_SelectionChanged(s, e) {

            s.GetSelectedFieldValues("ProductID", GetSelectedFieldValuesCallback);
        }

        function GetSelectedFieldValuesCallback(value) {

            Id = value;
        }

        function SelectionChanged(s, e) {
            s.GetSelectedFieldValues("ProductID", GetSelectedFieldValuesCallback);
        }

        function GetSelectedFieldValuesCallback(values) {
            document.getElementById('printItems_I').value = values;
        } 

    </script>
    <h2>
        Listado de Productos
    </h2>
    <br />
   
    <table>
        <tr>
            <td>
           <%
               using (Html.BeginForm("ExportProductsToXls", "Print"))
               {
                   Html.DevExpress().TextBox(
                     settings =>
                     {
                         settings.Name = "printItems";
                         settings.ControlStyle.CssClass = "button";
                         settings.ClientVisible = false;
                     })
                     .Render();

                   Html.DevExpress().Button(
                   settings =>
                   {
                       settings.Name = "cmdPrint";
                       settings.ControlStyle.CssClass = "button";
                       settings.Text = "Exportar";
                       settings.UseSubmitBehavior = false;
                       settings.ClientSideEvents.Click = "function(s, e) { if($('#printItems_I').val() != '') document.forms[0].submit(); }";
                   })
                   .Render();
               }
        %>               
            </td>
            <td>
            <%

    Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdSelectAll";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Seleccionar Todo";
                settings.ClientSideEvents.Click = "function(s, e) { gvProducts.SelectRows(); }";
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
                settings.ClientSideEvents.Click = "function(s, e) { gvProducts.UnselectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            </td>
        </tr>
    </table>
    <%     
           Html.RenderPartial("ProductGridView", Model); 
    %>
</asp:Content>
