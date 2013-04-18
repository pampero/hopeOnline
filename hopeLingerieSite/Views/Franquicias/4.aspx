<%@ Page Title="" Language="C#"  Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<html>
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <link rel="stylesheet" href="../../Content/styles/Franquicias.css" type="text/css" charset="utf-8">
    <script src="../../Scripts/functions.js" type="text/javascript"></script>
    
</head>
<body scroll="auto">
    <img src="/Content/imgs/loading.gif" id="loading">
    <div id="div_fundo" >
        <img src="../../Content/imgs/f5.jpg" id="img_fundo" class="tr_100"></div>
    <div id="conteudo" style="display: block;">
        <div id="hope" style="top: 292px; left: 10px;">
            <a href="<%: Url.Action("Index", "Franquicias") %>"></a>
        </div>
        <div class="n4" id="numero" style="top: 20px; left: 1034px;">
        </div>
        <div id="news" style="top: 20px; left: 1768px;">
            <span class="spanews">RECIBA NOVEDADES</span>
            <form onsubmit="return valida('novidades')" target="newsframe" action="/Franquicias/RecibeNewsLetter" method="post" name="novidades">
            <input type="image" src="../../Content/imgs/subm.png" class="submnews" />
            <input type="text" onfocus="this.value = ''" value="Ingrese su Email" name="receba_novidades" id="receba_novidades" class="inputnews" />
            <input type="hidden" id="step" name="step" value="6" />
            </form>
        </div>
        <iframe width="0" scrolling="no" height="0" frameborder="0" name="newsframe"></iframe>
        <div class="w300" id="texto" style="top: 60px; left: 1808px;">
            <h1>Por que HOPE?</h1>
            <ul>
                <li>Marca líder en su sector.</li>
                <li>Productos diferenciados y exclusivos para las mujeres de todas las edades y estilos.</li>
                <li>Fuerte inversiones en Marca y comunicación y relacionamiento con su público.</li>
                <li>Aval de celebridades que promocionan la marca.</li>
                <li>Proyecto de local moderno que promueve la imagen de marca frente a sus clientes.</li>
                <li>Equipo exclusivo de gerenciamiento y marketing para franquicias.</li>
            </ul>
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
