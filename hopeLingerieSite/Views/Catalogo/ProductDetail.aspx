<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master"
    Inherits="System.Web.Mvc.ViewPage<HopeLingerieSite.ViewModels.CurrentSelection>" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeaderContent" runat="server">
    
    
    <link href="/Content/styles/produtoMagicZoomjqueryfancybox.css" rel="stylesheet" type="text/css" />    
    
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/minified-main.jsflash.jsfunctions.js"></script>
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/jqueryScripts.js"></script>
    <script type="text/javascript" src="/Scripts/jqueryJcarousel.js"></script>
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/funcoes.js"></script>
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/dhtml.js"></script>
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/magiczoom.js"></script>
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/cadastro.js"></script>
    <script type="text/javascript" charset="iso-8859-1" src="/Scripts/jqueryFancybox.js"></script>

    <script type="text/javascript" language="javascript">
        jQuery.noConflict();
        jQuery(document).ready(function () {
           
            showFirstImage();
        });
    </script>
    <script type="text/javascript" language="javascript">
        function loadSizes(ColorId, ProductId) {
            
            $.get("/Catalogo/ProductSize", { "ColorId": ColorId, "ProductId": ProductId }, function (html) {
                $("#sizeContainer").html("");
                $("#sizeContainer").html(html);
            });

        }

        function MostraImagemAmpliada() {
            var CarValCod1 = 0;
            var CarValCod2 = 0;
            var CarValCod3 = 0;
            var CarValCod4 = 0;
            var CarValCod5 = 0;

            try {
                if (document.getElementById("ImagemAmpliada")) {
                    divs = document.getElementsByTagName("select");

                    if (document.getElementById("ImagemAmpliada").style.visibility == "visible") {
                        for (i = 0; i < divs.length; i++) {
                            if (divs[i].id.toLowerCase().indexOf("drp_sku_") >= 0) {
                                divs[i].style.visibility = "visible";
                            }
                        }

                        document.getElementById("ImagemAmpliada").style.visibility = "hidden";
                    }
                    else {
                        for (i = 0; i < divs.length; i++) {
                            if (divs[i].id.toLowerCase().indexOf("drp_sku_") >= 0) {
                                divs[i].style.visibility = "hidden";
                            }
                        }

                        document.getElementById("ImagemAmpliada").style.visibility = "visible";
                    }

                    var zoomImg = $($("#Zoom1").find(".MagicZoomBigImageCont").find('img')[0]).attr("src");

                    $("#ImagemAmpliadaFoto").attr("src", zoomImg);
                }
            }
            catch (err) {
            }
        }

        function showFirstImage(codeColor) {
            if (codeColor == undefined || codeColor == null) {
                if ($(".lstThumbs").find("li").length > 0) {
                    $($(".lstThumbs").find("li").find("a")[0]).click();
                }
            }
            else {
                if ($(".lstThumbs[colorCode='" + codeColor + "']").find("li").length > 0) {
                    $($(".lstThumbs[colorCode='" + codeColor + "']").find("li").find("a")[0]).click();
                }
            }
        }

        function showBigImg() {

            var zoomImg = $($("#Zoom1").find(".MagicZoomBigImageCont").find('img')[0]).attr("src");

            $("#ImagemAmpliadaFoto").attr("src", zoomImg);
            $("#ImagemAmpliada").show();
        }

        function closeBigImg() {

            $("#ImagemAmpliada").hide();
            $("#ImagemAmpliadaFoto").attr("src", "");

        }

        function changeImg(lnk) {

            var zoomImg = $($(lnk).find("img")[0]).attr('zoomImg');

            $("#Zoom1").attr("href", zoomImg)
            $($("#Zoom1").find("img")[0]).attr("src", zoomImg)//MagicZoomBigImageCont
            $($("#Zoom1").find(".MagicZoomBigImageCont").find('img')[0]).attr("src", zoomImg);

            //restauro visibilidad
            $(lnk).parents('ul').find('a').show();

            //oculto el thumb que se esta mostrando
            $(lnk).hide();
        }


        function showImagesByColor(codeColor, ColorId) {
            $("a").parent().removeClass("thumb_on");
            $("a").parent().addClass("thumb_off");
            $("." + codeColor).parent().addClass("thumb_on");
            $("." + codeColor).parent().removeClass("thumb_off");

            jQuery(".lstThumbs[colorCode='" + codeColor + "']").show();
            jQuery(".lstThumbs[colorCode!='" + codeColor + "']").hide();

            //DRP_SKU_1 --> hidden que guarda el color seleccionado
            $("#DRP_SKU_1").val(codeColor);

            $("#ColorId").val(ColorId);
            showFirstImage(codeColor);
        }

        function selectSize(size, SizeId) {

            if ($(".sizeSelector." + size).length > 0) {
                var lnk = $(".sizeSelector." + size);

                $(".sizeSelector").parent().removeClass("thumb_on");
                $(".sizeSelector").parent().addClass("thumb_off");
                lnk.parent().addClass("thumb_on");
                lnk.parent().removeClass("thumb_off");

                //DRP_SKU_2 --> hidden que guarda el talle seleccionado
                $("#DRP_SKU_2").val(size);
                $("#SizeId").val(SizeId);
            }

        }

    </script>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <input id="ImagemAmpliadaAux" type="hidden" value="" name="ImagemAmpliadaAux">
         <div class="ImagemAmpliadaFoto" id="ImagemAmpliada" style="visibility:hidden">			    <div class="FecharImagemAmpliada">				    <a href="javascript:MostraImagemAmpliada()">                        Haga click sobre la imagen para cerrarla 				    </a>			    </div>			    <div >				    <a href="javascript:MostraImagemAmpliada()">                       <img src="" id="ImagemAmpliadaFoto" alt="" />				    </a>			    </div>									    </div>
       
    <div id="main_content_container_detail">

       
        <!-- CONTEUDO INTERNO (CENTRO) -->
        <div id="main_content">

            <!-- DESTAQUE CONTAINER -->
            <div class="product_info_container">
                <!-- FOTOS -->
                <div class="product_photo_container">
                    <% Html.RenderPartial("ProductImages", Model.ProductSelected); %>
                    <div class="big_photo_container">
                        <a title="" id="Zoom1" style="position: relative; display: block; outline: 0pt none;
                            text-decoration: none; width: 391px; height: 391px; -moz-user-select: none;"
                            rel="zoom-width:470px;zoom-height:400px;zoom-position:right;" href="" class="MagicZoom">
                            <img src="" style="width: 391px; height: 391px;" />
                        </a>
                    </div>

                    <img src="" title="" alt="" name="ProdutoImagemAux" id="ProdutoImagemAux" width="180" height="180" style="display:none;"/>
                    <p class="cliqueParaAmpliar">
                    
                        <a href="javascript:MostraImagemAmpliada()">Haga click aquí para ver imagen ampliada</a>
                    </p>
                    <!-- FIM FOTOS -->
                </div>
                <!-- FIM FOTOS -->
                <div class="info_container">
                    <div class="header">
                        <h2 class="titProduto">
                            <%: Model.ProductSelected.Name %>
                        </h2>
                        <dl class="lstReference">
                            <dt class="fst">Cód. de producto: </dt>
                            <dd>
                                <%: Model.ProductSelected.Code %>
                            </dd>
                        </dl>
                        <div id="prices">
                            <div class="price_content">
                                <p class="price">
                                <% if ((Model.ProductSelected.OldPrice.HasValue) && (Model.ProductSelected.OldPrice.Value != 0))
                                   {%>
                                     <span id="spanPreco" class="block1" >de <del>$ <%: Model.ProductSelected.OldPrice %></del></span>                                <% } %>
                                    <span id="spanPreco" class="block2"><strong>por: $<%: Model.ProductSelected.CurrentPrice %></strong></span>
                                </p>
                            </div>
                            <p>
                                <span id="span4"><span id="span5" class="listaselos"></span></span>
                            </p>
                        </div>
                    </div>
                    <div class="main2">
                        <!-- DESCRIÇÃO -->
                        <p class="textDescricao">
                            <%: Model.ProductSelected.Description%></p>
                        <!-- FIM DESCRIÇÃO -->
                        <div class="buy_product_container">
                            <!-- FORMULARIO DETALHES DO PRODUTO -->
                            <fieldset class="opcoes_produtos">
                                <legend>Opciones del producto</legend>
                                <dl>
                                    <span id="spanSKU">
                                        <label class="labelQuantidadeCor">Colores disponibles:</label>
                                        <% Html.RenderPartial("ProductColor", Model.ProductSelected); %>
                                    </span>
                                </dl>
                            </fieldset>
                            <!-- FIM FORMULARIO DETALHES DO PRODUTO -->
                            <div id="box_selecao">
                                <fieldset class="form_buy">
                                    <%
                                        using (Html.BeginForm("CreateOrderDetail", "ShoppingCart", FormMethod.Post, new { @name = "frmOrderDetail", @id = "frmOrderDetail" }))
                                        {
                                    %>
                                    <input id="ProductId" type="hidden" value="<%: Model.ProductSelected.ProductId %>"
                                        name="ProductId">
                                    <input id="Price" type="hidden" value="<%: Model.ProductSelected.CurrentPrice %>"
                                        name="Price">
                                    <input id="SizeId" type="hidden" value="" name="SizeId"><!-- instanciar cuando se cambie el estado del talle -->
                                    <input id="ColorId" type="hidden" value="" name="ColorId"><!-- instanciar cuando se cambie el estado del talle -->
                                    <input id="OrderDetailStatusId" type="hidden" value="1" name="OrderDetailStatusId">
                                    <!-- dejar fijo -->
                                    <input id="Gift" type="checkbox" style="display: none" />
                                    <!-- dejar fijo -->
                                    <span id="spanSKUComprar"><span id="spanDisponibilidade"><a href="javascript:document.forms['frmOrderDetail'].submit();"
                                        name="DROP_SKU_Comprar" id="DROP_SKU_Comprar">
                                        <img src="/Content/imgs/catalogue/bt_comprar_produto.gif" onclick="return true;"
                                            id="btComprarProduto" name="btComprarProduto" title="Comprar" value="Comprar">
                                    </a></span></span>
                                    <% 
                                    }
                                    %>
                                </fieldset>
                                <ul class="links">
                                    <li style="width:300px;"><a href="/Catalogo/medidas" target="_blank"><span class="ico">
                                            <img src="/Content/imgs/catalogue/ico_medida.gif" style="cursor: hand;"
                                                title="Click aqui para ver la tabla de medidas" alt="Click aqui para ver la tabla de medidas" /></span>
                                            <p style="line-height:35px;">Click aqu&iacute; para ver la tabla de medidas</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            
                            <div id="box_selecao">
                            <p></p> 
                            <div class="social">                                <a href="http://twitter.com/share" class="twitter-share-button"  data-count="horizontal">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script><br /><br />                                <iframe src="http://www.facebook.com/plugins/like.php?href=http://www.hopeonline.com.ar/Catalogo/ProductDetail/<%: Model.ProductSelected.ProductId %>" scrolling="no" frameborder="0" allowTransparency="true" style="width:400px; height:25px"></iframe>                            </div>
                        </div>
                        </div>
                    </div>                    
                    
                    <!-- FIM PREÇO -->
                </div>
            </div>
        </div>
        <!-- FIM DE HISTORICO DE NAVEGACAO -->
    </div>
</asp:Content>
