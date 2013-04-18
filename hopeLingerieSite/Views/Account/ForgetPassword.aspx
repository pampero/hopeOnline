<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    
    <link href="../../Content/styles/Password.css" rel="stylesheet" type="text/css" />

     <script language="javascript" type="text/javascript">

         function handleValidation() {

             var leyenda = "";
             var email = $("#Email").val();
             var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
             var isValid = true;

             if (email.length == 0) {
                 isValid = isValid && false;
                 leyenda = leyenda + "El campo E-mail es obligatorio!";
             }

             if (email.length > 0) {
                 if (reg.test(email) == false) {
                     isValid = isValid && false;
                     leyenda = leyenda + "Dirección de E-mail inválida!";
                 } 
             }

             if (!isValid) {
                 alert(leyenda);
                 return false;
             }
             
             return true;
         }    </script>

    <div id="main_content_container">
<%
    using (Html.BeginForm())
    {
%>
        <div id="main_content">
            <div class="box_680_container" id="alteracao_senha_container">
                <div class="box_680_mid">
                    <div class="box_680_top">
                        <h2 class="titulo" id="tit_esqueceu_senha">
                            <span>Olvidó su contraseña?</span>
                        </h2>
                        <p class="msg_erro">
                            <span id="lblMensagemErro" class="erro"></span>
                        </p>
                        <fieldset class="form_container alteracaoSenha">
                            <dl class="alteracaoSenha">
                                <dt></dt>
                                <dd class="fldEmailCont">
                                    <label for="txtEmail">
                                        Ingrese su E-mail:
                                    </label>
                                    <input name="Email" type="text" maxlength="100" id="Email" tabindex="1" class="fldEmail" title="Informe su E-mail"  />
                                </dd>
                                <dd class="fld_bt_solicitar_senha">
                                    <input type="image" name="btnContinuar" id="btnContinuar" tabindex="5" class="nb" src="/Content/imgs/account/bt_solicitar_nova_senha.gif" border="0" onclick="return handleValidation();" language="javascript" />
                                </dd>
                            </dl>
                        </fieldset>
                    </div>
                    <div class="box_680_bot">
                    </div>
                </div>
            </div>
        </div>
<% 
    }    
%>
    </div>
</asp:Content>
