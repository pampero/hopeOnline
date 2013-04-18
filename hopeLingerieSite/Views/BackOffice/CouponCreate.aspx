<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Coupon>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <h2>Crear Cupones</h2>

        <% Html.EnableClientValidation();
        
        using (Html.BeginForm()) {%>
        
        <table width="60%">
            <tr>
                <td width="10%">
                    Campaña*
                </td>
                <td width="40%">
                    <% 
                    Html.DevExpress().TextBox(
                        settings => {
                            settings.Name = "Campaign";
                            settings.Properties.MaxLength = 100;
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Width = 300;
                        }
                    )
                    .Render();
                %>
                </td>
                <td width="10%">
                    Porcentaje Descuento (1% a 100%)*
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
                            settings.Number = 1;
                            settings.Properties.NullText = "1% a 100%";
                        })             
                    .Render();
                    %>
                </td>
            </tr>
             <tr>
                <td>
                    Cantidad (1-500)*
                </td>
                <td>
                    <% 
                    Html.DevExpress().SpinEdit(
                        settings => {
                            settings.Name = "Total";
                            settings.Properties.MinValue = 1;
                            settings.Properties.MaxValue = 500;
                            settings.Properties.NumberType = SpinEditNumberType.Integer;
                            settings.Properties.NumberFormat = SpinEditNumberFormat.Number;
                            settings.Width = 80;
                            settings.Properties.AllowNull = false;
                            settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                            settings.Properties.SpinButtons.ShowIncrementButtons = false;
                            settings.Properties.NullText = "1 a 500";
                            settings.Number = 1;
                            settings.Width = 300;
                        }
                    )
                    .Render();
                %>
                </td>
                <td>
                    Fecha Vencimiento*
                </td>
                <td>
                <% Html.DevExpress().DateEdit(
                    settings =>
                        {
                            settings.Name = "ExpirationDate";
                            settings.Properties.NullText = "dd/mm/aaaa";
                            settings.Width = 200;
                            settings.Properties.EditFormat = EditFormat.Custom;
                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.DateValidationSettings);
                            settings.Properties.EditFormatString = "dd/MM/yyyy";
                        })
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
                settings.Name = "Generar";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Generate";
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

