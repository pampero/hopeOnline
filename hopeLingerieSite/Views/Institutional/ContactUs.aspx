<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Institutional.Master"
    Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="RightContent" runat="server">

<script type="text/javascript">

    function handleFinalize() {
        $("#Name_I").val('');
        $("#EMail_I").val('');
        $("#Telephone_I").val('');
        $("#Descript_I").val('');
        $("#Subject").val('Ninguno');

        alert("Tu mensaje ha sido enviado correctamente.")
    }

</script>

    <!-- CONTEUDO INTERNO (CENTRO) -->
<%
    using (Ajax.BeginForm("ContactUs", "Institutional", new AjaxOptions { OnComplete = "handleFinalize" }))
    {
%>
    <div id="main_content">
        <h2 class="titulo" id="tit_central_atendimento">
            <span>Central de Atendimento</span>
        </h2>
        <div class="box_680_container" id="faleconosco_container">
            <div class="box_680_mid">
                <div class="box_680_top">
                    <fieldset class="form_container" id="form_faleconosco">
                        <h3>Contáctese con nosotros</h3>
                        <p>Por cualquier consulta, nos podés llamar al siguiente teléfono (5411) 5431 1926 o bien enviarnos un e-mail completando los siguientes campos y responderemos tu consulta.</p>
                        <p><u>Observación:</u> Para preguntas sobre una franquicia favor envíe un e-mail a <a href="mailto:sac@hopeonline.com.ar">sac@hopeonline.com.ar</a>.</p>
                        
                        <dl class="centralAtendimentoFale">
                            <dd class="fldAssuntoCont">
                                <label for="fldAssunto">
                                    Asunto*:
                                </label>
                                <select name="Subject" id="Subject" tabindex="1" class="fldAssunto" title="Assunto">
                                    <option value="Ninguno">Seleccione</option>
                                    <option value="Críticas y sugerencias">Críticas y sugerencias</option>
                                    <option value="Elogios y agradecimientos">Elogios y agradecimientos</option>
                                    <option value="Dudas sobre un pedido, pago o plazo de entrega">Dudas sobre un pedido, pago o plazo de entrega</option>
                                    <option value="Propuestas comerciales">Propuestas comerciales</option>
                                    <option value="Socios a través de Internet">Socios a través de Internet</option>
                                    <option value="Trabaja con Nosotros">Trabaja con Nosotros</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </dd>
                            <dd>
                                <label for="fldNome">
                                    Nombre*:
                                </label>
                                <%
                                                Html.DevExpress().TextBox(
                                    settings =>
                                    {
                                        settings.Name = "Name";
                                        settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                                        settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                                        settings.Properties.MaxLength = 50;
                                        settings.Width = 200;
                                    }
                                )
                                .Render();
                                %>
                            </dd>
                           
                            <dd>
                                <label for="fldEmail">
                                    E-mail*:
                                </label>
                                <% 
                                    Html.DevExpress().TextBox(
                                        settings =>
                                        {
                                            settings.Name = "EMail";
                                            settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.EmailValidationSettings);
                                            settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                                            settings.Properties.MaxLength = 50;
                                            settings.Width = 200;
                                        }
                                    )
                                    .Render();
                            %>
                            </dd>
                            <dd class="fldTelefoneCont">
                                <label for="fldTelefone_ddd">
                                    Telefono*:
                                </label>
                                  <% 
                Html.DevExpress().TextBox(
                   settings =>
                   {
                       settings.Name = "Telephone";
                       settings.Properties.MaxLength = 20;
                       settings.Width = 200;
                       settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                       settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                   }
                )
                .Render();
                %>
                            </dd>
                            <dd class="fldMensagemCont">
                                <label for="fldMensagem">
                                    Mensaje*:
                                </label>
                               <% 
                Html.DevExpress().Memo(
                   settings =>
                   {
                       settings.Name = "Descript";
                       settings.Properties.Rows = 6;
                       settings.Width = 400;
                       settings.Properties.ValidationSettings.Assign(HopeLingerieServices.Services.Validation.EditorsHelper.NameValidationSettings);
                       settings.Properties.ClientSideEvents.Validation = "OnRequiredValidation";
                   }
                )
                .Render();
                %>
                            </dd>
                            <p>
                                *Campos obligatorios
                            </p>
                            <dd class="fldbt_enviar">
                                  <% 
            Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "Enviar";
                settings.ControlStyle.CssClass = "nb";
                settings.Text = "Enviar";
                settings.UseSubmitBehavior = true;
                
            })
            .Render();
            %>
                            </dd>

                            
                        </dl>
                    </fieldset>
                </div>
            </div>
            <div class="box_680_bot">
            </div>
        </div>
    </div>
     <% } %>
    <!-- FIM DO CONTEUDO INTERNO (CENTRO) -->
</asp:Content>
