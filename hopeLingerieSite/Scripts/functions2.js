function pos_blocos(){
	
	w_wid = document.body.clientWidth;
	w_hig = document.body.clientHeight;
	fator = w_wid/w_hig;
	
	proporcao = 1.6666; // equivalente a 5/3
	min_wid = 1000;
	min_hig = min_wid / proporcao;
	
	d_wid = w_wid;
	d_hig = w_hig;	
		
	if(w_hig > min_hig && w_wid > min_wid){
		// janela maior que o mínimo
		if(fator < proporcao){
			// janela mais alta que larga ---- mostra a foto completa na altura e corta os costados
			f_hig = w_hig;
			f_wid = w_hig * proporcao;
		}else{
			// janela mais larga que alta ---- mostra a foto completa na largura e corta acima e embaixo
			f_wid = w_wid;
			f_hig = w_wid / proporcao;
		}
		// corta o topo
		f_top = ((f_hig - w_hig) / 2)*-1;
		// corta o costado izquerdo
		f_left = ((f_wid - w_wid) / 2)*-1;
	}else{
		// janela menor que o mínimo na largura ou altura
		if(fator < proporcao){
			// janela mais alta que larga
			if(w_hig < min_hig){
				d_wid = min_wid;
				f_wid = min_wid;
				d_hig = min_hig;
				f_hig = min_hig;
				f_top = 0;
				f_left = 0;
			}else{
				f_hig = w_hig;
				f_wid = w_hig * proporcao;
				
				d_wid = min_wid;
				d_hig = w_hig;
				
				f_top = 0;
				f_left = ((f_wid - d_wid) / 2)*-1;
			}
		}else{
			// janela mais larga que alta
			if(w_wid < min_wid){
				d_wid = min_wid;
				f_wid = min_wid;
				d_hig = min_hig;
				f_hig = min_hig;
				f_top = 0;
				f_left = 0;
			}else{
				f_wid = w_wid;
				f_hig = w_wid / proporcao;
				
				d_wid = w_wid;
				d_hig = min_hig;
				
				f_top = ((f_hig - d_hig) / 2)*-1;
				f_left = 0;
			}
		}
	}
	
	document.getElementById("div_fundo").style.width = d_wid + "px"
	document.getElementById("div_fundo").style.height = d_hig + "px"
	
	document.getElementById("img_fundo").style.width = f_wid + "px"
	document.getElementById("img_fundo").style.height = f_hig + "px"
	
	document.getElementById("img_fundo").style.top = f_top + "px"
	document.getElementById("img_fundo").style.left = f_left + "px"
	
	//-------------
	
	document.getElementById("hope").style.top = parseInt((d_hig/2)-42) + "px"
	document.getElementById("hope").style.left = "10px"
	
	document.getElementById("numero").style.top = "20px"
	document.getElementById("numero").style.left = parseInt((d_wid/2) + 10) + "px"
	
	document.getElementById("news").style.top = "20px"
	document.getElementById("news").style.left = parseInt(d_wid - 280) + "px"

	document.getElementById("texto").style.top = "60px"
	document.getElementById("texto").style.left = parseInt(d_wid - 240) + "px"
	
	document.getElementById("grafico").style.top = "180px"
	document.getElementById("grafico").style.left = parseInt(d_wid - 490) + "px"
	
	document.getElementById("setahome").style.top = parseInt(d_hig/1.8) + "px"
	document.getElementById("setahome").style.left = parseInt(d_wid/1.1) + "px"
	
	document.getElementById("video").style.top = parseInt((d_hig/2)-160) + "px"
	document.getElementById("video").style.left = parseInt((d_wid/2)-303) + "px"
}

