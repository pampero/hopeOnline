<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/NoCategory.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div id="carro_vacio">        <div id="retorno_container">            <p class="txtConfirmacao">                <%: ViewData["SearchResult"] %>   			</p>            <p class="btConfirmacao">                <a href="/" id="btnComprarMais"><img src="/Content/imgs/shoppingcart/bt_comprar_mais_produtos.gif" alt="Comprar más produtos" title="Comprar más productos" /></a>			</p>		</div>	</div>

</asp:Content>
