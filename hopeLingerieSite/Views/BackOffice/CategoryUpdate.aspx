<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Category>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/MicrosoftMvcValidation.js" type="text/javascript"></script>
    <script src="../../Scripts/MicrosoftAjax.js" type="text/javascript"></script>
    <% if (Model.CategoryId == -1)
       {%>
    <h2>
        Crear Categoría</h2>
    <%}
       else
       { %>
    <h2>
        Edición Categoría</h2>
    <%}

       using (Html.BeginForm())
       {%>
    <%: Html.HiddenFor(model => model.CategoryId) %>
    <table width="50%">
        <tr>
            <td width="10%">
                Descripción*
            </td>
            <td width="40%">
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
        <% if ((Model.ParentCategoryId != null) || (Model.CategoryId == -1))
           { %>
        <tr>
            <td>
                Categoría Padre
            </td>
            <td>
                <%: Html.DropDownList("ParentCategoryID", new SelectList(ViewData.Eval("categories") as IEnumerable, "CategoryID", "Description", Model.ParentCategoryId), new { @style="width:200px" })%>
            </td>
        </tr>
        <% }
           
           if ((Model.ParentCategoryId == null) && (Model.CategoryId != -1))
           { %>
            <tr>
            <td>
                Orden*
            </td>
            <td>
                 <% Html.DevExpress().SpinEdit(
                    settings =>
                        {
                            settings.Name = "DisplayOrder";
                            settings.Properties.MinValue = 1;
                            settings.Properties.MaxValue = 100;
                            settings.Properties.NumberType = SpinEditNumberType.Integer;
                            settings.Properties.NumberFormat = SpinEditNumberFormat.Number;
                            settings.Width = 80;
                            settings.Properties.AllowNull = false;
                            settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                            settings.Properties.SpinButtons.ShowIncrementButtons = false;
                            settings.Properties.NullText = "1 a 100";
                            settings.Number = (!Model.DisplayOrder.HasValue ? 0 : Model.DisplayOrder.Value);
                            
                        })             
                    .Render();
                    %>
            </td>
        </tr>
         <tr>
            <td>
                Habilitada
            </td>
            <td>
                 <% Html.DevExpress().CheckBox(
                    settings =>
                        {
                            settings.Name = "IsEnabled";
                            settings.Width = 80;
                            settings.Checked = Model.Enabled;
                            
                        })             
                    .Render();
                    %>
            </td>
        </tr>
        <tr id="ThumbRow">
            <td>
                Imagen
            </td>
            <td>
                <%: Html.HiddenFor(model => model.Image)%>
                <% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksCategoryThumb";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksCategoryThumb", Id = Model.CategoryId };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewImageCategoryThumb').attr('src', e.callbackData.split('|')[1]);   $('#Image').val(e.callbackData.split('|')[0]);  } }";
    })
    .Render();

if (Model.Image == null)
{
                %>
                <img alt="" id="previewImageCategoryThumb" src="<%= Url.Content("~/Content/imgs/backoffice/ImagePreview.gif") %>" />
                <%  }
else
{ %>
                <img alt="" id="previewImageCategoryThumb" src="<%: "/Content/UploadControl/UploadFolder/Categories/" + Model.CategoryId + "/" + Model.Image %>" />
                <%} %>
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksCategoryThumb.Upload()" />
            </td>
        </tr>
        <% } %>
          <tr>
            <td colspan="4">
                <div style="color:Red">
                    <%: TempData["Legend"]%>
                </div>
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
        <%: Html.ActionLink("Volver", "Categories") %>
    </div>
</asp:Content>
