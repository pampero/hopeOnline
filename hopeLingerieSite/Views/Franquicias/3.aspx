<%@ Page Title="" Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<html>
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <link rel="stylesheet" href="../../Content/styles/Franquicias.css" type="text/css" charset="utf-8">
    <script src="../../Scripts/functions.js" type="text/javascript"></script>
    
</head>
<body scroll="auto">
    <img src="/Content/imgs/loading.gif" id="loading">
    <div id="div_fundo" >
        <img src="../../Content/imgs/f3.jpg" id="img_fundo" ></div>
    <div id="conteudo" style="display: block;">
        <div id="hope" style="top: 292px; left: 10px;">
            <a href="<%: Url.Action("Index", "Franquicias") %>"></a>
        </div>
        <div class="n3" id="numero" style="top: 20px; left: 1034px;">
        </div>
        <div id="news" style="top: 20px; left: 1768px;">
            <span class="spanews">RECIBA NOVEDADES</span>
            <form onsubmit="return valida('novidades')" target="newsframe" action="/Franquicias/RecibeNewsLetter" method="post" name="novidades" >
                <input type="image" src="../../Content/imgs/subm.png" class="submnews" />
                <input type="text" onfocus="this.value = ''" value="Ingrese su Email" name="receba_novidades" id="receba_novidades" class="inputnews" />
                <input type="hidden" id="step" name="step" value="4" />
            </form>
        </div>
        <iframe width="0" scrolling="no" height="0" frameborder="0" name="newsframe"></iframe>
        <div class="w300" id="texto" style="top: 60px; left: 1808px;">
            <h1>Franquiciado</h1>
            Ser un socio activo en el negocio es fundamental para el éxito de la operación del local. Es esperado que el franquiciado demuestre por encima de todo ser un emprendedor.<br><br>
            La identificación con la marca y afinidad con el mercado de ropa interior son también importantes.
            El franquiciado debe dedicarse íntegramente al negocio. Y liderar y motivar su equipo de trabajo con buen relacionamiento interpersonal.
            La empatía con el público y experiencia en otras operaciones de venta minorista son deseables.<br /><br />
            Para terminar, el franquiciado debe ser buen administrador, creer en la inversión de marketing y no poseer deudas de cualquier tipo ni financieras.<br /><br>
            <b class="aspa">“</b>Es muy gratificante ser parte del gran éxito de HOPE, nuestro sentimiento como franquiciados, que buscamos contagiar y transmitir a nuestro equipo y clientes puede ser resumido en <br /> 
            <b class="aspa">“</b>Be Happy! Be HOPE!<b class="aspa">”</b><br/><br/>
            <b>Selma y Rafael &ndash; Franquiciados San Pablo</b>
            <div class="setas">
                <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "4" }) %>" id="der"></a>
                <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "2" }) %>" id="izq"></a>
            </div>
        </div>
        <div id="grafico" style="top: 180px; left: 1558px;">
        </div>
        <div id="setahome" style="top: 371px; left: 1861px;">
        </div>
    </div>
</body>
</html>


