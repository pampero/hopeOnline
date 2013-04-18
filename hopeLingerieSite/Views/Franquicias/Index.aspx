<%@ Page Title="" Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>


<html>
<head>
<script type="text/javascript" language="javascript" src="../../Scripts/functions.js"></script>
<link rel="stylesheet" href="../../Content/styles/Franquicias.css" type="text/css" charset="utf-8">
    <style type="text/css">
        body
        {
            background-color: #222222;
            color: #FFFFFF;
            font-family: Arial,Helvetica,sans-serif;
            font-size: 11px;
            line-height: 14px;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    
    <div id="div_fundo" >
        <img id="img_fundo"  src="/content/imgs/bg-franquicias.jpg"/>
    </div>
    <div id="conteudo" style="display: block;">
            <div id="hope" style="top: 258px; left: 10px;"></div>
            <div id="numero" style="top: 20px; left: 641px;"></div>
            <div id="news" style="top: 20px; left: 983px;"></div>
            <div id="texto" style="top: 60px; left: 1023px;"></div>
            <div id="setahome" style="top: 333px; left: 1148px;">
                <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "1" }) %>"></a>
            </div>
            <div id="grafico" style="top: 180px; left: 773px;"></div>
		</div>
</body>
</html>
