<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Product>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/jquery.cascadingDropDown.js" type="text/javascript"></script>
    <script src="../../Scripts/MicrosoftAjax.js" type="text/javascript"></script>
<script src="../../Scripts/MicrosoftMvcAjax.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-ui-1.8.1.custom.min.js" type="text/javascript"></script>

    <script type="text/javascript">

        $(document).ready(function () {

            $("#CategoryID").CascadingDropDown("#parentCategory", '/BackOffice/AsyncSubCategory/',
            {
                promptText: '-- Sub Categoria --',
                postData: function () {
                    return { categoryId: $('#parentCategory').val() };
                },
                onLoading: function () {
                    $(this).css("background-color", "#ffffff");
                },
                onLoaded: function () {
                    $(this).val('<%: Model.CategoryId.ToString() %>').change();
                    $(this).animate({ backgroundColor: '#ffffff' }, 300);
                }
            });


        });

        $(document).ready(function () {

                $("#btnClick").click();

        });

        
        function handleColorDelete(colorId) {
            if (confirm("Está seguro de eliminar el registro?"))
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: "/BackOffice/ProductColorDelete/?colorId=" + colorId,
                    data: $(this).serializeArray(),
                    success: function (data) {
                        gvColors.PerformCallback();
                    }
                });
            }


            function PublishProduct(productId) {
            if (confirm("Está seguro que desea publicar el producto?"))
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: "/BackOffice/PublishProduct/<%: Model.ProductId.ToString() %>",
                    data: $(this).serializeArray(),
                    success: function (data) {
                        alert(data);
                        if (data == 'El producto ha sido publicado')
                            $("#published").text("Sí");
                        else
                            $("#published").text("No");
                    }
                });
        }

        function UnPublishProduct(productId) {
            if (confirm("Está seguro que desea sacar publicación del producto?"))
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: "/BackOffice/UnPublishProduct/<%: Model.ProductId.ToString() %>",
                    data: $(this).serializeArray(),
                    success: function (data) {
                        alert(data);
                        if (data == 'El producto ha sido despublicado')
                            $("#published").text("No");
                        else
                            $("#published").text("Sí");
                    }
                });
        }


    </script>

 
    <% if (Model.ProductId <= 0)
       {%>
    <h2>
        Crear Producto</h2>
    <%}
       else
       { %>
    <h2>
        Edición Producto</h2>
    <%}

       using (Html.BeginForm())
       {
    %>
    <%:Html.HiddenFor(model => model.ProductId)%>
    <table width="80%">
        <tr>
            <td width="10%">
                Código*
            </td>
            <td width="40%">
                <% 
            Html.DevExpress().TextBox(
                settings =>
                {
                    settings.Name = "Code";
                    settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                    settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                    settings.Text = Model.Code;
                    settings.Properties.MaxLength = 20;
                    settings.Width = 200;
                }
            )
            .Render();
                %>
            </td>
            <td width="10%">
                Nombre*
            </td>
            <td width="40%">
                <% 
            Html.DevExpress().TextBox(
               settings =>
               {
                   settings.Name = "Name";
                   settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                   settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                   settings.Text = Model.Name;
                   settings.Properties.MaxLength = 50;
                   settings.Width = 200;
               }
            )
            .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Descripción*
            </td>
            <td>
                <% 
            Html.DevExpress().Memo(
                settings =>
                {
                    settings.Name = "Descript";
                    settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                    settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                    settings.Width = 400;
                    settings.Properties.Rows = 4;
                    settings.Text = Model.Description;
                }
            )
            .Render();
                %>
            </td>
            <td valign="top">
                Precio Actual
            </td>
            <td valign="top">
                <%
            Html.DevExpress().SpinEdit(
                settings =>
                {
                    settings.Name = "CurrentPrice";
                    settings.Properties.NumberType = SpinEditNumberType.Float;
                    settings.Properties.NumberFormat = SpinEditNumberFormat.Currency;
                    settings.Width = 80;
                    settings.Properties.ClientInstanceName = "CurrentPrice";
                    settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                    settings.Properties.SpinButtons.ShowIncrementButtons = false;
                    settings.Properties.MinValue = 1;
                    settings.Properties.MaxValue = 10000;
                    settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                    settings.Properties.NullText = "$ 0,00";
                    settings.Number = Model.CurrentPrice;
                })
                .Render();
                    
                %>
            </td>
        </tr>
        <tr>
            <td>
                Precio Anterior
            </td>
            <td>
                <%
            Html.DevExpress().SpinEdit(
                settings =>
                {
                    settings.Name = "OldPrice";
                    settings.Properties.NumberType = SpinEditNumberType.Float;
                    settings.Properties.NumberFormat = SpinEditNumberFormat.Currency;
                    settings.Width = 80;
                    settings.Properties.ClientInstanceName = "OldPrice";
                    settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                    settings.Properties.SpinButtons.ShowIncrementButtons = false;
                    settings.Properties.NullText = "$ 0,00";
                    settings.Number = Convert.ToDecimal(Model.OldPrice);
                })
                .Render();
                    
                %>
            </td>
            <td>
                Categoría*
            </td>
            <td>
                <%: Html.DropDownList("parentCategory", new SelectList(ViewData.Eval("Categories") as IEnumerable, "CategoryID", "Description"), new { @style = "width:200px" })%>
                <select name="CategoryID" id="CategoryID" style="width:200px">
			    </select>
            </td>
        </tr>
        <tr>
            <td>
                Outlet
            </td>
            <td>
                <% 
            Html.DevExpress().CheckBox(
    settings =>
    {
        settings.Name = "OnSale";
        settings.Checked = Model.OnSale;
    }
)
.Render();
                %>
            </td>
            <td>
                Novedad
            </td>
            <td>
                <%
            Html.DevExpress().CheckBox(
                settings =>
                {
                    settings.Name = "IsNew";
                    settings.Checked = Model.IsNew;

                })
                .Render();
                    
                %>
            </td>
        </tr>
        <tr>
            <td>
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
            </td>
        <% if (Model.ProductId > 0)
           {%>
        
        <td>
        <span>
        <%
               Html.DevExpress().Button(
                    settings =>
                    {
                        settings.Name = "Publicar";
                        settings.ControlStyle.CssClass = "button";
                        settings.Text = "Publicar";
                        settings.UseSubmitBehavior = false;
                        settings.Attributes.Add("style", " float:left;");
                        settings.ClientSideEvents.Click = "PublishProduct";
                    })
                    .Render();
                    %>
        
                    <%
                    
               Html.DevExpress().Button(
                    settings =>
                    {
                        settings.Name = "Despublicar";
                        settings.ControlStyle.CssClass = "button";
                        settings.Text = "Despublicar";
                        settings.UseSubmitBehavior = false;
                        settings.ClientSideEvents.Click = "UnPublishProduct";
                    })
                    .Render();
            
             %>
             </span>
        </td>
        <td>
            Publicado?
        </td>
        <td>
            <span id="published"><% if (Model.Published) { %>Sí<%} else {%>No <% } %></span>
        </td>
       
    <% } %>
    </tr>
    <tr>
        <td colspan="4">
            <br />
            <div style="color:Red">
                <%: TempData["Legend"]%>
            </div>
        </td>
    </tr>

    </table>
<%
        }
    %>
    <table width="80%">
      <% if (Model.ProductId > 0)
         {%>
     <tr>
            <td colspan="4">
                <hr />
            </td>
        </tr>
        <tr>
            <td>
                <h2>Colores</h2>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <% Html.RenderPartial("ProductColorGridView", Model.Colors.Where(x => x.Active)); %>
            </td>
            <td style="width:20%">
            </td>
        </tr>
        <% } %>
    </table>

    <div>
        <%: Html.ActionLink("Volver", "Products") %>
    </div>

    <% if (Model.Category != null)
       { %>
    <button name="btnClick" id="btnClick" value="test" onclick="$('#parentCategory').val('<%: Model.Category.ParentCategoryId.ToString() %>').change();" style="visibility:hidden"></button>
    <% } %>
    

</asp:Content>


