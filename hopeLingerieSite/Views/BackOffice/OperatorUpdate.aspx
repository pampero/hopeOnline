<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Customer>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

 <script type="text/javascript">

     function OnPasswordValidation(s, e) {
         
         if (e.value == null)
             e.isValid = false;
         var name = String(e.value);
         if (name == "")
             e.isValid = false;
        
         if (name.length < 8) {
             e.isValid = false;
             e.errorText = "Longitud mínima 8 caracteres";
         }
     }

    </script>

<% if (Model == null)  {%>
    <h2>Crear Operador</h2>
    <%} else { %>
    <h2>Edición Operador</h2>
    <%}
       
        using (Html.BeginForm())
        {%>
            <%:Html.HiddenFor(model => model.CustomerId)%>
    <table width="60%">
        <tr>
            <td width="10%">
                Apellido*
            </td>
            <td width="40%">
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "LastName";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Text = Model.LastName;
                            settings.Properties.MaxLength = 50;
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
                           settings.Name = "FirstName";
                           settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                           settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                           settings.Text = Model.FirstName;
                           settings.Properties.MaxLength = 50;
                           settings.Width = 200;
                       }
                   )
                   .Render();
                %>
                
            </td>
        </tr>
        <tr><td colspan="4"><hr /></td></tr>
         <tr>
            <td>
                Email*
            </td>
            <td>
                <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Email";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.EmailValidationSettings);
                            settings.Width = 200;
                            settings.Properties.MaxLength = 50;
                            settings.Text = Model.Email;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                Clave*
            </td>
            <td>
                <% 
                    Html.DevExpress().TextBox(
                        settings =>
                        {
                            settings.Name = "Password";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnPasswordValidation";
                            settings.Width = 200;
                          //  settings.Properties.Password = true;
                            settings.Text = Model.Password;
                            settings.Properties.MaxLength = 25;
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
    <%
        }
    %>
  

     <div>
        <%: Html.ActionLink("Volver", "Operators") %>
    </div>

</asp:Content>

