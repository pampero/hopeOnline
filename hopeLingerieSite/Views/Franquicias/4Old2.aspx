<%@ Page Title="" Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<html>
<head>
    <title>HOPE: SEJA UM FRANQUEADO</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    
    <link rel="stylesheet" href="../../Content/styles/style.css" type="text/css" charset="utf-8">
    <script src="../../Scripts/functions.js" type="text/javascript"></script>
    
</head>
<body scroll="auto">
    <img src="img/loading.gif" id="loading">
    <div id="div_fundo" >
        <img src="/Content/imgs/f4.jpg" id="img_fundo" class="tr_100"></div>
    <div id="conteudo" style="display: block;">
        <div id="hope" style="top: 292px; left: 10px;">
            <a href="<%: Url.Action("Index", "Franquicias") %>"></a>
        </div>
        <div class="n4" id="numero" style="top: 20px; left: 1034px;">
        </div>
        <div id="news" style="top: 20px; left: 1768px;">
            <span class="spanews">RECIBA NOVEDADES</span>
            <form onsubmit="return valida('novidades')" target="newsframe" action="/Franquicias/RecibeNewsLetter" method="post" name="novidades">
                <input type="image" src="../../Content/imgs/subm.png" class="submnews">
                <input type="text" onfocus="this.value = ''" value="Ingrese su Email" name="receba_novidades" id="receba_novidades" class="inputnews">
                <input type="hidden" id="step" name="step" value="5" />
            </form>
        </div>
        <iframe width="0" scrolling="no" height="0" frameborder="0" name="newsframe"></iframe>
        <div class="w300" id="texto" style="top: 60px; left: 1808px;">
            <h1>
                Investimento</h1>
            O investimento mínimo inicial é a partir de R$ 340.000,00 conforme abaixo:<br>
            <ul>
                <li>Taxa de franquia: R$ 40.000</li>
                <li>Estoque inicial: aproximadamente R$ 100.000</li>
                <li>Instalações e equipamentos: aproximadamente R$ 200.000</li>
            </ul>
            Recomendamos um capital de giro mínimo de R$100.000,00.<br>
            <br>
            Estima-se o payback entre 18 e 36 meses
            <br>
            <br>
            <b class="aspa">“</b>Foi com surpresa, e grande satisfação, que vimos a excelente
            aceitação dos produtos HOPE aqui no Rio de Janeiro. Logo aqui, aonde se encontram
            fábricas de vários concorrentes e aonde a HOPE não tinha uma penetração tão expressiva,
            nossas lojas tiveram o maior sucesso. Os comentários e elogios de nossas clientes,
            tanto dos produtos como da beleza da própria loja HOPE, nos motivaram tanto que,
            além de irmos explorar o mercado do Espírito Santo, já estamos partindo para nossa
            3ª loja no Rio<b class="aspa">”</b>.<br>
            <br>
            <b>Ronaldo &ndash; Franqueado Rio de Janeiro</b>
            <div class="setas">
                <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "5" }) %>" id="der"></a>
                <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "3" }) %>" id="izq"></a>
            </div>
        </div>
        <div id="grafico" style="top: 180px; left: 1558px;">
        </div>
        <div id="setahome" style="top: 371px; left: 1861px;">
        </div>
    </div>
</body>
</html>
