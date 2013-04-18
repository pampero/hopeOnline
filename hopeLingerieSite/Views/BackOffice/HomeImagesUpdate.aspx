<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Parameter>"  %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">

    function PublishHome() {
        if (confirm("Está seguro que desea publicar las imágenes?"))
            $.ajax({
                type: "POST",
                cache: false,
                url: "/BackOffice/PublishHome",
                data: $(this).serializeArray(),
                success: function (data) {
                    alert(data);
                }
            });
    }
    
    </script>
   

    <h2>Asignar Imagenes Home</h2>
<%
    using (Html.BeginForm())
    {
 %>
    <table width="80%">
        <tr>
            <td width="150px" valign="top">
                Link Front Principal
            </td>
            <td valign="top">
<% 
Html.DevExpress().TextBox(
    settings =>
    {
        settings.Name = "txtFrontLinkImage";
        settings.Width = new Unit(400, UnitType.Pixel);
        settings.Properties.MaxLength = 500;
        settings.Text = ViewData["FrontLinkImage"].ToString();
    }
)
.Render();
%>
            </td>
        </tr>
            <td valign="top">
                Imagen
            </td>
            <td>

<% 
    
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksFrontMainImage";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksFrontMainImage", Id = 1 };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewCallbacksFrontMainImage').attr('src', e.callbackData.split('|')[1]); } }";
    })
    .Render();
%>
                <img alt="" id="previewCallbacksFrontMainImage" src="/Content/UploadControl/UploadFolder/HomeDraft/FrontMain.jpg" />
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksFrontMainImage.Upload();" />
            </td>
        </tr>
        <tr>
        <td colspan="2"><hr /></td>
        </tr>
         <tr>
            <td valign="top">
                Link Front Izquierda Abajo
            </td>
             <td valign="top">
                   <% 
           Html.DevExpress().TextBox(
               settings =>
               {
                   settings.Name = "txtLeftLinkImage";
                   settings.Width = new Unit(400, UnitType.Pixel);
                   settings.Properties.MaxLength = 500;
                   settings.Text = ViewData["LeftLinkImage"].ToString();
               }
           )
           .Render();
                %>
            </td>
        </tr>
        <tr>
            <td valign="top">
                Imagen
            </td>
            <td>
<% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksFrontLeftImage";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksFrontLeftImage", Id=1 };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewCallbacksFrontLeftImage').attr('src', e.callbackData.split('|')[1]); } }";
    })
    .Render();
%>
                <img alt="" id="previewCallbacksFrontLeftImage" src="/Content/UploadControl/UploadFolder/HomeDraft/FrontLeft.jpg" />
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksFrontLeftImage.Upload()" />
            </td>
        </tr>
        <tr>
            <td colspan="2"><hr /></td>
        </tr>
        <tr>
            <td valign="top">
                Link Front Derecha Abajo
            </td>
             <td valign="top">
                   <% 
           Html.DevExpress().TextBox(
               settings =>
               {
                   settings.Name = "txtRightLinkImage";
                   settings.Width = new Unit(400, UnitType.Pixel);
                   settings.Properties.MaxLength = 500;
                   settings.Text = ViewData["RightLinkImage"].ToString();
               }
           )
           .Render();
                %>
            </td>
        </tr>
        <tr>
            <td valign="top">
                Imagen
            </td>
            <td>
<% 
Html.DevExpress().UploadControl(
    settings =>
    {
        settings.Name = "ucCallbacksFrontRightImage";
        settings.CallbackRouteValues = new { Controller = "BackOffice", Action = "CallbacksFrontRightImage" };
        settings.ControlStyle.CssClass = "editorArea";
        settings.ShowProgressPanel = true;
        settings.ValidationSettings.Assign(HopeLingerieServices.Services.Utils.PhotoUtils.ValidationSettings);
        settings.ClientSideEvents.FileUploadComplete = "function(s,e){ if(e.callbackData != '') { $('#previewCallbacksFrontRightImage').attr('src', e.callbackData.split('|')[1]); } }";
    })
    .Render();
    
    }
%>
                <img alt="" id="previewCallbacksFrontRightImage" src="/Content/UploadControl/UploadFolder/HomeDraft/FrontRight.jpg" />
                <br />
                <input type="button" value="Subir Foto" onclick="ucCallbacksFrontRightImage.Upload()" />
            </td>
        </tr>
        <tr>
        <td colspan="2"><hr /></td>
        </tr>
    </table>
    <table border="0">
        <tr>
            <td> <% 
           Html.DevExpress().Button(
           settings =>
           {
               settings.Name = "Grabar";
               settings.ControlStyle.CssClass = "button";
               settings.Text = "Grabar";
               settings.UseSubmitBehavior = true;
           })
           .Render();
        %></td>
            <td><%
               Html.DevExpress().Button(
                    settings =>
                    {
                        settings.Name = "Publicar";
                        settings.ControlStyle.CssClass = "button";
                        settings.Text = "Publicar";
                        settings.UseSubmitBehavior = false;
                        settings.Attributes.Add("style", " float:left;");
                        settings.ClientSideEvents.Click = "PublishHome";
                    })
                    .Render();
                    %></td>
        </tr>
    </table>

    
</asp:Content>
