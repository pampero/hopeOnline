/*****************************Validação durante o preenchimento*******************************/
function VerificaPreenchimentoURL(campo, campo2)
{
	if(Trim(campo.value) != '')
	{
		campo2.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    campo2.innerHTML = '« Preencha o Site';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoBanco(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoNumeroBanco');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o Número do Banco';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoAgencia(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoAgencia');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha a Agência';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoConta(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoConta');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha a Conta';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoNome(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoNome');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o Nome';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoSobrenome(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoSobrenome');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o Sobrenome';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoRG(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoRG');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o RG';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoRazaoSocial(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoRazaoSocial');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha a Razão Social';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoNomeFantasia(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoNomeFantasia');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o Nome Fantasia';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoEndereco(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoEndereco');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o Endereço';
	    MudaCorBorda(campo,'#88147E');   
	}
	
	if(document.getElementById("formcadastro_hdnEndereco"))
	{
	    document.getElementById("formcadastro_hdnEndereco").value = campo.value;
    }
    else
    {
        document.getElementById("FormAfiliado_hdnEndereco").value = campo.value;
    }
}

function VerificaPreenchimentoNumero(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoNumero');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o Número';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoBairro(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoBairro');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha o Bairro';
	    MudaCorBorda(campo,'#88147E');   
	}
}

function VerificaPreenchimentoCidade(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoCidade');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  
	}
	else
	{
	    spanMsgValidacao.innerHTML = '« Preencha a Cidade';
	    MudaCorBorda(campo,'#88147E');   
	}
	
	if(document.getElementById("formcadastro_hdnCidade"))
	{
	    document.getElementById("formcadastro_hdnCidade").value = campo.value;
    }
    else
    {
        document.getElementById("FormAfiliado_hdnCidade").value = campo.value;
    }
}

function VerificaCPF(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoCPF');
		
    if(Trim(campo.value) == '')
    {
	    MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« Preencha o CPF';    
    }		
	else if(!validaCPF(Trim(campo.value)))
	{
	    MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« CPF inválido';
	}
	else
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');
		formcadastro.ExisteCPF(Trim(campo.value), callback_ExisteCPF);	
	}
}

function callback_ExisteCPF(res)
{
	if(!res.error)
	{
		if (res.value != "")
		{
		    MudaCorBorda(document.getElementById('formcadastro_txtPFCPF'),'#88147E');
		    alert("CPF já cadastrado na loja!");
		}
		
		document.getElementById('spanMsgValidacaoCPF').innerHTML = res.value;
		
	}
	else
	{
		alert(res.error);
	}
}

function VerificaCPFAfiliado(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoCPF');
		
    if(Trim(campo.value) == '')
    {
	    MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« Preencha o CPF';    
    }		
	else if(!validaCPF(Trim(campo.value)))
	{
	    MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« CPF inválido';
	}
	else
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');
		FormAfiliado.ExisteCPF(Trim(campo.value), callback_ExisteCPFAfiliado);	
	}
}

function callback_ExisteCPFAfiliado(res)
{
	if(!res.error)
	{
		if (res.value != "")
		{
		    MudaCorBorda(document.getElementById('FormAfiliado_txtPFCPF'),'#88147E');
		}
		
		document.getElementById('spanMsgValidacaoCPF').innerHTML = res.value;
	}
	else
	{
		alert(res.error);
	}
}

function VerificaCNPJ(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoCNPJ');
		
	if(Trim(campo.value) == '')
	{
		MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« Preencha o CNPJ';	
	}	
	else if(!validaCNPJ(Trim(campo.value)))
	{
		MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« CNPJ inválido';
	}
	else
	{
		spanMsgValidacao.innerHTML = '';
		MudaCorBorda(campo,'#E2E2E2');	
		
		formcadastro.ExisteCNPJ(Trim(campo.value), callback_ExisteCNPJ);	
	}
}

function callback_ExisteCNPJ(res)
{
	if(!res.error)
	{
		if (res.value != "")
		{
		    MudaCorBorda(document.getElementById('formcadastro_txtPJCNPJ'),'#88147E');
		}
		
		document.getElementById('spanMsgValidacaoCNPJ').innerHTML = res.value;
	}
	else
	{
		alert(res.error);
	}
}

function VerificaCNPJAfiliado(campo)
{
	var spanMsgValidacao = document.getElementById('spanMsgValidacaoCNPJ');
		
	if(Trim(campo.value) == '')
	{
		MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« Preencha o CNPJ';	
	}	
	else if(!validaCNPJ(Trim(campo.value)))
	{
		MudaCorBorda(campo,'#88147E');
		spanMsgValidacao.innerHTML = '« CNPJ inválido';
	}
	else
	{
		spanMsgValidacao.innerHTML = '';
		MudaCorBorda(campo,'#E2E2E2');	
		
		FormAfiliado.ExisteCNPJ(Trim(campo.value), callback_ExisteCNPJAfiliado);	
	}
}

function callback_ExisteCNPJAfiliado(res)
{
	if(!res.error)
	{
		if (res.value != "")
		{
		    MudaCorBorda(document.getElementById('FormAfiliado_txtPJCNPJ'),'#88147E');
		}
		
		document.getElementById('spanMsgValidacaoCNPJ').innerHTML = res.value;
	}
	else
	{
		alert(res.error);
	}
}

function VerificaIE()
{
	var spanMsgValidacao	= document.getElementById('spanMsgValidacaoIE');
	var campo				= '';
	var check				= '';
	var retorno				= '';
	
	
	if(document.getElementById('formcadastro_txtPJIE'))
	{
		campo				= document.getElementById('formcadastro_txtPJIE');
	    check				= document.getElementById('formcadastro_ckbIsento');
	}
	else
	{
		campo				= document.getElementById('FormAfiliado_txtPJIE');
	    check				= document.getElementById('FormAfiliado_ckbIsento');	
	}
		
	if(Trim(campo.value) != '' && ((Trim(campo.value) == 'Isento' && check.checked) || Number(Trim(campo.value)).toString() != 'NaN'))
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');  		
	}
	else
	{
	    if(Trim(campo.value) == '')
	    {
	        spanMsgValidacao.innerHTML	= '« Preencha a IE';
		    retorno						= '« Preencha a IE';
		    MudaCorBorda(campo,'#88147E');  
		}
		else
		{
		    spanMsgValidacao.innerHTML	= '« IE inválida';
		    retorno						= '« IE inválida';
	        MudaCorBorda(campo,'#88147E');  
	    }
	}
	
	return retorno;
}

function VerificaDataNascimento()
{
	var spanMsgValidacao			= document.getElementById('spanMsgValidacaoDataNascimento');
	var currentTime					= new Date();
	var retorno						= '';

	var dia = '';
	var mes = '';
	var ano = '';
	
	if(document.getElementById('formcadastro_txtPFNascDia'))
	{
	    dia = document.getElementById('formcadastro_txtPFNascDia');
	    mes = document.getElementById('formcadastro_txtPFNascMes');
	    ano = document.getElementById('formcadastro_txtPFNascAno');	
	}
	else
	{
	    dia = document.getElementById('FormAfiliado_txtPFNascDia');
	    mes = document.getElementById('FormAfiliado_txtPFNascMes');
	    ano = document.getElementById('FormAfiliado_txtPFNascAno');		
	}
	
	if(Trim(dia.value) == '' && Trim(mes.value) == '' && Trim(ano.value) == '')
	{
		spanMsgValidacao.innerHTML	= '« Preencha a Data de Nascimento';	
		retorno						= '« Preencha a Data de Nascimento';		
	}
	else if(ValidaData(Trim(dia.value), Trim(mes.value), Trim(ano.value)))
	{
		if(Number(Trim(ano.value)) > currentTime.getFullYear() || (Number(Trim(ano.value)) == currentTime.getFullYear() && Number(Trim(mes.value)) > (currentTime.getMonth() +1)) || (Number(Trim(ano.value)) == currentTime.getFullYear() && Number(Trim(mes.value)) == (currentTime.getMonth() +1) && Number(Trim(dia.value)) > currentTime.getDate()))
		{
			spanMsgValidacao.innerHTML	= '« Você realmente veio do futuro?';	
			retorno						= '« Você realmente veio do futuro?';	
			MudaCorBorda(dia,'#88147E'); 
			MudaCorBorda(mes,'#88147E'); 
			MudaCorBorda(ano,'#88147E'); 			
		}
		else
		{
		    spanMsgValidacao.innerHTML = '';
			MudaCorBorda(dia,'#E2E2E2'); 
			MudaCorBorda(mes,'#E2E2E2'); 
			MudaCorBorda(ano,'#E2E2E2');
		}
	}
	else
	{
		if(Trim(dia.value) == '' || Trim(mes.value) == '' || Trim(ano.value) == '')
		{
			spanMsgValidacao.innerHTML	= '« Data de Nascimento incompleta';	
			retorno						= '« Data de Nascimento incompleta';	
		}
		else if(Number(Trim(ano.value)) < 1900)
		{
			spanMsgValidacao.innerHTML	= '« Somente nascimentos a partir de 1900';	
			retorno						= '« Somente nascimentos a partir de 1900';	
		}
		else
		{
			spanMsgValidacao.innerHTML	= '« Data de Nascimento inválida';	
			retorno						= '« Data de Nascimento inválida';	
		}
		
		MudaCorBorda(dia,'#88147E'); 
		MudaCorBorda(mes,'#88147E'); 
		MudaCorBorda(ano,'#88147E');		
	}
	return retorno;
}

function VerificaCEP(campo, carregaEndereco)
{
	var spanMsgValidacao	= document.getElementById('spanMsgValidacaoCEP');
	var retorno				= ''
	
	if(Trim(campo.value).replace('-','') == '')
	{
		spanMsgValidacao.innerHTML	= '« Preencha o CEP';
	    retorno						= '« Preencha o CEP';
	    MudaCorBorda(campo,'#88147E');  			
	}		
	else if((Number(Trim(campo.value).replace('-','')).toString() != 'NaN' && Trim(campo.value).replace('-','').length == 8))
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');	
		if(carregaEndereco)
		{
		    CarregaEndereco(Trim(campo.value).replace('-',''));	
		}
	}
	else
	{
		if(Number(Trim(campo.value).replace('-','')).toString() == 'NaN')
		{
			spanMsgValidacao.innerHTML	= '« CEP inválido';
			retorno						= '« CEP inválido';	
		}
		else
		{
			spanMsgValidacao.innerHTML	= '« CEP incompleto';
			retorno						= '« CEP incompleto';	
		}
		
		MudaCorBorda(campo,'#88147E');  		
	}
	return retorno;
}

function VerificaTelefone(tipo)
{
	var spanMsgValidacao		= document.getElementById('spanMsgValidacaoTel'+tipo);
	var ddd						= '';
	var telefone				= '';
	var ramal					= '';
	
	if(document.getElementById('formcadastro_txtTel'+tipo+'Ddd'))
	{
	    ddd						= document.getElementById('formcadastro_txtTel'+tipo+'Ddd');
	    telefone				= document.getElementById('formcadastro_txtTel'+tipo);
	    ramal					= document.getElementById('formcadastro_txtRamal'+tipo);	
	}
	else
	{
	    ddd						= document.getElementById('FormAfiliado_txtTel'+tipo+'Ddd');
	    telefone				= document.getElementById('FormAfiliado_txtTel'+tipo);
	    ramal					= document.getElementById('FormAfiliado_txtRamal'+tipo);		
	}	
	
	if(ddd == null)
	{
		ddd						= document.getElementById('txtTel'+tipo+'Ddd');
		telefone				= document.getElementById('txtTel'+tipo);
		ramal					= document.getElementById('txtRamal'+tipo);
	}
	
	var retorno					= '';
	
	var ramalValor = '';
	
	if (ramal != null)
	{
		ramalValor = ramal.value;
	}
	
	if((Trim(ddd.value) == '' && tipo != '1') || (Number(Trim(ddd.value)).toString() != 'NaN' && Trim(ddd.value).length == 2))
	{
		spanMsgValidacao.innerHTML = '';	
		
		MudaCorBorda(telefone,'#E2E2E2'); 
		MudaCorBorda(ddd,'#E2E2E2'); 
		
		if(ramal)
		{
		    MudaCorBorda(ramal,'#E2E2E2'); 
		}

		if((Trim(telefone.value).replace('-','') == '' && tipo != '1') || Number(Trim(telefone.value).replace('-','')).toString() != 'NaN')
		{
			if(!(Trim(ramalValor) == '' || Number(Trim(ramalValor)).toString() != 'NaN'))
			{
				spanMsgValidacao.innerHTML	= '« Ramal inválido';
				retorno						= '« Ramal inválido';
				
		        if(ramal)
		        {
		            MudaCorBorda(ramal,'#88147E'); 
		        }				                
			}				
		
			if(spanMsgValidacao.innerHTML == '')
			{
				if(Trim(ddd.value) != '' || Trim(telefone.value) != '' || Trim(ramalValor) != '')
				{
					if(Trim(ddd.value) == '' || Trim(telefone.value) == '' || Trim(telefone.value).replace('-','').length < 7)
					{
						spanMsgValidacao.innerHTML	= '« Incompleto';
						retorno						= '« Incompleto';		
						
						MudaCorBorda(telefone,'#88147E'); 
		                MudaCorBorda(ddd,'#88147E'); 									
					}
				}
			}
		}
		else
		{
			if(tipo == 'Fax')
			{
				spanMsgValidacao.innerHTML	= '« Fax inválido';
				retorno						= '« Fax inválido';
			}
			else if(tipo == 'Cel')
			{
				spanMsgValidacao.innerHTML	= '« Celular inválido';
				retorno						= '« Celular inválido';
			}			
			else
			{
	            if((Trim(ddd.value) == '' || Trim(telefone.value) == '') && tipo == '1')
	            {
		            spanMsgValidacao.innerHTML	= '« Preencha o Telefone 1';
		            retorno						= '« Preencha o Telefone 1';	    
	            }
	            else
	            {			
				    spanMsgValidacao.innerHTML	= '« Telefone inválido';
				    retorno						= '« Telefone inválido';
                }
			}
			
			MudaCorBorda(telefone,'#88147E'); 
		    MudaCorBorda(ddd,'#88147E');			
		}		
	}
	else
	{
        if((Trim(ddd.value) == '' || Trim(telefone.value) == '') && tipo == '1')	    
	    {
		    spanMsgValidacao.innerHTML	= '« Preencha o Telefone 1';
		    retorno						= '« Preencha o Telefone 1';	    
	    }
	    else
	    {
		    if(Number(Trim(ddd.value)).toString() == 'NaN')
		    {
			    spanMsgValidacao.innerHTML	= '« DDD inválido';
			    retorno						= '« DDD inválido';
		    }
		    else
		    {
			    spanMsgValidacao.innerHTML	= '« DDD incompleto';
			    retorno						= '« DDD incompleto';
		    }
		}
		MudaCorBorda(telefone,'#88147E'); 
		MudaCorBorda(ddd,'#88147E');		
	}
	return retorno;
}


function VerificaEmail()
{
	var spanMsgValidacao	= document.getElementById('spanMsgValidacaoEmail');
	var campo				= document.getElementById('formcadastro_txtEmail');
		
    if(Trim(campo.value) == '')
    {
		spanMsgValidacao.innerHTML	= '« Preencha o E-mail';
		MudaCorBorda(campo,'#88147E');	    
    }    		
	else if(!ValidaEmail(Trim(campo.value)))
	{
		spanMsgValidacao.innerHTML	= '« E-mail inválido';
		MudaCorBorda(campo,'#88147E');
	}
	else
	{
		spanMsgValidacao.innerHTML = '';	
	    MudaCorBorda(campo,'#E2E2E2'); 
		
		formcadastro.ExisteEmail(Trim(campo.value), callback_ExisteEmail);
	}
}

function callback_ExisteEmail(res)
{
	if(!res.error)
	{
		if (res.value != "")
		{
		    MudaCorBorda(document.getElementById('formcadastro_txtEmail'),'#88147E');
		}
		
		document.getElementById('spanMsgValidacaoEmail').innerHTML = res.value;
	}
	else
	{
		alert(res.error);
	}
}

function VerificaEmailAfiliado()
{
	var spanMsgValidacao	= document.getElementById('spanMsgValidacaoEmail');
	var campo				= document.getElementById('FormAfiliado_txtEmail');
		
    if(Trim(campo.value) == '')
    {
		spanMsgValidacao.innerHTML	= '« Preencha o E-mail';
		MudaCorBorda(campo,'#88147E');	    
    }    		
	else if(!ValidaEmail(Trim(campo.value)))
	{
		spanMsgValidacao.innerHTML	= '« E-mail inválido';
		MudaCorBorda(campo,'#88147E');
	}
	else
	{
		spanMsgValidacao.innerHTML = '';	
	    MudaCorBorda(campo,'#E2E2E2'); 
		
		FormAfiliado.ExisteEmail(Trim(campo.value), callback_ExisteEmailAfiliado);
	}
}

function callback_ExisteEmailAfiliado(res)
{
	if(!res.error)
	{
		if (res.value != "")
		{
		    MudaCorBorda(document.getElementById('FormAfiliado_txtEmail'),'#88147E');
		}
		
		document.getElementById('spanMsgValidacaoEmail').innerHTML = res.value;
	}
	else
	{
		alert(res.error);
	}
}

function VerificaSenha()
{
	var spanMsgValidacao	= document.getElementById('spanMsgValidacaoSenha');
	var campo				= '';
	var retorno				= '';
		
    if(document.getElementById('formcadastro_txtSenha'))
    {
        campo				= document.getElementById('formcadastro_txtSenha');    
    }
    else
    {
        campo				= document.getElementById('FormAfiliado_txtSenha');    
    }
    		
    if(Trim(campo.value) == '')
    {
		spanMsgValidacao.innerHTML	= '« Preencha a Senha';
		MudaCorBorda(campo,'#88147E');	    
    }    		
	else if((Trim(campo.value).length >= 6 && ValidaSenha(Trim(campo.value))))
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2');		
	}
	else
	{
		if(Trim(campo.value).length < 6)
		{
			spanMsgValidacao.innerHTML	= '« No mínimo 6 caracteres';
			retorno						= '« No mínimo 6 caracteres';		
		}
		else
		{
			spanMsgValidacao.innerHTML	= '« A Senha contém algum caractere inválido';
			retorno						= '« A Senha contém algum caractere inválido';
		}
		
		MudaCorBorda(campo,'#88147E');		
	}
	
	return retorno;
}

function VerificaConfSenha()
{
	var spanMsgValidacao	= document.getElementById('spanMsgValidacaoConfirmacaoSenha');
	var campo				= '';
	var campo1				= '';
	
	var retorno				= '';
		
    if(document.getElementById('formcadastro_txtSenha'))		
    {
	    campo				= document.getElementById('formcadastro_txtSenha');
	    campo1				= document.getElementById('formcadastro_txtSenhaConfirmacao');    
    }
    else
    {
	    campo				= document.getElementById('FormAfiliado_txtSenha');
	    campo1				= document.getElementById('FormAfiliado_txtSenhaConfirmacao');        
    }
		
	if(Trim(campo1.value) == '' && Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML	= '« Preencha a Confirmação da Senha';
		retorno						= '« Preencha a Confirmação da Senha';
		MudaCorBorda(campo1,'#88147E');						
	}
	else if(Trim(campo.value) == Trim(campo1.value))
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo1,'#E2E2E2');		
	}
	else
	{
		spanMsgValidacao.innerHTML	= '« Confirme corretamente a Senha';
		retorno						= '« Confirme corretamente a Senha';
		MudaCorBorda(campo1,'#88147E');					
	}
	
	return retorno;
}

function VerificaCodigoSeguranca(campo)
{
    var spanMsgValidacao	= document.getElementById('spanMsgValidacaoCodigoSeguranca');
		
	if(Trim(campo.value) != '')
	{
		spanMsgValidacao.innerHTML = '';	
		MudaCorBorda(campo,'#E2E2E2'); 
		
		formcadastro.ValidaCodigoSeguranca(Trim(campo.value), callback_ValidaCodigoSeguranca);
	}
	else
	{
		spanMsgValidacao.innerHTML	= '« Preencha a sequência';
		MudaCorBorda(campo,'#88147E');
	}	
}

function callback_ValidaCodigoSeguranca(res)
{
	if(!res.error)
	{
		if (res.value != "")
		{
		    if(document.getElementById('formcadastro_txtCodigoSeguranca'))
		    {
		        MudaCorBorda(document.getElementById('formcadastro_txtCodigoSeguranca'),'#88147E');
            }
            else
            {
                MudaCorBorda(document.getElementById('FormAfiliado_txtCodigoSeguranca'),'#88147E');
            }
		}	
		document.getElementById('spanMsgValidacaoCodigoSeguranca').innerHTML = res.value;
	}
	else
	{
		alert(res.error);
	}
}

/*********************************************************************************************/
function ReloadImagemSeguranca()
{
	formcadastro.ReloadImagemSeguranca(callback_ReloadImagemSeguranca);
}

function callback_ReloadImagemSeguranca(res)
{
	if(!res.error)
	{
		document.getElementById('imgSeguranca').src = '../cadastro/codigoImagem.aspx?sc=' + res.value;
	}
	else
	{
		alert(res.error);
	}
}

function AtivarIsento()
{ 
	var ckbIsento   = ''; 
	var txtPJIE     = '';
	
	if(document.getElementById("formcadastro_ckbIsento"))
	{
	    ckbIsento = document.getElementById("formcadastro_ckbIsento"); 
	    txtPJIE = document.getElementById("formcadastro_txtPJIE");	
	}
	else
	{
	    ckbIsento = document.getElementById("FormAfiliado_ckbIsento"); 
	    txtPJIE = document.getElementById("FormAfiliado_txtPJIE");		
	}

	if(ckbIsento.checked) 
	{
		txtPJIE.value		= "Isento" ;
		txtPJIE.readOnly	= true;
		
		MudaCorBorda(txtPJIE,'#E2E2E2');   
		document.getElementById('spanMsgValidacaoIE').innerHTML = '';
	}
	else
	{
		txtPJIE.readOnly	= false;
		
		if(txtPJIE.value == "Isento")
		{
			txtPJIE.value		= "" ;
			VerificaIE();
		}
	}
}


function VerificaTipoPessoa()
{
	try
	{
		var formcadastro_rdnPF		= ''; 
		var formcadastro_rdnPJ		= ''; 
		
		if(document.getElementById('formcadastro_rdnPF'))
		{
		    formcadastro_rdnPF		= document.getElementById('formcadastro_rdnPF');
		    formcadastro_rdnPJ		= document.getElementById('formcadastro_rdnPJ');
		}
		else
		{
		    formcadastro_rdnPF		= document.getElementById('FormAfiliado_rdnPF');
		    formcadastro_rdnPJ		= document.getElementById('FormAfiliado_rdnPJ');		
		}
		
		var DadosPessoaFisica		= document.getElementById('DadosPessoaFisica');
		var DadosPessoaJuridica		= document.getElementById('DadosPessoaJuridica');
		
	    if(formcadastro_rdnPF.checked || (!formcadastro_rdnPF.checked && !formcadastro_rdnPJ.checked))
	    {
			DadosPessoaFisica.style.display		= 'block';	
			DadosPessoaJuridica.style.display	= 'none';
			formcadastro_rdnPF.checked			= true;
	    }	
	    else
	    {
			DadosPessoaFisica.style.display		= 'none';	
			DadosPessoaJuridica.style.display	= 'block';	    

	    }
	}
	catch(err)
	{
		alert(err.description);
	}
}

function VerificaTipoPessoaSenha()
{
//	try
//	{
        var rdnPF								= document.getElementById('rdnPF');
		var rdnPJ								= document.getElementById('rdnPJ');
		
		var DadosPessoaFisica					= document.getElementById('DadosPessoaFisica');
		var DadosPessoaJuridica					= document.getElementById('DadosPessoaJuridica');
		var DadosBotao							= document.getElementById('DadosBotao');
		
		var txtPFCPF							= document.getElementById('txtPFCPF');
		var txtPFNascDia						= document.getElementById('txtPFNascDia');
		var txtPFNascMes						= document.getElementById('txtPFNascMes');
		var txtPFNascAno						= document.getElementById('txtPFNascAno');
		var spanMsgValidacaoCPF					= document.getElementById('spanMsgValidacaoCPF');
		var spanMsgValidacaoDataNascimento		= document.getElementById('spanMsgValidacaoDataNascimento');
		
		var txtPJCNPJ							= document.getElementById('txtPJCNPJ');
		var spanMsgValidacaoCNPJ				= document.getElementById('spanMsgValidacaoCNPJ');
						
	    if(rdnPF.checked || (!rdnPF.checked && !rdnPJ.checked))
	    {
			DadosPessoaFisica.style.display		= 'block';	
			DadosPessoaJuridica.style.display	= 'none';
			rdnPF.checked						= true;
	    }	
	    else
	    {
			DadosPessoaFisica.style.display		= 'none';	
			DadosPessoaJuridica.style.display	= 'block';	    
	    }
	    
	    if (DadosBotao)
	    {
			DadosBotao.style.display				= 'block';
		}
		
		txtPFCPF.value = "";
		txtPFNascDia.value = "";
		txtPFNascMes.value = "";
		txtPFNascAno.value = "";
		spanMsgValidacaoCPF.innerHTML = "";
		spanMsgValidacaoDataNascimento.innerHTML = "";
		txtPJCNPJ.value = "";
		spanMsgValidacaoCNPJ.innerHTML = "";		    
//	}
//	catch(err)
//	{
//		alert(err);
//	}
}

function VerificaTipoPessoaEdicao()
{
	try
	{
		VerificaTipoPessoa();

		if (document.getElementById('form_container'))
		{
			document.getElementById('form_container').style.display	= "none";
		}
	}
	catch(err)
	{
		alert(err.description);
	}
}

function VerificaTipoPessoaInclusao()
{
	try
	{
		VerificaTipoPessoa();

		if (document.getElementById('form_container'))
		{
			//document.getElementById('form_container').style.display	= "block";
		}
	}
	catch(err)
	{
		alert(err.description);
	}
}



function CamposPreenchidos(ParentForm, botao)
{
	var retorno = true;
    
    try
    {
    	OmitirBotao(botao);
    
        if(document.getElementById('formcadastro_rdnPF'))
        {
		    var formcadastro_rdnPF					= document.getElementById('formcadastro_rdnPF');
		    var formcadastro_rdnPJ					= document.getElementById('formcadastro_rdnPJ');
            
            var formcadastro_txtPFNome              = document.getElementById('formcadastro_txtPFNome');
            var formcadastro_txtPFSobrenome         = document.getElementById('formcadastro_txtPFSobrenome');
            var formcadastro_txtPFCPF               = document.getElementById('formcadastro_txtPFCPF'); 
            var formcadastro_txtPFRG				= document.getElementById('formcadastro_txtPFRG');
            var formcadastro_txtPFNascDia           = document.getElementById('formcadastro_txtPFNascDia');
            var formcadastro_txtPFNascMes           = document.getElementById('formcadastro_txtPFNascMes');
            var formcadastro_txtPFNascAno           = document.getElementById('formcadastro_txtPFNascAno');

            var formcadastro_txtPJRazaoSocial       = document.getElementById('formcadastro_txtPJRazaoSocial');
            var formcadastro_txtPJCNPJ              = document.getElementById('formcadastro_txtPJCNPJ');
            var formcadastro_txtPJIE				= document.getElementById('formcadastro_txtPJIE');
            var formcadastro_txtPJNomeFantasia		= document.getElementById('formcadastro_txtPJNomeFantasia');
            
            var formcadastro_txtCep					= document.getElementById('formcadastro_txtCep');
            var formcadastro_txtEndereco			= document.getElementById('formcadastro_txtEndereco');
            var formcadastro_txtNumero				= document.getElementById('formcadastro_txtNumero');        
            var formcadastro_txtComplemento			= document.getElementById('formcadastro_txtComplemento');
            var formcadastro_txtBairro				= document.getElementById('formcadastro_txtBairro');
            var formcadastro_txtCidade				= document.getElementById('formcadastro_txtCidade');
            
            var formcadastro_txtTel1Ddd				= document.getElementById('formcadastro_txtTel1Ddd');
            var formcadastro_txtTel1				= document.getElementById('formcadastro_txtTel1');
            var formcadastro_txtRamal1				= document.getElementById('formcadastro_txtRamal1');
    		
            var formcadastro_txtTel2Ddd				= document.getElementById('formcadastro_txtTel2Ddd');
            var formcadastro_txtTel2				= document.getElementById('formcadastro_txtTel2');
            var formcadastro_txtRamal2				= document.getElementById('formcadastro_txtRamal2');
            
            var formcadastro_txtTel3Ddd				= document.getElementById('formcadastro_txtTel3Ddd');
            var formcadastro_txtTel3				= document.getElementById('formcadastro_txtTel3');
            var formcadastro_txtRamal3				= document.getElementById('formcadastro_txtRamal3');
                    
            var formcadastro_txtTelCelDdd			= document.getElementById('formcadastro_txtTelCelDdd');
            var formcadastro_txtTelCel				= document.getElementById('formcadastro_txtTelCel');
            
            var formcadastro_txtTelFaxDdd			= document.getElementById('formcadastro_txtTelFaxDdd');
            var formcadastro_txtTelFax				= document.getElementById('formcadastro_txtTelFax');
            
            var formcadastro_txtEmail				= document.getElementById('formcadastro_txtEmail');
            
            var formcadastro_txtSenha				= document.getElementById('formcadastro_txtSenha');
            var formcadastro_txtSenhaConfirmacao	= document.getElementById('formcadastro_txtSenhaConfirmacao'); 
            
            var formcadastro_txtCodigoSeguranca		= document.getElementById('formcadastro_txtCodigoSeguranca'); 
            
            var formcadastro_txtNumeroBanco         = null;
            var formcadastro_txtAgencia             = null;
            var formcadastro_txtConta               = null;
            var formcadastro_txtPFURL               = null;
            var formcadastro_txtPJURL               = null;
        }
        else
        {
		    var formcadastro_rdnPF					= document.getElementById('FormAfiliado_rdnPF');
		    var formcadastro_rdnPJ					= document.getElementById('FormAfiliado_rdnPJ');
            
            var formcadastro_txtPFNome              = document.getElementById('FormAfiliado_txtPFNome');
            var formcadastro_txtPFSobrenome         = document.getElementById('FormAfiliado_txtPFSobrenome');
            var formcadastro_txtPFCPF               = document.getElementById('FormAfiliado_txtPFCPF'); 
            var formcadastro_txtPFRG				= document.getElementById('FormAfiliado_txtPFRG');
            var formcadastro_txtPFNascDia           = document.getElementById('FormAfiliado_txtPFNascDia');
            var formcadastro_txtPFNascMes           = document.getElementById('FormAfiliado_txtPFNascMes');
            var formcadastro_txtPFNascAno           = document.getElementById('FormAfiliado_txtPFNascAno');
            var formcadastro_txtPFURL               = document.getElementById('FormAfiliado_txtPFURL');
            
            var formcadastro_txtPJRazaoSocial       = document.getElementById('FormAfiliado_txtPJRazaoSocial');
            var formcadastro_txtPJCNPJ              = document.getElementById('FormAfiliado_txtPJCNPJ');
            var formcadastro_txtPJIE				= document.getElementById('FormAfiliado_txtPJIE');
            var formcadastro_txtPJNomeFantasia		= document.getElementById('FormAfiliado_txtPJNomeFantasia');
            var formcadastro_txtPJURL               = document.getElementById('FormAfiliado_txtPJURL');            
            
            var formcadastro_txtCep					= document.getElementById('FormAfiliado_txtCep');
            var formcadastro_txtEndereco			= document.getElementById('FormAfiliado_txtEndereco');
            var formcadastro_txtNumero				= document.getElementById('FormAfiliado_txtNumero');        
            var formcadastro_txtComplemento			= document.getElementById('FormAfiliado_txtComplemento');
            var formcadastro_txtBairro				= document.getElementById('FormAfiliado_txtBairro');
            var formcadastro_txtCidade				= document.getElementById('FormAfiliado_txtCidade');
            
            var formcadastro_txtTel1Ddd				= document.getElementById('FormAfiliado_txtTel1Ddd');
            var formcadastro_txtTel1				= document.getElementById('FormAfiliado_txtTel1');
            var formcadastro_txtRamal1				= document.getElementById('FormAfiliado_txtRamal1');
    		
            var formcadastro_txtTel2Ddd				= document.getElementById('FormAfiliado_txtTel2Ddd');
            var formcadastro_txtTel2				= document.getElementById('FormAfiliado_txtTel2');
            var formcadastro_txtRamal2				= document.getElementById('FormAfiliado_txtRamal2');
            
            var formcadastro_txtTel3Ddd				= document.getElementById('FormAfiliado_txtTel3Ddd');
            var formcadastro_txtTel3				= document.getElementById('FormAfiliado_txtTel3');
            var formcadastro_txtRamal3				= document.getElementById('FormAfiliado_txtRamal3');
                    
            var formcadastro_txtTelCelDdd			= document.getElementById('FormAfiliado_txtTelCelDdd');
            var formcadastro_txtTelCel				= document.getElementById('FormAfiliado_txtTelCel');
            
            var formcadastro_txtTelFaxDdd			= document.getElementById('FormAfiliado_txtTelFaxDdd');
            var formcadastro_txtTelFax				= document.getElementById('FormAfiliado_txtTelFax');
            
            var formcadastro_txtEmail				= document.getElementById('FormAfiliado_txtEmail');
            
            var formcadastro_txtSenha				= document.getElementById('FormAfiliado_txtSenha');
            var formcadastro_txtSenhaConfirmacao	= document.getElementById('FormAfiliado_txtSenhaConfirmacao'); 
            
            var formcadastro_txtCodigoSeguranca		= document.getElementById('FormAfiliado_txtCodigoSeguranca');        
            
            var formcadastro_txtNumeroBanco		    = document.getElementById('FormAfiliado_txtNumeroBanco'); 
            var formcadastro_txtAgencia 		    = document.getElementById('FormAfiliado_txtAgencia'); 
            var formcadastro_txtConta    		    = document.getElementById('FormAfiliado_txtConta'); 
        }
        
        MudaCorBorda(formcadastro_txtPFNome,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPFSobrenome,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPFCPF,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPFRG,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPFNascDia,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPFNascMes,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPFNascAno,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPJRazaoSocial,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtPJCNPJ,'#E2E2E2'); 
        MudaCorBorda(formcadastro_txtPJIE,'#E2E2E2');   
        MudaCorBorda(formcadastro_txtPJNomeFantasia,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtCep,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtEndereco,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtNumero,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtComplemento,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtBairro,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtCidade,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtTel1Ddd,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtTel1,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtRamal1,'#E2E2E2'); 
        MudaCorBorda(formcadastro_txtTel2Ddd,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtTel2,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtRamal2,'#E2E2E2');         
        MudaCorBorda(formcadastro_txtTel3Ddd,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtTel3,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtRamal3,'#E2E2E2');     
        MudaCorBorda(formcadastro_txtTelCelDdd,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtTelCel,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtTelFaxDdd,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtTelFax,'#E2E2E2');        				        
        MudaCorBorda(formcadastro_txtEmail,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtSenha,'#E2E2E2');        				
        MudaCorBorda(formcadastro_txtSenhaConfirmacao,'#E2E2E2');        	
        MudaCorBorda(formcadastro_txtCodigoSeguranca,'#E2E2E2');  
        
        if (formcadastro_txtNumeroBanco != null)
        {
            MudaCorBorda(formcadastro_txtNumeroBanco,'#E2E2E2');  
            MudaCorBorda(formcadastro_txtAgencia,'#E2E2E2');  
            MudaCorBorda(formcadastro_txtConta,'#E2E2E2');  
        }
        
        if (formcadastro_txtPFURL != null)
        {
            MudaCorBorda(formcadastro_txtPFURL,'#E2E2E2');  
        }
        if (formcadastro_txtPJURL != null)
        {        
            MudaCorBorda(formcadastro_txtPJURL,'#E2E2E2');  
        }            
        
        for (j=0; j<document.getElementsByTagName("span").length; j++)
		{
			var spanMsgValidacao = document.getElementsByTagName("span")[j];

			if (spanMsgValidacao.id.indexOf('spanMsgValidacao') > -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoEmail') == -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoCPF') == -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoCNPJ') == -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoCodigoSeguranca') == -1)
			{
				spanMsgValidacao.innerHTML = '';
			}
		}
        
		if(formcadastro_rdnPF.checked)
		{   
			if(Trim(formcadastro_txtPFNome.value) == '')           
			{
				document.getElementById('spanMsgValidacaoNome').innerHTML = '« Preencha o Nome';				
				retorno = false;
				MudaCorBorda(formcadastro_txtPFNome,'#88147E');
			} 
			
			if(Trim(formcadastro_txtPFSobrenome.value) == '')      
			{
				document.getElementById('spanMsgValidacaoSobrenome').innerHTML = '« Preencha o Sobrenome';					
				retorno = false;
				MudaCorBorda(formcadastro_txtPFSobrenome,'#88147E');
			} 

			if(Trim(formcadastro_txtPFCPF.value) == '')            
			{
				document.getElementById('spanMsgValidacaoCPF').innerHTML = '« Preencha o CPF';					
				retorno = false;
				MudaCorBorda(formcadastro_txtPFCPF,'#88147E');
			} 
				        
			if(Trim(formcadastro_txtPFCPF.value) != '' && document.getElementById('spanMsgValidacaoCPF').innerHTML != '')
			{
				retorno = false;
				MudaCorBorda(formcadastro_txtPFCPF,'#88147E');
			} 			
			
			if(Trim(formcadastro_txtPFRG.value) == '')			   
			{
				document.getElementById('spanMsgValidacaoRG').innerHTML = '« Preencha o RG';									
				retorno = false;
				MudaCorBorda(formcadastro_txtPFRG,'#88147E');
			}
	        
			if(Trim(formcadastro_txtPFNascDia.value) == '' && Trim(formcadastro_txtPFNascMes.value) == '' && Trim(formcadastro_txtPFNascAno.value) == '')        
			{
				document.getElementById('spanMsgValidacaoDataNascimento').innerHTML = '« Preencha a Data de Nascimento';											
				MudaCorBorda(formcadastro_txtPFNascDia,'#88147E');
				MudaCorBorda(formcadastro_txtPFNascMes,'#88147E');
				MudaCorBorda(formcadastro_txtPFNascAno,'#88147E');
				retorno = false;
			}
     
			if(document.getElementById('spanMsgValidacaoDataNascimento').innerHTML == '' && VerificaDataNascimento() != '')
			{
				MudaCorBorda(formcadastro_txtPFNascDia,'#88147E');
				MudaCorBorda(formcadastro_txtPFNascMes,'#88147E');
				MudaCorBorda(formcadastro_txtPFNascAno,'#88147E');
				retorno = false;
			}
			
			if(formcadastro_txtPFURL!= null && Trim(formcadastro_txtPFURL.value) == '')			   
			{
				document.getElementById('spanMsgValidacaoPFURL').innerHTML = '« Preencha o Site';									
				retorno = false;
				MudaCorBorda(formcadastro_txtPFURL,'#88147E');
			}			
		}
		else if(formcadastro_rdnPJ.checked)
		{
			if(Trim(formcadastro_txtPJRazaoSocial.value) == '')		
			{
				document.getElementById('spanMsgValidacaoRazaoSocial').innerHTML = '« Preencha a Razão Social';
				retorno = false;
				MudaCorBorda(formcadastro_txtPJRazaoSocial,'#88147E');
			}
			
			if(Trim(formcadastro_txtPJNomeFantasia.value) == '')    
			{
				document.getElementById('spanMsgValidacaoNomeFantasia').innerHTML = '« Preencha o Nome Fantasia';
				retorno = false;
				MudaCorBorda(formcadastro_txtPJNomeFantasia,'#88147E');
			}

			if(Trim(formcadastro_txtPJCNPJ.value) == '')           
			{
				document.getElementById('spanMsgValidacaoCNPJ').innerHTML = '« Preencha o CNPJ';
				retorno = false;
				MudaCorBorda(formcadastro_txtPJCNPJ,'#88147E');
			} 
		
			if(Trim(formcadastro_txtPJCNPJ.value) != '' && document.getElementById('spanMsgValidacaoCNPJ').innerHTML != '')
			{
				retorno = false;
				MudaCorBorda(formcadastro_txtPJCNPJ,'#88147E');
			} 
			
			if(Trim(formcadastro_txtPJIE.value) == '')				
			{
				document.getElementById('spanMsgValidacaoIE').innerHTML = '« Preencha a IE';				
				retorno = false;
				MudaCorBorda(formcadastro_txtPJIE,'#88147E');
			} 
			
			if(Trim(formcadastro_txtPJIE.value) != '' && VerificaIE() != '')				
			{
				retorno = false;
				MudaCorBorda(formcadastro_txtPJIE,'#88147E');
			} 
			
			if(formcadastro_txtPJURL!= null && Trim(formcadastro_txtPJURL.value) == '')			   
			{
				document.getElementById('spanMsgValidacaoPJURL').innerHTML = '« Preencha o Site';									
				retorno = false;
				MudaCorBorda(formcadastro_txtPJURL,'#88147E');
			}				
		} 
	    
		if(Trim(formcadastro_txtCep.value).replace('-','') == '')				
		{
			document.getElementById('spanMsgValidacaoCEP').innerHTML = '« Preencha o CEP';	
			retorno = false;
			MudaCorBorda(formcadastro_txtCep,'#88147E');
		} 
		
		if(Trim(formcadastro_txtCep.value).replace('-','') != '' && VerificaCEP(formcadastro_txtCep, false) != '')
		{
			retorno = false;
			MudaCorBorda(formcadastro_txtCep,'#88147E');		
		}
		
		if(Trim(formcadastro_txtEndereco.value) == '')          
		{
			document.getElementById('spanMsgValidacaoEndereco').innerHTML = '« Preencha o Endereço';
			retorno = false;
			MudaCorBorda(formcadastro_txtEndereco,'#88147E');
		} 
		
		if(Trim(formcadastro_txtNumero.value) == '')			
		{
			document.getElementById('spanMsgValidacaoNumero').innerHTML = '« Preencha o Número';
			retorno = false;
			MudaCorBorda(formcadastro_txtNumero,'#88147E');
		} 
		
		if(Trim(formcadastro_txtBairro.value) == '')            
		{
			document.getElementById('spanMsgValidacaoBairro').innerHTML = '« Preencha o Bairro';
			retorno = false;
			MudaCorBorda(formcadastro_txtBairro,'#88147E');
		} 
		
		if(Trim(formcadastro_txtCidade.value) == '')			
		{
			document.getElementById('spanMsgValidacaoCidade').innerHTML = '« Preencha a Cidade';
			retorno = false;
			MudaCorBorda(formcadastro_txtCidade,'#88147E');
		} 
	    
	    if(Trim(formcadastro_txtTel1Ddd.value) == '' && Trim(formcadastro_txtTel1.value) == '')			
		{
			document.getElementById('spanMsgValidacaoTel1').innerHTML = '« Preencha o Telefone 1';
			retorno = false;
			MudaCorBorda(formcadastro_txtTel1Ddd,'#88147E');
			MudaCorBorda(formcadastro_txtTel1,'#88147E');
		} 
		
		if(document.getElementById('spanMsgValidacaoTel1').innerHTML == '' && VerificaTelefone('1') != '')
		{
			retorno = false;
			MudaCorBorda(formcadastro_txtTel1Ddd,'#88147E');		
			MudaCorBorda(formcadastro_txtTel1,'#88147E');
			
			if(document.getElementById('spanMsgValidacaoTel1').innerHTML.indexOf('Ramal') > -1)
			{
				MudaCorBorda(formcadastro_txtRamal1,'#88147E');
			}
		}
		
		if(document.getElementById('spanMsgValidacaoTel1').innerHTML == ''&& VerificaTelefone('2') != '')
		{
			retorno = false;
			MudaCorBorda(formcadastro_txtTel2Ddd,'#88147E');		
			MudaCorBorda(formcadastro_txtTel2,'#88147E');
			
			if(document.getElementById('spanMsgValidacaoTel2').innerHTML.indexOf('Ramal') > -1)
			{
				MudaCorBorda(formcadastro_txtRamal2,'#88147E');
			}
		}
		
		if(VerificaTelefone('3') != '')
		{
			retorno = false;
			MudaCorBorda(formcadastro_txtTel3Ddd,'#88147E');		
			MudaCorBorda(formcadastro_txtTel3,'#88147E');
			
			if(document.getElementById('spanMsgValidacaoTel3').innerHTML.indexOf('Ramal') > -1)
			{
				MudaCorBorda(formcadastro_txtRamal3,'#88147E');
			}
		}		
		
		if(VerificaTelefone('Cel') != '')
		{
			retorno = false;
			MudaCorBorda(formcadastro_txtTelCelDdd,'#88147E');		
			MudaCorBorda(formcadastro_txtTelCel,'#88147E');
		}
		
		if(VerificaTelefone('Fax') != '')
		{
			retorno = false;
			MudaCorBorda(formcadastro_txtTelFax,'#88147E');		
			MudaCorBorda(formcadastro_txtTelFax,'#88147E');
		}
				
		if(formcadastro_txtNumeroBanco!= null && Trim(formcadastro_txtNumeroBanco.value) == '')
		{
			document.getElementById('spanMsgValidacaoNumeroBanco').innerHTML = '« Preencha o Número do Banco';
			retorno = false;
			MudaCorBorda(formcadastro_txtNumeroBanco,'#88147E');
		} 
		
		if(formcadastro_txtAgencia != null && Trim(formcadastro_txtAgencia.value) == '')
		{
			document.getElementById('spanMsgValidacaoAgencia').innerHTML = '« Preencha a Agência';
			retorno = false;
			MudaCorBorda(formcadastro_txtAgencia,'#88147E');
		} 
		
		if(formcadastro_txtConta != null && Trim(formcadastro_txtConta.value) == '')
		{
			document.getElementById('spanMsgValidacaoConta').innerHTML = '« Preencha a Conta';
			retorno = false;
			MudaCorBorda(formcadastro_txtConta,'#88147E');
		} 				
		
		if(Trim(formcadastro_txtEmail.value) == '')
		{
			document.getElementById('spanMsgValidacaoEmail').innerHTML = '« Preencha o E-mail';
			retorno = false;
			MudaCorBorda(formcadastro_txtEmail,'#88147E');
		} 

		if(Trim(formcadastro_txtEmail.value) != '' && document.getElementById('spanMsgValidacaoEmail').innerHTML != '')
		{
			retorno = false;
			MudaCorBorda(formcadastro_txtEmail,'#88147E');
		} 

		if(ParentForm == 'FormInclusaoCadastro')
		{
			if(Trim(formcadastro_txtSenha.value) == '')				
			{
				document.getElementById('spanMsgValidacaoSenha').innerHTML = '« Preencha a Senha';	
				retorno = false;
				MudaCorBorda(formcadastro_txtSenha,'#88147E');
			} 

			if(Trim(formcadastro_txtSenha.value) != '' && VerificaSenha() != '')				
			{
				retorno = false;
				MudaCorBorda(formcadastro_txtSenha,'#88147E');
			} 
						
			if(Trim(formcadastro_txtSenhaConfirmacao.value) == '')  
			{
				document.getElementById('spanMsgValidacaoConfirmacaoSenha').innerHTML = '« Preencha a Confirmação da Senha';	
				retorno = false;
				MudaCorBorda(formcadastro_txtSenhaConfirmacao,'#88147E');
			} 
			
			if(formcadastro_txtSenhaConfirmacao.value != '' && VerificaConfSenha() != '')
			{
				retorno = false;
				MudaCorBorda(formcadastro_txtSenhaConfirmacao,'#88147E');
			} 
		}
		
		if(document.getElementById('BlocoSeguranca').style.display != 'none')
		{
			if(Trim(formcadastro_txtCodigoSeguranca.value) == '')
			{
				document.getElementById('spanMsgValidacaoCodigoSeguranca').innerHTML = '« Preencha a sequência';	
				retorno = false;
				MudaCorBorda(formcadastro_txtCodigoSeguranca,'#88147E');
			}
			
			if(Trim(formcadastro_txtCodigoSeguranca.value) != '' && document.getElementById('spanMsgValidacaoCodigoSeguranca').innerHTML != '')
			{
				retorno = false;
				MudaCorBorda(formcadastro_txtCodigoSeguranca,'#88147E');
			} 	
		}
    }
    catch(err)
    {
        alert(err.description);
        MostrarBotao(botao);
    }
    
    if(!retorno)
    {
		alert('Atenção!\n\rHá informações não preenchidas corretamente!');
		MostrarBotao(botao);
    }
    
    return retorno;          
}

