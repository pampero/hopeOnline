<%@ Page Title="" Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<html>
<head>
    <title>HOPE: SEA UN FRANQUICIADO</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <link rel="stylesheet" href="../../Content/styles/Franquicias.css" type="text/css" charset="utf-8">
    <script src="../../Scripts/functions.js" type="text/javascript"></script>
</head>
<body scroll="auto" bgcolor="#000">
    <img src="/Content/imgs/loading.gif" id="loading">
    <div id="div_fundo">
        <img src="../../Content/imgs/f6.jpg" id="img_fundo" class="tr_100"></div>
    <div id="conteudo" style="display: block;">
        <div id="hope" style="top: 292px; left: 10px;">
            <a href="<%: Url.Action("Index", "Franquicias") %>"></a>
        </div>
        <div class="n5" id="numero" style="top: 20px; left: 1034px;">
        </div>
        <div id="news" style="top: 20px; left: 1768px;">
            <span class="spanews">RECIBA NOVEDADES</span>
            <form onsubmit="return valida('novidades')" target="newsframe" action="basenews.php" method="post" name="novidades">
                <input type="image" src="../../Content/imgs/subm.png" class="submnews">
                <input type="text" onfocus="this.value = ''" value="Ingrese su Email" name="receba_novidades" id="receba_novidades" class="inputnews">
                <input type="hidden" id="step" name="step" value="6" />
            </form>
        </div>
        <iframe width="0" scrolling="no" height="0" frameborder="0" name="newsframe"></iframe>
        <form action="/Franquicias/Create" id="cadastro" id="cadastro" method="post" onsubmit="return valida('cadastro')">
        <div class="w400" id="texto" style="top: 60px;">
            <div class="itmform">
                <h1>Regístrese</h1>
                Complete el registro y reciba informaciones sobre franquicias y también una presentación completa sobre HOPE.<br /><br />
                <div class="itmform100">
                    <span class="spanform">¿Dónde usted pretende abrir una franquicia? </span>
                    <%: Html.DropDownList("FranchiseCityId", new SelectList(ViewData["Cities"] as IEnumerable, "CityId", "Description"), "Provincia", new { @class = "inputform", @onchange = "document.getElementById('hideform').style.display = 'block'" })%>
                </div>
            </div>
            <div style="display: none" class="itmform" id="hideform">
                <div class="itmform100">
                    <span class="spanform">Nombre: </span>
                    <input type="text" name="FirstName" id="FirstName" class="inputform" maxlength="50"></div>
                <div class="itmform100">
                    <span class="spanform">Apellido: </span>
                    <input type="text" name="LastName" id="LastName" class="inputform" maxlength="50"></div>
                <div class="itmform100">
                    <span class="spanform">Fecha de Nacimento: </span>
                    <input type="text" name="Birthdate" id="Birthdate" class="inputform" onkeyup="formatadata('cadastro',this.name,this.value)"></div>
                <div class="itmform100">
                    <span class="spanform">Dirección: </span>
                    <input type="text" name="Address" id="Address" class="inputform" maxlength="50"></div>
                <div class="itmform100">
                    <span class="spanform">Ciudad: </span>
                    <input type="text" name="City" id="City" class="inputform" maxlength="50"></div>
                <div class="itmform100">
                    <span class="spanform">Provincia: </span>
                    <%: Html.DropDownList("StateId", new SelectList(ViewData["States"] as IEnumerable, "StateId", "Description"), new {  @class="inputform" })%>
                </div>
                <div class="itmform100">
                    <span class="spanform">Cod.Postal: </span>
                    <input type="text" name="ZipCode" id="ZipCode" class="inputform" maxlength="10"></div>
                <div class="itmform100">
                    <span class="spanform">Teléfono Residencial: </span>
                    <input type="text" name="Telephone1" id="Telephone1" class="inputform" maxlength="20"></div>
                <div class="itmform100">
                    <span class="spanform">Teléfono Comercial: </span>
                    <input type="text" name="Telephone2" id="Telephone2" class="inputform" maxlength="20"></div>
                <div class="itmform100">
                    <span class="spanform">Teléfono Celular: </span>
                    <input type="text" name="Cellular" id="Cellular" class="inputform" maxlength="20"></div>
                <div class="itmform100">
                    <span class="spanform">E-mail: </span>
                    <input type="text" name="Email" id="Email" class="inputform" maxlength="50"></div>
                <div class="itmform100">
                    <span class="spanform">Cómo tomó conocimento de la franquicia?: </span>
                </div>
                <div class="itmform100">
                    <textarea name="How" id="How" class="textform"></textarea></div>
                <div class="itmform100">
                    <span class="spanform">Cuando pretende iniciar sus actividades?: </span>
                </div>
                <div class="itmform100">
                    <textarea name="When" name="When" class="textform"></textarea></div>
                <div class="itmform100">
                    <span class="spanform">Cual es su capital para la inversión?: </span>
                    <input type="text" name="InvestmentMoney" id="InvestmentMoney" class="inputform"></div>
                <div class="itmform100">
                    <span class="spanform">Por qué desea abrir una franquicia HOPE?: </span>
                </div>
                <div class="itmform100">
                    <textarea name="Why" id="Why" class="textform"></textarea></div>
                <div class="itmform100">
                    <span class="spanform">
                        <input type="checkbox" value="sim" name="assumo" id="assumo">
                        Asumo total responsabilidad por la veracidad de la información presentada.</span>
                </div>
                <div class="itmform100">
                    &nbsp;</div>
                <div class="itmform100">
                    <input type="image" style="clear: both" src="../../Content/imgs/subm_form.png" class="submfrm" onclick="return true;">
                </div>
            </div>
        </form>
        <!--<div class="setas">
            <a href="<%: Url.Action("GoStep", "Franquicias", new { @Step = "4" }) %>" id="izq">
            </a>
        </div>-->
        </div>
        <div id="grafico" style="top: 180px; left: 1558px;">
        </div>
        <div id="setahome" style="top: 371px; left: 1861px;">
        </div>
    </div>
</body>
</html>
