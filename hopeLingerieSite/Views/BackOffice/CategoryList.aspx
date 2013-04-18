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
            window.location = "/BackOffice/CategoryUpdate/" + Id;
        }
        else
            alert("Seleccione una Categoría");
    }

    function fnEliminar() {

        if (gvProducto.GetSelectedRowCount() == 1)
            if (confirm("Está seguro de eliminar la Categoría?"))
                window.location = "/BackOffice/CategoryDelete/" + Id;
            else
                alert("Seleccione una Categoría");
    }

    function fCrear() {
        window.location = "/BackOffice/CategoryUpdate/-1";
    }

    function grid_SelectionChanged(s, e) {

        s.GetSelectedFieldValues("CategoryID", GetSelectedFieldValuesCallback);
    }

    function GetSelectedFieldValuesCallback(value) {

        Id = value;
    }

    </script>

   <h2>
        Listado de Categorías
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
    Html.RenderPartial("CategoryGridView", Model); 
%>

</asp:Content>
