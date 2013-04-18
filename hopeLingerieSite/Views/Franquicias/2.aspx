<%@ Page Title="" Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>


<html><head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
		<link rel="stylesheet" href="../../Content/styles/Franquicias.css" type="text/css" charset="utf-8">
        <script src="../../Scripts/functions.js" type="text/javascript"></script>
	</head>
    <body scroll="auto">
    	<img src="/Content/imgs/loading.gif" id="loading">
    	<div id="div_fundo" ><img src="../../Content/imgs/f2.jpg" id="img_fundo" class="tr_100"></div>
        <div id="conteudo" style="display: block;">
            <div id="hope" style="top: 258px; left: 10px;"><a href="<%: Url.Action("Index", "Franquicias") %>"></a></div>
            <div class="n2" id="numero" style="top: 20px; left: 641px;"></div>
            				<div id="news" style="top: 20px; left: 983px;">
					<span class="spanews">RECIBA NOVEDADES</span>
					<form onsubmit="return valida('novidades')" target="newsframe" action="/Franquicias/RecibeNewsLetter" method="post" name="novidades">
                    	<input type="image" src="../../Content/imgs/subm.png" class="submnews" />
                        <input type="hidden" id="step" name="step" value="3" />
						<input type="text" onfocus="this.value = ''" value="Ingrese su Email" name="receba_novidades" id="receba_novidades" class="inputnews" />
					</form>
				</div>
                <iframe width="0" scrolling="no" height="0" frameborder="0" name="newsframe"></iframe>            <div class="w340" id="texto" style="top: 60px; left: 1023px;">
					<h1>Franqucias</h1>
                    Las franquicias es el modelo de negocios más nuevo de HOPE, que busca una relación cada vez más cercana con la mujer Argentina.<br /><br /> 
                    El primer local exclusivo fue abierto en el 2005, en el shopping center norte, en San Pablo. A partir de este gran suceso se fue desenvolviendo un plan de expansión a través del sistema de franquicias.<br><br>
                    Hope fue la primera marca de lingerie brasilera que se lanzó a la venta minorista y también la primera en abrir locales en el exterior, hoy contamos con más 15 además de los 150 en Brasil .<br><br>
                    El franquiciado cuenta con todo el aval y soporte de una empresa sólida y de una serie de servicios a la hora de abrir su negocio:<br>
                    <ul>
                        <li>Ayuda en la búsqueda y en el punto comercial y negociación</li>
                        <li>Apoyo en la implementación de la franquicia</li>
                        <li>Proyecto Arquitectónico</li>
                        <li>Programa de entrenamiento, cursos de capacitación y manual de operaciones.</li>
                        <li>Equipo de consultoría</li>
                        <li>Grandes inversiones en Marketing y Comunicación.</li>
                    </ul>
                <div class="setas">
                    <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "3" }) %>" id="der"></a>
                    <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "1" }) %>" id="izq"></a>
                    
                </div>
            </div>
            <div id="grafico" style="top: 180px; left: 773px;"></div>
            <div id="setahome" style="top: 333px; left: 1148px;"></div>
		</div>
    
</body></html>