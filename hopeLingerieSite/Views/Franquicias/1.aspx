<%@ Page Title="" Language="C#"  Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%--<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
HOPE: SEJA UM FRANQUEADO
</asp:Content>--%>

<%--<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">--%>

<html>
<head>
		<link charset="utf-8" type="text/css" href="../../Content/styles/Franquicias.css" rel="stylesheet">
		<script src="../../Scripts/functions2.js" type="text/javascript"></script>

</head>
<body>
    	<img src="/Contents/imgs/loading.gif" id="loading" />
    	<div id="div_fundo" ><img src="../../Content/imgs/f1.jpg" id="img_fundo"  class="tr_100" /></div>
        <div id="conteudo" style="display: block;">
            <div id="hope" style="top: 258px; left: 10px;"><a href="<%: Url.Action("Index", "Franquicias") %>"></a></div>
            <div class="n1" id="numero" style="top: 20px; left: 641px;"></div>
            				<div id="news" style="top: 20px; left: 983px;">
					<span class="spanews">RECIBA NOVEDADES</span>
					<form onsubmit="return valida('novidades')" target="newsframe" action="/Franquicias/RecibeNewsLetter" method="post" name="novidades">
                    	<input type="image" src="../../Content/imgs/subm.png" class="submnews" />
                        <input type="hidden" id="step" name="step" value="2" />
						<input type="text" onfocus="this.value = ''" value="Ingrese su Email" name="receba_novidades" id="receba_novidades" class="inputnews" />
					</form>
				</div>
                <iframe width="0" scrolling="no" height="0" frameborder="0" name="newsframe"></iframe>            <div class="w220" id="texto" style="top: 60px; left: 1023px;">
					<h1>La marca</h1>
                    HOPE nació en 1966 de una propuesta simple pero ambiciosa: Transformar la vida de las mujeres a través del confort absoluto.<br /><br />
					Es una de las primeras marcas del país y en los últimos años conquisto tanto el mercado nacional como internacional.
                    Invertimos en industria e innovación. Fuimos pioneros en lanzar la colección Nude por ejemplo introduciendo un nuevo concepto en lencería invisible.<br /><br />
                    HOPE es reconocida en las mujeres como sinónimo de confort, durabilidad y calidad.
                    En la actualidad, somos líderes en nuestro segmento de mercado, contamos con más de 100 locales en Brasil y en exterior y exportamos directamente a más de 18 países en el mundo.<br><br>
                    <font style="font-size:12px">
                        <b>Concepto Bodywear</b><br />
                        Hope desarrolla productos que valorizan el cuerpo femenino de todas las edades y estilos.<br><br>
                        Tenemos hoy en nuestros catalogo ítems que van desde lingerie hasta cosméticos y accesorios, pasando por beachwear y homewear.
					</font>
                <div class="setas">
                    <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "2" }) %>" id="der"></a>
                    <a href="<%: Url.Action("Index", "Franquicias") %>" id="izq"></a>
                </div>
            </div>
            <img src="../../Content/imgs/grafico.png" id="grafico" style="top: 180px; left: 773px;" />
            <div id="setahome" style="top: 333px; left: 1148px;"></div>
            <div style="position: absolute; width: 606px; height: 360px; background-color: rgb(255, 255, 255); text-align: center;" id="video">
            	<a href="javascript:fechavideo();void(0)" style="float:right;margin:4px 10px 4px 0px;color:#333333;text-decoration:none;font-weight:bold">Cerrar X</a>
                <embed width="590" height="332" flashvars="customizationFileURL=/v2010/player-skin/site_590x332.xml&amp;autoStart=true&amp;autoLoad=true&amp;startButton=/v2010/player-skin/start-edit.png&amp;scaleMode=fit&amp;thumbnailPreview=true&amp;playerHash=fbc4467f04152e8d4e5b3df6efde18ac&amp;idmedia=2c9f94b6310733b4013109e97f030148" base="." allowfullscreen="true" allowscriptaccess="always" wmode="transparent" type="application/x-shockwave-flash" src="http://exame.abril.com.br/libc/player/liquid3.swf" id="_LiquidPlayerEmbed">
            </div>
		</div>

</body>
</html>
    	
        
        
	
    
    


<%--</asp:Content>--%>
