<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Order>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <h2>
        Entrega de Orden de Compra</h2>
    <table width="60%">
        <tr>
            <td width="10%">
                Apellido
            </td>
            <td width="40%">
                <% 
                    Html.DevExpress().TextBox(
                        settings =>
                        {
                            settings.Name = "LastName";
                            settings.ReadOnly = true;
                            settings.Text = Model.Customer.LastName;
                            settings.Properties.MaxLength = 50;
                            settings.ReadOnly = true;
                            settings.Width = 200;
                        }
                    )
                    .Render();
                %>
            </td>
            <td width="10%">
                Nombre
            </td>
            <td width="40%">
                <% 
                    Html.DevExpress().TextBox(
                       settings =>
                       {
                           settings.Name = "FirstName";
                           settings.ReadOnly = true;
                           settings.Text = Model.Customer.FirstName;
                           settings.Properties.MaxLength = 50;
                           settings.ReadOnly = true;
                           settings.Width = 200;
                       }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Email
            </td>
            <td>
                <% 
                    Html.DevExpress().TextBox(
                        settings =>
                        {
                            settings.Name = "Email";
                            settings.ReadOnly = true;
                            settings.Width = 200;
                            settings.Properties.MaxLength = 50;
                            settings.ReadOnly = true;
                            settings.Text = Model.Customer.Email;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                Fecha Alta
            </td>
            <td>
                <% 

                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "AddedDate";
                            settings.Width = 200;
                            settings.Text = Model.AddedDate.ToString("dd/MM/yyyy");
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Teléfono 1
            </td>
            <td>
                <% 
                    Html.DevExpress().TextBox(
                        settings =>
                        {
                            settings.Name = "Telephone1";
                            settings.ReadOnly = true;
                            settings.Width = 200;
                            settings.Text = Model.Customer.Telephone1;
                            settings.ReadOnly = true;
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
                        settings =>
                        {
                            settings.Name = "Telephone2";
                            settings.ReadOnly = true;
                            settings.Width = 200;
                            settings.Text = Model.Customer.Telephone2;
                            settings.ReadOnly = true;
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
                            settings.ReadOnly = true;
                            settings.Width = 200;
                            settings.Text = Model.Customer.Telephone3;
                            settings.ReadOnly = true;
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
                        settings =>
                        {
                            settings.Name = "Cellular";
                            settings.ReadOnly = true;
                            settings.Width = 200;
                            settings.Text = Model.Customer.Cellular;
                            settings.ReadOnly = true;
                            settings.Properties.MaxLength = 25;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
       
        <tr>
            <td>
                Entregado Por
            </td>
            <td>
                <% 
            Html.DevExpress().TextBox(
                settings =>
                {
                    settings.Name = "DeliveryBy";
                    settings.Width = 200;
                    settings.Text = Model.DeliveryBy;
                    settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                    settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                    settings.Properties.MaxLength = 100;
                    settings.ReadOnly = true;
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
        <tr>
            <td>
                Descuento
            </td>
            <td>
                <%
            Html.DevExpress().SpinEdit(
                settings =>
                {
                    settings.Name = "Discount";
                    settings.Properties.MinValue = 0;
                    settings.Properties.MaxValue = 100;
                    settings.Properties.NumberType = SpinEditNumberType.Integer;
                    settings.Properties.NumberFormat = SpinEditNumberFormat.Percent;
                    settings.Width = 80;
                    settings.ReadOnly = true;
                    settings.Properties.SpinButtons.ShowLargeIncrementButtons = false;
                    settings.Properties.SpinButtons.ShowIncrementButtons = false;
                    settings.Properties.NullText = "0% a 100%";
                    settings.Number = Convert.ToDecimal(Model.Discount);
                })
                   .Render();
                %>
            </td>
            <td valign="top">
                Fecha Entrega
            </td>
            <td valign="top">
                  <% 

                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "DeliveryDate";
                            settings.Width = 200;
                            settings.Text = Model.DeliveryDate.Value.ToString("dd/MM/yyyy");
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Dirección Entrega
            </td>
            <td>
                <% 
            Html.DevExpress().Memo(
                settings =>
                {
                    settings.Name = "DeliveryAddress";
                    settings.Properties.Rows = 6;
                    settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                    settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                    settings.ReadOnly = true;
                    settings.Width = 240;
                    settings.Text = Model.DeliveryAddress;
                }
            )
            .Render();
                %>
            </td>
            <td valign="top">
            </td>
            <td valign="top">
            </td>
        </tr>
        </tr>
        <tr>
            <td>
                Código Cupón
            </td>
            <td>
                <%: ViewData["Coupon"]%>
            </td>
            <td>
            </td>
            <td>
            </td>
        </tr>
    </table>
   
    <hr />
    <h2>
        Detalle Orden (Calcula con descuento)</h2>
    <table cellpadding="0" cellspacing="0" width="80%">
        <tr>
            <td>
                <table cellpadding="0" cellspacing="2" width="100%">
                    <tr>
                        <td colspan="6">
                            <% Html.RenderPartial("OrderDetailOrderGridView", Model.OrderDetails); %>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="20">
            </td>
        </tr>
        <tr>
            <td>
            </td>
        </tr>
    </table>
    <div>
        <%: Html.ActionLink("Volver", "DeliveredOrders")%>
    </div>
</asp:Content>
