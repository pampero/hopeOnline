<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<link media="screen" href="http://www.hopeonline.com.br/includes/minify.aspx?institucionais.css,novos|main1.css,novos" type="text/css" rel="stylesheet">
<div id="main_content_container">
				<h2 id="tit_central_atendimento" class="titulo">
					<span>Central de Atendimento</span>
				</h2> 
				
				<div class="container_atendimento">
				
				    <div class="box_240_container item_container fst">
				        <div class="box_240_mid">
				            <div class="box_240_top">
					            <dl class="box_itemAtendimento fst">
						            <dt id="tit_antes_compra">
							            Antes da Compra
						            </dt>
						            <dd>
							            <a href="<%: Url.Action("HowToNavigate", "Institutional") %>">
                                        Como Navegar no Site</a>
						            </dd>
						            <dd>
							            <a href='<%: Url.Action("Faq", "Institutional") %>'>
                                        FAQ</a>
						            </dd>
						            <dd>
							            <a href="<%: Url.Action("SafeBuy", "Institutional") %>">
                                        Compra Segura</a>
						            </dd>
						            <dd>
							            <a href="<%: Url.Action("HowToBuy", "Institutional") %>">
                                        Como Comprar</a>
						            </dd>
						            <dd>
							            <a href="<%: Url.Action("PrivacyPolicy", "Institutional") %>">
                                        Política de Privacidade</a>
						            </dd>
						            <dd class="televendas">
							            <p>
							                SAC 
							                
							                <span style="text-transform:lowercase;">sac@hopelingerie.com.br</span>
							            </p>
						            </dd>
						            <dd>
							            <a href="http://www.hopeonline.com.br/institucionais/AntesCompra/newsletter.aspx">Newsletter</a>
						            </dd>
						            <dd>
							            <a href="http://www.hopeonline.com.br/institucionais/AntesCompra/tabelaMedidas.aspx">Tabela de Medidas</a>
						            </dd>
					            </dl>
					        </div>
					    </div>
					    <div class="box_240_bot"></div>
					</div>
					
					<div class="box_240_container item_container">
				        <div class="box_240_mid">
				            <div class="box_240_top">
				                <dl class="box_itemAtendimento">
					                <dt id="tit_comprando">
						                Comprando
					                </dt>
					                <dd>
						                <a href="https://www.hopeonline.com.br/cadastro/meucadastro.aspx">Alterar Dados Cadastrais</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("UpdateShippingAddress", "Institutional") %>">
                                        Alterar Endereço de Entrega</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("PaymentsMethods", "Institutional") %>">
                                        Formas de Pagamento</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("DeliveryService", "Institutional") %>">
                                        Serviço de Entrega</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("NotAviableProducts", "Institutional") %>">
                                        Produtos não Disponíveis</a>
					                </dd>
					                <dd>
						                <a href="http://www.hopeonline.com.br/institucionais/Comprando/promocoes.aspx">
                                        Promoções</a>
					                </dd>
					                <dd>
						                <a href="http://www.hopeonline.com.br/institucionais/Comprando/cupons.aspx">Cupons</a>
					                </dd>
				                </dl>
				            </div>
					    </div>
					    <div class="box_240_bot"></div>
					</div>
					
					<div class="box_240_container item_container">
				        <div class="box_240_mid">
				            <div class="box_240_top">
				                <dl class="box_itemAtendimento">
					                <dt id="tit_apos_compra">
						                Após a Compra
					                </dt>
					                <dd>
						                <a href="https://www.hopeonline.com.br/meuspedidos/index.aspx">Acompanhe Seu Pedido</a>
					                </dd>
					                <dd>
						                <a href="http://www.hopeonline.com.br/institucionais/PosCompra/ServicoEntrega.aspx">Serviço de Entrega</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("ChangesAndRefound", "Institutional") %>">
                                        Trocas e Devoluções</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("DivergentdataPurchase", "Institutional") %>">
                                        Dados de Compras Divergentes</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("CollectionProblemsCard", "Institutional") %>">
                                        Dificuldade na Cobrança: Cartão</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("CollectionProblems", "Institutional") %>">
                                        Dificuldade na Cobrança: Boleto</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("Cancellations", "Institutional") %>">
                                        Cancelamento</a>
					                </dd>
					                <dd>
						                <a href="http://www.hopeonline.com.br/institucionais/PosCompra/cuidado.aspx">Cuidado com as peças</a>
					                </dd>
				                </dl>
				            </div>
					    </div>
					    <div class="box_240_bot"></div>
					</div>
					
					<div class="box_240_container item_container">
				        <div class="box_240_mid">
				            <div class="box_240_top">
				                <dl class="box_itemAtendimento">
					                <dt id="tit_outros_institucional" class="outros">
						                Outros / Institucional
					                </dt>
					                <dd>
						                <a href="<%: Url.Action("ContactUs", "Institutional") %>">
                                        Fale Conosco</a>
						                <p>Envie-nos um e-mail de contato, com suas sugestões e críticas.</p>
					                </dd>
					                <dd>
						                <a href="http://www.hopeonline.com.br/institucionais/contacorrente.aspx">Sua Conta HOPE</a>
						                <p>Consulte o histórico de movimentações de sua conta corrente.</p>
					                </dd>
					                <dd>
					                    <a href="<%: Url.Action("AboutUs", "Institutional") %>">
                                        Quem Somos</a>
					                </dd>
					                <dd>
						                <a href="<%: Url.Action("OurStores", "Institutional") %>">
                                        Nossas Lojas</a>
					                </dd>
				                </dl>
				            </div>
					    </div>
					    <div class="box_240_bot"></div>
					</div>
					
				</div>
			</div>

</asp:Content>
