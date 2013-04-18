<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id="navegacao_principal_pnlEmailMarketing">
    <script language="javascript" type="text/javascript">

        function RegisterNewsletter() {
            if (ReceberOfertas()) {

                var name, email;

                name = $("#txtNomeRecebaOfertas").val();
                email = $("#txtRecebaOfertas").val();

                if (name == "Ingrese su nombre...") {
                    alert("Ingrese su nombre!");
                }
                else
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: "/Catalogo/RegisterNewsletter/?name=" + name + "&email=" + email,
                        data: $(this).serializeArray(),
                        success: function (data) {
                            alert("Se ha registrado correctamente a nuestro servicio de Newsletters");
                            clearFileds();
                        }
                    });
            }
        }

        function clearFileds() {
            $("#txtNomeRecebaOfertas").val('Ingrese su nombre...');
            $("#txtRecebaOfertas").val('Ingrese su e-mail...');
        }

    </script>


	<div id="receba_newsletter_container">
	    <h3>Reciba nuestras ofertas</h3>
	    <fieldset>

		    <label for="receba_newsletter_digite_email">
			    Reciba las promociones del sitio de primera mano
		    </label>

		    <p class="field_container">
			    <input class="field" maxlength="128" type="text" id="txtNomeRecebaOfertas" name="txtNomeRecebaOfertas" title="Ingrese su nombre..." value="Ingrese su nombre..." onblur="if(this.value==''){this.value='Ingrese su nombre...'}" onclick="this.value=''" />
		    </p>

		    <p class="field_container">
			    <input class="field" maxlength="128" type="text" id="txtRecebaOfertas" name="txtRecebaOfertas" title="Ingrese su e-mail..." value="Ingrese su e-mail..." onblur="if(this.value==''){this.value='Ingrese su e-mail...'}" onclick="this.value=''" />
		    </p>
		    <p class="btEnviar_container">
                <a href="javascript:RegisterNewsletter();" id="EnviarNewsletter" >
                    <img alt="Enviar" class="btEnviar nb" src="../../Content/imgs/bt_enviar.gif" id="btEnviarNewsletter" name="btEnviarNewsletter" title="Enviar" />
                </a>
			    <img alt="Aguardar" src="http://www.hopeonline.com.br/Imagens/bt_aguardar.gif" style="display:none;" id="msg_btEnviarNewsletter" />
		    </p>
	    </fieldset>
    </div>

</div>