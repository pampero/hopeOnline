<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Stock>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/MicrosoftMvcValidation.js" type="text/javascript"></script>
    <script src="../../Scripts/MicrosoftAjax.js" type="text/javascript"></script>
    <h2>
        Edición Talle</h2>
    <%
       using (Html.BeginForm())
       {%>
    <%: Html.HiddenFor(model => model.StockId) %>
    <table width="50%">
         <tr>
            <td>
                Producto
            </td>
            <td colspan="3">
               <%: "(" + Model.Product.Code + ")" + Model.Product.Name + " - " + Model.Color.Code + " - " + Model.Size.Code %>
            </td>
        </tr>
        <tr>
            <td width="15%">
                Cantidad Real
            </td>
            <td width="35%">
                <% 
                    Html.DevExpress().SpinEdit(
                    settings =>
                    {
                        settings.Name = "RealQuantity";
                        settings.Properties.MinValue = 1;
                        settings.Properties.MaxValue = 100;
                        settings.Properties.MaxLength = 3;
                        settings.Width = new Unit(100, UnitType.Pixel);
                        settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                        settings.Properties.SpinButtons.ShowIncrementButtons = false;
                        settings.Properties.ValidationSettings.ValidationGroup = "Grilla";
                        settings.Properties.NullText = "De 1 a 1000...";
                        settings.Number = Model.RealQuantity;
                    })
                    .Render();
                %>
            </td>
            <td width="15%">
                Cantidad Virtual
            </td>
            <td width="35%">
                <% 
                    Html.DevExpress().SpinEdit(
                    settings =>
                    {
                        settings.Name = "VirtualQuantity";
                        settings.Properties.MaxLength = 3;
                        settings.Width = new Unit(100, UnitType.Pixel);
                        settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                        settings.Properties.SpinButtons.ShowIncrementButtons = false;
                        settings.Properties.ValidationSettings.ValidationGroup = "Grilla";
                        settings.ReadOnly = true;
                        settings.Number = Model.VirtualQuantity;
                    })
                    .Render();
                %>
            </td>
        </tr>
          <tr>
            <td>
                Stock Tomado
            </td>
            <td>
                <%: (Model.RealQuantity - Model.VirtualQuantity).ToString() %>
            </td>
            <td>
                
            </td>
            <td>
                
            </td>
        </tr>
    </table>
    <p>
        <% 
           Html.DevExpress().Button(
           settings =>
           {
               settings.Name = "Grabar";
               settings.ControlStyle.CssClass = "button";
               settings.Text = "Grabar";
               settings.UseSubmitBehavior = true;
           })
           .Render();
        %>
    </p>
    <%
       } 
    %>
    <div>
        <%: Html.ActionLink("Volver", "ProductColorUpdate", new { productId = Model.ProductId, colorId = Model.ColorId } ) %>
    </div>
    <br />
    <div>
        <% if (!String.IsNullOrEmpty(TempData["Error"].ToString()))
           { %>
           <%: TempData["Error"]%>
        <% } %>
           
    </div>
</asp:Content>
