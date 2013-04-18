<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieServices.Model.Customer>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Content/styles/Account.css" rel="stylesheet" type="text/css" media="screen" />

    <script language="javascript" type="text/javascript">

    function MudaCorBorda(obj, cor)
    {
        try
        {        
		    if(obj != null)
		    {
			    var Borda               = '1,9px';
			    var BordaEstilo         = 'solid';
			    obj.style.borderColor   = cor;        
		    }
        }
        catch(err)
        {
            document.write(err.description);
        }    
    }


    function VerificaCampoObligatorio(obj, message)
    {
	    var spanMsgValidacao = document.getElementById("spanValidate" + obj.name);
		
	    if(obj.value != '')
	    {
		    spanMsgValidacao.innerHTML = '';	
		    MudaCorBorda(obj,'#E2E2E2');  
	    }
	    else
	    {
	        spanMsgValidacao.innerHTML = message;
	        MudaCorBorda(obj,'#88147E');   
	    }
    }

    function AtivaCampo(campo)
	{
		campo.style.backgroundColor = '#e4e7f7'
	}
	
	function DesativaCampo(campo)
	{
		campo.style.backgroundColor = '#ffffff';		
	}

    function handleValidation() {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var firstName = $("#FirstName").val();
        var lastName = $("#LastName").val();
        var dni = $("#DNI").val();
        var birthDay = $("#BirthDay").val();
        var zipCode = $("#ZipCode").val();
        var address = $("#Address").val();
        var number = $("#Number").val();
        var telephone1 = $("#Telephone1").val();
        var email = $("#Email").val();
        var stateId = $("#StateId").val();
        var city = $("#City").val();
        var isValid = true;
        var leyenda = "";

        if (firstName.length == 0) {
            var objeto =  document.getElementById("FirstName");
            VerificaCampoObligatorio(objeto, '« Nombre obligatorio');
            isValid = isValid && false;
        }
        
        if (lastName.length == 0) {
            var objeto =  document.getElementById("LastName");
            VerificaCampoObligatorio(objeto, '« Apellido obligatorio');
            isValid = isValid && false;
        }

        if (dni.length == 0) {
            var objeto =  document.getElementById("DNI");
            VerificaCampoObligatorio(objeto, '« DNI obligatorio');
            isValid = isValid && false;
        }

        if (zipCode.length == 0) {
        var objeto =  document.getElementById("ZipCode");
            VerificaCampoObligatorio(objeto, '« Cod.Postal obligatorio');
            isValid = isValid && false;
        }

        if (address.length == 0) {
            var objeto =  document.getElementById("Address");
            VerificaCampoObligatorio(objeto, '« Dirección obligatoria');
            isValid = isValid && false;
        }

        if (number.length == 0) {
            var objeto =  document.getElementById("Number");
            VerificaCampoObligatorio(objeto, '« Número obligatorio');
            isValid = isValid && false;
        }

        if(city.length == 0) {
            var objeto =  document.getElementById("City");
            VerificaCampoObligatorio(objeto, '« Ciudad obligatoria');
            isValid = isValid && false;
        }

        /*
        if(stateId.length == 0) {
            var objeto =  document.getElementById("StateId");
            VerificaCampoObligatorio(objeto, '« Estado obligatorio');
            isValid = isValid && false;
        }*/

        if (telephone1.length == 0) {
            var objeto =  document.getElementById("Telephone1");
            VerificaCampoObligatorio(objeto, '« Teléfono obligatorio');
            isValid = isValid && false;
        }

        if (email.length == 0) {
            var objeto =  document.getElementById("Email");
            VerificaCampoObligatorio(objeto, '« Email obligatorio');
            isValid = isValid && false;
        }
        else
        {
            if (reg.test(email) == false) {
                var objeto =  document.getElementById("Email");
                
                var spanMsgValidacao = document.getElementById("spanValidate" + objeto.name);
                spanMsgValidacao.innerHTML = '« Formato Email erróneo';
	            MudaCorBorda(objeto,'#88147E');   
                
                isValid = isValid && false;
            }
        }

<%
if (Model.CustomerId == 0)
{
%>
        var password = $("#Password").val();
        var confirmPassword = $("#ConfirmPassword").val();

        if ((password.length == 0) || (password.length < 8)) {
            var objeto =  document.getElementById("Password");
            if (password.length == 0)
                VerificaCampoObligatorio(objeto, '« Clave obligatoria');
            else
            {
                var spanMsgValidacao = document.getElementById("spanValidate" + objeto.name);
                spanMsgValidacao.innerHTML = '« Longitud mínima de 8 caracteres';
	            MudaCorBorda(objeto,'#88147E');   
            }
            isValid = isValid && false;
        }

        if ((isValid) && (confirmPassword != password)) {
            alert("Fallo en la confirmación de la contraseña!");
            return false;
        }
<%
}
%>

            return isValid;
    }    </script>

        
    <!-- CONTEUDO PRINCIPAL -->
    <div id="main_content_container">
        <h2 class="titulo" id="tit_meu_cadastro">
            <span>Meu Cadastro </span>
        </h2>
        <!-- CONTEUDO INTERNO (CENTRO) -->
