<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Contact>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <h2>
        Contactenos</h2>
    <%
        using (Html.BeginForm("ContactUs", "Contacto"))
        {
    %>
    <table width="80%">
        <tr>
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
                        settings.Properties.MaxLength = 50;
                        settings.Width = 200;
                    }
                )
                .Render();
                %>
            </td>
            <td width="10%">
                Descripción
            </td>
            <td width="40%">
                <% 
                Html.DevExpress().TextBox(
                   settings =>
                   {
                       settings.Name = "Descript";
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
                Email*
            </td>
            <td>
                <% 
                Html.DevExpress().TextBox(
                    settings =>
                    {
                        settings.Name = "EMail";
                        settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.EmailValidationSettings);
                        settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                        settings.Properties.MaxLength = 50;
                        settings.Width = 200;
                    }
                )
                .Render();
                %>
            </td>
            <td>
                Teléfono
            </td>
            <td>
                <% 
                Html.DevExpress().TextBox(
                   settings =>
                   {
                       settings.Name = "Telephone";
                       settings.Properties.MaxLength = 20;
                       settings.Width = 200;
                   }
                )
                .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                NewsLetter
            </td>
            <td>
                <% 
                Html.DevExpress().CheckBox(
                    settings =>
                    {
                        settings.Name = "NewsLetter";
                        settings.Width = 200;
                    }
                )
                .Render();
                %>
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
    <% } %>
    <div>
        <%: Html.ActionLink("Volver", "Home") %>
    </div>
</asp:Content>
