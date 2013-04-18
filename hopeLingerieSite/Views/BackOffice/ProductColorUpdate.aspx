<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Color>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">
        var textSeparator = ";";

        function UpdateText() {
            var selectedItems = listBox1.GetSelectedItems();
            dropDownEdit1.SetText(GetSelectedItemsText(selectedItems));
        }

        function GetSelectedItemsText(items) {
            var texts = [];
            for (var i = 0; i < items.length; i++)
                texts.push(items[i].text);
            return texts.join(textSeparator);
        }

        function SynchronizeListBoxValues(dropDown, args) {
            listBox1.UnselectAll();
            var texts = dropDown.GetText().split(textSeparator);
            var values = GetValuesByTexts(texts);
            listBox1.SelectValues(values);
            UpdateText();
        }

        function GetValuesByTexts(texts) {
            var actualValues = [];
            var item;
            for (var i = 0; i < texts.length; i++) {
                item = listBox1.FindItemByText(texts[i]);
                if (item != null)
                    actualValues.push(item.value);
            }
            return actualValues;
        }


        function handleDelete(sizeId, colorId) {

            if (confirm("Está seguro de eliminar el registro?"))
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: "/BackOffice/ProductColorSizeDelete/?sizeId=" + sizeId + "&colorId=" + colorId,
                    data: $(this).serializeArray(),
                    success: function (data) {
                        gvProductColorSize.PerformCallback();
                    }
                });
        }

        function handleGridUpdate() {
            gvProductColorSize.PerformCallback("1");
        }

    
    </script>
    <%
        if (Model.ColorId == 0)
        {%>
    <h2>
        Crear Color</h2>
    <%}
        else
        { %>
    <h2>
        Edición Color</h2>
    <%}

        using (Html.BeginForm())
        {
    %>
    <%:Html.HiddenFor(model => model.ColorId)%>
    <input type="hidden" value="<%: ViewData["ProductId"] %>" id="ProductId" name="ProductId" />
    <table width="60%">
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
                    settings.Width = new Unit(200, UnitType.Pixel);
                    settings.Properties.MaxLength = 50;
                    settings.Text = Model.Code;
                }
            )
            .Render();
                %>
            </td>
            <td valign="top" rowspan="2">
                <% if (Model.ProductId > 0)
                   {%>
                Color Thumb
                <% } %>
            </td>
            <td rowspan="2">
                <% if (Model.ProductId > 0)
                   { %>
                <%: Html.HiddenFor(model => model.ColorThumb)%>
                <% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksColorThumb";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksColorThumb", Id = Model.ColorId };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewImageColorThumb').attr('src', e.callbackData.split('|')[1]);   $('#ColorThumb').val(e.callbackData.split('|')[0]);  } }";
    })
    .Render();

if (Model.ColorThumb == null)
{
                %>
                <img alt="" id="previewImageColorThumb" src="<%= Url.Content("~/Content/imgs/backoffice/ImagePreview.gif") %>" />
                <%  }
else
{ %>
                <img alt="" id="previewImageColorThumb" src="<%: "/Content/UploadControl/UploadFolder/Products/" + Model.ProductId + "/" + Model.ColorId + "/" + Model.ColorThumb %>" />
                <%} %>
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksColorThumb.Upload()" />
                <% } %>
            </td>
        </tr>
        <tr>
            <td valign="top">
                Descripción*
            </td>
            <td valign="top">
                <% 
            Html.DevExpress().TextBox(
                settings =>
                {
                    settings.Name = "Descript";
                    settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                    settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                    settings.Width = new Unit(200, UnitType.Pixel);
                    settings.Properties.MaxLength = 50;
                    settings.Text = Model.Description;
                }
            )
            .Render();
                %>
            </td>
        </tr>
        <% if (Model.ProductId > 0)
           {
        %>
        <tr>
            <td colspan="4">
                <hr />
            </td>
        </tr>
        
        <tr>
            <td colspan="4">
                <h2>Imágenes Zoom Frente</h2>
            </td>
        </tr>
        <tr>
            <td>
                (1/2)
            </td>
            <td>
                <%: Html.HiddenFor(model => model.ImageFrontFirstZoom)%>
                <% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksImageFrontFirstZoom";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksImageFrontFirstZoom", Id = Model.ColorId };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewImageFrontFirstZoom').attr('src', e.callbackData.split('|')[1]);   $('#ImageFrontFirstZoom').val(e.callbackData.split('|')[0]);  } }";
    })
    .Render();

