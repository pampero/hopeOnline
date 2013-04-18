<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Institutional.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="RightContent" runat="server">

					<div id="main_content">
						<h2 class="titulo" id="tit_central_atendimento">
						    <span>Central de Atendimento</span>
					    </h2>
						<h3>
							Productos no disponibles
						</h3>

						<p>
							Los productos encontrados en el catalogo de Hope Online con el mensaje “no disponible”,no tienen disponibilidad de entrega inmediata en stock. 
						</p>
						<p>Para recibir información de reposicion de stock de un producto especifico, utlice el servicio “avisarme cuando este disponible”.un mail será le será enviado con una alerta.
                            Esta alerta no esta relacionada a ningún tipo de reserva de producto.</p>
						<p class="aviso">* Los productos de la pagina de HOPEONLINE están sujetos a verificación de stock en todas las situaciones, asi mismo que el producto figure como disponible en la pagina.</p>
					</div>
				

</asp:Content>