function desfuma(t){
	trnsArray = Array("tr_000","tr_005","tr_010","tr_015","tr_020","tr_025","tr_030","tr_035","tr_040","tr_045","tr_050","tr_055","tr_060","tr_065","tr_070","tr_075","tr_080","tr_085","tr_090","tr_095","tr_100")
    document.getElementById("img_fundo").className = trnsArray[t]
    if(t < 20){
		t = t + 1;setTimeout("desfuma("+t+")",50);
	}else{
		document.getElementById("conteudo").style.display = "block"
	}
}

function fechavideo(){
    document.getElementById("video").style.display = "none"
}


window.onload = function(){pos_blocos();desfuma(0);}
window.onresize = function(){pos_blocos();}



function formatadata(frm,campo,value){
	interval = value.replace( /[/\-._-]/g, "")
	novoval = interval
	if(interval.length > 2){novoval = interval.substring(0,2) + "/" + interval.substring(2,4);}
	if(interval.length > 4){novoval = novoval + "/" + interval.substring(4,8);}
	document.forms[frm].elements[campo].value = novoval;
}

function formatafone(frm,campo,value){
	interval = value.replace( /[/\-._-]/g, "")
	novoval = interval
	if(interval.length > 2){novoval = interval.substring(0,2) + "-" + interval.substring(2,10);}
	document.forms[frm].elements[campo].value = novoval
}

function formatacep(frm,campo,value){
	interval = value.replace( /[/\-._-]/g, "")
	novoval = interval
	if(interval.length > 5){novoval = interval.substring(0,5) + "-" + interval.substring(5,8);}
	document.forms[frm].elements[campo].value = novoval
}

function formatacpf(frm,campo,value){
	interval = value.replace( /[/\-._-]/g, "")
	novoval = interval
	if(interval.length > 9){novoval = interval.substring(0,9) + "-" + interval.substring(9,11);}
	document.forms[frm].elements[campo].value = novoval
}