if (Model.ImageFrontFirstZoom == null)
{
                %>
                <img alt="" id="previewImageFrontFirstZoom" style="max-height:300px" src="<%= Url.Content("~/Content/imgs/backoffice/ImagePreview.gif") %>" />
                <%  }
else
{ %>
                <img alt="" id="previewImageFrontFirstZoom" style="max-height:300px" src="<%: "/Content/UploadControl/UploadFolder/Products/" + Model.ProductId + "/" + Model.ColorId + "/" + Model.ImageFrontFirstZoom %>" />
                <%} %>
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksImageFrontFirstZoom.Upload()" />
            </td>
            <td>
                (2/2)
            </td>
            <td>
                <%: Html.HiddenFor(model => model.ImageFrontSecondZoom)%>
                <% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksImageFrontSecondZoom";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksImageFrontSecondZoom", Id = Model.ColorId };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewImageFrontSecondZoom').attr('src', e.callbackData.split('|')[1]);   $('#ImageFrontSecondZoom').val(e.callbackData.split('|')[0]);  } }";
    })
    .Render();

if (Model.ImageFrontSecondZoom == null)
{
                %>
                <img alt="" id="previewImageFrontSecondZoom" style="max-height:300px" src="<%= Url.Content("~/Content/imgs/backoffice/ImagePreview.gif") %>" />
                <%  }
else
{ %>
                <img alt="" id="previewImageFrontSecondZoom" style="max-height:300px" src="<%: "/Content/UploadControl/UploadFolder/Products/" + Model.ProductId + "/" +  Model.ColorId + "/" + Model.ImageFrontSecondZoom %>" />
                <%} %>
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksImageFrontSecondZoom.Upload()" />
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <hr />
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <h2>Imágenes Zoom Revés</h2>
            </td>
        </tr>
        <tr>
            <td>
                (1/2)
            </td>
            <td>
                <%: Html.HiddenFor(model => model.ImageBackFirstZoom)%>
                <% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksImageBackFirstZoom";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksImageBackFirstZoom", Id = Model.ColorId };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewImageBackFirstZoom').attr('src', e.callbackData.split('|')[1]);   $('#ImageBackFirstZoom').val(e.callbackData.split('|')[0]);  } }";
    })
    .Render();

if (Model.ImageBackFirstZoom == null)
{
                %>
                <img alt="" id="previewImageBackFirstZoom" style="max-height:300px" src="<%= Url.Content("~/Content/imgs/backoffice/ImagePreview.gif") %>" />
                <% }
else
{ %>
                <img alt="" id="previewImageBackFirstZoom" style="max-height:300px" src="<%: "/Content/UploadControl/UploadFolder/Products/" + Model.ProductId + "/" +  Model.ColorId + "/" + Model.ImageBackFirstZoom %>" />
                <%} %>
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksImageBackFirstZoom.Upload()" />
            </td>
            <td>
                (2/2)
            </td>
            <td>
                <%: Html.HiddenFor(model => model.ImageBackSecondZoom)%>
                <% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksImageBackSecondZoom";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksImageBackSecondZoom", Id = Model.ColorId };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewImageBackSecondZoom').attr('src', e.callbackData.split('|')[1]);   $('#ImageBackSecondZoom').val(e.callbackData.split('|')[0]);  } }";
    })
    .Render();

