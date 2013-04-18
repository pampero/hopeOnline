<div id="main_content_container">
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
                    <p class="cliqueParaAmpliar">
                        <a href="javascript:showBigImg()">Haga click aquí para ver imagen ampliada</a>
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
                            <dt class="fst">Cód. de producto:
                                <%: Model.ProductSelected.Code %></dt>
                        </dl>
                    </div>
                    <div class="main2">
                        <!-- SKU -->
                        <div class="buy_product_container">
                            <!-- FORMULARIO DETALHES DO PRODUTO -->
                            <fieldset class="opcoes_produtos">
                                <legend>Opciones del producto</legend>
                                <dl>
                                    <span id="spanSKU">
                                        <input value="0" name="DRP_SKU_1" id="DRP_SKU_1" title="Cor" type="hidden">
                                        <label class="labelQuantidadeCor" for="DRP_SKU_1">
                                            Paso 1: <span>Color</span>
                                        </label>
                                        </br>
                                        <% Html.RenderPartial("ProductColor", Model.ProductSelected)%>
                                    </span>
                                </dl>
                            </fieldset>
                            <!-- FIM FORMULARIO DETALHES DO PRODUTO -->
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
                        </div>
                        <!-- FIM SKU -->
                        <!-- DESCRIÇÃO -->
                        <p class="textDescricao">
                            <%: Model.ProductSelected.Description%></p>
                        <!-- FIM DESCRIÇÃO -->
                        <!-- PREÇO -->
                        <div id="prices">
                            <div class="price_content">
                                <p class="price">
                                    <span id="spanPreco" class="block1" style="visibility: hidden;"></span><span id="spanPrecoPor"
                                        class="block2">por <strong>$
                                            <%: Model.ProductSelected.CurrentPrice%>
                                        </strong></span>
                                </p>
                                <p class="economize">
                                    <span id="spanPrecoEconomize">&nbsp;</span>
                                </p>
                            </div>
                            <p>
                                <span id="spanOutros"><span id="spanSelos" class="listaselos"></span></span>
                            </p>
                        </div>
                        <div id="indisponivel">
                        </div>
                    </div>
                    <div>
                        <img src="../../Content/imgs/icone.gif" onclick="javascript:window.open('/Catalogo/medidas', 'medidas','toolbar=no,location=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600,left=0,top=0');"
                            alt="Clique aqui para ver a tabela de medidas" title="Clique aqui para ver a tabela de medidas"
                            style="cursor: hand;"></div>
                    <br>
                    <!-- FIM PREÇO -->
                </div>
            </div>
        </div>
        <!-- FIM DE HISTORICO DE NAVEGACAO -->
    </div>