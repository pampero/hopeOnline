<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master"
    Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Franchise>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <table width="60%" cellpadding=3px>
        <tr style="height:20px"> 
            <td colspan="4"></td>
        </tr>
        <tr>
            <td width="20%">
                Apellido
            </td>
            <td width="30%">
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "LastName";
                            settings.Text = Model.LastName;
                        }
                    )
                    .Render();
                %>
            </td>
            <td width="20%">
                Fecha Nacimiento
            </td>
            <td width="30%">
            <% if (Model.BirthDate.HasValue) %>
                 <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "BirthDate";
                            settings.Text = Model.BirthDate.Value.ToString("dd/MM/yyyy");
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Dirección
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "Address";
                            settings.Text = Model.Address;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                Ciudad
            </td>
            <td>
                <%
          
                    Html.DevExpress().Label(
                            settings =>
                            {
                                settings.Name = "City";
                                settings.Text = Model.City;
                            }
                        )
                        .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Provincia
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "State";
                            settings.Text = Model.State.Description;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                Cód.Postal
            </td>
            <td>
                <%
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "ZipCode";
                            settings.Text = Model.ZipCode;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Teléfono Residencial
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "Telephone1";
                            settings.Text = Model.Telephone1;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                Teléfono Comercial
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "Telephone2";
                            settings.Text = Model.Telephone2;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Teléfono Celular
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "Cellular";
                            settings.Text = Model.Cellular;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                EMail
            </td>
            <td>
                <%
                
                %>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <hr />
            </td>
        </tr>
        <tr>
            <td>
                Como tomó conocimiento de la franquicia
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "How";
                            settings.Text = Model.How;
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                Cuando pretende iniciar sus actividades?
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "When";
                            settings.Text = Model.When;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
        <tr>
            <td>
                Cuál es su capital para la inversión?
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "InvestmentMoney";
                            settings.Text = Model.InvestmentMoney.ToString("C2");
                        }
                    )
                    .Render();
                %>
            </td>
            <td>
                Por qué desea abrir una franquicia HOPE?
            </td>
            <td>
                <% 
                    Html.DevExpress().Label(
                        settings =>
                        {
                            settings.Name = "Why";
                            settings.Text = Model.Why;
                        }
                    )
                    .Render();
                %>
            </td>
        </tr>
    </table>
    <p>
        <div>
            <%: Html.ActionLink("Volver", "Franchises", "Backoffice") %>
        </div>
</asp:Content>