if (Model.ImageBackSecondZoom == null)
{
                %>
                <img alt="" id="previewImageBackSecondZoom" style="max-height:300px" src="<%= Url.Content("~/Content/imgs/backoffice/ImagePreview.gif") %>" />
                <% }
else
{ %>
                <img alt="" id="previewImageBackSecondZoom" style="max-height:300px" src="<%: "/Content/UploadControl/UploadFolder/Products/" + Model.ProductId + "/" + Model.ColorId + "/" + Model.ImageBackSecondZoom %>" />
                <%} %>
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksImageBackSecondZoom.Upload()" />
            </td>
        </tr>
        <%               
           }
           
           %>
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
           
           
         <%  
        }
        %>
    </p>

        <% if (Model.ColorId > 0)
           {%>
        <tr>
            <td colspan="4">
                <hr />
            </td>
        </tr>
        <td colspan="4">
            <h2>
                Talles</h2>
        </td>
        <tr>
            <td colspan="4">
                <table cellpadding="0" cellspacing="0" width="80%">
                    <tr>
                        <td>
                            <table cellpadding="0" cellspacing="2" width="100%">
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                        Cantidad Real
                                    </td>
                                    <td width="100%">
                                        Talle
                                    </td>
                                </tr>
                                <% using (Ajax.BeginForm("ProductColorSizeAdd", "BackOffice", new AjaxOptions { OnComplete = "handleGridUpdate" }))
                                   { %>
                                <input type="hidden" name="ColorId" id="ColorId" value="<%: Model.ColorId %>" />
                                <tr>
                                    <td>
                                        <% 
                                       Html.DevExpress().Button(
                                       settings =>
                                       {
                                           settings.Name = "Agregar";
                                           settings.ControlStyle.CssClass = "button";
                                           settings.ValidationGroup = "Grilla";
                                           settings.Text = "Agregar";
                                           settings.UseSubmitBehavior = true;
                                       })
                                       .Render();
                                        %>
                                    </td>
                                    <td style="padding-left: 5px;">
                                        <% 
                                       Html.DevExpress().SpinEdit(
                                       settings =>
                                       {
                                           settings.Name = "Quantity";
                                           settings.Properties.MinValue = 1;
                                           settings.Properties.MaxValue = 100;
                                           settings.Properties.MaxLength = 3;
                                           settings.Width = new Unit(100, UnitType.Pixel);
                                           settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                                           settings.Properties.SpinButtons.ShowIncrementButtons = false;
                                           settings.Properties.ValidationSettings.ValidationGroup = "Grilla";
                                           settings.Properties.NullText = "De 1 a 1000...";
                                       })
                                       .Render();
                                        %>
                                    </td>
                                    <td>
                                        <%
                                       Html.DevExpress().ComboBox(settings =>
                                       {
                                           settings.Name = "SizeId";
                                           settings.Properties.ValueType = typeof(int);
                                           settings.Properties.TextField = "Code";
                                           settings.Properties.ValueField = "SizeId";
                                           settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                                           settings.Properties.ClientSideEvents.Validation = "OnComboRequiredValidation";
                                           settings.Properties.ValidationSettings.ValidationGroup = "Grilla";
                                           settings.SelectedIndex = 0;
                                           settings.Properties.CallbackPageSize = 20;

                                       })
                                        .BindList(ViewData["Sizes"])
                                        .Render();    
                                        %>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <% Html.RenderPartial("ProductColorSizeGridView", Model); %>
                                    </td>
                                </tr>
                            </table>
                            <% } %>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <% } %>
    </table>
    <div>
        <% if (Model.ProductId == 0)
           {%>
        <%: Html.ActionLink("Volver", "ProductUpdate", new { id = ViewData["ProductId"] })%>
        <%}
           else
           { %>
        <%: Html.ActionLink("Volver", "ProductUpdate", new { id = Model.ProductId })%>
        <% } %>
    </div>
</asp:Content>
