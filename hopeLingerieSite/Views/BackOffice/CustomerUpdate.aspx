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
    <h2>Crear Cliente</h2>
    <%} else { %>
    <h2>Edición Cliente</h2>
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
        <tr>
            <td>
                DNI*
            </td>
            <td>
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "DNI";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Text = Model.DNI;
                            settings.Properties.MaxLength = 50;
                            settings.Width = 200;
                        }
                    )
                    .Render();
                %>
                
            </td>
            <td>
                Fecha Cumpleaños
            </td>
            <td>
            <%
            if (Model.BirthDate.HasValue)
            {
                Html.DevExpress().DateEdit(
                    settings =>
                    {
                        settings.Name = "BirthDate";
                        settings.Properties.NullText = "dd/mm/aaaa";
                        settings.Date = Model.BirthDate.Value;
                        settings.Width = 200;
                        settings.Properties.EditFormat = EditFormat.Custom;
                        settings.Properties.EditFormatString = "dd/MM/yyyy";
                    }
                )
                .Render();
            }
            else
            {
                Html.DevExpress().DateEdit(
                        settings =>
                        {
                            settings.Name = "BirthDate";
                            settings.Properties.NullText = "dd/mm/aaaa";
                            settings.Date = DateTime.Now;
                            settings.Width = 200;
                            settings.Properties.EditFormat = EditFormat.Custom;
                            settings.Properties.EditFormatString = "dd/MM/yyyy";
                        }
                    )
                    .Render();
            }
            %>
            </td>
        </tr>

        <tr><td colspan="4"><hr /></td></tr>
        <tr>
            <td>
                Dirección*
            </td>
            <td>
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Address";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Text = Model.Address;
                            settings.Properties.MaxLength = 100;
                            settings.Width = 200;
                        }
                    )
                    .Render();
                %>
                
            </td>
            <td>
                Número*
            </td>
            <td>
            <%
                Html.DevExpress().TextBox(
                    settings =>
                    {
                        settings.Name = "Number";
                        settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                        settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                        settings.Text = Model.Number;
                        settings.Properties.MaxLength = 15;
                        settings.Width = 200;
                    }
                )
                .Render();
            %>

            </td>
        </tr>
         <tr>
            <td>
                Ciudad*
            </td>
            <td>
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "City";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Text = Model.City;
                            settings.Properties.MaxLength = 50;
                            settings.Width = 200;
                        }
                    )
                    .Render();
                %>
                
            </td>
            <td>
                Provincia
            </td>
            <td>
                <%: Html.DropDownList("StateID", new SelectList(ViewData.Eval("States") as IEnumerable, "StateID", "Description", Model.StateId), new { @style = "width:200px" })%>
            </td>
        </tr>
          <tr>
            <td>
                Cod.Postal*
            </td>
            <td>
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "ZipCode";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Text = Model.ZipCode;
                            settings.Properties.MaxLength = 50;
                            settings.Width = 200;
                        }
                    )
                    .Render();
                %>
                
            </td>
            <td>
                
            </td>
            <td>
            <%
                
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
                Sexo
            </td>
            <td>
                 <% 
                    Html.DevExpress().ComboBox(
                        settings => {
                            settings.Name = "Gender";
                            settings.Width = 200;
                            
                            settings.Properties.DropDownStyle = DropDownStyle.DropDownList;
                            settings.Properties.Items.Add("Femenino", false);
                            settings.Properties.Items.Add("Masculino", true);
                        }
                    )
                    .Bind((Model.Gender)?"Masculino":"Femenino")
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Teléfono 1*
            </td>
            <td>
                <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Telephone1";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Width = 200;
                            settings.Text = Model.Telephone1;
                            settings.Properties.MaxLength = 25;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
               Teléfono 2
            </td>
            <td>
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Telephone2";
                            settings.Width = 200;
                            settings.Text = Model.Telephone2;
                            settings.Properties.MaxLength = 25;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Teléfono 3
            </td>
            <td>
                <% 
                    
                    Html.DevExpress().TextBox(
                        settings =>
                        {
                            settings.Name = "Telephone3";
                            settings.Width = 200;
                            settings.Text = Model.Telephone3;
                            settings.Properties.MaxLength = 25;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
               Celular
            </td>
            <td>
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Cellular";
                            settings.Width = 200;
                            settings.Text = Model.Cellular;
                            settings.Properties.MaxLength = 25;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Fax
            </td>
            <td>
                <% 
                    
                    Html.DevExpress().TextBox(
                        settings =>
                        {
                            settings.Name = "Fax";
                            settings.Width = 200;
                            settings.Text = Model.Fax;
                            settings.Properties.MaxLength = 25;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
               Reference
            </td>
            <td>
                 <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Reference";
                            settings.Width = 200;
                            settings.Text = Model.Reference;
                            settings.Properties.MaxLength = 25;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
         <tr>
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
                            settings.Checked = Model.NewsLetter;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
         <tr>
            <td>
              
            </td>
            <td>
           
            </td>
            <td>
           
            </td>
            <td>
            <% 
                    Html.DevExpress().CheckBox(
                        settings =>
                        {
                            settings.Name = "IsAdmin";
                            settings.Width = 200;
                            settings.Checked = false;
                            settings.ClientVisible = false;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
    </table>    
    <table width="100%">
        <tr>
            <td colspan="4"><hr /></td>
         </tr>
         <tr>
            <td colspan="4"><b>Hist&oacute;rico de compras realizadas por el cliente:</b><br /><br /></td>
         </tr>
        <tr>
            <td>
<% if (ViewData["Orders"] != null)
{ 
    Html.RenderPartial("CustomerOrderGridView", Model.CustomerId); 
}%>
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
        <%: Html.ActionLink("Volver", "Customers") %>
    </div>

</asp:Content>

