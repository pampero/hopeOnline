<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Coupon>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">


<% if (Model == null)  {%>
    <h2>Crear Cupón</h2>
    <%} else { %>
    <h2>Edición Cupón</h2>
    <%}

        Html.EnableClientValidation();
        
        using (Html.BeginForm()) {%>
        
        <%: Html.HiddenFor(model => model.CouponId) %>

        <table width="60%">
            <tr>
                <td width="10%">
                    Código*
                </td>
                <td width="40%">
                    <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Code";
                            settings.Text = Model.Code;
                            settings.Properties.MaxLength = 37;
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Width = 300;
                        }
                    )
                    .Render();
                %>
                </td>
                <td width="10%">
                    Porcentaje
                </td>
                <td width="40%">
                <% Html.DevExpress().SpinEdit(
                    settings =>
                        {
                            settings.Name = "Percentage";
                            settings.Properties.MinValue = 1;
                            settings.Properties.MaxValue = 100;
                            settings.Properties.NumberType = SpinEditNumberType.Integer;
                            settings.Properties.NumberFormat = SpinEditNumberFormat.Percent;
                            settings.Width = 80;
                            settings.Properties.AllowNull = false;
                            settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                            settings.Properties.SpinButtons.ShowIncrementButtons = false;
                            settings.Properties.NullText = "1% a 100%";
                        })             
                    .Bind(Model, "Percentage")
                    .Render();
                    %>
                </td>
            </tr>
             <tr>
                <td>
                    Campaña*
                </td>
                <td>
                    <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Campaign";
                            settings.Text = Model.Campaign;
                            settings.Properties.MaxLength = 100;
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Width = 300;
                        }
                    )
                    .Render();
                %>
                </td>
                <td>
                    Fecha de Vencimiento
                </td>
                <td>
                <% Html.DevExpress().DateEdit(
                    settings =>
                        {
                            settings.Name = "ExpirationDate";
                            settings.Properties.AllowNull = false;
                            settings.Properties.NullText = "dd/mm/aaaa";
                            settings.Date = Model.ExpirationDate.Date;
                            settings.Width = 200;
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.DateValidationSettings);
                            settings.Properties.EditFormat = EditFormat.Custom;
                            settings.Properties.EditFormatString = "dd/MM/yyyy";
                        })             
                    .Bind(Model, "ExpirationDate")
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
        <%: Html.ActionLink("Volver", "Coupons") %>
    </div>

</asp:Content>

