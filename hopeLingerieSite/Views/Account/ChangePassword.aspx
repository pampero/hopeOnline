<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieSite.ViewModels.ChangePasswordViewModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
     <link href="../../Content/styles/Password.css" rel="stylesheet" type="text/css" />    <script language="javascript" type="text/javascript">

        function handleValidation() {

            var email = $("#Email").val();
            var oldPassword = $("#OldPassword").val();
            var newPassword = $("#NewPassword").val();
            var confirmPassword = $("#ConfirmPassword").val();
               
            var isValid = true;
            var leyenda = "";

            if (email.length == 0) {
                isValid = isValid && false;
                leyenda = leyenda + "\n  -. Email";
            }

            if (oldPassword.length == 0) {
                isValid = isValid && false;
                leyenda = leyenda + "\n  -. Contraseña Actual";
            }

            if (newPassword.length == 0) {
                isValid = isValid && false;
                leyenda = leyenda + "\n  -. Contraseña Nueva";
            }

            if (newPassword.length < 8) {
                isValid = isValid && false;
                leyenda = leyenda + "\n  -. Longitud mínima de la Contraseña es de 8 caracteres";
            }

            if (!isValid) {
                alert("Los siguientes campos son obligatorios\n" + leyenda);
                return false;
            }

            if (confirmPassword != newPassword) {
                alert("Error en la confirmación de la contraseña!");
                return false;
            }

            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (email.length > 0) {
                if (reg.test(email) == false) {
                    alert("Dirección de E-mail inválida!");
                    return false;
                }
            }

            

            return true;
        }</script><%            
    using (Html.BeginForm("ChangePassword", "Account"))
    {
%>
    <div id="main_content_container">

        <div id="main_content">
            <div class="box_680_container" id="alteracao_senha_container">
                <div class="box_680_mid">
                    <div class="box_680_top">

                        <h2 class="titulo" id="tit_alteracao_senha">
                            <span>Cambio de Contraseña</span>
                        </h2>
                        <fieldset class="form_container alteracaoSenha">
                            <dl class="alteracaoSenha">
                                <dt></dt>
                                <dd class="fldEmailCont">
                                    <label for="txtEmail">
                                        E-mail:
                                    </label>
                                    <input name="Email" type="text" maxlength="100" id="Email" tabindex="1" class="fldEmail" title="E-mail" />
                                </dd>
                                <dd class="fldSenhaAtualCont">
                                    <label for="txtSenha">
                                        Contraseña Actual:
                                    </label>
                                    <input name="OldPassword" type="password" maxlength="12" id="OldPassword" tabindex="2" class="fldSenhaAtual" title="Contraseña Actual"  />
                                </dd>
                                <dd class="fldNovaSenhaCont">
                                    <label for="txtNovaSenha1">
                                        Nueva Contraseña:
                                    </label>
                                    <input name="NewPassword" type="password" maxlength="12" id="NewPassword" tabindex="3" class="fldNovaSenha" title="Nueva Contraseña"  />
                                </dd>
                                <dd class="fldConfirmeNovaSenhaCont">
                                    <label for="txtNovaSenha2">
                                        Confirme su Nueva Contraseña:
                                    </label>
                                    <input name="ConfirmPassword" type="password" maxlength="15" id="ConfirmPassword" tabindex="4" class="fldConfirmeNovaSenha" title="Confirme su Nueva Contraseña" />
                                </dd>
                                <dd class="fld_bt_continuar">
                                    <input type="image" name="btnContinuar" id="btnContinuar" tabindex="5" class="nb" onclick="return handleValidation();" language="javascript" src="/Content/imgs/account/bt_continuar.gif" border="0" />
                                </dd>
                            </dl>
                        </fieldset>
                    </div>
                    <div class="box_680_bot">
                    </div>
                </div>
            </div>
        </div>
    </div>

<% 
    }
%>
   
</asp:Content>