function MudaCorBorda(obj, cor)
{
    try
    {        
		if(obj != null)
		{
			var Borda               = '1,9px';
			var BordaEstilo         = 'solid';
	        
			//obj.style.border        = Borda;
			//obj.style.borderStyle   = BordaEstilo;
			obj.style.borderColor   = cor;        
		}
    }
    catch(err)
    {
        document.write(err.description);
    }    
}

/* CADASTRO */
function validaCPF(cpf) 
{
	var retorno = true;
	

	if(cpf == "")
	{
		retorno = false;
	}
	else
	{
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(",", "");
		cpf = cpf.replace("-", "");
		cpf = cpf.replace(" ", "");

		erro = new String;
		if (cpf.length < 11) erro += "Sao necessarios 11 dígitos para verificação do CPF! \n\n"; 
		if (cpf.length > 11) erro += "CPF inválido! \n\n"; 
		var nonNumbers = /\D/;
		if (nonNumbers.test(cpf)) erro += "A verificação de CPF suporta apenas números! \n\n"; 
		
		if(cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
		{
				erro += "Número de CPF inválido!"
		}
	
		var a = [];
		var b = new Number;
		var c = 11;
		
		for (i=0; i<11; i++)
		{
				a[i] = cpf.charAt(i);
				if (i < 9) b += (a[i] * --c);
		}
		
		if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
		
		b = 0;
		c = 11;
		
		for (y=0; y<10; y++) b += (a[y] * c--); 
		
		if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
		
		if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]))
		{
				erro +="Dígito verificador com problema!";
		}
		
		if (erro.length > 0)
		{
			//alert("Numero de CPF invalido!");
			retorno = false;
		}
	}    

	return retorno;
}


