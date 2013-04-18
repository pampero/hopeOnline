<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Size>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">


<% if (Model.SizeId <= 0)  {%>
    <h2>Crear Talle</h2>
    <%} else { %>
    <h2>Edición Talle</h2>
    <%}

        using (Html.BeginForm()) {%>
        
        <%: Html.HiddenFor(model => model.SizeId) %>

        <table width="50%">
            <tr>
                <td width="10%">
                    Talle*
                </td>
                <td width="40%">
                    <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Code";
                            settings.Text = Model.Code;
                            settings.Properties.MaxLength = 10;
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Width = 200;
                        }
                    )
                    .Render();
                %>
                </td>
                <td width="10%">
                    Descripción*
                </td>
                <td width="40%">
                    <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Description";
                            settings.Text = Model.Description;
                            settings.Properties.MaxLength = 50;
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Width = 200;
                        }
                    )
                    .Render();
                %>
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
        <%: Html.ActionLink("Volver", "Sizes") %>
    </div>

</asp:Content>