function valida(){
  	var argv = valida.arguments;
	formname = argv[0];
	var elm = document.forms[formname].elements;
	
  	for (i=0;i<elm.length;i++) {
		if(elm[i].name == "receba_novidades"){
			
			if(document.forms[formname].receba_novidades.value.indexOf("@") == -1 || document.forms[formname].receba_novidades.value.indexOf(".") == -1){
				alert("Escriba corretamente su email");return false;
			}

		}else if(elm[i].name == "franquia"){
			if(document.forms[formname].franquia.selectedIndex == 0){
				alert("Escoja una cidad");return false;
			}

		}else if(elm[i].name == "nome"){
			if(document.forms[formname].nome.value == ""){
				alert("Escriba seu nombre");return false;
			}

		}else if(elm[i].name == "sobrenome"){
			if(document.forms[formname].sobrenome.value == ""){
				alert("Escriba su sobrenombre");return false;
			}

		}else if(elm[i].name == "niver"){
			var valor = document.forms[formname].niver.value.replace( /[- -/._]/g, "")
			
			if(valor.length != 8 || isNaN(valor)){
				alert("Digite sua data de nascimento no formato dd/mm/aaaa");return false;
			}
			
		}else if(elm[i].name == "cpf"){

			var campo_cpf = document.forms[formname].cpf.value.replace( /[- -/._]/g, "")
			
			if(campo_cpf.length != 11 || campo_cpf == "00000000000" || campo_cpf == "11111111111" || campo_cpf == "22222222222" ||	campo_cpf == "33333333333" || campo_cpf == "44444444444" || campo_cpf == "55555555555" || campo_cpf == "66666666666" || campo_cpf == "77777777777" || campo_cpf == "88888888888" || campo_cpf == "99999999999" || isNaN(campo_cpf)){
				alert("Escreva seu CPF corretamente");return false;
			}

		}else if(elm[i].name == "endereco"){
			if(document.forms[formname].endereco.value == ""){
				alert("Digite seu endereço");return false;
			}

		}else if(elm[i].name == "bairro"){
			if(document.forms[formname].bairro.value == ""){
				alert("Escreva seu bairro");return false;
			}

		}else if(elm[i].name == "cidade"){
			if(document.forms[formname].cidade.value == ""){
				alert("Escreva sua cidade");return false;
			}

		}else if(elm[i].name == "estado"){
			if(document.forms[formname].estado.value == ""){
				alert("seleccione seu estado");return false;
			}

		}else if(elm[i].name == "cep"){
			
			var campo_cep = document.forms[formname].cep.value.replace( /[- -/._]/g, "")
			
			if(campo_cep.length != 8 || campo_cep == "00000000" || campo_cep == "11111111" || campo_cep == "22222222" ||	campo_cep == "33333333" || campo_cep == "44444444" || campo_cep == "55555555" || campo_cep == "66666666" || campo_cep == "77777777" || campo_cep == "88888888" || campo_cep == "99999999" || isNaN(campo_cep)){
				alert("Digite corretamente sua CEP");return false;
			}
/* -------------------------------------------------------------------------------------------

		}else if(elm[i].name == "tel_res"){
			
			var valor = document.forms[formname].tel_res.value.replace( /[- -/._]/g, "")
			
			if(valor.length != 10 || valor == "0000000000" || valor == "1111111111" || valor == "2222222222" || valor == "3333333333" || valor == "4444444444" || valor == "5555555555" || valor == "6666666666" || valor == "7777777777" || valor == "8888888888" || valor == "9999999999" || isNaN(valor)){
				alert("Digite o número de seu telefone residencial");return false;
			}

		}else if(elm[i].name == "tel_com"){
			var valor = document.forms[formname].tel_com.value.replace( /[- -/._]/g, "")
			
			if(valor.length != 10 || valor == "0000000000" || valor == "1111111111" || valor == "2222222222" || valor == "3333333333" || valor == "4444444444" || valor == "5555555555" || valor == "6666666666" || valor == "7777777777" || valor == "8888888888" || valor == "9999999999" || isNaN(valor)){
				alert("Digite o número de seu telefone commercial");return false;
			}

		}else if(elm[i].name == "tel_cel"){
			var valor = document.forms[formname].tel_cel.value.replace( /[- -/._]/g, "")
			
			if(valor.length != 10 || valor == "0000000000" || valor == "1111111111" || valor == "2222222222" || valor == "3333333333" || valor == "4444444444" || valor == "5555555555" || valor == "6666666666" || valor == "7777777777" || valor == "8888888888" || valor == "9999999999" || isNaN(valor)){
				alert("Digite o número de seu telefone celular");return false;
			}
-------------------------------------------------------------------------------------------- */
		}else if(elm[i].name == "email"){
			
			if(document.forms[formname].email.value.indexOf("@") == -1 || document.forms[formname].email.value.indexOf(".") == -1){
				alert("Escreva corretamente seu email");return false;
			}

		}else if(elm[i].name == "como"){
			if(document.forms[formname].como.value == ""){
				alert("Responda a pregunta \"Como tomou conhecimento da franquia?\"");return false;
			}

		}else if(elm[i].name == "quando"){
			if(document.forms[formname].quando.value == ""){
				alert("Responda a pregunta \"Quando pretende iniciar suas atividades?\"");return false;
			}

		}else if(elm[i].name == "qual"){
			if(document.forms[formname].qual.value == ""){
				alert("Responda a pregunta \"Qual o seu capital para o investimento?\"");return false;
			}

		}else if(elm[i].name == "porque"){
			if(document.forms[formname].porque.value == ""){
				alert("Responda a pregunta \"Porque deseja abrir uma franquia HOPE?\"");return false;
			}

		}else if(elm[i].name == "assumo"){
			if(!document.forms[formname].assumo.checked){
				alert("Marque a opção \"Assumo total responsabilidade pela veracidade das informações prestadas\"");return false;
			}
			
		}else if(elm[i].name == "capcha"){
			if(document.forms[formname].capcha.value == ""){
				alert("Repita os caracteres de validação");return false;
			}
		}
	}
	return true;
}