function validaCNPJ(cnpj)
{
	var retorno = true;
	
	CNPJ = Trim(cnpj);
	
	erro = new String;
	
	/*
	if (CNPJ.length < 18) erro += "É necessario preencher corretamente o número do CNPJ! "; 
	if ((CNPJ.charAt(2) != ".") || (CNPJ.charAt(6) != ".") || (CNPJ.charAt(10) != "/") || (CNPJ.charAt(15) != "-")){
	if (erro.length == 0) erro += "É necessário preencher corretamente o número do CNPJ! ";
	}
	//substituir os caracteres que não são números
	if(document.layers && parseInt(navigator.appVersion) == 4){
			x = CNPJ.substring(0,2);
			x += CNPJ. substring (3,6);
			x += CNPJ. substring (7,10);
			x += CNPJ. substring (11,15);
			x += CNPJ. substring (16,18);
			CNPJ = x; 
	} else {
			CNPJ = CNPJ. replace (".","");
			CNPJ = CNPJ. replace (".","");
			CNPJ = CNPJ. replace ("-","");
			CNPJ = CNPJ. replace ("/","");
	}
	*/
	
	CNPJ = CNPJ. replace (".","");
	CNPJ = CNPJ. replace (".","");
	CNPJ = CNPJ. replace ("-","");
	CNPJ = CNPJ. replace ("/","");
			
			
	var nonNumbers = /\D/;
	if (nonNumbers.test(CNPJ)) erro += "A verificação de CNPJ suporta apenas números! "; 
	var a = [];
	var b = new Number;
	var c = [6,5,4,3,2,9,8,7,6,5,4,3,2];
	for (i=0; i<12; i++)
	{
			a[i] = CNPJ.charAt(i);
			b += a[i] * c[i+1];
	}
	if ((x = b % 11) < 2) { a[12] = 0 } else { a[12] = 11-x }
	b = 0;
	for (y=0; y<13; y++) {
			b += (a[y] * c[y]); 
	}
	if ((x = b % 11) < 2) { a[13] = 0; } else { a[13] = 11-x; }
	if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt(13) != a[13])){
			erro +="Dígito verificador com problema!";
	}
	
	if (erro.length > 0)
	{
		//alert("Numero de CNPJ invalido!");
		retorno = false;
	}
				
    return retorno;				
}

