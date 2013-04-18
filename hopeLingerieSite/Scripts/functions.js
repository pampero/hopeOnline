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

function valida()
{
  	var argv = valida.arguments;
	formname = argv[0];
	var elm = document.forms[formname].elements;
    	
  	for (i=0;i<elm.length;i++) {

		if(elm[i].name == "receba_novidades"){
			
			if(document.forms[formname].receba_novidades.value.indexOf("@") == -1 || document.forms[formname].receba_novidades.value.indexOf(".") == -1){
				alert("Ingrese Email");return false;
			}

		}else if(elm[i].name == "FranchiseCityId"){
			if(document.forms[formname].FranchiseCityId.selectedIndex == 0){
				alert("Elija una ciudad");return false;
			}

		}else if(elm[i].name == "FirstName"){
			if(document.forms[formname].FirstName.value == ""){
				alert("Ingrese Nombre ");return false;
			}

		}else if(elm[i].name == "LastName"){
			if(document.forms[formname].LastName.value == ""){
				alert("Ingrese Apellido");return false;
			}

		}else if(elm[i].name == "BirthDate"){
			var valor = document.forms[formname].BirthDate.value.replace( /[- -/._]/g, "")
			
			if(valor.length != 8 || isNaN(valor)){
				alert("Ingrese fecha de nacimiento en formato dd/mm/aaaa");return false;
			}
			
		}else if(elm[i].name == "Address"){
			if(document.forms[formname].Address.value == ""){
				alert("Ingrese Dirección");return false;
			}

		}else if(elm[i].name == "City"){
			if(document.forms[formname].City.value == ""){
				alert("Ingrese Ciudad");return false;
			}

		}else if(elm[i].name == "StateId"){
			if(document.forms[formname].StateId.value == ""){
				alert("Ingrese Estado");return false;
			}
        }else if(elm[i].name == "ZipCode"){
			if(document.forms[formname].ZipCode.value == ""){
				alert("Ingrese Código Postal");return false;
			}
        }else if(elm[i].name == "Telephone1"){
			if(document.forms[formname].Telephone1.value == ""){
				alert("Ingrese Teléfono Recidencial");return false;
			}
		}else if(elm[i].name == "Email"){
			
			if(document.forms[formname].Email.value.indexOf("@") == -1 || document.forms[formname].Email.value.indexOf(".") == -1){
				alert("Ingrese Email");return false;
			}

		}else if(elm[i].name == "How"){
			if(document.forms[formname].How.value == ""){
				alert("Responda a pregunta \"Como tomó conocimiento de la franquicia?\"");return false;
			}

		}else if(elm[i].name == "When"){
			if(document.forms[formname].When.value == ""){
				alert("Responda a la pregunta \"Cuando pretende iniciar sus actividades?\"");return false;
			}

		}else if(elm[i].name == "InvestmentMoney"){
			if(document.forms[formname].InvestmentMoney.value == ""){
				alert("Responda a la pregunta \"Cuál es su capital de inversión?\"");return false;
			}

		}else if(elm[i].name == "Why"){
			if(document.forms[formname].Why.value == ""){
				alert("Responda a la pregunta \"Por qué desea abrir una franquicia HOPE?\"");return false;
			}

		}else if(elm[i].name == "assumo"){
			if(!document.forms[formname].assumo.checked){
				alert("Marque al opción \"Asumo total responsabilidad por la veracidad de la información ingresada\"");return false;
			}
			
		}
	}

    alert("Tu mensaje ha sido enviado correctamente. Muchas Gracias.");
	return true;
}