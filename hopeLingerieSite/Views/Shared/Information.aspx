<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieSite.ViewModels.MessageViewModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <link href="../../Content/styles/Information.css" rel="stylesheet" type="text/css" media="screen" />

    <div id="main_content_container">
        <div id="main_content">
            <div id="retorno_container">
                <p class="txtConfirmacao">
                  <%: Model.Message %>
                </p>
                <p class="btConfirmacao">
 <% 
                    switch (Model.ActionType)
                    {
                        case HopeLingerieServices.Common.ActionType.Back:
%>
                    <a id="A1" href="javascript:history.back();" title="Volver">
                        <img src="/Content/imgs/shoppingcart/bt_comprar_mais_produtos.gif" alt="Volver" title="Volver" />
                    </a>
<%
                            break;
                        case HopeLingerieServices.Common.ActionType.Home:
%>
                    <a id="A2" href="/" title="Home">
                        <img src="/Content/imgs/shoppingcart/bt_comprar_mais_produtos.gif" alt="Home" title="Home" />
                    </a>
<%                        
                            break;
                        case HopeLingerieServices.Common.ActionType.Catalogue:
%>
                    <a id="A3" href="/Catalogo" title="Comprar mas productos">
                        <img src="/Content/imgs/shoppingcart/bt_comprar_mais_produtos.gif" alt="Comprar mas produtos" title="Comprar mas productos" />
                    </a>
<%
                            break;
                        default:
                            break;
                    }
%>
                </p>
            </div>
        </div>
    </div>
</asp:Content>