function ValidaSenha(senha)
{
	var retorno = true;

	var filter=/((\w)|([@#$%^&+=])){6,}$/i; 
		
	if (!filter.test(senha)) 
	{
		retorno = false;
	}

	return retorno;
}


function Mascara(src, mask) 
{
     var i = src.value.length;
     var saida = mask.substring(0,1);
     var texto = mask.substring(i)
     if (texto.substring(0,1) != saida) 
     {
          src.value += texto.substring (0,1);
     }
}

function ValidaData(dia, mes, ano)
{
	retorno = true;
		
	/* foi encontrado um bug no javascript (IE 6 e Firefox 2) na execucção
	   de parseInt com a string '08' retornando 0.   */
    
	dia = Number(dia);
	mes = Number(mes);
	ano = Number(ano);    

	if(Trim(dia.toString()) == 'NaN' || Trim(mes.toString()) == 'NaN' || Trim(ano.toString()) == 'NaN')
	{
		return false;
	}
	
	if(ano < 1900)
	{
		return false;
	}
	
	switch (mes) 
    {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
        {
            if  (dia > 31) 
            {
                retorno = false;
            }
            break
        }
        
        case 4:        
        case 6:
        case 9:
        case 11:
        {
            if  (dia > 30) 
            {
            
                retorno = false;
            }
            break
        }
        case 2:
        {
			var bissexto = 0;
            /* Validando ano Bissexto / fevereiro / dia */
            if ((ano % 4 == 0) || (ano % 100 == 0) || (ano % 400 == 0)) 
            { 
                bissexto = 1; 
            } 
            if ((bissexto == 1) && (dia > 29)) 
            { 
                retorno = false;;                 
            } 
            if ((bissexto != 1) && (dia > 28)) 
            { 
                retorno = false; 
            }            
            break                      
		}
		default:
		{
			retorno = false;
			break;
		}
    }

   	return retorno;
}


function ColocaFocoEm(NomeObj, e) 
{ 
	try
	{
		var key; 
		if(window.event) 
		{ 
			key = event.keyCode; 
		}
		else
		{ 
			key = e.which; 
		}
		if(key == 13)
		{
			document.getElementById(NomeObj).focus();
			event.keyCode = 0;
		}
	} 
	catch(err)
	{
		alert(err.description);
	}
	
	return false;
} 

/* Ajax */
function CarregaEndereco(campo)
{
	var CEP = campo.replace("-","");
//	TrocaImagem("loading", "visible");
	
	if(Number(CEP).toString() != 'NaN')
	{
		formcadastro.CarregaEndereco(CEP, CarregaEndereco_CallBack);
	}
}

function CarregaEndereco_CallBack(response)
{
    if(document.getElementById("formcadastro_hdnEndereco"))
    {
        var cep         = document.getElementById("formcadastro_txtCep");
        var endereco    = document.getElementById("formcadastro_txtEndereco");
        var enderecoHdl = document.getElementById("formcadastro_hdnEndereco");
        var bairro      = document.getElementById("formcadastro_txtBairro");
        var cidade      = document.getElementById("formcadastro_txtCidade");
        var cidadeHdl   = document.getElementById("formcadastro_hdnCidade");
        var estado      = document.getElementById("formcadastro_ddlEstado");
        var estadoHdl   = document.getElementById("formcadastro_hdnEstado");
    }
    else
    {
        var cep         = document.getElementById("FormAfiliado_txtCep");
        var endereco    = document.getElementById("FormAfiliado_txtEndereco");
        var enderecoHdl = document.getElementById("FormAfiliado_hdnEndereco");
        var bairro      = document.getElementById("FormAfiliado_txtBairro");
        var cidade      = document.getElementById("FormAfiliado_txtCidade");
        var cidadeHdl   = document.getElementById("FormAfiliado_hdnCidade");
        var estado      = document.getElementById("FormAfiliado_ddlEstado");
        var estadoHdl   = document.getElementById("FormAfiliado_hdnEstado");		        
    }
		    
	if(!response.error)
	{
		var retorno = response.value;
		
		if(retorno[4])
		{
			var Cep = cep.value;
			
			if(Cep.indexOf("-") == -1)
			{
				Cep = Cep.substr(0,5) + "-" + Cep.substr(5,3);
			}
			
			cep.value		= Cep;
			
			if (retorno[1])
			{
				endereco.value	= retorno[1];
				
				// Campo Hidden para controlar endereço
				enderecoHdl.value = retorno[1];
			}
			else
			{
				endereco.value	= "";
				
				// Campo Hidden para controlar endereço
				enderecoHdl.value = "";
			}
			
			if (retorno[2])
			{
				bairro.value		= retorno[2];
			}
			else
			{
				bairro.value		= "";
			}
			
			if (retorno[3])
			{
				cidade.value		= retorno[3];
				
				// Campo Hidden para controlar cidade
				cidadeHdl.value = retorno[3];
			}
			else
			{
				cidade.value		= "";
				
				// Campo Hidden para controlar cidade
				cidadeHdl.value = "";
			}
			
			if (retorno[4])
			{
				estado.value		= retorno[4];
				
				// Campo Hidden para controlar estado
				estadoHdl.value = retorno[4];
			}
			else
			{
				estado.value		= "SP";
				
				// Campo Hidden para controlar estado
				estadoHdl.value = "SP";
			}
			
			// Caso endereço seja preenchido, esconde mensagem de erro e muda cor de borda para normal
			if (endereco)
			{
			    VerificaPreenchimentoEndereco(endereco);
			}
			
			if (bairro)
			{
			    VerificaPreenchimentoBairro(bairro);
			}
			
			if (cidade)
			{
			    VerificaPreenchimentoCidade(cidade);
			}
			
			// Desabilita ou habilita campos, dependendo do retorno do Ajax
			/*
			if (retorno[1] != "")
            {
               endereco.disabled = true;
            }
            else
            {
                endereco.disabled = false;
            }
            
            if (retorno[3] != "")
            {
                cidade.disabled = true;
            }
            else
            {
                cidade.disabled = false;
            }
            
            if (retorno[4] != "")
            {
                estado.disabled = true;
            }
            else
            {
                estado.disabled = false;
            }*/
		}
		else
		{
			endereco.value	    = "";
			bairro.value		= "";
			cidade.value		= "";
			estado.value		= "SP";
			
			// Campo Hidden para controlar endereço
			enderecoHdl.value = "";
			
			// Campo Hidden para controlar cidade
			cidadeHdl.value = "";
			
			// Campo Hidden para controlar estado
			estadoHdl.value = "SP";
			
			// Desabilita campos que não vieram carregados do Ajax
			endereco.disabled = false;
			
			cidade.disabled = false;
			
			estado.disabled = false;
		}
	}
	else
	{
		alert(response.error);
	}
	//TrocaImagem("loading", "hidden");
}

		

