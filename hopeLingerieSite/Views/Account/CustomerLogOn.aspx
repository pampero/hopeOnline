<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Content/styles/Account.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript">

        function handleLogOnValidation() {

            var email = $("#Email").val();
            var password = $("#Password").val();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var isValid = true;
            var leyenda = "";

            if (email.length == 0) {
                isValid = isValid && false;
                leyenda = leyenda + "\n  -. E-mail";
            }


            if (password.length == 0) {
                isValid = isValid && false;
                leyenda = leyenda + "\n  -. Contraseña";
            }

            if (!isValid) {
                alert("Los siguientes campos son obligatorios\n" + leyenda);
                return false;
            }

            if (email.length > 0) {
                if (reg.test(email) == false) {
                    alert("Dirección de E-mail inválida!");
                    return false;
                }
            }

            return true;
        }

        function handleCreateValidation() {

            var email = $("#Email2").val();
            var zipCode = $("#ZipCode").val();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var isValid = true;
            var leyenda = "";

            if (email.length == 0) {
                isValid = isValid && false;
                leyenda = leyenda + "\n  -. E-mail";
            }

            if (!isValid) {
                alert("El siguiente campo es obligatorio\n" + leyenda);
                return false;
            }

            if (email.length > 0) {
                if (reg.test(email) == false) {
                    alert("Dirección de E-mail inválida!");
                    return false;
                }
            }

            return true;
        }
    </script>

        
    <div id="main_content_container">
    
        <div id="main_content">
            <h2 class="titulo" id="tit_login">
                <span>Login </span>
            </h2>
            <div id="box_login" class="box_626_container">
                <div class="box_626_mid">
                    <div class="box_626_top">
<%            
    using (Html.BeginForm("LogOn", "Account"))
    {
%>
                        <div class="containerLogin box_login">
                            <h3 class="titulo" id="tit_ja_cadastrado">
                                Ya está registrado
                            </h3>
                            <fieldset class="form_container">
                                <div class="fld_container">
                                    <label for="fldLoginEmail">
                                        Ingrese su E-mail
                                    </label>
                                    <input name="Email" type="text"  maxlength="100" id="Email" tabindex="1" class="fldEmail" title="E-mail" />
                                </div>
                                <div class="fld_container">
                                    <label for="fldLoginSenha">
                                        Ingrese su contraseña
                                    </label>
                                    <input name="Password" type="password" maxlength="12" id="Password" tabindex="2" class="fldLogin" title="Contraseña" />
                                    
                                        <input type="image" name="btnContinuar" id="btnContinuar" tabindex="3" class="nb" language="javascript" src="/Content/imgs/account/bt_entrar.gif" border="0" onclick="return handleLogOnValidation();" />
                                    
                                </div>
                            </fieldset>
                            <dl class="menuSenha fst">
                                <dt class="fst">Olvidó su contraseña? </dt>
                                <dd>
                                    <a href="/Account/ForgetPassword">Reciba su contraseña por e-mail
                                    </a>
                                </dd>
                            </dl>
                            <dl class="menuSenha fst">
                                <dt>Cambio de contraseña? </dt>
                                <dd>
                                    <a href="/Account/ChangePassword">Cambie de contraseña ahora
                                    </a>
                                </dd>
                            </dl>
                        </div>
<%
    }
                
    using (Html.BeginForm("CreateFromLogOn", "Account"))
    {
%>
                    <div class="containerCadastro box_login">
                        <h3 class="titulo" id="tit_quero_cadastrar">
                            No está registrado
                        </h3>
                        <fieldset class="form_container">
                            <div class="fld_container">
                                <label for="fldCadastreseEmail">
                                    Ingrese su E-mail
                                </label>
                                <input name="Email2" type="text" maxlength="128" id="Email2" tabindex="4" class="fldEmail" title="E-mail" />
                            </div>
                            <div class="fld_container">
                                <input type="image" name="btnContinuar" id="Image1" tabindex="6" class="nb" language="javascript" src="/Content/imgs/account/bt_continuar.gif" border="0" onclick="return handleCreateValidation();" />
                            </div>
                            <p class="pass_disclaimer">
                                Su contraseña será creada en el próximo paso
                            </p>
                        </fieldset>
                    </div>
<%
    }
%>
                    </div>
                    <div class="box_626_bot">
                    </div>
                </div>
            </div>
        </div>

    </div>
</asp:Content>