<%
    string actionName = string.Empty;
        
    if (Model.CustomerId == 0)
        actionName = "Create";
    else
        actionName = "Edit";
        
    using (Html.BeginForm(actionName, "Account"))
    {
%>
        <input type="hidden" name="CustomerId" id="CustomerId" value="<%: Model.CustomerId %>" />
        <input type="hidden" name="Active" id="Active" value="true" />

        <div id="main_content" class="cadastro_container">
            <span id="formcadastro_lblMsg" class="erro"></span>

<% if (Model.CustomerId == 0) { %>
            <div id="form_superior" style="display: none;" class="box_968_container">
<% }
   else
   { %>
            <div id="form_superior" style="display: block;" class="box_968_container">
<% } %>
                <div id="box_cadastro_menu" class="box_968_mid">
                    <div class="box_968_top">
                        <fieldset class="form_superior">
                            <dl>
                                <dt></dt>
                                <dd class="ItensSuperiores">
                                   <%: Html.ActionLink("Cambiar Contraseña", "ChangePassword", "Account")%> 
                                </dd>
                            </dl>
                        </fieldset>
                    </div>
                </div>
                <div class="box_968_bot">
                </div>
            </div>
            <div id="DadosPessoaFisica" style="display: inline" class="box_968_container">
                <div class="box_968_mid">
                    <div class="box_968_top">
                        <fieldset class="form_container">
                            <dl class="cadastro_dados_gerais box_itens">
                                <dt class="box_titulo">Datos Generales </dt>
                                <dd class="fldNomeCont">
                                    <label class="req" for="formcadastro_txtPFNome">
                                        Nombre<span class="req">*</span>:
                                    </label>
                                    <input name="FirstName" type="text" value="<%: Model.FirstName %>" maxlength="50" id="FirstName" class="fldNome" title="Nombre" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Nombre obligatorio');" />
                                    <span id='spanValidateFirstName' class='validacao'></span>
                                </dd>
                                <dd class="fldSobrenomeCont">
                                    <label for="formcadastro_txtPFSobrenome">
                                        Apellido<span class="req">*</span>:
                                    </label>
                                    <input name="LastName" type="text" value="<%: Model.LastName %>" maxlength="50" id="LastName" class="fldSobrenome" title="Apellido" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Apellido obligatorio');" />
                                    <span id='spanValidateLastName' class='validacao'></span>
                                </dd>
                                <dd class="fldCpfCont">
                                    <label class="req" for="formcadastro_txtPFCPF">
                                        DNI<span class="req">*</span>:
                                    </label>
                                    <input name="DNI" type="text" value="<%: Model.DNI %>" maxlength="14" id="DNI" class="fldCpf" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« DNI obligatorio');" />
                                    <span id='spanValidateDNI' class='validacao'></span>
                                </dd>
                                <dd class="fldRgCont">
                                    
                                </dd>
                                <dd class="fldDataNascimentoCont">
                                    <label class="req" for="formcadastro_txtPFNascDia">
                                        Fecha de nacimiento<span class="req">*</span>:
                                    </label>

                                    <% 
                    Html.DevExpress().DateEdit(
                        settings => {
                            settings.Name = "BirthDate";
                            settings.Properties.AllowNull = false;
                            settings.Properties.NullText = "dd/mm/aaaa";
                            settings.Width = 200;
                            settings.Properties.EditFormat = EditFormat.Custom;
                            settings.Properties.EditFormatString = "dd/MM/yyyy";
                        }
                    )
                    .Bind(Model.BirthDate)
                    .Render();
                %>
                                 
                                </dd>
                                <dd class="fldSexoCont">
                                    <label class="req" for="formcadastro_ddlSexo">
                                        Sexo<span class="req">*</span>:
                                    </label>
                                    <select name="Gender" id="Gender" class="fldSexo" title="Sexo">
                                        <option selected="selected" value="True">Masculino</option>
                                        <option value="False">Femenino</option>
                                    </select>
                                </dd>
                            </dl>
                        </fieldset>
                    </div>
                </div>
                <div class="box_968_bot">
                </div>
            </div>
            
            <div id="box_cadastro_enderecocontato" class="box_968_container">
                <div class="box_968_mid">
                    <div class="box_968_top">
                        <fieldset class="form_container">
                            <dl class="cadastro_endereco_contato box_itens">
                                <dt class="box_titulo">Dirección de contacto </dt>
                                <dd class="fldCepCont">
                                    <label class="req" for="formcadastro_txtCep">
                                        Cod.Postal<span class="req">*</span>:
                                    </label>
                                    <input name="ZipCode" type="text" value="<%: Model.ZipCode %>" maxlength="9" id="ZipCode" class="fldCep" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Cod.Postal obligatorio');" />
                                    <span id='spanValidateZipCode' class='validacao'></span>
                                </dd>
                                <dd class="fldEnderecoCont">
                                    <label class="req" for="formcadastro_txtEndereco">
                                        Dirección<span class="req">*</span>:
                                    </label>
                                    <input name="Address" type="text" value="<%: Model.Address %>" maxlength="100" id="Address" class="fldEndereco" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Dirección obligatoria');" title="Dirección" />
                                    <span id='spanValidateAddress' class='validacao'></span>
                                </dd>
                                <dd class="fldNumeroCont">
                                    <label class="req" for="formcadastro_txtNumero">
                                        Número<span class="req">*</span>:
                                    </label>
                                    <input name="Number" type="text" value="<%: Model.Number %>" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Número obligatorio');" maxlength="15" id="Number" class="fldTelefone2_ddd" title="Número" />
                                    <span id='spanValidateNumber' class='validacao'></span>
                                </dd>
                                <dd class="fldCidadeCont">
                                    <label class="req" for="formcadastro_txtCidade">
                                        Ciudad<span class="req">*</span>:
                                    </label>
                                     <input name="City" type="text" value="<%: Model.City %>" maxlength="50" id="City" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Ciudad obligatoria');" class="fldTelefone2_ddd" title="Ciudad" />
                                     <span id='spanValidateCity' class='validacao'></span>
                                </dd>
                                <dd class="fldEstadoCont">
                                    <label class="req" for="formcadastro_ddlEstado">
                                        Provincia<span class="req">*</span>:
                                    </label>
                                    <%: Html.DropDownList("StateId", new SelectList(ViewData.Eval("States") as IEnumerable, "StateId", "Description", Model.StateId), new { @width = "200px" })%>
                                </dd>
                                <dd class="fldTelefone1Cont">
                                    <label class="req" for="formcadastro_txtTel1Ddd">
                                        Teléfono 1<span class="req">*</span>:
                                    </label>
                                    <input name="Telephone1" type="text" value="<%: Model.Telephone1 %>" maxlength="20" id="Telephone1" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Teléfono obligatorio');" class="fldTelefone1_ddd" title="Teléfono 1" />
                                    <span id='spanValidateTelephone1' class='validacao'></span>
                                </dd>
                                <dd class="fldTelefone2Cont">
                                    <label for="formcadastro_txtTel2Ddd">
                                        Teléfono 2:
                                    </label>
                                    <input name="Telephone2" type="text" value="<%: Model.Telephone2 %>" maxlength="20" id="Telephone2" class="fldTelefone2_ddd" title="Teléfono 2" />
                                </dd>
                                <dd class="fldTelefone3Cont">
                                    <label for="formcadastro_txtTel3Ddd">
                                        Teléfono 3:
                                    </label>
                                      <input name="Telephone3" type="text" value="<%: Model.Telephone3 %>" maxlength="20" id="Telephone3" class="fldTelefone3_ddd" title="Teléfono 3" />
                                </dd>
                                <dd class="fldCelularCont">
                                    <label for="formcadastro_txtTelCelDdd">
                                        Celular:
                                    </label>
                                    <input name="Cellular" type="text" maxlength="20" id="Cellular" value="<%: Model.Cellular %>" class="fldCelular_ddd" title="Celular" />
                                </dd>
                                <dd class="fldFaxCont">
                                    <label for="formcadastro_txtTelFaxDdd">
                                        Fax:
                                    </label>
                                    <input name="Fax" type="text" maxlength="20" id="Fax" value="<%: Model.Fax %>" class="fldFax_ddd"  title="Fax" />
                                </dd>
                            </dl>
                        </fieldset>
                    </div>
                </div>
                <div class="box_968_bot">
                </div>
            </div>
            <div id="box_cadastro_dadosacesso" class="box_968_container">
                <div class="box_968_mid">
                    <div class="box_968_top">
                        <fieldset class="form_container">
                            <dl class="cadastro_dados_acesso box_itens">
                                <dt class="box_titulo">Datos de acesso </dt>
                                <dd class="fldEmailCont">
                                    <label for="formcadastro_txtEmail">
                                        E-mail<span class="req">*:</span>
                                    </label>
                                    <input name="Email" type="text" value="<%: Model.Email %>" style="width:300px" maxlength="100" id="Email" class="fldEmail" title="Email" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Email obligatorio');"/>
                                    <span id='spanValidateEmail' class='validacao'></span>
                                </dd>
                                <% if (Model.CustomerId == 0)
                                   { %>
                                <dd class="fldPasswordCont">								    <label for="formcadastro_txtSenha">									    Contraseña<span class="req">*:</span>								    </label>								    <input name="Password" type="password" id="Password" maxlength="15" class="fldPassword" title="Contraseña" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Contraseña obligatoria');" />							        <span id='spanValidatePassword' class='validacao'></span>                                </dd>							    <dd class="fldConfirmPasswordCont">								    <label for="formcadastro_txtSenhaConfirmacao">									    Confirme contraseña<span class="req">*:</span>								    </label>								    <input name="ConfirmPassword" type="password" id="ConfirmPassword" maxlength="15" class="fldConfirmPassword" title="Confirme contraseña" onfocus="AtivaCampo(this);" onblur="DesativaCampo(this);VerificaCampoObligatorio(this, '« Confirma Contraseña obligatoria');" />							         <span id='spanValidateConfirmPassword' class='validacao'></span>                                </dd>                                <% } %>                            </dl>
                        </fieldset>
                    </div>
                </div>
                <div class="box_968_bot">
                </div>
            </div>
            <div id="formcadastro_box_cadastro_dadosadicionais" class="box_968_container">
                <div class="box_968_mid">
                    <div class="box_968_top">
                        <fieldset class="form_container">
                            <dl class="cadastro_dados_adicionais box_itens">
                                <dt class="box_titulo">Datos adicionales </dt>
                                <dd class="fldNewsletterCont">
                                    <span class="fldNewsletter nb">
                                        <%: Html.CheckBoxFor(m=>m.NewsLetter) %></span>
                                        
                                    <label for="NewsLetter">
                                        &nbsp;Quiero recibir newsletters con noticias, eventos e información sobre los productos.
                                    </label>
                                </dd>
                            </dl>
                        </fieldset>
                    </div>
                </div>
                <div class="box_968_bot">
                </div>
            </div>
            <p class="requiredFields_text">
                *Campos obligatorios
            </p>
            <p class="btSalvar_container">
                <input type="image" name="btnSalvar" id="btnSalvar" class="nb" src="/Content/imgs/account/bt_salvar.gif" border="0" onclick="return handleValidation();" language="javascript" />
            </p>
        </div>
<% 
    }
%>

        <!-- FIM DO CONTEUDO INTERNO (CENTRO) -->
    </div>
    <!-- FIM DO CONTEUDO PRINCIPAL -->
    
</asp:Content>
