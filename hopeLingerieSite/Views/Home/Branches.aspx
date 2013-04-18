<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<!DOCTYPE html>

<html>
<head>
    <title>Hope Lingerie</title>
    
    <script src="Scripts/jquery-1.4.4.min.js" type="text/javascript"></script>
    <script src="Scripts/welcome-hope.js" type="text/javascript"></script>
    <script src="Scripts/jquery.twitter.js" type="text/javascript"></script>
    <link href="../../Content/styles/welcome_hope.css" rel="stylesheet" type="text/css" />

   

</head>
<body>
<div style="position:absolute; margin:0px; padding:0px; left:0px; right:0px;z-index:1; text-align:center" id="testandoSobre"></div>
    <div style="color: transparent; text-decoration: none; position: absolute; margin: 0px;
        padding: 0px; left: 0px; right: 0px; z-index: 1; text-align: center" id="testando">
    </div>
    <a style="overflow: hidden; text-decoration: none; position: absolute; left: 32%;
        bottom: 13%; width: 25%; height: 30%; z-index: 1000;" href="http://www.hopeonline.com.br/ch/prod/219822/219586/0/sutia-triangulo-de-renda.aspx"
        alt="Sutiã triângulo de renda" title="Sutiã triângulo de renda">
        <img src="../../Content/imgs/transparent.gif" style="width: 100%; height: 100%;">
    </a>
    <div style="z-index: 2; position: absolute; margin: 0px; padding: 0px; height: 100%;
        width: 100%;">
        <div class="ct-page">
            <h1>
                <a href="/">HOPE</a></h1>
            <ul class="mn-principal">
                <li class="sep"><%: Html.ActionLink("Sutienes", "Sutienes", "Catalogo", null, new { @class = "sutias" }) %></li>
                <li><%: Html.ActionLink("Bragas", "Bragas", "Catalogo", null, new { @class = "calcinhas" })%></li>
                <li><%: Html.ActionLink("Extras", "Extras", "Catalogo", null, new { @class = "extras" }) %></li>
                
                <li class="sep"><%: Html.ActionLink("Registrese", "CustomerLogon", "Account", null, new { @class = "cadastrese" }) %></li>
            </ul>

            <a href="/Catalogo" style="bottom: 20px; position: absolute; z-index: 6">
                <img src="../../Content/imgs/45anos.png" border="0" /></a>
            <ul class="mn-cadastro">
                <li class="fst"><a href="/Account/CustomerLogOn">Mi registro</a></li>
                <li><a href="/ShoppingCart/Step1" class="cadeado">Carro de compras</a></li>
            </ul>
           

             <ul class="mn-apoio">
  
                <li><%: Html.ActionLink("sobre hope", "Index", "QuienesSomos", null, new { @class = "sobre" })%></li>
                <li><%: Html.ActionLink("nuestros locales", "Index", "Sucursales", null, new { @class = "lojas" })%></li>
                <li><%: Html.ActionLink("contacto", "Index", "Contacto", null, new { @class = "contato" })%></li>
                <li class="lst"><%: Html.ActionLink("franquicias", "Index", "Franquicias", null, new { @class = "franquias" })%></li>
              
            </ul>

             <div class="nossasLojas">
    	<h3>Nossas Lojas</h3>
        
        	<ul>
                <li class="titcidade">São Paulo</li>
                <li>Shop. Eldorado</li>
                <li>Shop. Pátio Higienópolis</li>
                <li>Shop. Center Norte</li>
                <li>Bourbon Shop.</li>
                <li>Shop. Ibirapuera</li>
                <li>Shop. Pátio Paulista</li>
                <li>Shop. Anália Franco</li>
                <li>MorumbiShop.</li>
                <li>Esplanada Shop.</li>
                <li>Shop. Villa Olímpia</li>
                <li>Plaza Sul Shop.</li>
                <li class="titcidade">Santo André</li>
                <li>Shop. ABC</li>               
				<li class="titcidade">Mogi das Cruzes</li>
				<li>Mogi Shopping</li>
                <li class="titcidade">Campinas</li>
                <li>Shop. Parque Dom Pedro</li>
				<li class="titcidade">Indaiatuba</li>
				<li>Shopping Pólo Indaiatuba</li>
                <li class="titcidade">Santos</li>
                <li>PraiaMar Shop. Center</li>
			</ul>
            <ul>              
                <li class="titcidade">São José do Rio Preto</li>
                <li>Rio Preto Shopping</li>
                <li>Shop. Riopreto</li>
                <li class="titcidade">Itupeva</li>
                <li>Shop. Out Let Premium SP</li>
				<li class="titcidade">Bauru</li>
				<li>Bauru Shopping</li>
                <li class="titcidade">Rio de Janeiro</li>
                <li>Barra Shopping </li>
                <li>Shop. Tijuca</li>
                <li>Norte Shopping</li>
                <li>Shop. Botafogo </li>
                <li class="titcidade">Niterói</li>
                <li>Plaza Shopping</li>
                <li class="titcidade">Belém</li>
                <li>Shop. Pátio Belém</li>
                <li>Boulevard Shop. Belém</li>
                <li class="titcidade">Belo Horizonte</li>
                <li>BH Shopping</li>
                <li class="titcidade">Brasília</li>
                <li>Shop. Conjunto Nacional</li>
                <li>Terraço Shopping</li>
                <li>Parkshopping</li>
			</ul>
            <ul>  
                <li class="titcidade">Cabedelo</li>
                <li>Manaíra Shop.</li>
				<li class="titcidade">Campina Grande</li>
				<li>Boulevard Shopping</li>
                <li class="titcidade">Caxias do Sul</li>
                <li>Shopping Iguatemi</li>
                <li class="titcidade">Curitiba</li>
                <li>Shop. Mueller</li>
                <li>Shop. Barigui</li>
				<li class="titcidade">Florianópolis</li>
				<li>Shopping Beiramar</li>
                <li class="titcidade">Goiânia</li>
                <li>Shop. Bougainville</li>
                <li>Flamboyant Shop. Center</li>
                <li class="titcidade">Juiz de Fora </li>
                <li>Independência Shop.</li>
                <li class="titcidade">Maringá</li>
                <li>Shop. Maringá Park</li>
				<li class="titcidade">Natal</li>
                <li>Shop. Natal</li>
                <li class="titcidade">Palmas</li>
                <li>Shopping Capim Dourado</li>
            </ul>
            <ul>                
                <li class="titcidade">Porto Alegre</li>
                <li>Shop. Barra Sul</li>
                <li class="titcidade">Recife</li>
                <li>Shop. Recife</li>
                <li>Shop. Tacaruna</li>
                <li class="titcidade">Salvador</li>
                <li>Shop. Iguatemi Salvador</li>
                <li>Shop. Barra</li>
                <li>Salvador Shop.</li>
                <li>Salvador Norte Shopping</li>
                <li class="titcidade">São Luis</li>
                <li>Rio Anil Shopping</li>
                <li class="titcidade">Teresina</li>
                <li>Shop. Riverside</li>
                <li class="titcidade">Uberlândia</li>
                <li>Center Shopping</li>
				<li class="titcidade">Vila Velha</li>
                <li>Shop. Praia da Costa</li>
                <li class="titcidade">Vitória</li>
                <li>Shop. Vitória</li>
        	</ul>
    </div>    

        </div>
        
    </div>
</body>
</html>