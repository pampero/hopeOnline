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

    <script type="text/javascript">
        $(document).ready(function () {
            if ($.browser.webkit == true) {

                $('#testando').append('<img src="/Content/Imgs/fundo_hope.jpg" class="imagemTeste" style="z-index:1;">');
            }
            else {
                $('#testando').append('<img src="/Content/Imgs/fundo_hope.jpg" class="imagemTeste" style="z-index:1;">');
            }
        });

    </script>

</head>
<body>
<div style="position:absolute; margin:0px; padding:0px; left:0px; right:0px;z-index:1; text-align:center" id="testandoSobre"></div>
	<div class="sobreHope">
    	<h3>Sobre a Hope</h3>
        <p>A Hope nasceu de um sonho, da esperan&ccedil;a de transformar a vida das mulheres atrav&eacute;s do conforto absoluto. Parece ambicioso, n&atilde;o?
		Assim como foi lan&ccedil;ar uma das primeiras marcas de moda intima do pa&iacute;s, no ano de 1966, um territ&oacute;rio jamais explorado terras tupiniquins.
		Essa vontade, se tornou a alma da marca mais amada pelas brasileiras, e se traduz no desejo de antecipar as necessidades de suas f&atilde;s. Fa&ccedil;a parte dessa hist&oacute;ria. </p>
    </div>
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

            <a href="/Catalogo/" style="bottom: 20px; position: absolute;
                z-index: 6">
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


        </div>
        
    </div>
</body>
</html>