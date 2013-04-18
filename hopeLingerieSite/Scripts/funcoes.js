
function AvisoEscolhaOpcao() {
    alert("Por favor, escolha um tamanho1.");
}

function EscondeOrdenaPesquisa() {
    if (document.getElementById("ordena_produtos")) {
        document.getElementById("ordena_produtos").style.display = 'none';
    }
}

function ReceberOfertas() {
    var email = Trim(document.getElementById("txtRecebaOfertas").value);

    if (email == "") {
        alert("Por favor, preencha seu e-mail.");
        document.getElementById("txtRecebaOfertas").focus();
        return false;
    }
    else if (!ValidaEmail(email)) {
        alert("Email inválido!");
        document.getElementById("txtRecebaOfertas").focus();
        return false;
    }
    else {
        return true;
    }
}

function ReceberOfertas_callback(retorno) {
    try {
        if (retorno.error == null) {
            if (retorno.value == "0") {
                document.getElementById("txtRecebaOfertas").value = "";
                alert("Obrigado por se cadastrar. Em breve você receberá nossas novidades.");
            }
            else if (retorno.value == "1") {
                alert("Problemas na integração com o o Virtual Target.");
            }
            else if (retorno.value == "2") {
                alert("Email inválido!");
            }
            else {
                window.location.href = retorno.value;
            }
        }
        else {
            alert("erro : " + retorno.error.Message);
        }
        MostrarBotao(document.getElementById('btEnviarNewsletter'));
    }
    catch (ex) {
        alert(ex.description);
    }
}

function ValidaEmail(email) {
    var retorno = true;

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

    if (!filter.test(email)) {
        retorno = false;
    }

    return retorno;
}

function MudaBanner(nome, arrBanner, arrIndices, arrCont, arrPos) {
    for (iIMG = 0; iIMG < arrBanner.length; iIMG++) {
        var arrAux = arrBanner[iIMG];
        for (iInd = 0; iInd < arrAux.length; iInd++) {
            var indexIMG = arrIndices[iIMG];
            indexIMG = indexIMG + 1;
            if (indexIMG > (arrCont[iIMG] - 1)) {
                indexIMG = 0;
            }

            arrIndices[iIMG] = indexIMG;

            if (document.getElementById(nome + arrPos[iIMG].toString()) && arrAux[indexIMG].toString() != "") {
                var divBanner = document.getElementById(nome + arrPos[iIMG].toString());
                divBanner.innerHTML = arrAux[indexIMG].toString();
                divBanner.style.display = "block";
                break;
            }
        }
    }
}

function AlertaOpcaoUnica(nome, valor) {
    alert("opção única (" + nome + ": " + valor + ")");
}

//Ajustado para armazenar cor e tamanho
function ArmazenaOpcao(drpOrdem, drpValor, ProdutoCodigo, process, ordem_sku) {
    if (process == "I") {
        if (document.getElementById('DRP_SKU_1')) {
            document.getElementById('DRP_SKU_1').value = '0';
        }

        if (document.getElementById('DRP_SKU_2')) {
            document.getElementById('DRP_SKU_2').value = '0';
        }

        if (document.getElementById('DRP_SKU_3')) {
            document.getElementById('DRP_SKU_3').value = '0';
        }

        if (document.getElementById('DRP_SKU_4')) {
            document.getElementById('DRP_SKU_4').value = '0';
        }

        if (document.getElementById('DRP_SKU_5')) {
            document.getElementById('DRP_SKU_5').value = '0';
        }
    }

    campo = document.getElementById('DRP_SKU_' + drpOrdem);

    if (campo.value != drpValor) {
        if (document.getElementById('DRP_SKU_' + drpOrdem)) {
            campo.value = drpValor;
            DisponibilidadeSKU(campo, ProdutoCodigo, '', 'I', ordem_sku)
        }
    }
}

function VerificaEmailFaleConosco() {
    var spanMsgValidacao = document.getElementById('spanMsgValidacaoEmail');
    var campo = document.getElementById('txtEmail');

    if (Trim(campo.value) == '' || ValidaEmail(Trim(campo.value))) {
        spanMsgValidacao.innerHTML = '';
    }
    else {
        spanMsgValidacao.innerHTML = '« E-mail inválido';
    }
}

function VerificaTelefoneFaleConosco() {
    var spanMsgValidacao = document.getElementById('spanMsgValidacaoTelefone');
    var ddd = document.getElementById('txtDDD');
    var telefone = document.getElementById('txtTelefone');
    var retorno = '';

    if (Trim(ddd.value) == '' || (Number(Trim(ddd.value)).toString() != 'NaN' && Trim(ddd.value).length == 2)) {
        spanMsgValidacao.innerHTML = '';

        if (Trim(telefone.value).replace('-', '') == '' || Number(Trim(telefone.value).replace('-', '')).toString() != 'NaN') {
            if (Trim(ddd.value) != '' || Trim(telefone.value) != '') {
                if (Trim(ddd.value) == '' || Trim(telefone.value) == '' || Trim(telefone.value).replace('-', '').length < 7) {
                    spanMsgValidacao.innerHTML = '« Incompleto';
                    retorno = '« Incompleto';
                }
            }
        }
        else {
            spanMsgValidacao.innerHTML = '« Telefone inválido';
            retorno = '« Telefone inválido';
        }
    }
    else {
        if (Number(Trim(ddd.value)).toString() == 'NaN') {
            spanMsgValidacao.innerHTML = '« DDD inválido';
            retorno = '« DDD inválido';
        }
        else {
            spanMsgValidacao.innerHTML = '« DDD incompleto';
            retorno = '« DDD incompleto';
        }
    }
    return retorno;
}

function OcultaSelo() {
    if (document.getElementById("selo_container")) {
        document.getElementById("selo_container").style.display = 'none';
    }
}

function MostraSelo() {
    if (document.getElementById("selo_container")) {
        document.getElementById("selo_container").style.display = '';
    }
}

function carregaImgAux(oImg) {
    var o_ImgDetalheAux = document.getElementById("ProdutoImagemAux");
    o_ImgDetalheAux.src = oImg.src;
}

function AtivaCampo(campo) {
    campo.style.backgroundColor = '#e4e7f7'
}

function DesativaCampo(campo) {
    campo.style.backgroundColor = '#ffffff';
}

function ExcluirItem(ItemCodigo) {
    try {
        TrocaImagem("loading", "visible");

        if (confirm('Você tem certeza que deseja EXCLUIR este item da sua Cesta de Compras?')) {
            index.ExcluirItem(ItemCodigo, callback_ExcluirItem);
        }
        else {
            TrocaImagem("loading", "hidden");
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

/* Adicionar e Diminuir */

function AlteraQtdeItem(tipo, campo, qtde, qtdemax) {

    var mensagem = "";

    try {
        if (tipo != "" && campo != "" && qtde != "" && qtdemax != "") {
            var qtdeItem = parseInt(qtde, 10);

            if (tipo == 'Adicionar') {
                qtdeItem = qtdeItem + 1;
            }

            if (tipo == 'Remover') {
                if (parseInt(qtde) > 1) {
                    qtdeItem = qtdeItem - 1;
                }
                else {
                    mensagem += "Valor inválido - excede mínimo permitido (1) !\n";
                }
            }

            if (qtdeItem > qtdemax && qtdemax > 0) {
                mensagem += "Valor inválido - excede máximo permitido (" + qtdemax + ") !\n";
            }

            if (mensagem != "") {
                alert(mensagem);
                TrocaImagem("loading", "hidden");
            }
            else {
                index.AtualizaQtdeItem(campo.toString(), qtdeItem.toString(), AtualizaQtdeItem_callback);
            }
        }
        else {
            mensagem += "Erro ao alterar a quantidade!\n";
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_ExcluirItem(res) {
    if (res.error) {
        alert(res.error.Type + " : " + res.error.Message);
    }
    else if (res.value) {
        window.location.href = res.value;
    }
}

function PresenteItem(campo) {
    try {
        TrocaImagem("loading", "visible");
        index.PresenteItem(campo.value, campo.checked, callback_PresenteItem);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_PresenteItem(res) {
    if (res.error) {
        alert(res.error.Type + " : " + res.error.Message + "\n" + res.error.Stack + " : " + res.error.TargetSite);
    }
    else if (res.value) {
        window.location.href = res.value;
    }
}

function NaoExisteMeioPgto(URL) {
    alert('Nenhuma forma de pagamento disponível para o valor desse pedido!');
    window.location.href = URL;
}

function ResumoCesta() {
    try {
        TrocaImagem("loading", "visible");
        cabecalho.PublicaResumoCesta(callback_ResumoCesta);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_ResumoCesta(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value) {

        if (res.value[0]) {
            if (document.getElementById("itens_sacola")) {
                document.getElementById("itens_sacola").innerHTML = res.value[0];
            }
        }

        TrocaImagem("loading", "hidden");
    }
}

function Topo_Identifica() {
    try {
        TrocaImagem("loading", "visible");
        cabecalho.Identifica(callback_Topo_Identifica);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_Topo_Identifica(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value) {
        if (document.getElementById("identificacao")) {
            document.getElementById("identificacao").innerHTML = res.value;
        }

        TrocaImagem("loading", "hidden");
    }
}

function Topo_DataCompleta() {
    try {
        TrocaImagem("loading", "visible");
        cabecalho.RetornaDataCompleta(callback_Topo_DataCompleta);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_Topo_DataCompleta(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value) {
        if (document.getElementById("DataCompleta")) {
            document.getElementById("DataCompleta").innerHTML = res.value;
        }

        TrocaImagem("loading", "hidden");
    }
}

function ExcluiCookieLogin() {
    cabecalho.ExcluiCookieLogin(ExcluiCookieLogin_callback)
}

function ExcluiCookieLogin_callback(retorno) {
    try {
        if (retorno.error == null) {
            if (retorno.value) {
                window.location.href = retorno.value;
            }
        }
        else {
            alert("erro : " + retorno.error.Message);
        }
    }
    catch (ex) {
        alert(ex.description);
    }
}

function ValidaQtDigitosCartao(operadora, numeroCartao) {
    if (operadora == "1" && numeroCartao.length < 15) {
        return false;
    }
    else if (operadora == "6" && numeroCartao.length < 14) {
        return false;
    }
    else if (numeroCartao.length < 16 && operadora != "1" && operadora != "6") {
        return false;
    }
    return true;
}

/*************************************************************************\
CheckCardNumber(form)
function called when users click the "check" button.
\*************************************************************************/

function validaCartao() {
    var retorno = true;

    var CCval = document.getElementById("CartaoNumero").value;

    // check if credit card name has been entered
    if (arguments.IsValid) {
        if (CCval == "") {
            retorno = false;
        }
    }

    CCval = _strip_spaces(CCval);

    // check if credit card number is actually a number
    if (_isinteger(CCval) == false) {
        retorno = false;
    }
    if (retorno) {
        // check for 4242 4242 4242 4242
        if (CCval == "4242424242424242") {
            retorno = false;
        }
    }

    if (retorno) {
        //check that the credit card number is valid
        if (!CC_Validate(CCval)) {
            retorno = false;
        }
    }

    return retorno;
}

function _strip_spaces(_ipstr) {
    var _opstr = '';
    var i;
    for (i = 1; i <= _ipstr.length; i++) {
        if (_ipstr.substring(i - 1, i) != ' ') {
            _opstr = _opstr + _ipstr.substring(i - 1, i);
        }
    }
    return _opstr;
}


function _isinteger(test_string) {
    var i;
    var non_nums = 0;

    for (i = 1; i < test_string.length; i++) {
        if ((test_string.substring(i - 1, i) < '0') || (test_string.substring(i - 1, i) > '9')) {
            non_nums++;
        }
    }

    if (non_nums == 0)
        return true;
    else
        return false;
}


function CC_Validate(ccnumber) {
    var checksum = 0;
    var i;
    var digit;
    var temp;

    var cclength = ccnumber.length;
    if (cclength % 2 != 0) {
        cclength += 1;
        ccnumber = "0" + ccnumber;
    }

    for (i = 0; i < cclength; i++) {
        digit = parseInt(ccnumber.charAt(i), 10);
        if ((i % 2) == 0) {
            digit *= 2;
            if (digit > 9) {
                digit = parseInt(digit / 10, 10) + parseInt(digit % 10, 10);
            }
        }
        checksum += digit;
    }


    if (checksum % 10 == 0)
        return true;
    else
        return false;
}

function ExpandirTipo(j) {
    var Sinal = document.getElementById('TipoSinal' + j);
    var linhas = new Array();

    if (document.getElementById('Tipo' + j)) {
        while (document.getElementById('Tipo' + j) != null) {
            linhas.push(document.getElementById('Tipo' + j));
            document.getElementById('Tipo' + j).id = 'temporario';
        }
    }

    for (var i = 0; i < linhas.length; i++) {
        if (Sinal.innerHTML.toUpperCase() == '<B>+</B>') {
            linhas[i].style.display = '';
        }
        else {
            linhas[i].style.display = 'none';
        }
        linhas[i].id = 'Tipo' + j;
    }

    if (Sinal.innerHTML.toUpperCase() == '<B>+</B>') {
        Sinal.innerHTML = '<B>-</B>';
    }
    else {
        Sinal.innerHTML = '<B>+</B>';
    }
}


function RetirarComparador(ProdutoCodigo) {
    try {
        TrocaImagem("loading", "visible");

        if (confirm('Você tem certeza que deseja retirar este produto do Comparador?')) {
            comparar.RetirarComparador(ProdutoCodigo, callback_RetirarComparador);
        }
        else {
            TrocaImagem("loading", "hidden");
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_RetirarComparador(res) {
    if (res.error) {
        alert(res.error.Type + " : " + res.error.Message);
    }
    else if (res.value) {
        window.location.href = res.value;
    }
}

function AtualizaItem(ItemCodigo) {
    var prossegue = false;
    var Presente = document.getElementById("GiftTmp" + ItemCodigo).value;
    var MsgPresente = document.getElementById("MsgGift" + ItemCodigo).value;

    TrocaImagem("loading", "visible");
    if (Trim(Presente).length < 1) {
        if (confirm("Você deseja prosseguir sem preencher o campo de Mensagem?")) {
            prossegue = true;
        }
    }
    else {
        prossegue = true;
    }

    if (prossegue) {
        presente.AtualizaItem(ItemCodigo.toString(), Presente, MsgPresente, callback_AtualizaItem);
    }
}
function callback_AtualizaItem(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value) {
        alert(res.value);
        TrocaImagem("loading", "hidden");
    }
}

function Gift(ItemCodigo, valor) {
    document.getElementById("GiftTmp" + ItemCodigo).value = valor;
}

function ArmazenaParcelamento(campo) {
    if (campo.type == "radio") {
        if (campo.checked) {
            document.getElementById("ParcelamentoSel").value = campo.id;
            document.getElementById("ParcelamentoSelCod").value = campo.value;
        }
    }
}

function ValidaContaCorrente(campo) {
    if (campo.checked == false) {
        if (document.getElementById('TipoCco1') != null) {
            document.getElementById('TipoCco1').checked = false;
            document.getElementById('TipoCco1').disabled = true;
        }
        if (document.getElementById('TipoCco2') != null) {
            document.getElementById('TipoCco2').checked = false;
            document.getElementById('TipoCco2').disabled = true;
        }
        if (document.getElementById('TipoCco3') != null) {
            document.getElementById('TipoCco3').checked = false;
            document.getElementById('TipoCco3').disabled = true;
        }

        fechamento.ValidaContaCorrente(campo.checked, callback_ValidaContaCorrente)
    }
    else {
        if (document.getElementById('TipoCco1') != null) {
            document.getElementById('TipoCco1').disabled = false;
        }
        if (document.getElementById('TipoCco2') != null) {
            document.getElementById('TipoCco2').disabled = false;
        }
        if (document.getElementById('TipoCco3') != null) {
            document.getElementById('TipoCco3').disabled = false;
        }
    }
}

function callback_ValidaContaCorrente(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        window.location.href = window.location;
    }
    else {
        if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
            document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
            document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
            document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoCtC") != null) {
            document.getElementById("spanPagamentoEscolhidoCtC").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
            document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
            document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
        }

        for (j = 0; j < document.getElementsByTagName("input").length; j++) {
            campo = document.getElementsByTagName("input")[j];

            if (campo.type == "radio") {
                campo.checked = false;
                if (campo.id.indexOf("TipoCco") == -1) {
                    campo.disabled = false;
                }
            }
        }

        document.getElementById("OperadoraCodigo").value = "";
        document.getElementById("OperadoraTipo").value = "";
        document.getElementById("ParcelamentoSel").value = "";
        document.getElementById("ParcelamentoSelCod").value = "";

        IniciaFechamento();
    }
}

function ArmazenaContaCorrente(campo) {
    fechamento.ArmazenaContaCorrente(campo.value, callback_ArmazenaContaCorrente)
}

function callback_ArmazenaContaCorrente(res) {
    if (res.error) {
        //AlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value[0]) {
        if (res.value[0].indexOf("http://") > -1 || res.value[0].indexOf("https://") > -1) {
            document.location.href = res.value[0];
        }
        else {
            alert(res.value[0]);
        }
    }
    else {
        document.getElementById("spanPagamentoEscolhidoCtC").innerHTML = res.value[2];

        for (j = 0; j < document.getElementsByTagName("input").length; j++) {
            campo = document.getElementsByTagName("input")[j];

            if (campo.type == "radio" && campo.id.indexOf("TipoCco") == -1) {
                campo.checked = false;

                if (res.value[3]) {
                    campo.disabled = true;
                }
            }
        }
    }

    if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
        document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
    }

    if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
        document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
    }

    if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
        document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
    }

    if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
        document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
    }

    document.getElementById("OperadoraCodigo").value = "";
    document.getElementById("OperadoraTipo").value = "";
    document.getElementById("ParcelamentoSel").value = "";
    document.getElementById("ParcelamentoSelCod").value = "";

    if (!res.value[3]) {
        for (j = 0; j < document.getElementsByTagName("input").length; j++) {
            campo = document.getElementsByTagName("input")[j];

            if (campo.type == "radio" && campo.id.indexOf("TipoCco") == -1) {
                campo.disabled = false;
            }
        }
    }

    TrocaImagem("loading", "hidden");
}

function ValidaMeioPagamento(MeioCodigo) {
    TrocaImagem("loading", "visible");

    try {
        if (MeioCodigo.checked) {
            if (document.getElementById("OperadoraCodigo").value != MeioCodigo.value.substring(4)) {
                //Se foi escolhido Cartão Amex, Hipercard ou Dinners tratar quantidade de dígitos do cartão
                //***********************************************************************************
                if (MeioCodigo.value.substring(4) == "1") {
                    document.getElementById("CartaoNumero").maxLength = '15';
                    document.getElementById("CartaoNumero").onkeyup = function () {
                        if (this.value.length == 15) document.getElementById('CartaoCodigo').focus();
                    };

                    if (document.getElementById("CartaoNumero").value.length > 15) {
                        document.getElementById("CartaoNumero").value = document.getElementById("CartaoNumero").value.substring(0, 15);
                    }
                }
                else if (MeioCodigo.value.substring(4) == "7") {
                    document.getElementById("CartaoNumero").maxLength = '19';
                    document.getElementById("CartaoNumero").onkeyup = function () {
                        if (this.value.length == 19) document.getElementById('CartaoCodigo').focus();
                    };
                }
                else if (MeioCodigo.value.substring(4) == "6") {
                    document.getElementById("CartaoNumero").maxLength = '14';
                    document.getElementById("CartaoNumero").onkeyup = function () {
                        if (this.value.length == 14) document.getElementById('CartaoCodigo').focus();
                    };

                    if (document.getElementById("CartaoNumero").value.length > 14) {
                        document.getElementById("CartaoNumero").value = document.getElementById("CartaoNumero").value.substring(0, 14);
                    }
                }
                else {
                    if (document.getElementById("CartaoNumero") != null) {
                        document.getElementById("CartaoNumero").maxLength = '16';
                        document.getElementById("CartaoNumero").onkeyup = function () {
                            if (this.value.length == 16) document.getElementById('CartaoCodigo').focus();
                        };

                        if (document.getElementById("CartaoNumero").value.length > 16) {
                            document.getElementById("CartaoNumero").value = document.getElementById("CartaoNumero").value.substring(0, 16);
                        }
                    }
                }
                //***************************************************************************************

                //Trata quantidade de digitos no codigo de seguranca
                //***********************************************************************************
                if (document.getElementById("CartaoNumero")) {
                    if (MeioCodigo.value.substring(4) == "1") {
                        document.getElementById("CartaoCodigo").maxLength = '4';
                        document.getElementById("CartaoCodigo").onkeyup = function () {
                            if (this.value.length == 4) document.getElementById('CartaoNome').focus();
                        };
                    }
                    else {
                        document.getElementById("CartaoCodigo").maxLength = '3';
                        document.getElementById("CartaoCodigo").onkeyup = function () {
                            if (this.value.length == 3) document.getElementById('CartaoNome').focus();
                        };

                        if (document.getElementById("CartaoCodigo").value.length > 3) {
                            document.getElementById("CartaoCodigo").value = document.getElementById("CartaoCodigo").value.substring(0, 3);
                        }
                    }
                }
                //***************************************************************************************


                if (document.getElementById(MeioCodigo.value.substring(0, 3))) {
                    ValidaPagamento(document.getElementById(MeioCodigo.value.substring(0, 3)));
                }

                for (j = 0; j < document.getElementsByTagName("input").length; j++) {
                    campo = document.getElementsByTagName("input")[j];

                    if (campo.type == "radio") {
                        if (campo.value == MeioCodigo.value.substring(0, 3)) {
                            campo.checked = true;
                        }
                        if (campo.value.indexOf(MeioCodigo.value.substring(0, 3)) < 0 && campo.id.indexOf('TipoCco') == -1) {
                            campo.checked = false;
                        }
                    }
                }

                document.getElementById("ParcelamentoSel").value = "";
                document.getElementById("ParcelamentoSelCod").value = "";
                document.getElementById("OperadoraCodigo").value = MeioCodigo.value.substring(4);
                document.getElementById("OperadoraTipo").value = MeioCodigo.value.substring(0, 3);

                if (MeioCodigo.value.substring(0, 3) == "CCR") {
                    fechamento.ValidaMeioPagamento(MeioCodigo.value.substring(4), callback_ValidaMeioPagamento_CCR)
                }
                else if (MeioCodigo.value.substring(0, 3) == "BOL") {
                    document.getElementById("OperadoraTipo").value = "BOL";
                    fechamento.ValidaMeioPagamento(MeioCodigo.value.substring(4), callback_ValidaMeioPagamento_BOL)
                }
                else if (MeioCodigo.value.substring(0, 3) == "DEB") {
                    fechamento.ValidaMeioPagamento(MeioCodigo.value.substring(4), callback_ValidaMeioPagamento_DEB)
                }

                else if (MeioCodigo.value.substring(0, 3) == "PAY") {
                    document.getElementById("OperadoraTipo").value = "PAY";
                    fechamento.ValidaMeioPagamento(MeioCodigo.value.substring(4), callback_ValidaMeioPagamento_PAY)
                }
            }
            else {
                TrocaImagem("loading", "hidden");
            }
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_ValidaMeioPagamento_CCR(res) {
    if (res.error) {
        //AlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value[2]) {
        if (res.value[2].indexOf("http://") > -1 || res.value[2].indexOf("https://") > -1) {
            document.location.href = res.value[2];
        }
        else {
            if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
                document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
                document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
                document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
                document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
            }

            document.getElementById("OperadoraCodigo").value = "";
            document.getElementById("OperadoraTipo").value = "";
            document.getElementById("ParcelamentoSel").value = "";
            document.getElementById("ParcelamentoSelCod").value = "";
            document.getElementById("CCR_" + res.value[3]).checked = false;

            alert(res.value[2]);

            if (res.value[2] == 'Forma de pagamento indisponível!') {
                IniciaFechamento();
            }
        }
    }
    else {
        if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
            document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = res.value[0];
        }

        if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
            document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
            document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
            document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
        }

        if (res.value[1]) {
            var parcela = "";

            if (document.getElementById("ParcelamentoBase")) {
                document.getElementById("ParcelamentoBase").value = res.value[1];
            }

            if (document.getElementById("ParcelamentoSelBase").value != "") {
                if (document.getElementById("ParcelamentoSelBase").value.indexOf("_") >= 0) {
                    var campos = document.getElementById("ParcelamentoSelBase").value.split('_');

                    if (document.getElementById(res.value[1] + "_" + campos[1])) {
                        if (campos[1] != "1") {
                            parcela = campos[1];

                            document.getElementById(res.value[1] + "_" + parcela).checked = true;
                            ArmazenaParcelamento(document.getElementById(res.value[1] + "_" + parcela));
                        }
                    }
                }

                document.getElementById("ParcelamentoSelBase").value = "";
            }

            /*				
            if (document.getElementById(res.value[1] + "_" + parcela))
            {
            document.getElementById(res.value[1] + "_" + parcela).checked = true;
            ArmazenaParcelamento(document.getElementById(res.value[1] + "_" + parcela));
            }
            */
        }
    }
    TrocaImagem("loading", "hidden");
}

function callback_ValidaMeioPagamento_BOL(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value[2]) {
        if (res.value[2].indexOf("http://") > -1 || res.value[2].indexOf("https://") > -1) {
            document.location.href = res.value[2];
        }
        else {
            if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
                document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
                document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
                document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
                document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
            }

            document.getElementById("OperadoraCodigo").value = "";
            document.getElementById("OperadoraTipo").value = "";
            document.getElementById("ParcelamentoSel").value = "";
            document.getElementById("ParcelamentoSelCod").value = "";
            document.getElementById("BOL_" + res.value[3]).checked = false;

            alert(res.value[2]);

            if (res.value[2] == 'Forma de pagamento indisponível!') {
                IniciaFechamento();
            }
        }
    }
    else {
        if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
            document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
            document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = res.value[0];
        }

        if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
            document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
            document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
        }

        if (res.value[1]) {
            if (document.getElementById("ParcelamentoBase")) {
                document.getElementById("ParcelamentoBase").value = res.value[1];
            }

            /*var parcela = "";
				
            if (document.getElementById("ParcelamentoSelBase").value != "")
            {
            if(document.getElementById("ParcelamentoSelBase").value.indexOf("_") >= 0)
            {
            var campos = document.getElementById("ParcelamentoSelBase").value.split('_');
						
            if (document.getElementById(res.value[1] + "_" + campos[1]))
            {
            if (campos[1] != "1")
            {
            parcela = campos[1];

            document.getElementById(res.value[1] + "_" + parcela).checked = true;
            ArmazenaParcelamento(document.getElementById(res.value[1] + "_" + parcela));
            }
            }
            }

            document.getElementById("ParcelamentoSelBase").value = "";
            }*/


            if (document.getElementById(res.value[1] + "_1")) {
                document.getElementById(res.value[1] + "_1").checked = true;
                ArmazenaParcelamento(document.getElementById(res.value[1] + "_1"));
            }
        }
    }
    TrocaImagem("loading", "hidden");
}

function callback_ValidaMeioPagamento_DEB(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value[2]) {
        if (res.value[2].indexOf("http://") > -1 || res.value[2].indexOf("https://") > -1) {
            document.location.href = res.value[2];
        }
        else {
            if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
                document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
                document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
                document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
                document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
            }

            document.getElementById("OperadoraCodigo").value = "";
            document.getElementById("OperadoraTipo").value = "";
            document.getElementById("ParcelamentoSel").value = "";
            document.getElementById("ParcelamentoSelCod").value = "";
            document.getElementById("DEB_" + res.value[3]).checked = false;

            alert(res.value[2]);

            if (res.value[2] == 'Forma de pagamento indisponível!') {
                IniciaFechamento();
            }
        }
    }
    else {
        if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
            document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
            document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
            document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = res.value[0];
        }

        if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
            document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
        }

        if (res.value[1]) {
            if (document.getElementById("ParcelamentoBase")) {
                document.getElementById("ParcelamentoBase").value = res.value[1];
            }

            /*
            var parcela = "";
				
            if (document.getElementById("ParcelamentoSelBase").value != "")
            {
            if(document.getElementById("ParcelamentoSelBase").value.indexOf("_") >= 0)
            {
            var campos = document.getElementById("ParcelamentoSelBase").value.split('_');
						
            if (document.getElementById(res.value[1] + "_" + campos[1]))
            {
            if (campos[1] != "1")
            {
            parcela = campos[1];

            document.getElementById(res.value[1] + "_" + parcela).checked = true;
            ArmazenaParcelamento(document.getElementById(res.value[1] + "_" + parcela));
            }
            }
            }

            document.getElementById("ParcelamentoSelBase").value = "";
            }
            */

            if (document.getElementById(res.value[1] + "_1")) {
                document.getElementById(res.value[1] + "_1").checked = true;
                ArmazenaParcelamento(document.getElementById(res.value[1] + "_1"));
            }
        }
    }

    TrocaImagem("loading", "hidden");
}

function callback_ValidaMeioPagamento_PAY(res) {
    if (res.error) {
        jAlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value[2]) {
        if (res.value[2].indexOf("http://") > -1 || res.value[2].indexOf("https://") > -1) {
            document.location.href = res.value[2];
        }
        else {
            if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
                document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
                document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
                document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
            }

            if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
                document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
            }

            document.getElementById("OperadoraCodigo").value = "";
            document.getElementById("OperadoraTipo").value = "";
            document.getElementById("ParcelamentoSel").value = "";
            document.getElementById("ParcelamentoSelCod").value = "";
            document.getElementById("PAY_" + res.value[3]).checked = false;

            jAlert(res.value[2]);

            if (res.value[2] == 'Forma de pagamento indisponível!') {
                IniciaFechamento();
            }
        }
    }
    else {
        if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
            document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
            document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = ""
        }

        if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
            document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
        }

        if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
            document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = res.value[0];
        }

        if (res.value[1]) {
            if (document.getElementById("ParcelamentoBase")) {
                document.getElementById("ParcelamentoBase").value = res.value[1];
            }

            /*var parcela = "";
				
            if (document.getElementById("ParcelamentoSelBase").value != "")
            {
            if(document.getElementById("ParcelamentoSelBase").value.indexOf("_") >= 0)
            {
            var campos = document.getElementById("ParcelamentoSelBase").value.split('_');
						
            if (document.getElementById(res.value[1] + "_" + campos[1]))
            {
            if (campos[1] != "1")
            {
            parcela = campos[1];

            document.getElementById(res.value[1] + "_" + parcela).checked = true;
            ArmazenaParcelamento(document.getElementById(res.value[1] + "_" + parcela));
            }
            }
            }

            document.getElementById("ParcelamentoSelBase").value = "";
            }*/


            if (document.getElementById(res.value[1] + "_1")) {
                document.getElementById(res.value[1] + "_1").checked = true;
                ArmazenaParcelamento(document.getElementById(res.value[1] + "_1"));
            }
        }
    }
    TrocaImagem("loading", "hidden");
}

function ValidaPagamento(FormaCodigo) {
    if (FormaCodigo.checked) {
        var carrega = false;
        var MeioCodigo = 0;

        for (j = 0; j < document.getElementsByTagName("input").length; j++) {
            campo = document.getElementsByTagName("input")[j];

            if (campo.type == "radio") {
                if (campo.value.indexOf(FormaCodigo.value) < 0 && campo.id.indexOf('TipoCco') == -1) {
                    campo.checked = false;
                }
            }
        }

        if (FormaCodigo.value == "CCR") {
            if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
                document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
                document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
                document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
            }
        }
        else if (FormaCodigo.value == "BOL") {
            if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
                document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
                document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
                document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
            }
        }
        else if (FormaCodigo.value == "DEB") {
            if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
                document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
                document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoPAY") != null) {
                document.getElementById("spanPagamentoEscolhidoPAY").innerHTML = "";
            }
        }
        else if (FormaCodigo.value == "PAY") {
            if (document.getElementById("spanPagamentoEscolhidoCCR") != null) {
                document.getElementById("spanPagamentoEscolhidoCCR").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoBOL") != null) {
                document.getElementById("spanPagamentoEscolhidoBOL").innerHTML = "";
            }
            if (document.getElementById("spanPagamentoEscolhidoDEB") != null) {
                document.getElementById("spanPagamentoEscolhidoDEB").innerHTML = "";
            }
        }

        document.getElementById("ParcelamentoSelBase").value = document.getElementById("ParcelamentoSel").value;

        document.getElementById("ParcelamentoSel").value = "";
        document.getElementById("ParcelamentoSelCod").value = "";
        document.getElementById("OperadoraTipo").value = FormaCodigo.value;
        document.getElementById("OperadoraCodigo").value = "";

        TrocaImagem("loading", "hidden");

        //window.location.href = "#p";
    }
}

function positionit() {
    var ie = document.all && navigator.userAgent.indexOf("Opera") == -1;
    var loading_obj = ie ? document.all.loading : document.getElementById ? document.getElementById("loading_div") : document.loading;

    var Hoffset = 82 //Enter logo's offset from right edge of window (edit only if you don't like the default offset)
    var Voffset = -4 //Enter logo's offset from top edge of window (edit only if you don't like the default offset)

    var dsocleft = ie ? document.body.scrollLeft : pageXOffset;
    var dsoctop = ie ? document.body.scrollTop : pageYOffset;
    var window_width = ie ? document.body.clientWidth : window.innerWidth - 25;

    if (ie || document.getElementById) {
        loading_obj.style.left = parseInt(dsocleft) + parseInt(window_width) - Hoffset;
        loading_obj.style.top = parseInt(dsoctop) + 5 + Voffset;
    }
    else if (document.layers) {
        loading_obj.left = dsocleft + window_width - Hoffset;
        loading_obj.top = dsoctop + window_height + 5 + Voffset;
    }
}

function positionitOpiniao() {
    var ie = document.all && navigator.userAgent.indexOf("Opera") == -1;
    var opiniao_obj = ie ? document.all.opiniao : document.getElementById ? document.getElementById("opiniao_div") : document.opiniao;

    var Voffset = 196 //Enter logo's offset from top edge of window (edit only if you don't like the default offset)
    var Hoffset = 9 //Enter logo's offset from top edge of window (edit only if you don't like the default offset)

    var dsocleft = ie ? document.body.scrollLeft : pageXOffset;
    var dsoctop = ie ? document.body.scrollTop : pageYOffset;
    var window_width = ie ? document.body.clientWidth : window.innerWidth - 20;

    if (ie || document.getElementById) {
        opiniao_obj.style.left = Hoffset;
        opiniao_obj.style.top = parseInt(dsoctop) + Voffset + 2;
    }
    else if (document.layers) {
        opiniao_obj.left = Hoffset;
        opiniao_obj.top = dsoctop + Voffset;
    }
}

function beingloading() {
    loadinginterval = setInterval("positionit()", 50);
}

function beingOpiniao() {
    Opiniaointerval = setInterval("positionitOpiniao()", 50);
}

function ColocaFocus(NomeBtn, e) {
    try {
        var key;

        if (window.event) {
            key = window.event.keyCode;
        }
        else {
            key = e.which;
        }
        if (key == 13) {
            document.getElementById(NomeBtn).focus();

            if (window.event) {
                window.event.keyCode = 0;
            }
        }
    }
    catch (err) {
        alert(err.description);
    }

    return false;
}

/**
* SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
*
* SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
* http://www.opensource.org/licenses/mit-license.php
*
*/

function TrocaImagem(name, visibilidade) {
    try {
        if (document.getElementById(name)) {
            document.getElementById(name).style.visibility = visibilidade;
        }
    }
    catch (err) {
    }
}

function MostraImagemAmpliada() {
    //		var CarValCod1 = 0;
    //		var CarValCod2 = 0;
    //		var CarValCod3 = 0;
    //		var CarValCod4 = 0;
    //		var CarValCod5 = 0;

    //		try
    //		{
    //			if (document.getElementById("ImagemAmpliada"))
    //			{
    //				divs = document.getElementsByTagName("select");

    //				if (document.getElementById("ImagemAmpliada").style.visibility == "visible")
    //				{
    //					for (i=0;i<divs.length;i++)
    //					{
    //						if (divs[i].id.toLowerCase().indexOf("drp_sku_") >= 0)
    //						{
    //							divs[i].style.visibility = "visible";
    //						}
    //					}

    //					document.getElementById("ImagemAmpliada").style.visibility = "hidden";
    //				}
    //				else
    //				{
    //					for (i=0;i<divs.length;i++)
    //					{
    //						if (divs[i].id.toLowerCase().indexOf("drp_sku_") >= 0)
    //						{
    //							divs[i].style.visibility = "hidden";
    //						}
    //					}

    //					document.getElementById("ImagemAmpliada").style.visibility = "visible";
    //				}
    //			}
    //		}
    //		catch(err)
    //		{
    //		}
}

function CarregaListas(ProdutoCodigo) {
    try {
        TrocaImagem("loading", "visible");
        detalhes.CarregaListas(ProdutoCodigo, callback_CarregaListas)
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_CarregaListas(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value) {
        document.getElementById("FieldSetListas").innerHTML = res.value;
    }

    TrocaImagem("loading", "hidden");
}

function ProdutosVisitados(CategoriaCodigo, ProdutoCodigo) {
    try {
        detalhes.ProdutosVisitados(CategoriaCodigo, ProdutoCodigo, callback_ProdutosVisitados)
    }
    catch (err) {
        alert(err.description);
    }
}

function callback_ProdutosVisitados(res) {

    if (res.error) {
        AlertaErroAjax(res.error);
    }
}

function CarregaDadosUsuario() {
    try {
        TrocaImagem("loading", "visible");
        detalhes.CarregaDadosUsuario(callback_CarregaDadosUsuario)
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_CarregaDadosUsuario(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value[0]) {
        if (document.getElementById("txtNome") && document.getElementById("txtRemetente")) {
            document.getElementById("txtNome").value = res.value[0];
            document.getElementById("txtRemetente").value = res.value[0];
        }
    }

    if (res.value[1]) {
        if (document.getElementById("txtEmail") && document.getElementById("txtEmailRemetente")) {
            document.getElementById("txtEmail").value = res.value[1];
            document.getElementById("txtEmailRemetente").value = res.value[1];
        }
    }

    TrocaImagem("loading", "hidden");
}

function CarregaPrazoEntrega(ProCodigo) {
    try {
        TrocaImagem("loading", "visible");
        detalhes.CarregaPrazoEntrega(ProCodigo, callback_CarregaPrazoEntrega)
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_CarregaPrazoEntrega(res) {
    if (res.error) {
        //AlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value) {
        if (document.getElementById("pPrazoEntrega")) {
            document.getElementById("pPrazoEntrega").innerHTML = res.value;
        }
    }

    TrocaImagem("loading", "hidden");
}

function CarregaSKU(ProdutoCodigo) {
    try {
        TrocaImagem("loading", "visible");
        detalhes.CarregaSKU(ProdutoCodigo.toString(), callback_CarregaSKU)
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function CarregaSKUSelecaoAutomatica(ProdutoCodigo, SelecaoAutomatica) {
    try {
        TrocaImagem("loading", "visible");
        detalhes.CarregaSKUSelecaoAutomatica(ProdutoCodigo.toString(), SelecaoAutomatica, callback_CarregaSKU)
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function CarregaSKUCross(ProdutoCodigo, ordem, GruSelCodigo, iGruSellItensAux) {
    try {
        TrocaImagem("loading", "visible");
        detalhes.CarregaSKUCross(ProdutoCodigo.toString(), ordem.toString(), GruSelCodigo.toString(), iGruSellItensAux.toString(), callback_CarregaSKUCross);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function CarregaSKUBusca(ProdutoCodigo) {
    try {
        TrocaImagem("loading", "visible");
        busca.CarregaSKUBusca(ProdutoCodigo.toString(), callback_CarregaSKUBusca);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function CarregaSKUCategoria(ProdutoCodigo) {
    try {
        TrocaImagem("loading", "visible");
        categoria.CarregaSKUCategoria(ProdutoCodigo.toString(), callback_CarregaSKUBusca);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function CarregaSKUComparador(ProdutoCodigo) {
    try {
        TrocaImagem("loading", "visible");
        comparar.CarregaSKUComparador(ProdutoCodigo.toString(), callback_CarregaSKUBusca);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function CarregaSKUFabricante(ProdutoCodigo) {
    try {
        TrocaImagem("loading", "visible");
        fabricante.CarregaSKUFabricante(ProdutoCodigo.toString(), callback_CarregaSKUBusca);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_CarregaSKUCross(res) {
    if (res.error) {
        //AlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value) {
        if (res.value[5]) {
            window.location.href = res.value[5];
        }
        else {
            document.getElementById("spanSKU_Cross_" + res.value[0] + "_" + res.value[2] + "_" + res.value[3] + "_" + res.value[4]).innerHTML = res.value[1];

            for (j = 0; j < document.forms[0].elements.length; j++) {
                campo = document.forms[0].elements[j];

                if (campo.name) {
                    if (campo.name.indexOf("DRP_SKU_" + res.value[0] + "_") != -1) {
                        campo.disabled = false;
                    }
                }
            }
        }

        TrocaImagem("loading", "hidden");
    }
}

function callback_CarregaSKUBusca(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        //			window.location.href = window.location;
    }

    if (res.value) {
        document.getElementById("spanSKU_" + res.value[0]).innerHTML = res.value[1];

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU_" + res.value[0] + "_") != -1) {
                    campo.disabled = false;
                }
            }
        }

        TrocaImagem("loading", "hidden");
    }
}

//Ajustado para recuperar cor e tamanho
function callback_CarregaSKU(res) {

    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value) {
        if (res.value[0] && res.value[2]) {
            document.getElementById("spanSKU").innerHTML = res.value[0];
        }

        if (res.value[1]) {
            if (res.value[2]) {
                document.getElementById("spanSKUComprar").innerHTML = res.value[1];
                document.getElementById("indisponivel").innerHTML = "";
            }
            else {
                document.getElementById("indisponivel").innerHTML = res.value[1];
                document.getElementById("spanSKUComprar").innerHTML = "";
            }

        }
        else {
            document.getElementById("indisponivel").innerHTML = res.value[0];
            document.getElementById("spanSKUComprar").innerHTML = "";
        }

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU") != -1) {
                    campo.disabled = false;
                }
            }
        }

        /*if (document.getElementById("DRP_SKU_1") && document.getElementById("DRP_SKU_2"))
        {
        if (document.getElementById("DRP_SKU_1").value == "0" && document.getElementById("DRP_SKU_2").value == "0")
        {
        //Seleciona a primeira cor quando entra na página
        if (res.value[3] != "")
        {
        ArmazenaOpcao('1', res.value[4].toString(), res.value[3].toString(), 'C', '0');
        }
        }
        }
        else if (document.getElementById("DRP_SKU_1"))
        {
        if (document.getElementById("DRP_SKU_1").value == "0")
        {
        //Seleciona a primeira cor quando entra na página
        ArmazenaOpcao('1', res.value[5].toString(), res.value[3].toString(), 'C', '0');
        }
        }*/

        TrocaImagem("loading", "hidden");
    }
}


//Adicionado escolha de cor e tamanho automática
function DisponibilidadeSKU(campo, ProdutoCodigo, tipo, tipoEscolha, ordem_sku) {
    var mensagem = "";
    var aux = "";
    var aux2 = "";
    var aux3 = "";
    var extensao = "";
    var endereco = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    if (document.getElementById("btEscolhaOpcao")) {
        document.getElementById("btEscolhaOpcao").src = document.getElementById("btEscolhaOpcao").src.replace("bt_escolha_opcao", "bt_aguarde");
    }
    if (document.getElementById("btComprarProduto")) {
        document.getElementById("btComprarProduto").src = document.getElementById("btComprarProduto").src.replace("bt_comprar_produto", "bt_aguarde");
    }
    if (document.getElementById("btProdutoComprar")) {
        document.getElementById("btProdutoComprar").src = document.getElementById("btProdutoComprar").src.replace("bt_produto_indisp", "bt_aguarde");
    }

    try {
        if (tipoEscolha == "D") {
            if (ordem_sku == 0) // Caso seja selecionado o sku de Cor, limpa a seleção da sku Tamanho
            {
                CarValCod1 = (document.getElementById("DRP_SKU_1") ? document.getElementById("DRP_SKU_1").value : 0);
            }
            else {
                CarValCod1 = (document.getElementById("DRP_SKU_1") ? document.getElementById("DRP_SKU_1").options[document.getElementById("DRP_SKU_1").selectedIndex].value : 0);
                CarValCod2 = (document.getElementById("DRP_SKU_2") ? document.getElementById("DRP_SKU_2").options[document.getElementById("DRP_SKU_2").selectedIndex].value : 0);
                CarValCod3 = (document.getElementById("DRP_SKU_3") ? document.getElementById("DRP_SKU_3").options[document.getElementById("DRP_SKU_3").selectedIndex].value : 0);
                CarValCod4 = (document.getElementById("DRP_SKU_4") ? document.getElementById("DRP_SKU_4").options[document.getElementById("DRP_SKU_4").selectedIndex].value : 0);
                CarValCod5 = (document.getElementById("DRP_SKU_5") ? document.getElementById("DRP_SKU_5").options[document.getElementById("DRP_SKU_5").selectedIndex].value : 0);
            }

            if (campo.options[campo.selectedIndex].value == "") {
                mensagem += "Opção inválida (vazio) !\n";
            }
        }
        else if (tipoEscolha == "I") {
            if (ordem_sku == 0) // Caso seja selecionado o sku de Cor, limpa a seleção da sku Tamanho
            {
                CarValCod1 = (document.getElementById("DRP_SKU_1") ? document.getElementById("DRP_SKU_1").value : 0);
            }
            else {
                CarValCod1 = (document.getElementById("DRP_SKU_1") ? document.getElementById("DRP_SKU_1").value : 0);
                CarValCod2 = (document.getElementById("DRP_SKU_2") ? document.getElementById("DRP_SKU_2").value : 0);
                CarValCod3 = (document.getElementById("DRP_SKU_3") ? document.getElementById("DRP_SKU_3").value : 0);
                CarValCod4 = (document.getElementById("DRP_SKU_4") ? document.getElementById("DRP_SKU_4").value : 0);
                CarValCod5 = (document.getElementById("DRP_SKU_5") ? document.getElementById("DRP_SKU_5").value : 0);
            }

            if (campo.value == "") {
                mensagem += "Opção inválida (vazio) !\n";
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            detalhes.DisponibilidadeSKU(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), callback_DisponibilidadeSKU)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_DisponibilidadeSKU(res) {
    if (res.error) {
        alert(res.error)
        window.location.href = window.location;
    }

    if (res.value) {
        if (res.value[0][0]) {
            if (res.value[4]) {
                document.getElementById("indisponivel").innerHTML = res.value[0][0];
            }
            else {
                document.getElementById("spanSKUComprar").innerHTML = res.value[0][0];
            }
        }

        if (res.value[4]) {
            document.getElementById("indisponivel").style.display = 'block';
            document.getElementById("prices").style.display = 'none';
            document.getElementById("spanSKUComprar").style.display = 'none';
        }
        else {
            document.getElementById("indisponivel").style.display = 'none';
            document.getElementById("prices").style.display = 'block';
            document.getElementById("spanSKUComprar").style.display = 'block';

            if (document.getElementById("spanPreco")) {
                if (res.value[0][1] != "") {
                    document.getElementById("spanPreco").innerHTML = res.value[0][1];
                    document.getElementById("spanPreco").style.visibility = "visible";
                }
                else {
                    document.getElementById("spanPreco").innerHTML = res.value[0][1];
                    document.getElementById("spanPreco").style.visibility = "hidden";
                }
            }

            if (document.getElementById("spanPrecoPor")) {
                document.getElementById("spanPrecoPor").innerHTML = res.value[0][2];
            }

            if (document.getElementById("spanPrecoEconomize")) {
                if (res.value[0][3] != "") {
                    document.getElementById("spanPrecoEconomize").innerHTML = res.value[0][3];
                    document.getElementById("spanPrecoEconomize").style.visibility = "visible";
                }
                else {
                    document.getElementById("spanPrecoEconomize").innerHTML = res.value[0][3];
                    document.getElementById("spanPrecoEconomize").style.visibility = "hidden";
                }
            }

            if (document.getElementById("spanParcelamento1")) {
                document.getElementById("spanParcelamento1").innerHTML = res.value[0][4];
            }

            if (document.getElementById("spanParcelamento2")) {
                document.getElementById("spanParcelamento2").innerHTML = res.value[0][5];
            }

            if (res.value[0][6]) {
                if (document.getElementById("spanOutroParc")) {
                    document.getElementById("spanOutroParc").innerHTML = res.value[0][6];
                }
            }
        }

        /**********************************************************************/
        /*Seta imagens														  */
        /**********************************************************************/

        var imgs = document.getElementsByTagName("img");

        if (res.value[1][0]) {
            for (i = 0; i < imgs.length; i++) {
                if (imgs[i].name == "ProdutoImagem") {
                    imgs[i].src = res.value[1][0]
                    break;
                }
            }
        }

        if (res.value[1][2] && document.getElementById(res.value[1][3])) {
            document.getElementById(res.value[1][3]).src = res.value[1][2];
        }

        if (res.value[1][4]) {
            document.getElementById(res.value[1][5]).src = res.value[1][4];
            document.getElementById(res.value[1][5]).style.display = '';
        }
        else {
            document.getElementById(res.value[1][5]).style.display = 'none';
        }

        if (res.value[1][6]) {
            document.getElementById(res.value[1][7]).src = res.value[1][6];
            document.getElementById(res.value[1][7]).style.display = '';
        }
        else {
            document.getElementById(res.value[1][7]).style.display = 'none';
        }

        if (res.value[1][8]) {
            document.getElementById(res.value[1][9]).src = res.value[1][8];
            document.getElementById(res.value[1][9]).style.display = '';
        }
        else {
            document.getElementById(res.value[1][9]).style.display = 'none';
        }

        if (res.value[1][10]) {
            document.getElementById(res.value[1][11]).src = res.value[1][10];
            document.getElementById(res.value[1][11]).style.display = '';
        }
        else {
            document.getElementById(res.value[1][11]).style.display = 'none';
        }

        if (res.value[1][12]) {
            document.getElementById(res.value[1][13]).src = res.value[1][12];
            document.getElementById(res.value[1][13]).style.display = '';
        }
        else {
            document.getElementById(res.value[1][13]).style.display = 'none';
        }

        if (res.value[1][14]) {
            if (document.getElementById(res.value[1][15])) {
                document.getElementById(res.value[1][15]).src = res.value[1][14];
            }

            if (document.getElementById('ImagemAmpliadaAux')) {
                document.getElementById('ImagemAmpliadaAux').value = res.value[1][14];
            }
        }

        /**********************************************************************/
        /*Seta Selos														  */
        /**********************************************************************/

        if (res.value[2]) {
            document.getElementById('spanSelos').innerHTML = res.value[2];
            document.getElementById('spanOutros').style.display = "block";
        }
        else {
            document.getElementById('spanSelos').innerHTML = "";
            document.getElementById('spanOutros').style.display = "none";
        }

        /**********************************************************************/
        /*Opções de SKU Disponíveis
        /**********************************************************************/

        if (res.value[3]) {
            document.getElementById('spanSKU').innerHTML = res.value[3];
        }

        // *********************************************************************************
        // MODIFICADO
        // *********************************************************************************
        if (res.value[6] != "") {
            //Cor
            if (document.getElementById("span_NomeSKU_1")) {
                document.getElementById("span_NomeSKU_1").innerHTML = "(" + res.value[6] + ")";
            }
        }

        if (res.value[7] != "") {
            //Tamanho
            if (document.getElementById("span_NomeSKU_2")) {
                document.getElementById("span_NomeSKU_2").innerHTML = "(" + res.value[7] + ")";
            }
        }
        // *********************************************************************************

        for (i = 0; i < imgs.length; i++) {
            if (imgs[i].name == "ProdutoImagem") {
                TrocaImagemDetalhe(imgs[i]);
                break;
            }
        }

        TrocaImagem("loading", "hidden");
    }
}

//function AdicionarItcCesta()
//{
//    alert("Por favor, escolha um tamanho.\n");
//}
//function AvisoEscolhaOpcao()
function AdicionarItcCesta() {
    var msgEspecifica = false;
    var msg = new Array("Escolha um valor para todas as Opções de Compra!", "Escolha a Cor", "Escolha o Tamanho");
    var iMsg = 0;

    try {
        for (var j = 0; j < document.forms[0].elements.length; j++) {
            var campo = document.forms[0].elements[j];
            var nomeCampo = (campo.name) ? campo.name : campo.id;

            if (nomeCampo.indexOf("DRP_SKU") != -1 && (campo.value == "0" || campo.value == "")) {
                var tipoCampo = String(campo.title).toLowerCase();

                if (campo.title != null) {
                    if (tipoCampo == "") {
                        iMsg = 1;
                        msgEspecifica = true;
                        break;
                    }
                    if (tipoCampo.indexOf("cor") > -1) {
                        iMsg = 1;
                        msgEspecifica = true;
                        break;
                    }
                    else if (tipoCampo == "tamanho") {
                        iMsg = 2;
                        msgEspecifica = true;
                        break;
                    }
                }
            }
        }

        if (!msgEspecifica) {
            iMsg = 0;
        }
    }
    catch (ex) {
        iMsg = 0;
    }

    alert(msg[iMsg]);
}
function imageExists(url, fxRet) {
    var img = document.createElement("img");
    img.onload = function () { fxRet(true, this); }
    img.onerror = function () { fxRet(false, this); }
    img.src = url;
    /*
    var tmp = new Image;
    tmp.src = url;
    if(tmp.height > 0 && tmp.height != 30)
    {
    return true;
    }
    else
    {
    return false;
    }
    */
}

function TrocaImagemDetalhe(campo) {
    var baseSrc = "";

    imges = document.getElementsByTagName("img");

    for (i = 0; i < imges.length; i++) {
        if (imges[i].name == "ProdutoImagem") {
            base = imges[i];
            baseSrc = base.src;
            base.src = campo.src;
            campo.src = baseSrc;

            MostraImagemDetalhe(base.src);

            break;
        }
    }
}

function MostraImagemDetalhe(src) {
    try {
        var ImagemGif = src.substring(0, src.length - 4).replace('Detalhes', 'Ampliada') + '.gif';
        var ImagemJPG = src.substring(0, src.length - 4).replace('Detalhes', 'Ampliada') + '.jpg';

        if (document.getElementById('ImagemAmpliadaAux').value == '' && document.getElementById("ImagemAmpliadaFoto")) {
            document.getElementById('ImagemAmpliadaAux').value = document.getElementById("ImagemAmpliadaFoto").src;
        }

        imageExists(ImagemGif,
				function fxRet(bRet, img) {
				    if (bRet) {
				        if (document.getElementById('Zoom1')) {
				            document.getElementById('Zoom1').href = ImagemGif;
				        }
				        var divs = document.getElementsByTagName("img");

				        for (i = 0; i < divs.length; i++) {
				            if (divs[i].src.toLowerCase().indexOf("_ampliada") >= 0) {
				                divs[i].src = ImagemGif;
				            }
				        }
				    }
				    else {
				        imageExists(ImagemJPG,
							function fxRet(bRet, img) {
							    if (bRet) {
							        if (document.getElementById('Zoom1')) {
							            document.getElementById('Zoom1').href = ImagemJPG;
							        }
							        var divs = document.getElementsByTagName("img");

							        for (i = 0; i < divs.length; i++) {
							            if (divs[i].src.toLowerCase().indexOf("_ampliada") >= 0) {
							                divs[i].src = ImagemJPG;
							            }
							        }
							    }
							    else {
							        var divs = document.getElementsByTagName("img");

							        for (i = 0; i < divs.length; i++) {
							            if (divs[i].src.toLowerCase().indexOf("_ampliada") >= 0) {
							                divs[i].src = document.getElementById('ImagemAmpliadaAux').value;
							            }
							        }
							    }
							}
						);
				    }
				}
			);
        /*			
        if (imageExists(ImagemGif))
        {
        divs = document.getElementsByTagName("img");

        for (i=0;i<divs.length;i++)
        {
        if (divs[i].src.toLowerCase().indexOf("_ampliada") >= 0)
        {
        divs[i].src = ImagemGif;
        }
        }
        }
        else if(imageExists(ImagemJPG))
        {
        divs = document.getElementsByTagName("img");

        for (i=0;i<divs.length;i++)
        {
        if (divs[i].src.toLowerCase().indexOf("_ampliada") >= 0)
        {
        divs[i].src = ImagemJPG;
        }
        }
        }
        else
        {
        divs = document.getElementsByTagName("img");

        for (i=0;i<divs.length;i++)
        {
        if (divs[i].src.toLowerCase().indexOf("_ampliada") >= 0)
        {
        divs[i].src = document.getElementById('ImagemAmpliadaAux').value;	
        }
        }
        }

        imgs = document.getElementsByTagName("img");

        for (i=0;i<imgs.length;i++)
        {
        if (imgs[i].name == "ProdutoImagem")
        {
        imgs[i].src = src;
        break;
        }
        }
        */
    }
    catch (err) {
        alert(err);
    }
}

function Trim(STRING) {
    STRING = LTrim(STRING);

    return RTrim(STRING);
}

function RTrim(STRING) {
    while (STRING.charAt((STRING.length - 1)) == " ") {
        STRING = STRING.substring(0, STRING.length - 1);
    }

    return STRING;
}


function LTrim(STRING) {
    while (STRING.charAt(0) == " ") {
        STRING = STRING.replace(STRING.charAt(0), "");
    }

    return STRING;
}

function reverse(inp) {
    var outp = "";

    for (i = 0; i <= inp.length; i++) {
        outp = inp.charAt(i) + outp;
    }

    return outp;
}

function AdicionarItemCesta(ProdutoCodigo) {
    var enc = 0;
    var mensagem = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;
    var VitrineCodigo = 0;

    TrocaImagem("loading", "visible");

    if (document.getElementById("btComprarProduto") && document.getElementById("btAguarde")) {
        document.getElementById("btComprarProduto").style.display = 'none';
        document.getElementById("btAguarde").style.display = 'block';
    }

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_1") ? document.getElementById("DRP_SKU_1").value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_2") ? document.getElementById("DRP_SKU_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_3") ? document.getElementById("DRP_SKU_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_4") ? document.getElementById("DRP_SKU_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_5") ? document.getElementById("DRP_SKU_5").value : 0);

        VitrineCodigo = (document.getElementById("VitrineCodigo") ? document.getElementById("VitrineCodigo").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU") != -1 && campo.name.length == 9) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n";
                        break;
                    }
                }
            }
        }

        if (mensagem != "") {
            alert(mensagem);

            if (document.getElementById("btComprarProduto") && document.getElementById("btAguarde")) {
                document.getElementById("btComprarProduto").style.display = 'block';
                document.getElementById("btAguarde").style.display = 'none';
            }

            TrocaImagem("loading", "hidden");
        }
        else {
            VerificaValePresente(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), VitrineCodigo.toString(), Redirect_callback);
        }
    }
    catch (err) {
        alert(err.description);

        if (document.getElementById("btComprarProduto") && document.getElementById("btAguarde")) {
            document.getElementById("btComprarProduto").style.display = 'block';
            document.getElementById("btAguarde").style.display = 'none';
        }

        TrocaImagem("loading", "hidden");
    }
}

function AdicionarItemCestaCrossDuplo(ProdutoCodigoVenda, ProdutoCodigoCross, OrdemVenda, GrupoSellingCodigo, OrdemCross, iGruSellItensAux2) {
    var enc = 0;
    var mensagem = "";

    var Produto1_Op = true;
    var Produto2_Op = true;
    var Produto1_Di = true;
    var Produto2_Di = true;

    var CarValCodVenda1 = 0;
    var CarValCodVenda2 = 0;
    var CarValCodVenda3 = 0;
    var CarValCodVenda4 = 0;
    var CarValCodVenda5 = 0;

    var CarValCodCross1 = 0;
    var CarValCodCross2 = 0;
    var CarValCodCross3 = 0;
    var CarValCodCross4 = 0;
    var CarValCodCross5 = 0;

    var VitrineCodigo = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCodVenda1 = (document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2).value : (document.getElementById("DRP_SKUUnico_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2) ? document.getElementById("DRP_SKUUnico_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2).value : 0));
        CarValCodVenda2 = (document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_2_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_2_" + iGruSellItensAux2).value : 0);
        CarValCodVenda3 = (document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_3_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_3_" + iGruSellItensAux2).value : 0);
        CarValCodVenda4 = (document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_4_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_4_" + iGruSellItensAux2).value : 0);
        CarValCodVenda5 = (document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_5_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_5_" + iGruSellItensAux2).value : 0);

        CarValCodCross1 = (document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2).value : (document.getElementById("DRP_SKUUnico_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2) ? document.getElementById("DRP_SKUUnico_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_1_" + iGruSellItensAux2).value : 0));
        CarValCodCross2 = (document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_2_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_2_" + iGruSellItensAux2).value : 0);
        CarValCodCross3 = (document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_3_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_3_" + iGruSellItensAux2).value : 0);
        CarValCodCross4 = (document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_4_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_4_" + iGruSellItensAux2).value : 0);
        CarValCodCross5 = (document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_5_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_5_" + iGruSellItensAux2).value : 0);

        VitrineCodigo = (document.getElementById("VitrineCodigo") ? document.getElementById("VitrineCodigo").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (Produto1_Op) {
                    if (campo.name.indexOf("DRP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo) != -1) {
                        if (campo.value == "0") {
                            mensagem += "Escolha um valor para todas as Opções de Compra!\nProduto 1 da Venda Cruzada\n\n";
                            Produto1_Op = false;
                        }
                    }
                }

                if (Produto2_Op) {
                    if (campo.name.indexOf("DRP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo) != -1) {
                        if (campo.value == "0") {
                            mensagem += "Escolha um valor para todas as Opções de Compra!\nProduto 2 da Venda Cruzada\n\n";
                            Produto2_Op = false;
                        }
                    }
                }
            }
        }

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (Produto1_Op) {
                    if (Produto1_Di) {
                        if (campo.name.indexOf("DRP_DISP_SKU_" + ProdutoCodigoVenda + "_" + OrdemVenda + "_" + GrupoSellingCodigo + "_" + iGruSellItensAux2) != -1) {
                            if (campo.value == "I") {
                                mensagem += "Combinação Indisponível!\nProduto 1 da Venda Cruzada\n\n";
                                Produto1_Di = false;
                            }
                        }
                    }
                }

                if (Produto2_Op) {
                    if (Produto2_Di) {
                        if (campo.name.indexOf("DRP_DISP_SKU_" + ProdutoCodigoCross + "_" + OrdemCross + "_" + GrupoSellingCodigo + "_" + iGruSellItensAux2) != -1) {
                            if (campo.value == "I") {
                                mensagem += "Combinação Indisponível!\nProduto 2 da Venda Cruzada\n\n";
                                Produto2_Di = false;
                            }
                        }
                    }
                }
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            VerificaValePresenteCross(ProdutoCodigoVenda.toString(), CarValCodVenda1.toString(), CarValCodVenda2.toString(), CarValCodVenda3.toString(), CarValCodVenda4.toString(), CarValCodVenda5.toString(), ProdutoCodigoCross.toString(), CarValCodCross1.toString(), CarValCodCross2.toString(), CarValCodCross3.toString(), CarValCodCross4.toString(), CarValCodCross5.toString(), VitrineCodigo.toString(), VerificaValePresenteCross_callback)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function AdicionarItemCestaGrupoCross(GruSelCodigo, Produtos, iGruSellItensAux2) {
    var enc = 0;
    var mensagem = "";

    var Produto1_Op = true;
    var Produto1_Di = true;

    var CarValCod1 = '';
    var CarValCod2 = '';
    var CarValCod3 = '';
    var CarValCod4 = '';
    var CarValCod5 = '';

    var VitrineCodigo = 0;

    var CodsProdutos = Produtos.split(',');

    TrocaImagem("loading", "visible");

    for (var i = 0; i < CodsProdutos.length; i++) {
        try {
            if (!(Produto1_Op && Produto1_Di)) {
                break;
            }

            for (j = 0; j < document.forms[0].elements.length; j++) {
                campo = document.forms[0].elements[j];

                if (campo.name) {
                    if (campo.name.indexOf("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo) != -1) {
                        if (campo.value == "0") {
                            alert("Escolha um valor para todas as Opções de Compra!\nProduto " + (i + 1).toString() + " da Venda Cruzada\n\n");
                            TrocaImagem("loading", "hidden");
                            Produto1_Op = false;
                            break;
                        }
                    }
                }
            }

            if (Produto1_Op) {
                for (j = 0; j < document.forms[0].elements.length; j++) {
                    campo = document.forms[0].elements[j];

                    if (campo.name) {
                        if (campo.name.indexOf("DRP_DISP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_" + iGruSellItensAux2) != -1) {
                            if (campo.value == "I") {
                                alert("Combinação Indisponível!\nProduto " + (i + 1).toString() + " da Venda Cruzada\n\n");
                                TrocaImagem("loading", "hidden");
                                Produto1_Di = false;
                                break;
                            }
                        }
                    }
                }
            }
            else {
                break;
            }
        }
        catch (err) {
            alert(err.description);
            TrocaImagem("loading", "hidden");
        }
    }

    if (Produto1_Op && Produto1_Di) {
        try {
            for (var i = 0; i < CodsProdutos.length; i++) {
                CarValCod1 += (document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_1_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_1_" + iGruSellItensAux2).value : (document.getElementById("DRP_SKUUnico_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_1_" + iGruSellItensAux2) ? document.getElementById("DRP_SKUUnico_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_1_" + iGruSellItensAux2).value : 0)) + ",";
                CarValCod2 += (document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_2_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_2_" + iGruSellItensAux2).value : '0') + ",";
                CarValCod3 += (document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_3_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_3_" + iGruSellItensAux2).value : '0') + ",";
                CarValCod4 += (document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_4_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_4_" + iGruSellItensAux2).value : '0') + ",";
                CarValCod5 += (document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_5_" + iGruSellItensAux2) ? document.getElementById("DRP_SKU_" + CodsProdutos[i] + "_" + (i + 1).toString() + "_" + GruSelCodigo + "_5_" + iGruSellItensAux2).value : '0') + ",";
            }

            VitrineCodigo = (document.getElementById("VitrineCodigo") ? document.getElementById("VitrineCodigo").value : 0);
            TrocaImagem("loading", "visible");

            VerificaValePresenteGrupoCross(GruSelCodigo.toString(), Produtos.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), VitrineCodigo.toString(), VerificaValePresenteGrupoCross_callback)
        }
        catch (err) {
            alert(err.description);
            TrocaImagem("loading", "hidden");
        }
    }
}

function AdicionarItemCestaCross(ProdutoCodigo) {
    var enc = 0;
    var mensagem = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    var VitrineCodigo = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").value : (document.getElementById("DRP_SKUUnico_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKUUnico_" + ProdutoCodigo + "_1").value : 0));
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").value : 0);

        VitrineCodigo = (document.getElementById("VitrineCodigo") ? document.getElementById("VitrineCodigo").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU_" + ProdutoCodigo + "_") != -1) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n\n";
                        break;
                    }
                }
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            detalhes.AdicionarItemCestaCross(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), VitrineCodigo.toString(), Redirect_callback)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function AdicionarItemCestaBusca(ProdutoCodigo) {
    var enc = 0;
    var mensagem = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU_" + ProdutoCodigo + "_") != -1) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n";
                        break;
                    }
                }
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            busca.AdicionarItemCestaBusca(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), Redirect_callback)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function AdicionarItemCestaFabricante(ProdutoCodigo) {
    var enc = 0;
    var mensagem = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU_" + ProdutoCodigo + "_") != -1) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n";
                        break;
                    }
                }
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            fabricante.AdicionarItemCestaFabricante(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), Redirect_callback)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function AdicionarItemCestaCategoria(ProdutoCodigo) {
    var enc = 0;
    var mensagem = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU_" + ProdutoCodigo + "_") != -1) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n";
                        break;
                    }
                }
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            categoria.AdicionarItemCestaCategoria(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), Redirect_callback);
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function AdicionarItemCestaComparador(ProdutoCodigo) {
    var enc = 0;
    var mensagem = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU_" + ProdutoCodigo + "_") != -1) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n";
                        break;
                    }
                }
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            comparar.AdicionarItemCestaComparador(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), Redirect_callback);
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function MudaPaginaBusca(pagina, tipoBusca) {
    try {
        TrocaImagem("loading", "visible");
        busca.MudaPaginaBusca(pagina.toString(), tipoBusca.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function MudaPaginaCategoria(pagina) {
    try {
        var Categoria = document.getElementById("CategoriaCodigo").value;
        var SubCategoria = document.getElementById("SubCategoriaCodigo").value;

        TrocaImagem("loading", "visible");
        categoria.MudaPaginaCategoria(pagina.toString(), Categoria.toString(), SubCategoria.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function MudaPaginaVP(pagina) {
    try {
        TrocaImagem("loading", "visible");
        valePresente.MudaPaginaVP(pagina.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function MudaPaginaFabricante(pagina) {
    try {
        var Fabricante = document.getElementById("FabricanteCodigo").value;

        TrocaImagem("loading", "visible");
        fabricante.MudaPaginaFabricante(pagina.toString(), Fabricante.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}
function BuscarEnter(local, evento) {
    if (evento.keyCode == 13) {
        Buscar(local);
    }
}
function Buscar(local) {
    var mensagem = "";
    var fabricante = "";
    var palavra;
    var categoria;
    var aux_palavra;

    //Replace em javascript utiliza expressão regular; nestes casos abaixo, só será removida a primeira ocorrência de cada caractere.
    //Acrescentada a remoção tbm no C#			

    /*if (local == "Topo") {
        palavra = document.getElementById("cabecalho_txtBusca").value.replace("[", "").replace("]", "").replace("(", "").replace(")", "").replace("&", "").replace("%", "");
        //categoria = document.getElementById("cabecalho_DropLojas").options[document.getElementById("cabecalho_DropLojas").selectedIndex].value;

        //if (document.getElementById("cabecalho_DropFabricantes"))
        //{
        //	fabricante = document.getElementById("cabecalho_DropFabricantes").options[document.getElementById("cabecalho_DropFabricantes").selectedIndex].value;
        //}
        //else
        //{
        //	fabricante = 0;
        //}
    }
    if (local == "Rodape") {
        palavra = document.getElementById("rodape_txtBusca").value.replace("[", "").replace("]", "").replace("(", "").replace(")", "").replace("&", "").replace("%", "");
        //categoria = document.getElementById("rodape_DropLojas").options[document.getElementById("rodape_DropLojas").selectedIndex].value;

        //if (document.getElementById("rodape_DropFabricantes"))
        //{
        //	fabricante = document.getElementById("rodape_DropFabricantes").options[document.getElementById("rodape_DropFabricantes").selectedIndex].value;
        //}
        //else
        //{
        //	fabricante = 0;
        //}
    }*/

    aux_palavra = palavra;

    if (palavra == "" && (categoria == "" || categoria == "0") && (fabricante == "" || fabricante == "0")) {
        mensagem += "Valor inválido !\n";
    }

    if (mensagem == "" && aux_palavra.replace(/-/g, "") == "") {
        mensagem += "Ingrese el texto a buscar\n";
    }

    if (mensagem != "") {
        alert(mensagem);
        TrocaImagem("loading", "hidden");
    }
    else {
        cabecalho.ArmazenaDadosBusca(palavra.toString(), "0", "0", Redirect_callback_ArmazenaDadosBusca);
    }

}
function Redirect_callback_ArmazenaDadosBusca(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value) {
        if (res.value == "1") {
            alert("Valor inválido (todos os campos vazios ou inválidos) !\n");
        }
        else {
            window.location.href = res.value;
        }
    }
}

function ArmazenaValorAntigo(campo) {
    document.getElementById("ValorAntigo").value = campo.value;
}

function AtualizaQtdeItem(campo, qtdemax) {
    var mensagem = "";

    TrocaImagem("loading", "visible");

    try {
        if (Trim(campo.value) == "") {
            mensagem += "Valor inválido (vazio) !\n";
        }

        if (isNaN(campo.value)) {
            mensagem += "Valor inválido (não numérico : " + campo.value + ") !\n";
        }
        else {
            if (campo.value > qtdemax) {
                mensagem += "Valor inválido  - excede máximo permitido (" + qtdemax + ") !\n";
            }
        }

        if (mensagem != "") {
            campo.value = document.getElementById("ValorAntigo").value;
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            if (Trim(campo.value) != Trim(document.getElementById("ValorAntigo").value)) {
                index.AtualizaQtdeItem(campo.name, campo.value, AtualizaQtdeItem_callback);
            }
            else {
                campo.value = Trim(document.getElementById("ValorAntigo").value);
                document.getElementById("ValorAntigo").value = "";
                TrocaImagem("loading", "hidden");
            }
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function AtualizaQtdeItem_callback(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }
    else if (res.value[0]) {
        if (res.value[0].indexOf('máximo')) {
            var maximo = res.value[0].substring(res.value[0].indexOf('(') + 1, res.value[0].indexOf(')'));
            if (parseInt(maximo, 10) < parseInt(Trim(document.getElementById("ValorAntigo").value), 10)) {
                document.getElementById(res.value[2]).value = maximo;
            }
            else {
                document.getElementById(res.value[2]).value = Trim(document.getElementById("ValorAntigo").value);
            }
        }
        else {
            document.getElementById(res.value[2]).value = Trim(document.getElementById("ValorAntigo").value);
        }
        alert(res.value[0]);
    }
    else {
        window.location.href = res.value[1];
    }
}

function EfetueLogin(URL) {
    alert('Efetue seu login.');
    window.location.href = URL;
}

function LimparCesta() {
    TrocaImagem("loading", "visible");

    if (confirm('Você tem certeza que deseja LIMPAR sua Cesta de Compras?')) {
        index.LimparCesta(Redirect_callback);
    }
    else {
        TrocaImagem("loading", "hidden");
    }
}


function AlteraPedidoRecorrente(CestaCodigo) {
    TrocaImagem("loading", "visible");

    try {
        index.AlteraPedidoRecorrente(CestaCodigo.toString(), callback_AlteraPedidoRecorrente);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

// Pedido Recorrente **************************
function callback_AlteraPedidoRecorrente(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        //			window.location.href = window.location;
    }

    if (res.value) {
        window.location.href = res.value;
    }
}
// Fim do Bloco *******************************


function FecharPedido(CestaCodigo) {
    TrocaImagem("loading", "visible");

    try {
        index.FecharPedido(CestaCodigo.toString(), callback_FecharPedido);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function FecharPedidoGift(CestaCodigo) {
    try {
        var Mensagens = document.getElementsByTagName("textarea");
        var Radios = document.getElementsByTagName("input");
        var aCodigos = new Array();
        var aMensagens = new Array();
        var aRadios = new Array();
        var MensagemVazia = false;

        for (i = 0; i < Mensagens.length; i++) {
            if (Mensagens[i].name.indexOf("MsgGift") >= 0) {
                if (Trim(Mensagens[i].value.toString()) == '') {
                    MensagemVazia = true;
                }

                aCodigos[i] = Mensagens[i].name.substring(7, Mensagens[i].name.length);
                aMensagens[i] = Mensagens[i].value.toString();

                for (j = 0; j < Radios.length; j++) {
                    if (Radios[j].type == 'radio' && Radios[j].name == 'Gift' + aCodigos[i] && Radios[j].checked) {
                        if (Radios[j].id.indexOf('GiftN') == 0) {
                            aRadios[i] = "0";
                        }
                        else {
                            aRadios[i] = "1";
                        }
                        break;
                    }
                }
            }
        }

        if (MensagemVazia) {
            if (!(confirm('Seu presente será enviado sem mensagem no cartão.\r\nDeseja continuar?'))) {
                return;
            }
        }

        presente.FecharPedido(CestaCodigo.toString(), aCodigos, aMensagens, aRadios, callback_FecharPedidoGift);
    }
    catch (err) {
        alert(err.description);
    }
}

function callback_FecharPedidoGift(res) {
    if (res.error) {
        //			AlertaErroAjax(res.error);
        window.location.href = window.location;
    }

    if (res.value[0]) {
        window.location.href = res.value[0];
    }
    else {
        window.location.href = res.value[1];
    }
}

function callback_FecharPedido(res) {
    if (res.error) {
        AlertaErroAjax(res.error);

        if (res.error.Message == 'Sessão expirada!') {
            window.location.href = window.location;
        }
    }

    if (res.value) {
        window.location.href = res.value;
    }
}

function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}

function FinalizarPedido() {
    var mensagem = "";
    var minSeg = 3;

    var OperadoraCodigo = "";
    var OperadoraTipo = "";
    var ParcelamentoBase = "";
    var ParcelamentoSel = "";
    var ParcelamentoSelCod = "";
    var CartaoCPFCNPJ = "";
    var CartaoNumero = "";
    var CartaoSeguranca = "";
    var CartaoTitular = "";
    var CartaoValMes = "";
    var CartaoValAno = "";

    var CPFNP = "";

    TrocaImagem("loading", "visible");

    try {
        var currentTime = new Date();

        if (document.getElementById("ParcelamentoBase")) {
            ParcelamentoBase = document.getElementById("ParcelamentoBase").value;
        }

        if (document.getElementById("ckNP").checked && Trim(document.getElementById("txtCPFNP").value) == '') {
            mensagem += "Informe um CPF para a Nota Fiscal Paulista!\n";
        }
        else if (document.getElementById("ckNP").checked && !validaCPF(Trim(document.getElementById("txtCPFNP").value))) {
            mensagem += "CPF para a Nota Fiscal Paulista inválido!\n";
        }
        else if (document.getElementById("ckNP").checked) {
            CPFNP = Trim(document.getElementById("txtCPFNP").value);
        }

        if (document.getElementById("OperadoraTipo").value == "CCR") {
            if (document.getElementById("OperadoraCodigo").value == "") {
                mensagem += "Você precisa escolher uma Operadora de Cartão de Crédito !\n";
            }
            else {
                var CpfTitular = replaceAll(document.getElementById("CartaoCPFCNPJ").value, '.', '');
                CpfTitular = replaceAll(CpfTitular, '-', '');

                if (document.getElementById("OperadoraCodigo").value == "1") {
                    minSeg = 4;
                }

                if (document.getElementById("CartaoCPFCNPJ").value == "") {
                    mensagem += "CPF ou CNPJ do titular do cartão inválido (vazio) !\n";
                }
                else if (!_isinteger(CpfTitular)) {
                    mensagem += "CPF ou CNPJ do titular do cartão inválido!\n";
                }
                else {
                    CartaoCPFCNPJ = document.getElementById("CartaoCPFCNPJ").value;
                }

                if (document.getElementById("CartaoNumero").value == "") {
                    mensagem += "Número de cartão inválido (vazio) !\n";
                }
                else {
                    if (!ValidaQtDigitosCartao(document.getElementById("OperadoraCodigo").value, Trim(document.getElementById("CartaoNumero").value))) {
                        mensagem += "Número de cartão inválido (incompleto) !\n";
                    }
                    else if (!validaCartao() && document.getElementById("OperadoraCodigo").value != "7") {
                        mensagem += "Número de cartão inválido (incorreto) !\n";
                    }
                    else {
                        CartaoNumero = document.getElementById("CartaoNumero").value;
                    }
                }

                if (document.getElementById("CartaoCodigo").value == "") {
                    mensagem += "Código de segurança do cartão inválido (vazio) !\n";
                }
                else {
                    if (document.getElementById("CartaoCodigo").value.length < minSeg) {
                        mensagem += "Código de segurança do cartão inválido (incorreto) !\n";
                    }
                    else {
                        if (!ValidaCodigoSeguranca(CartaoNumero.toString(), document.getElementById("CartaoCodigo").value, document.getElementById("OperadoraCodigo").value)) {
                            mensagem += "Código de segurança do cartão inválido (incorreto) !\n";
                        }
                        else {
                            CartaoSeguranca = document.getElementById("CartaoCodigo").value;
                        }
                    }
                }

                if (document.getElementById("CartaoNome").value == "") {
                    mensagem += "Nome no cartão inválido (vazio) !\n";
                }
                else {
                    CartaoTitular = document.getElementById("CartaoNome").value;
                }

                if (document.getElementById("CartaoValMes").value == "") {
                    mensagem += "Validade (mês) do cartão inválido (vazio) !\n";
                }
                else {
                    if (document.getElementById("CartaoValMes").value.length < 2 || parseInt(document.getElementById("CartaoValMes").value, 10) > 12 || parseInt(document.getElementById("CartaoValMes").value, 10) < 1) {
                        mensagem += "Validade (mês) do cartão inválido (incorreto) !\n";
                    }
                    else {
                        CartaoValMes = document.getElementById("CartaoValMes").value;
                    }
                }

                if (document.getElementById("CartaoValAno").value == "") {
                    mensagem += "Validade (ano) do cartão inválido (vazio) !\n";
                }
                else {
                    if (document.getElementById("CartaoValAno").value.length < 2) {
                        mensagem += "Validade (ano) do cartão inválido (incorreto) !\n";
                    }
                    else {
                        if (Number("20" + document.getElementById("CartaoValAno").value) < currentTime.getFullYear() || (Number("20" + document.getElementById("CartaoValAno").value) == currentTime.getFullYear() && Number(document.getElementById("CartaoValMes").value) < currentTime.getMonth() + 1)) {
                            mensagem += "Cartão expirado !\n";
                        }
                        else {
                            CartaoValAno = document.getElementById("CartaoValAno").value;
                        }
                    }
                }

                if (document.getElementById("ParcelamentoSel").value == "" || document.getElementById("ParcelamentoSelCod").value == "") {
                    mensagem += "Parcelamento inválido (vazio) !\n";
                }
            }
        }
        else if (document.getElementById("OperadoraTipo").value == "DEB") {
            if (document.getElementById("OperadoraCodigo").value == "") {
                mensagem += "Você precisa escolher um Banco de Cartão de Débito !\n";
            }

            if (document.getElementById("ParcelamentoSel").value == "" || document.getElementById("ParcelamentoSelCod").value == "") {
                mensagem += "Opção de Pagamento inválida (vazio) !\n";
            }
        }
        else if (document.getElementById("OperadoraTipo").value == "BOL") {
            if (document.getElementById("OperadoraCodigo").value == "") {
                mensagem += "Você precisa escolher um Banco para emissão do Boleto !\n";
            }

            if (document.getElementById("ParcelamentoSel").value == "" || document.getElementById("ParcelamentoSelCod").value == "") {
                mensagem += "Opção de Pagamento inválida (vazio) !\n";
            }
        }
        else if (document.getElementById("OperadoraTipo").value == "PAY") {
            if (document.getElementById("OperadoraCodigo").value == "19") {
                //window.open("abrepaypal.aspx");
            }

            if (document.getElementById("ParcelamentoSel").value == "" || document.getElementById("ParcelamentoSelCod").value == "") {
                mensagem += "Opção de Pagamento inválida (vazio)!\n";
            }
        }
        else {
            var Conta = false;

            if (document.getElementById('TipoCco1') != null && document.getElementById('TipoCco1').checked) {
                Conta = true;
            }
            else if (document.getElementById('TipoCco2') != null && document.getElementById('TipoCco2').checked) {
                Conta = true;
            }
            else if (document.getElementById('TipoCco3') != null && document.getElementById('TipoCco3').checked) {
                Conta = true;
            }
            if (!Conta) {
                mensagem += "Nenhuma conta corrente selecionada!\n";
            }

            document.getElementById("ParcelamentoSel").value = "Ctc_1";
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            OperadoraCodigo = document.getElementById("OperadoraCodigo").value;
            OperadoraTipo = document.getElementById("OperadoraTipo").value;
            ParcelamentoSel = document.getElementById("ParcelamentoSel").value;
            ParcelamentoSelCod = document.getElementById("ParcelamentoSelCod").value;

            if (OperadoraCodigo != '') {
                document.getElementById("SpanFinalizarBotao_" + OperadoraCodigo).style.display = 'none';
                document.getElementById("SpanFinalizarMsg_" + OperadoraCodigo).style.display = '';
            }
            else {
                document.getElementById("SpanFinalizarBotao_CC").style.display = 'none';
                document.getElementById("SpanFinalizarMsg_CC").style.display = '';
            }
            fechamento.FinalizarPedido(OperadoraCodigo.toString(), OperadoraTipo.toString(), ParcelamentoBase.toString(), ParcelamentoSel.toString(), ParcelamentoSelCod.toString(), CartaoCPFCNPJ.toString(), CartaoNumero.toString(), CartaoSeguranca.toString(), CartaoTitular.toString(), CartaoValMes.toString(), CartaoValAno.toString(), CPFNP.toString(), callback_FinalizarPedido);
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_FinalizarPedido(res) {
    var OperadoraCodigo = document.getElementById("OperadoraCodigo").value;

    if (res.error) {
        if (res.error.Message.indexOf("[RECARREGA]") >= 0) {
            alert(res.error.Message.substring(0, res.error.Message.indexOf("[RECARREGA]")));
            window.location.href = res.error.Message.substring(res.error.Message.indexOf("[RECARREGA]") + 12, res.error.Message.length - 1);
        }
        else if (res.error.Message.indexOf("http://") > -1 || res.error.Message.indexOf("https://") > -1) {
            window.location.href = res.error.Message;
        }
        else {
            AlertaErroAjax(res.error);
        }
    }

    if (res.value) {
        if (res.value == "CartaoInvalido") {
            alert("Número de cartão inválido.");
            TrocaImagem("loading", "hidden");
        }
        else if (res.value == "CPFCNPJInvalido") {
            alert("CPF ou CNPJ do titular do cartão inválido.");
            TrocaImagem("loading", "hidden");
        }
        else {
            window.location.href = res.value;
        }
    }

    if (res.error || (res.value && (res.value == "CartaoInvalido" || res.value == "CPFCNPJInvalido"))) {
        if (OperadoraCodigo != '') {
            document.getElementById("SpanFinalizarBotao_" + OperadoraCodigo).style.display = '';
            document.getElementById("SpanFinalizarMsg_" + OperadoraCodigo).style.display = 'none';
        }
        else {
            document.getElementById("SpanFinalizarBotao_CC").style.display = '';
            document.getElementById("SpanFinalizarMsg_CC").style.display = 'none';
        }
    }
}

function FiltrarFabricante() {
    TrocaImagem("loading", "visible");

    try {
        var Ordem = document.getElementById("ordena_pesquisa_drpOrdem").value;
        var OrdemSentido = document.getElementById("ordena_pesquisa_drpOrdemSentido").value;
        var QtdePagina = document.getElementById("ordena_pesquisa_drpQtdePagina").value;
        var Fabricante = document.getElementById("FabricanteCodigo").value;

        fabricante.FiltrarFabricante(Ordem.toString(), OrdemSentido.toString(), QtdePagina.toString(), Fabricante.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function FiltrarCategoria() {
    TrocaImagem("loading", "visible");

    try {
        var Ordem = document.getElementById("ordena_pesquisa_drpOrdem").value;
        var OrdemSentido = document.getElementById("ordena_pesquisa_drpOrdemSentido").value;
        var QtdePagina = document.getElementById("ordena_pesquisa_drpQtdePagina").value;
        var Categoria = document.getElementById("CategoriaCodigo").value;
        var SubCategoria = document.getElementById("SubCategoriaCodigo").value;

        categoria.FiltrarCategoria(Ordem.toString(), OrdemSentido.toString(), QtdePagina.toString(), Categoria.toString(), SubCategoria.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function FiltrarVP() {
    TrocaImagem("loading", "visible");

    try {
        var Ordem = document.getElementById("ordena_pesquisa_drpOrdem").value;
        var OrdemSentido = document.getElementById("ordena_pesquisa_drpOrdemSentido").value;
        var QtdePagina = document.getElementById("ordena_pesquisa_drpQtdePagina").value;

        valePresente.FiltrarVP(Ordem.toString(), OrdemSentido.toString(), QtdePagina.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function FiltrarBusca() {
    TrocaImagem("loading", "visible");

    try {
        var Ordem = document.getElementById("ordena_pesquisa_drpOrdem").value;
        var OrdemSentido = document.getElementById("ordena_pesquisa_drpOrdemSentido").value;
        var QtdePagina = document.getElementById("ordena_pesquisa_drpQtdePagina").value;

        busca.FiltrarBusca(Ordem.toString(), OrdemSentido.toString(), QtdePagina.toString(), Redirect_callback);
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function DisponibilidadeSKUCross(campoSender, ProdutoCodigo, GrupoSelCodigo, tipo, ordem, GrupoSelCodigo, iGruSellItensAux) {
    var total = 0;
    var lastProd = 0;

    var mensagem = "";
    var aux = "";
    var extensao = "";
    var endereco = "";

    var ProdutosCrossCodigo = new Array();

    var CarValCod1 = new Array();
    var CarValCod2 = new Array();
    var CarValCod3 = new Array();
    var CarValCod4 = new Array();
    var CarValCod5 = new Array();

    try {
        var camposSender = campoSender.name.split("_");

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.type == "select-one" || campo.type == "hidden") {
                if (campo.name) {
                    if (campo.name.indexOf("_") >= 0) {
                        var campos = campo.name.split("_");

                        if (campos[0] == "DRP" && campos.length == 7 && campos[4] == GrupoSelCodigo && campos[6] == camposSender[6] && campos[4] == camposSender[4]) {
                            if (lastProd == 0 || lastProd != campos[2]) {
                                ProdutosCrossCodigo[total] = campos[2];

                                if (campo.type == "select-one") {
                                    CarValCod1[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_1_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_1_" + campos[6]).options[document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_1_" + campos[6]).selectedIndex].value : 0);
                                    CarValCod2[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_2_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_2_" + campos[6]).options[document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_2_" + campos[6]).selectedIndex].value : 0);
                                    CarValCod3[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_3_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_3_" + campos[6]).options[document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_3_" + campos[6]).selectedIndex].value : 0);
                                    CarValCod4[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_4_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_4_" + campos[6]).options[document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_4_" + campos[6]).selectedIndex].value : 0);
                                    CarValCod5[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_5_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_5_" + campos[6]).options[document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_5_" + campos[6]).selectedIndex].value : 0);
                                }
                                else if (campo.type == "hidden") {
                                    CarValCod1[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_1_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_1_" + campos[6]).value : (document.getElementById("DRP_SKUUnico_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_1_" + campos[6]) ? document.getElementById("DRP_SKUUnico_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_1_" + campos[6]).value : 0));
                                    CarValCod2[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_2_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_2_" + campos[6]).value : 0);
                                    CarValCod3[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_3_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_3_" + campos[6]).value : 0);
                                    CarValCod4[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_4_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_4_" + campos[6]).value : 0);
                                    CarValCod5[total] = (document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_5_" + campos[6]) ? document.getElementById("DRP_SKU_" + campos[2] + "_" + campos[3] + "_" + campos[4] + "_5_" + campos[6]).value : 0);
                                }

                                lastProd = campos[2];
                                total++;
                            }
                        }
                    }
                }
            }
        }

        if (campoSender.type == "select-one") {
            if (campoSender.options[campoSender.selectedIndex].value == "") {
                mensagem += "Opção inválida (vazio) !\n";
            }
        }
        else if (campoSender.type == "hidden") {
            if (campoSender.value == "") {
                mensagem += "Opção inválida (vazio) !\n";
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            detalhes.DisponibilidadeSKUCross(ProdutoCodigo.toString(), GrupoSelCodigo.toString(), ProdutosCrossCodigo, CarValCod1, CarValCod2, CarValCod3, CarValCod4, CarValCod5, ordem.toString(), iGruSellItensAux, callback_DisponibilidadeSKUCross)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_DisponibilidadeSKUCross(res) {
    if (res.error) {
        if (res.error.Message.indexOf("http") > -1) {
            window.location.href = res.error.Message;
        }
    }
    else {
        if (res.value) {
            document.getElementById("DRP_DISP_SKU_" + res.value[0] + "_" + res.value[2] + "_" + res.value[5]).value = res.value[3];

            if (res.value[1]) {
                if (res.value[1] != "") {
                    if (document.getElementById("spanDisponibilidade_Cross_" + res.value[0] + "_" + res.value[2] + "_" + res.value[5] + "_" + res.value[11])) {
                        if (document.getElementById("p_product_disp_" + res.value[0] + "_" + res.value[2] + "_" + res.value[5] + "_" + res.value[11])) {
                            document.getElementById("p_product_disp_" + res.value[0] + "_" + res.value[2] + "_" + res.value[5] + "_" + res.value[11]).style.display = "";
                        }

                        document.getElementById("spanDisponibilidade_Cross_" + res.value[0] + "_" + res.value[2] + "_" + res.value[5] + "_" + res.value[11]).innerHTML = res.value[1];
                    }
                }
            }

            if (res.value[4]) {
                if (document.getElementById("ImgCross" + res.value[0] + "_" + res.value[2] + "_" + res.value[5] + "_" + res.value[11])) {
                    document.getElementById("ImgCross" + res.value[0] + "_" + res.value[2] + "_" + res.value[5] + "_" + res.value[11]).src = res.value[4];
                }
            }

            if (res.value[5]) {
                if (res.value[6]) {
                    document.getElementById("spanTotalCrossDe_" + res.value[11] + "_" + res.value[5]).innerHTML = res.value[7];
                    document.getElementById("spanTotalCrossPor_" + res.value[11] + "_" + res.value[5]).innerHTML = res.value[8];

                    document.getElementById("spanParcelamento1_" + res.value[11] + "_" + res.value[5]).innerHTML = res.value[9];
                    document.getElementById("spanParcelamento2_" + res.value[11] + "_" + res.value[5]).innerHTML = res.value[10];
                }
            }
        }

        TrocaImagem("loading", "hidden");
    }
}

function DisponibilidadeSKUBusca(campo, ProdutoCodigo, tipo) {
    var mensagem = "";
    var aux = "";
    var extensao = "";
    var endereco = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").selectedIndex].value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").selectedIndex].value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").selectedIndex].value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").selectedIndex].value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").selectedIndex].value : 0);

        if (campo.options[campo.selectedIndex].value == "") {
            mensagem += "Opção inválida (vazio) !\n";
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            busca.DisponibilidadeSKUBusca(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), callback_DisponibilidadeSKUBusca)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_DisponibilidadeSKUBusca(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        //			window.location.href = window.location;
    }

    if (res.value[0][0]) {
        if (res.value[0][1]) {
            document.getElementById("spanDisponibilidade_" + res.value[0][0]).innerHTML = res.value[0][1];
        }

        if (res.value[0][2]) {
            document.getElementById("spanPreco_" + res.value[0][0]).innerHTML = res.value[0][2];
        }

        if (res.value[0][3]) {
            document.getElementById("spanPrecoPor_" + res.value[0][0]).innerHTML = res.value[0][3];
        }

        if (res.value[0][4]) {
            document.getElementById("spanParcelamento_" + res.value[0][0]).innerHTML = res.value[0][4];
        }

        if (res.value[1][0]) {
            document.getElementById("ImgBusca" + res.value[0][0]).src = res.value[1][0];
        }

        TrocaImagem("loading", "hidden");
    }
}

function DisponibilidadeSKUCategoria(campo, ProdutoCodigo, tipo) {
    var mensagem = "";
    var aux = "";
    var extensao = "";
    var endereco = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").selectedIndex].value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").selectedIndex].value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").selectedIndex].value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").selectedIndex].value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").selectedIndex].value : 0);

        if (campo.options[campo.selectedIndex].value == "") {
            mensagem += "Opção inválida (vazio) !\n";
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            categoria.DisponibilidadeSKUCategoria(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), callback_DisponibilidadeSKUCategoria)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_DisponibilidadeSKUCategoria(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        //			window.location.href = window.location;
    }

    if (res.value[0]) {
        if (res.value[1]) {
            document.getElementById("spanDisponibilidade_" + res.value[0]).innerHTML = res.value[1];
        }

        if (res.value[2]) {
            document.getElementById("spanPreco_" + res.value[0]).innerHTML = res.value[2];
        }

        if (res.value[3]) {
            document.getElementById("spanPrecoPor_" + res.value[0]).innerHTML = res.value[3];
        }

        if (res.value[4]) {
            document.getElementById("spanParcelamento1_" + res.value[0]).innerHTML = res.value[4];
        }

        if (res.value[5]) {
            document.getElementById("spanParcelamento2_" + res.value[0]).innerHTML = res.value[5];
        }

        if (res.value[6]) {
            document.getElementById("ImgCategoria" + res.value[0]).src = res.value[6];
        }

        TrocaImagem("loading", "hidden");
    }
}

function DisponibilidadeSKUComparador(campo, ProdutoCodigo, tipo) {
    var mensagem = "";
    var aux = "";
    var extensao = "";
    var endereco = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").selectedIndex].value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").selectedIndex].value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").selectedIndex].value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").selectedIndex].value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").selectedIndex].value : 0);

        if (campo.options[campo.selectedIndex].value == "") {
            mensagem += "Opção inválida (vazio) !\n";
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            comparar.DisponibilidadeSKUComparador(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), callback_DisponibilidadeSKUComparador)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_DisponibilidadeSKUComparador(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        //			window.location.href = window.location;
    }

    if (res.value[0]) {
        if (res.value[1]) {
            document.getElementById("spanDisponibilidade_" + res.value[0]).innerHTML = res.value[1];
        }

        if (res.value[2]) {
            document.getElementById("spanPreco_" + res.value[0]).innerHTML = res.value[2];
        }

        if (res.value[3]) {
            document.getElementById("spanPrecoPor_" + res.value[0]).innerHTML = res.value[3];
        }

        if (res.value[4]) {
            document.getElementById("spanParcelamento1_" + res.value[0]).innerHTML = res.value[4];
        }

        if (res.value[5]) {
            document.getElementById("spanParcelamento2_" + res.value[0]).innerHTML = res.value[5];
        }

        if (res.value[6]) {
            document.getElementById("ImgCategoria" + res.value[0]).src = res.value[6];
        }

        TrocaImagem("loading", "hidden");
    }
}

function DisponibilidadeSKUFabricante(campo, ProdutoCodigo, tipo) {
    var mensagem = "";
    var aux = "";
    var extensao = "";
    var endereco = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_1").selectedIndex].value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_2").selectedIndex].value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_3").selectedIndex].value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_4").selectedIndex].value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5") ? document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").options[document.getElementById("DRP_SKU_" + ProdutoCodigo + "_5").selectedIndex].value : 0);

        if (campo.options[campo.selectedIndex].value == "") {
            mensagem += "Opção inválida (vazio) !\n";
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            fabricante.DisponibilidadeSKUFabricante(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), callback_DisponibilidadeSKUFabricante)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_DisponibilidadeSKUFabricante(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        //			window.location.href = window.location;
    }

    if (res.value[0][0]) {
        if (res.value[0][1]) {
            document.getElementById("spanDisponibilidade_" + res.value[0][0]).innerHTML = res.value[0][1];
        }

        if (res.value[0][2]) {
            document.getElementById("spanPreco_" + res.value[0][0]).innerHTML = res.value[0][2];
        }

        if (res.value[0][3]) {
            document.getElementById("spanPrecoPor_" + res.value[0][0]).innerHTML = res.value[0][3];
        }

        if (res.value[0][4]) {
            document.getElementById("spanParcelamento_" + res.value[0][0]).innerHTML = res.value[0][4];
        }

        if (res.value[1][0]) {
            document.getElementById("ImgFab" + res.value[0][0]).src = res.value[1][0];
        }

        TrocaImagem("loading", "hidden");
    }
}

/*
function MudaTab(tabNome, redirect)
{
if (tabNome == "descricao")
{
if (document.getElementById("descricao"))
{
document.getElementById("descricao").style.visibility = "visible";
document.getElementById("descricao").style.display = "block";
document.getElementById("descricao").style.height = "100%";

if (document.getElementById("lnk_descricao"))
{
document.getElementById("lnk_descricao").className = "selected";
}								
}
}
else
{
if (document.getElementById("descricao"))
{
document.getElementById("descricao").style.visibility = "hidden";
document.getElementById("descricao").style.display = "none";
document.getElementById("descricao").style.height = "0";

if (document.getElementById("lnk_descricao"))
{
document.getElementById("lnk_descricao").className = "";
}				
}
}

if (tabNome == "caracteristicas")
{
if (document.getElementById("caracteristicas"))
{
document.getElementById("caracteristicas").style.visibility = "visible";
document.getElementById("caracteristicas").style.display = "block";
document.getElementById("caracteristicas").style.height = "100%";

if (document.getElementById("lnk_caracteristicas"))
{
document.getElementById("lnk_caracteristicas").className = "selected";
}								
}
}
else
{
if (document.getElementById("caracteristicas"))
{
document.getElementById("caracteristicas").style.visibility = "hidden";
document.getElementById("caracteristicas").style.display = "none";
document.getElementById("caracteristicas").style.height = "0";

if (document.getElementById("lnk_caracteristicas"))
{
document.getElementById("lnk_caracteristicas").className = "";
}								
}
}

if (tabNome == "opinioes")
{
if (document.getElementById("opinioes"))
{
document.getElementById("opinioes").style.visibility = "visible";
document.getElementById("opinioes").style.display = "block";
document.getElementById("opinioes").style.height = "100%";

if (document.getElementById("lnk_opinioes"))
{
document.getElementById("lnk_opinioes").className = "selected";
}
}
}
else
{
if (document.getElementById("opinioes"))
{
document.getElementById("opinioes").style.visibility = "hidden";
document.getElementById("opinioes").style.display = "none";
document.getElementById("opinioes").style.height = "0";

if (document.getElementById("lnk_opinioes"))
{
document.getElementById("lnk_opinioes").className = "";
}
}
}

if (redirect)
{
window.location.href = "#D";
}
}
*/

function MudaCheck(tipo) {
    if (tipo == "S") {
        document.getElementById('rdnSenha').checked = true;
        document.getElementById('rdnPrimeiraCompra').checked = false;
        document.getElementById('txtCep1').value = '';
    }
    else {
        document.getElementById('rdnSenha').checked = false;
        document.getElementById('rdnPrimeiraCompra').checked = true;
        document.getElementById('txtSenha').value = '';
    }
}

function LoginAlternar() {
    if (document.getElementById('rdnSenha').checked) {
        document.getElementById('txtCep1').value = '';
        document.getElementById('txtCep1').disabled = true;

        document.getElementById('txtSenha').disabled = false;
    }
    else {
        document.getElementById('txtSenha').value = '';
        document.getElementById('txtSenha').disabled = true;

        document.getElementById('txtCep1').disabled = false;
    }
}

function SomenteNumero(e) {
    var key;

    if (window.event) {
        key = event.keyCode;
    }
    else {
        key = e.which;
    }

    if (key > 47 && key < 58 || key == 8 || key == 0) {
        return;
    }
    else {
        if (window.event) {
            window.event.returnValue = null;
        }
        else {
            e.preventDefault();
        }
    }
}

function SomenteNumero2(e, src, mask) {
    SomenteNumero(e);

    var key;

    if (window.event) {
        key = event.keyCode;
    }
    else {
        key = e.which;
    }


    if (key != 8) {
        Mascara(src, mask);
    }
}

function Mascara(src, mask) {
    var i = src.value.length;
    var saida = mask.substring(0, 1);
    var texto = mask.substring(i)
    if (texto.substring(0, 1) != saida) {
        src.value += texto.substring(0, 1);
    }
}

function Mascara2(e, src, mask) {
    var key;

    if (window.event) {
        key = event.keyCode;
    }
    else {
        key = e.which;
    }

    if (key != 8) {
        Mascara(src, mask);
    }
}

function Continuar(tipo) {
    TrocaImagem("loading", "visible");

    var mensagem = "";
    var username = "";
    var cep = "";

    try {
        if (tipo == "S" || tipo == "SA") {
            var username = document.getElementById("txtEmail").value;
        }
        else if (tipo == "P" || tipo == "PA") {
            var username = document.getElementById("txtEmail2").value;
        }

        var password = document.getElementById("txtSenha").value;

        if (document.getElementById("txtCep1")) {
            cep = document.getElementById("txtCep1").value;
        }


        if (Trim(username) == "") {
            mensagem += "Email inválido (vazio) !\n";
        }

        if (tipo == "S" || tipo == "SA") {
            if (Trim(password) == "") {
                mensagem += "Senha inválida (vazia) !\n";
            }
        }
        else if (tipo == "P" || tipo == "PA") {
            if (Trim(cep) == "") {
                mensagem += "CEP inválido (vazio) !\n";
            }
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            if (tipo == "PA" || tipo == "SA") {
                loginAfiliado.Continuar(username, password, cep, tipo, Redirect_callback)
            }
            else {
                login.Continuar(username, password, cep, tipo, Redirect_callback)
            }
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}


function ContinuarPedCodigo() {
    TrocaImagem("loading", "visible");

    try {
        var PedCodigo = document.getElementById("txtPedCodigo").value;

        if (PedCodigo != '') {
            loginpedido.ContinuarPedCodigo(PedCodigo.toString(), ContinuarPedCodigo_Callback)
        }
        else {
            alert('Preencha corretamente o Número do Pedido!');
            TrocaImagem("loading", "hidden");
        }
    }
    catch (err) {
        alert(err.message);
        TrocaImagem("loading", "hidden");
    }
}


function ContinuarPedCodigo_Callback(res) {
    try {
        var txtPedCodigo = document.getElementById("txtPedCodigo");

        if (res.value[0] != null) {
            if (res.value[0] == "true") {
                if (res.value[0] != '') {
                    window.location = res.value[2];
                }
                else {
                    alert('Pedido inválido!');
                }
            }
            else {
                if (res.value[1]) {
                    alert(res.value[1]);
                }
                if (res.value[2]) {
                    window.location = res.value[2];
                }
            }
        }

        txtPedCodigo.value = '';
        TrocaImagem("loading", "hidden");
    }
    catch (err) {
        alert(err.message);
    }

    TrocaImagem("loading", "hidden");
}

// ****************************************************************************************
// Consistencias de preenchimento após tirar o foco do controle
// ****************************************************************************************
function VerificaPreenchimentoNomeEndereco(campo) {
    var spanMsgValidacao = document.getElementById('spanMsgValidacaoNomeEndereco');

    if (Trim(campo.value) != '') {
        spanMsgValidacao.innerHTML = '';
        MudaCorBorda(campo, '#E2E2E2');
    }
    else {
        spanMsgValidacao.innerHTML = '« Preencha o Nome';
        MudaCorBorda(campo, '#88147E');
    }
}

function VerificaPreenchimentoEndEndereco(campo) {
    var spanMsgValidacao = document.getElementById('spanMsgValidacaoEndereco');

    if (Trim(campo.value) != '') {
        spanMsgValidacao.innerHTML = '';
        MudaCorBorda(campo, '#E2E2E2');
    }
    else {
        spanMsgValidacao.innerHTML = '« Preencha o Endereço';
        MudaCorBorda(campo, '#88147E');
    }

    document.getElementById("hdnEndEndereco").value = campo.value;
}

function VerificaPreenchimentoEndCidade(campo) {
    var spanMsgValidacao = document.getElementById('spanMsgValidacaoCidade');

    if (Trim(campo.value) != '') {
        spanMsgValidacao.innerHTML = '';
        MudaCorBorda(campo, '#E2E2E2');
    }
    else {
        spanMsgValidacao.innerHTML = '« Preencha a Cidade';
        MudaCorBorda(campo, '#88147E');
    }

    document.getElementById("hdnEndCidade").value = campo.value;
}
// ****************************************************************************************

function VerificaCEPEndereco(campo, carregaEndereco) {
    var spanMsgValidacao = document.getElementById('spanMsgValidacaoCEP');
    var retorno = ''

    if (Trim(campo.value).replace('-', '') == '') {
        spanMsgValidacao.innerHTML = '« Preencha o CEP';
        retorno = '« Preencha o CEP';
        MudaCorBorda(campo, '#88147E');
    }
    else if ((Number(Trim(campo.value).replace('-', '')).toString() != 'NaN' && Trim(campo.value).replace('-', '').length == 8)) {
        spanMsgValidacao.innerHTML = '';
        MudaCorBorda(campo, '#E2E2E2');
        if (carregaEndereco) {
            CarregaEnderecoEnderecos(Trim(campo.value).replace('-', ''));
        }
    }
    else {
        if (Number(Trim(campo.value).replace('-', '')).toString() == 'NaN') {
            spanMsgValidacao.innerHTML = '« CEP inválido';
            retorno = '« CEP inválido';
        }
        else {
            spanMsgValidacao.innerHTML = '« CEP incompleto';
            retorno = '« CEP incompleto';
        }

        MudaCorBorda(campo, '#88147E');
    }
    return retorno;
}

function CarregaEnderecoEnderecos(cep) {
    var CEP = cep.replace("-", "");
    TrocaImagem("loading", "visible");

    if (Number(CEP).toString() != 'NaN') {
        enderecos.CarregaEnderecoEnderecos(cep, callback_CarregaEnderecoEnderecos)
    }
}

function callback_CarregaEnderecoEnderecos(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value[3]) {
        if (res.value[0]) {
            document.getElementById("txtEndereco").value = res.value[0];

            // Campo Hidden para controlar endereço
            document.getElementById("hdnEndEndereco").value = res.value[0];
        }
        else {
            document.getElementById("txtEndereco").value = "";

            // Campo Hidden para controlar endereço
            document.getElementById("hdnEndEndereco").value = "";
        }

        if (res.value[1]) {
            document.getElementById("txtBairro").value = res.value[1];
        }
        else {
            document.getElementById("txtBairro").value = "";
        }

        if (res.value[2]) {
            document.getElementById("txtCidade").value = res.value[2];

            // Campo Hidden para controlar cidade
            document.getElementById("hdnEndCidade").value = res.value[2];
        }
        else {
            document.getElementById("txtCidade").value = "";

            // Campo Hidden para controlar cidade
            document.getElementById("hdnEndCidade").value = "";
        }

        if (res.value[3]) {
            document.getElementById("ddlEstado").value = res.value[3];

            // Campo Hidden para controlar estado
            document.getElementById("hdnEndEstado").value = res.value[3];
        }
        else {
            document.getElementById("ddlEstado").value = "SP";

            // Campo Hidden para controlar estado
            document.getElementById("hdnEndEstado").value = "SP";
        }

        // Caso endereço seja preenchido, esconde mensagem de erro e muda cor de borda para normal
        if (document.getElementById("txtEndereco")) {
            VerificaPreenchimentoEndEndereco(document.getElementById("txtEndereco"));
        }

        if (document.getElementById("txtBairro")) {
            VerificaPreenchimentoBairro(document.getElementById("txtBairro"));
        }

        if (document.getElementById("txtCidade")) {
            VerificaPreenchimentoEndCidade(document.getElementById("txtCidade"));
        }

        // Desabilita ou habilita campos, dependendo do retorno do Ajax
        /*	if (res.value[0] != "")
        {
        document.getElementById("txtEndereco").disabled = true;
        }
        else
        {
        document.getElementById("txtEndereco").disabled = false;
        }
            
        if (res.value[2] != "")
        {
        document.getElementById("txtCidade").disabled = true;
        }
        else
        {
        document.getElementById("txtCidade").disabled = false;
        }
            
        if (res.value[3] != "")
        {
        document.getElementById("ddlEstado").disabled = true;
        }
        else
        {
        document.getElementById("ddlEstado").disabled = false;
        }  */
    }
    else {
        document.getElementById("txtEndereco").value = "";
        document.getElementById("txtBairro").value = "";
        document.getElementById("txtCidade").value = "";
        document.getElementById("ddlEstado").value = "SP";

        // Campo Hidden para controlar endereço
        document.getElementById("hdnEndEndereco").value = "";

        // Campo Hidden para controlar cidade
        document.getElementById("hdnEndCidade").value = "";

        // Campo Hidden para controlar estado
        document.getElementById("hdnEndEstado").value = "SP";

        // Desabilita campos que não vieram carregados do Ajax
        document.getElementById("txtEndereco").disabled = false;

        document.getElementById("txtCidade").disabled = false;

        document.getElementById("ddlEstado").disabled = false;
    }
}

function UsarEndereco(EnderecoCodigo) {
    TrocaImagem("loading", "visible");
    enderecos.UsarEndereco(EnderecoCodigo.toString(), Redirect_callback);
}

function EditarEndereco(EnderecoCodigo) {
    TrocaImagem("loading", "visible");
    enderecos.EditarEndereco(EnderecoCodigo.toString(), callback_EditarEndereco);
}

function callback_EditarEndereco(res) {
    if (res.error) {
        document.location.href = res.error.Message;
    }

    if (res.value) {
        if (res.value[0]) {
            document.getElementById("txtCep").value = res.value[0];
        }
        if (res.value[1]) {
            document.getElementById("ddlEndereco").value = res.value[1];
        }
        if (res.value[2]) {
            document.getElementById("txtEndereco").value = res.value[2];
            document.getElementById("hdnEndEndereco").value = res.value[2];
        }
        if (res.value[3]) {
            document.getElementById("txtNumero").value = res.value[3];
        }
        if (res.value[4]) {
            document.getElementById("txtComplemento").value = res.value[4];
        }
        else {
            document.getElementById("txtComplemento").value = '';
        }
        if (res.value[5]) {
            document.getElementById("txtBairro").value = res.value[5];
        }
        if (res.value[6]) {
            document.getElementById("txtCidade").value = res.value[6];
            document.getElementById("hdnEndCidade").value = res.value[6];
        }
        if (res.value[7]) {
            document.getElementById("ddlEstado").value = res.value[7];
            document.getElementById("hdnEndEstado").value = res.value[7];
        }
        //if (res.value[8])
        //{
        //	document.getElementById("ddlPais").value = res.value[8];
        //}
        if (res.value[9]) {
            document.getElementById("txtTel1Ddd").value = res.value[9];
        }
        if (res.value[10]) {
            document.getElementById("txtTel1").value = res.value[10];
        }
        if (res.value[11]) {
            document.getElementById("txtRamal1").value = res.value[11];
        }
        else {
            document.getElementById("txtRamal1").value = '';
        }
        if (res.value[12]) {
            document.getElementById("txtTel2Ddd").value = res.value[12];
        }
        else {
            document.getElementById("txtTel2Ddd").value = '';
        }
        if (res.value[13]) {
            document.getElementById("txtTel2").value = res.value[13];
        }
        else {
            document.getElementById("txtTel2").value = '';
        }
        if (res.value[14]) {
            document.getElementById("txtRamal2").value = res.value[14];
        }
        else {
            document.getElementById("txtRamal2").value = '';
        }
        if (res.value[15]) {
            document.getElementById("txtTel3Ddd").value = res.value[15];
        }
        else {
            document.getElementById("txtTel3Ddd").value = '';
        }
        if (res.value[16]) {
            document.getElementById("txtTel3").value = res.value[16];
        }
        else {
            document.getElementById("txtTel3").value = '';
        }
        if (res.value[17]) {
            document.getElementById("txtRamal3").value = res.value[17];
        }
        else {
            document.getElementById("txtRamal3").value = '';
        }
        if (res.value[18]) {
            document.getElementById("txtTelCelDdd").value = res.value[18];
        }
        else {
            document.getElementById("txtTelCelDdd").value = '';
        }
        if (res.value[19]) {
            document.getElementById("txtTelCel").value = res.value[19];
        }
        else {
            document.getElementById("txtTelCel").value = '';
        }
        if (res.value[20]) {
            document.getElementById("txtTelFaxDdd").value = res.value[20];
        }
        else {
            document.getElementById("txtTelFaxDdd").value = '';
        }
        if (res.value[21]) {
            document.getElementById("txtTelFax").value = res.value[21];
        }
        else {
            document.getElementById("txtTelFax").value = '';
        }
        if (res.value[22]) {
            document.getElementById("txtRefEndereco").value = res.value[22];
        }
        else {
            document.getElementById("txtRefEndereco").value = '';
        }
        if (res.value[23]) {
            document.getElementById("ddlTipoLog").value = res.value[23];
        }
        if (res.value[24]) {
            document.getElementById("txtNomeEndereco").value = res.value[24];
        }

        document.getElementById("spanMsgValidacaoNomeEndereco").innerHTML = "";
        document.getElementById("spanMsgValidacaoCEP").innerHTML = "";
        document.getElementById("spanMsgValidacaoEndereco").innerHTML = "";
        document.getElementById("spanMsgValidacaoNumero").innerHTML = "";
        document.getElementById("spanMsgValidacaoBairro").innerHTML = "";
        document.getElementById("spanMsgValidacaoCidade").innerHTML = "";
        document.getElementById("spanMsgValidacaoTel1").innerHTML = "";
        document.getElementById("spanMsgValidacaoTel2").innerHTML = "";
        document.getElementById("spanMsgValidacaoTel3").innerHTML = "";
        document.getElementById("spanMsgValidacaoTelCel").innerHTML = "";
        document.getElementById("spanMsgValidacaoTelFax").innerHTML = "";

        MudaCorBorda(document.getElementById("txtNomeEndereco"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtCep"), '#E2E2E2');
        MudaCorBorda(document.getElementById("ddlEndereco"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtEndereco"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtNumero"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtBairro"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtCidade"), '#E2E2E2');
        MudaCorBorda(document.getElementById("ddlEstado"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel1Ddd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel1"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel2Ddd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel2"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel3Ddd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel3"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelCelDdd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelCel"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelFaxDdd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelFax"), '#E2E2E2');

        document.getElementById("BtnSalvarEndereco").src = res.value[25];
        document.getElementById("p_LimparEndereco").style.display = "inline";
        TrocaImagem("loading", "hidden");
        window.location.href = "#e";
    }
}

function CancelarEndereco() {
    TrocaImagem("loading", "visible");
    enderecos.CancelarEndereco(callback_CancelarEndereco);
}

function callback_CancelarEndereco(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value[0]) {
        document.getElementById("txtCep").value = "";
        document.getElementById("ddlEndereco").selectedIndex = 0;
        document.getElementById("txtEndereco").value = "";
        document.getElementById("txtNumero").value = "";
        document.getElementById("txtComplemento").value = "";
        document.getElementById("txtBairro").value = "";
        document.getElementById("txtCidade").value = "";
        document.getElementById("ddlEstado").value = "SP";
        //document.getElementById("ddlPais").value = "31";
        document.getElementById("txtTel1Ddd").value = "";
        document.getElementById("txtTel1").value = "";
        document.getElementById("txtRamal1").value = "";
        document.getElementById("txtTel2Ddd").value = "";
        document.getElementById("txtTel2").value = "";
        document.getElementById("txtRamal2").value = "";
        document.getElementById("txtTel3Ddd").value = "";
        document.getElementById("txtTel3").value = "";
        document.getElementById("txtRamal3").value = "";
        document.getElementById("txtTelCelDdd").value = "";
        document.getElementById("txtTelCel").value = "";
        document.getElementById("txtTelFaxDdd").value = "";
        document.getElementById("txtTelFax").value = "";
        document.getElementById("txtRefEndereco").value = "";
        document.getElementById("ddlTipoLog").selectedIndex = 0;
        document.getElementById("txtNomeEndereco").value = "";
        document.getElementById("BtnSalvarEndereco").src = res.value[1];

        document.getElementById("spanMsgValidacaoNomeEndereco").innerHTML = "";
        document.getElementById("spanMsgValidacaoCEP").innerHTML = "";
        document.getElementById("spanMsgValidacaoEndereco").innerHTML = "";
        document.getElementById("spanMsgValidacaoNumero").innerHTML = "";
        document.getElementById("spanMsgValidacaoBairro").innerHTML = "";
        document.getElementById("spanMsgValidacaoCidade").innerHTML = "";
        document.getElementById("spanMsgValidacaoTel1").innerHTML = "";
        document.getElementById("spanMsgValidacaoTel2").innerHTML = "";
        document.getElementById("spanMsgValidacaoTel3").innerHTML = "";
        document.getElementById("spanMsgValidacaoTelCel").innerHTML = "";
        document.getElementById("spanMsgValidacaoTelFax").innerHTML = "";

        MudaCorBorda(document.getElementById("txtNomeEndereco"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtCep"), '#E2E2E2');
        MudaCorBorda(document.getElementById("ddlEndereco"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtEndereco"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtNumero"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtBairro"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtCidade"), '#E2E2E2');
        MudaCorBorda(document.getElementById("ddlEstado"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel1Ddd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel1"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel2Ddd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel2"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel3Ddd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTel3"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelCelDdd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelCel"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelFaxDdd"), '#E2E2E2');
        MudaCorBorda(document.getElementById("txtTelFax"), '#E2E2E2');

        TrocaImagem("loading", "hidden");

        document.getElementById("p_LimparEndereco").style.display = "none";
    }
}

function ExcluirEndereco(EnderecoCodigo) {
    TrocaImagem("loading", "visible");

    if (confirm("Tem certeza que deseja excluir o endereço escolhido?")) {
        enderecos.ExcluirEndereco(EnderecoCodigo.toString(), Redirect_callback);
    }
    else {
        TrocaImagem("loading", "hidden");
    }
}

function SalvarEndereco() {
    var mensagem = "";

    TrocaImagem("loading", "visible");

    try {
        var retorno = true;

        var formcadastro_txtNomeEndereco = document.getElementById('txtNomeEndereco');

        var formcadastro_txtCep = document.getElementById('txtCep');
        var formcadastro_txtEndereco = document.getElementById('hdnEndEndereco');
        var formcadastro_Aux_txtEndereco = document.getElementById('txtEndereco');
        var formcadastro_txtNumero = document.getElementById('txtNumero');
        var formcadastro_txtComplemento = document.getElementById('txtComplemento');
        var formcadastro_txtBairro = document.getElementById('txtBairro');
        var formcadastro_txtCidade = document.getElementById('hdnEndCidade');
        var formcadastro_Aux_txtCidade = document.getElementById('txtCidade');

        var formcadastro_txtTel1Ddd = document.getElementById('txtTel1Ddd');
        var formcadastro_txtTel1 = document.getElementById('txtTel1');
        var formcadastro_txtRamal1 = document.getElementById('txtRamal1');

        var formcadastro_txtTel2Ddd = document.getElementById('txtTel2Ddd');
        var formcadastro_txtTel2 = document.getElementById('txtTel2');
        var formcadastro_txtRamal2 = document.getElementById('txtRamal2');

        var formcadastro_txtTel3Ddd = document.getElementById('txtTel3Ddd');
        var formcadastro_txtTel3 = document.getElementById('txtTel3');
        var formcadastro_txtRamal3 = document.getElementById('txtRamal3');

        var formcadastro_txtTelCelDdd = document.getElementById('txtTelCelDdd');
        var formcadastro_txtTelCel = document.getElementById('txtTelCel');

        var formcadastro_txtTelFaxDdd = document.getElementById('txtTelFaxDdd');
        var formcadastro_txtTelFax = document.getElementById('txtTelFax');

        MudaCorBorda(formcadastro_txtNomeEndereco, '#E2E2E2');
        MudaCorBorda(formcadastro_txtCep, '#E2E2E2');
        MudaCorBorda(formcadastro_Aux_txtEndereco, '#E2E2E2');
        MudaCorBorda(formcadastro_txtNumero, '#E2E2E2');
        MudaCorBorda(formcadastro_txtComplemento, '#E2E2E2');
        MudaCorBorda(formcadastro_txtBairro, '#E2E2E2');
        MudaCorBorda(formcadastro_Aux_txtCidade, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTel1Ddd, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTel1, '#E2E2E2');
        MudaCorBorda(formcadastro_txtRamal1, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTel2Ddd, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTel2, '#E2E2E2');
        MudaCorBorda(formcadastro_txtRamal2, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTel3Ddd, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTel3, '#E2E2E2');
        MudaCorBorda(formcadastro_txtRamal3, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTelCelDdd, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTelCel, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTelFaxDdd, '#E2E2E2');
        MudaCorBorda(formcadastro_txtTelFax, '#E2E2E2');

        for (j = 0; j < document.getElementsByTagName("span").length; j++) {
            var spanMsgValidacao = document.getElementsByTagName("span")[j];

            if (spanMsgValidacao.id.indexOf('spanMsgValidacao') > -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoEmail') == -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoCPF') == -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoCNPJ') == -1 && spanMsgValidacao.id.indexOf('spanMsgValidacaoCodigoSeguranca') == -1) {
                spanMsgValidacao.innerHTML = '';
            }
        }

        if (Trim(formcadastro_txtCep.value).replace('-', '') == '') {
            document.getElementById('spanMsgValidacaoCEP').innerHTML = '« Preencha o CEP';
            retorno = false;
            MudaCorBorda(formcadastro_txtCep, '#88147E');
        }

        if (Trim(formcadastro_txtNomeEndereco.value).replace('-', '') == '') {
            document.getElementById('spanMsgValidacaoNomeEndereco').innerHTML = '« Preencha o Nome';
            retorno = false;
            MudaCorBorda(formcadastro_txtNomeEndereco, '#88147E');
        }

        if (Trim(formcadastro_txtCep.value).replace('-', '') != '' && VerificaCEPEndereco(formcadastro_txtCep, false) != '') {
            retorno = false;
            MudaCorBorda(formcadastro_txtCep, '#88147E');
        }

        if (Trim(formcadastro_txtEndereco.value) == '') {
            document.getElementById('spanMsgValidacaoEndereco').innerHTML = '« Preencha o Endereço';
            retorno = false;
            MudaCorBorda(formcadastro_Aux_txtEndereco, '#88147E');
        }

        if (Trim(formcadastro_txtNumero.value) == '') {
            document.getElementById('spanMsgValidacaoNumero').innerHTML = '« Preencha o Número';
            retorno = false;
            MudaCorBorda(formcadastro_txtNumero, '#88147E');
        }

        if (Trim(formcadastro_txtBairro.value) == '') {
            document.getElementById('spanMsgValidacaoBairro').innerHTML = '« Preencha o Bairro';
            retorno = false;
            MudaCorBorda(formcadastro_txtBairro, '#88147E');
        }

        if (Trim(formcadastro_txtCidade.value) == '') {
            document.getElementById('spanMsgValidacaoCidade').innerHTML = '« Preencha a Cidade';
            retorno = false;
            MudaCorBorda(formcadastro_Aux_txtCidade, '#88147E');
        }

        if (Trim(formcadastro_txtTel1Ddd.value) == '' && Trim(formcadastro_txtTel1.value) == '') {
            document.getElementById('spanMsgValidacaoTel1').innerHTML = '« Preencha o Telefone 1';
            retorno = false;
            MudaCorBorda(formcadastro_txtTel1Ddd, '#88147E');
            MudaCorBorda(formcadastro_txtTel1, '#88147E');
        }

        if (document.getElementById('spanMsgValidacaoTel1').innerHTML == '' && VerificaTelefone('1') != '') {
            retorno = false;
            MudaCorBorda(formcadastro_txtTel1Ddd, '#88147E');
            MudaCorBorda(formcadastro_txtTel1, '#88147E');

            if (document.getElementById('spanMsgValidacaoTel1').innerHTML.indexOf('Ramal') > -1) {
                MudaCorBorda(formcadastro_txtRamal1, '#88147E');
            }
        }

        if (VerificaTelefone('2') != '') {
            retorno = false;
            MudaCorBorda(formcadastro_txtTel2Ddd, '#88147E');
            MudaCorBorda(formcadastro_txtTel2, '#88147E');

            if (document.getElementById('spanMsgValidacaoTel2').innerHTML.indexOf('Ramal') > -1) {
                MudaCorBorda(formcadastro_txtRamal2, '#88147E');
            }
        }

        if (VerificaTelefone('3') != '') {
            retorno = false;
            MudaCorBorda(formcadastro_txtTel3Ddd, '#88147E');
            MudaCorBorda(formcadastro_txtTel3, '#88147E');

            if (document.getElementById('spanMsgValidacaoTel3').innerHTML.indexOf('Ramal') > -1) {
                MudaCorBorda(formcadastro_txtRamal3, '#88147E');
            }
        }

        if (VerificaTelefone('Cel') != '') {
            retorno = false;
            MudaCorBorda(formcadastro_txtTelCelDdd, '#88147E');
            MudaCorBorda(formcadastro_txtTelCel, '#88147E');
        }

        if (VerificaTelefone('Fax') != '') {
            retorno = false;
            MudaCorBorda(formcadastro_txtTelFax, '#88147E');
            MudaCorBorda(formcadastro_txtTelFax, '#88147E');
        }


        if (!retorno) {
            alert('Atenção!\n\rHá informações não preenchidas corretamente!');
        }
        else {
            enderecos.SalvarEndereco(document.getElementById("txtCep").value, document.getElementById("ddlEndereco").value, document.getElementById("hdnEndEndereco").value, document.getElementById("txtNumero").value, document.getElementById("txtComplemento").value, document.getElementById("txtBairro").value, document.getElementById("hdnEndCidade").value, document.getElementById("hdnEndEstado").value, "31", document.getElementById("txtTel1Ddd").value, document.getElementById("txtTel1").value, document.getElementById("txtRamal1").value, document.getElementById("txtTel2Ddd").value, document.getElementById("txtTel2").value, document.getElementById("txtRamal2").value, document.getElementById("txtTel3Ddd").value, document.getElementById("txtTel3").value, document.getElementById("txtRamal3").value, document.getElementById("txtTelCelDdd").value, document.getElementById("txtTelCel").value, document.getElementById("txtTelFaxDdd").value, document.getElementById("txtTelFax").value, document.getElementById("txtRefEndereco").value, document.getElementById("ddlTipoLog").value, document.getElementById("txtNomeEndereco").value, Redirect_callback)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function Redirect_callback(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");

        if (document.getElementById("btComprarProduto") && document.getElementById("btAguarde")) {
            document.getElementById("btComprarProduto").style.display = 'block';
            document.getElementById("btAguarde").style.display = 'none';
        }
    }

    if (res.value) {
        window.location.href = res.value;
    }
}

function CancelarCupom() {
    index.CancelarCupom(callback_CancelarCupom);
}

function callback_CancelarCupom(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value) {
        window.location.href = res.value;
    }
}

function CalcularFrete() {
    try {
        var mensagem = "";

        TrocaImagem("loading", "visible");

        if (document.getElementById("CEP")) {
            if (document.getElementById("CEP").value.length < 1) {
                mensagem += "CEP inválido (vazio) !\n";
            }
            else {
                if (document.getElementById("CEP").value.replace('-', '').length < 8) {
                    mensagem += "CEP inválido (incompleto) !\n";
                }
            }

            if (mensagem != "") {
                alert(mensagem);
                TrocaImagem("loading", "hidden");
            }
            else {
                index.CalcularFrete(document.getElementById("CEP").value.replace("-", ""), callback_CalcularFrete)
            }
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_CalcularFrete(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        document.getElementById("Cupom").value = "";
    }

    if (res.value) {
        window.location.href = res.value;
    }
}

function CalcularCupom() {
    try {
        var mensagem = "";

        TrocaImagem("loading", "visible");

        if (document.getElementById("Cupom")) {
            if (document.getElementById("Cupom").value.length < 1) {
                mensagem += "Cupom inválido (vazio) !\n";
            }
            else {
                if (document.getElementById("Cupom").value.length < 36) {
                    mensagem += "Cupom inválido (incompleto) !\n";
                }
            }

            if (mensagem != "") {
                alert(mensagem);
                TrocaImagem("loading", "hidden");
            }
            else {
                index.CalcularCupom(document.getElementById("Cupom").value.toString(), callback_CalcularCupom)
            }
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_CalcularCupom(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
        document.getElementById("Cupom").value = "";
    }

    if (res.value) {
        if (res.value.indexOf('login.aspx') != -1) {
            alert('Para validar um vale-presente é preciso estar logado!');
        }
        if (res.value.indexOf('contacorrente.aspx') != -1) {
            alert('Validação de vale-presente realizada com sucesso!');
            document.getElementById("Cupom").value = "";
            return;
        }
        window.location.href = res.value;
    }
}

function Contagem(qtde, campotxt, campoqtde) {
    field = document.getElementById(campotxt.name);
    if (field) {
        if (field.value.length >= Number(qtde)) {
            field.value = field.value.substring(0, qtde);
        }
    }
    txt_field = document.getElementById(campoqtde);
    if (txt_field) {
        txt_field.innerHTML = campotxt.value.length;
    }
}

function SelecionaNota(nota) {
    var estrelas = document.getElementById("spanAvaliacao");

    if (estrelas != null) {
        estrelas.style.width = (nota.value * 20).toString() + '%';
    }
}

function Avaliar(nota) {
    for (i = 1; i <= 5; i++) {
        document.getElementById("star" + i).src = (i <= nota ? document.getElementById("star" + i).src.replace("imgoff", "ok").replace("imgon", "ok") : document.getElementById("star" + i).src);
    }

    document.getElementById("txtNota").value = nota;

    ResetPreview();
}

function Preview(nota) {
    for (i = 1; i <= 5; i++) {
        document.getElementById("star" + i).src = (i <= nota ? document.getElementById("star" + i).src.replace("imgoff", "imgon").replace("ok", "imgon") : document.getElementById("star" + i).src);
    }
}

function ResetPreview() {
    var nota = 0;

    if (document.getElementById("txtNota").value.length > 0) {
        nota = Number(document.getElementById("txtNota").value)

        for (i = 1; i <= 5; i++) {
            document.getElementById("star" + i).src = (i <= nota ? document.getElementById("star" + i).src.replace("imgoff", "ok").replace("imgon", "ok") : document.getElementById("star" + i).src.replace("imgon", "imgoff").replace("ok", "imgoff"));
        }
    }
    else {
        for (i = 1; i <= 5; i++) {
            document.getElementById("star" + i).src = document.getElementById("star" + i).src.replace("imgon", "imgoff").replace("ok", "imgoff");
        }
    }
}

var ProdutoCodigoGlobal;
function SalvarTag(ProdutoCodigo) {
    TrocaImagem("loading", "visible");
    try {
        var TagNome = document.getElementById("txtTag").value;
        if (TagNome == "") {
            window.alert("Tag inválida (vazio).");
            TrocaImagem("loading", "hidden");
            return;
        }
        detalhes.SalvarTag(TagNome, ProdutoCodigo.toString(), callback_SalvarTag);
        ProdutoCodigoGlobal = ProdutoCodigo;
    }
    catch (exc) {
        window.alert(exc.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_SalvarTag(res) {
    if (res.error) {
        if (res.error.Message.indexOf("http://") > -1 || res.error.Message.indexOf("https://") > -1) {
            window.location = res.error.Message;
        }
        else {
            AlertaErroAjax(res.error);
        }

        //window.AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
        return;
    }

    if (res.value) {
        Tagar();
        window.alert(res.value);
        document.getElementById("txtTag").value = "";

        if (document.getElementById('TextoTag').innerHTML.indexOf('Seja o primeiro a incluir uma TAG') > -1) {
            document.getElementById('TextoTag').innerHTML = 'Deixe sua TAG para este produto';
        }

        detalhes.CarregaTags(ProdutoCodigoGlobal.toString(), callback_CarregaTags);

        TrocaImagem("loading", "hidden");
    }
}

function callback_CarregaTags(res) {
    if (res.error) {
        window.AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
        return;
    }
    if (res.value) {
        document.getElementById("TagsProduto").innerHTML = res.value;
        TrocaImagem("loading", "hidden");
    }
}

function SalvarOpiniao(ProdutoCodigo, botao) {
    var mensagem = "";
    TrocaImagem("loading", "visible");
    OmitirBotao(botao);

    var Nota = "";
    var Nome = "";
    var Email = "";
    var Comentario = "";
    var ExibeEmail = "";

    try {
        if (Trim(document.getElementById("txtNome").value) == "") {
            mensagem += "Nome inválido (vazio)!\n";
            document.getElementById("txtNome").focus();
        }
        else if (Trim(document.getElementById("txtEmail").value) == "") {
            mensagem += "E-mail inválido (vazio)!\n";
            document.getElementById("txtEmail").focus();
        }
        else if (!(ValidaEmail(Trim(document.getElementById("txtEmail").value)))) {
            mensagem += "E-mail inválido!\n";
            document.getElementById("txtEmail").focus();
        }
        else if (Trim(document.getElementById("txtDescricao").value) == "") {
            mensagem += "Comentário inválido (vazio)!\n";
            document.getElementById("txtDescricao").focus();
        }
        else if (Trim(document.getElementById("txtNota").value) == "") {
            mensagem += "Nota inválida (vazia)!\n";
            document.getElementById("txtNota").focus();
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
            MostrarBotao(botao);
        }
        else {
            Nota = document.getElementById("txtNota").value;
            Nome = document.getElementById("txtNome").value;
            Email = document.getElementById("txtEmail").value;
            Comentario = document.getElementById("txtDescricao").value;

            avalie.SalvarOpiniao(ProdutoCodigo.toString(), Nome, Email, Comentario, Nota.toString(), "true", callback_SalvarOpiniao)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
        MostrarBotao(botao);
    }
}

function callback_SalvarOpiniao(res) {
    if (res.error) {
        document.location.href = res.error.Message;
    }

    if (res.value) {
        alert(res.value);

        document.getElementById("txtNota").value = "";
        document.getElementById("txtNome").value = "";
        document.getElementById("txtEmail").value = "";
        document.getElementById("txtDescricao").value = "";

        MostrarBotao(document.getElementById("btOpiniaoEnviar"));

        ResetPreview();
    }
}

function ExisteAncora() {
    detalhes.ExisteAncora(callback_ExisteAncora);
}

function callback_ExisteAncora(res) {
    if (res.value != "") {
        if (res.value == 'tag') {
            document.getElementById("Tag_container").style.display = "inline";
        }

        window.location.href = "#" + res.value;
    }
}

function Tagar() {
    detalhes.ExisteSessao(callback_ExisteSessao);
}

function callback_ExisteSessao(res) {
    if (res.value != "") {
        window.location = res.value;
        return;
    }
    try {
        try {
            if (document.getElementById("indique_container")) {
                document.getElementById("indique_container").style.display = "none";
            }

            if (document.getElementById("opine_container")) {
                document.getElementById("opine_container").style.display = "none";
            }

            if (document.getElementById("Tag_container")) {
                if (document.getElementById("Tag_container").style.display == "none" || document.getElementById("Tag_container").style.display == "") {
                    document.getElementById("Tag_container").style.display = "inline";
                }
                else {
                    document.getElementById("Tag_container").style.display = "none";
                }
            }
        }
        catch (err) {
        }
    }
    catch (err) {
    }
}

function Opinar(exibe) {
    try {
        if (document.getElementById("indique_container")) {
            document.getElementById("indique_container").style.display = "none";
        }

        if (document.getElementById("Tag_container")) {
            document.getElementById("Tag_container").style.display = "none";
        }

        if (document.getElementById("opine_container")) {
            if (document.getElementById("opine_container").style.display == "none" || document.getElementById("opine_container").style.display == "" || exibe == 'sim') {
                document.getElementById("opine_container").style.display = "inline";
            }
            else {
                document.getElementById("opine_container").style.display = "none";
            }
        }

        window.location.href = "#O";
    }
    catch (err) {
    }
}

function Indicar() {
    try {
        if (document.getElementById("opine_container")) {
            document.getElementById("opine_container").style.display = "none";
        }

        if (document.getElementById("Tag_container")) {
            document.getElementById("Tag_container").style.display = "none";
        }

        if (document.getElementById("indique_container")) {
            if (document.getElementById("indique_container").style.display == "none" || document.getElementById("indique_container").style.display == "") {
                document.getElementById("indique_container").style.display = "inline";
            }
            else {
                document.getElementById("indique_container").style.display = "none";
            }
        }

        window.location.href = "#O";
    }
    catch (err) {
    }
}

function EnviaIndicacao(botao) {
    var Mensagem = "";
    var NomeAmigo = "";
    var EmailAmigo = "";
    var NomeRemetente = "";
    var EmailRemetente = "";
    var MsgIndicacao = "";

    OmitirBotao(botao);

    try {
        NomeAmigo = Trim(document.getElementById("txtNomeAmigo").value);
        EmailAmigo = Trim(document.getElementById("txtEmailAmigo").value);
        NomeRemetente = Trim(document.getElementById("txtRemetente").value);
        EmailRemetente = Trim(document.getElementById("txtEmailRemetente").value);
        MsgIndicacao = Trim(document.getElementById("txtMensagem").value);

        if (NomeAmigo == "") {
            Mensagem += "Preencha o nome do amigo!\n";
            document.getElementById("txtNomeAmigo").focus();
        }
        else if (EmailAmigo == "") {
            Mensagem += "Prencha o e-mail do amigo!\n";
            document.getElementById("txtEmailAmigo").focus();
        }
        else if (!(ValidaEmail(EmailAmigo))) {
            Mensagem += "Preencha corretamente o e-mail do amigo!\n";
            document.getElementById("txtEmailAmigo").focus();
        }
        else if (NomeRemetente == "") {
            Mensagem += "Preencha seu nome!\n";
            document.getElementById("txtRemetente").focus();
        }
        else if (EmailRemetente == "") {
            Mensagem += "Preencha seu e-mail!\n";
            document.getElementById("txtEmailRemetente").focus();
        }
        else if (!(ValidaEmail(EmailRemetente))) {
            Mensagem += "Preencha corretamente seu e-mail!\n";
            document.getElementById("txtEmailRemetente").focus();
        }
        if (Mensagem != "") {
            alert(Mensagem);
            TrocaImagem("loading", "hidden");
            MostrarBotao(botao);
        }
        else {
            indique.EnviaIndicacao(NomeAmigo, EmailAmigo, NomeRemetente, EmailRemetente, MsgIndicacao, callback_EnviaIndicacao)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
        MostrarBotao(botao);
    }
}

function callback_EnviaIndicacao(res) {
    if (res.error) {
        TrocaImagem("loading", "hidden");
        window.location.href = window.location;
    }

    if (res.value[0]) {
        document.getElementById("txtNomeAmigo").value = "";
        document.getElementById("txtEmailAmigo").value = "";
        document.getElementById("txtMensagem").value = "";
        document.getElementById("txtRemetente").value = "";
        document.getElementById("txtEmailRemetente").value = "";

        alert(res.value[0]);

        if (res.value[1]) {
            window.location.href = res.value[1];
        }
        else {
            MostrarBotao(document.getElementById('btIndicacaoEnviar'));
        }

        TrocaImagem("loading", "hidden");
    }
}

function GuardarAviso() {
    GuardarAviso(0);
}

function GuardarAviso(ProdutoCodigo, ProdutoValorCaracteristicaCodigo) {
    var Email = Trim(document.getElementById("txtEmailAviso_" + ProdutoCodigo + "_" + ProdutoValorCaracteristicaCodigo).value);
    var mensagem = "";

    TrocaImagem("loading", "visible");

    try {
        if (Trim(Email) == "") {
            mensagem += "Preencha o E-mail!\n";
            document.getElementById("txtEmailAviso_" + ProdutoCodigo + "_" + ProdutoValorCaracteristicaCodigo).focus();
            document.getElementById("txtEmailAviso_" + ProdutoCodigo + "_" + ProdutoValorCaracteristicaCodigo).select();
        }
        else if (!ValidaEmail(Trim(Email))) {
            mensagem += "E-mail inválido!\n";
            document.getElementById("txtEmailAviso_" + ProdutoCodigo + "_" + ProdutoValorCaracteristicaCodigo).focus();
            document.getElementById("txtEmailAviso_" + ProdutoCodigo + "_" + ProdutoValorCaracteristicaCodigo).select();
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            OmitirBotao(document.getElementById('aAvisar' + ProdutoCodigo.toString() + '_' + ProdutoValorCaracteristicaCodigo.toString()));
            detalhes.GuardarAviso(Email, ProdutoCodigo.toString(), ProdutoValorCaracteristicaCodigo.toString(), callback_GuardarAviso)
        }
    }
    catch (err) {
        alert(err.description);
        MostrarBotao(document.getElementById('aAvisar' + ProdutoCodigo.toString() + '_' + ProdutoValorCaracteristicaCodigo.toString()));
        TrocaImagem("loading", "hidden");
    }
}

function callback_GuardarAviso(res) {
    if (res.error) {
        document.location.href = res.error.Message;
    }
    else {
        if (res.value[0]) {
            alert(res.value[0]);
            document.getElementById(res.value[1]).value = "";
            MostrarBotao(document.getElementById('aAvisar' + res.value[1].toString().substring(14, res.value[1].toString().length)));
            TrocaImagem("loading", "hidden");
        }
    }
}

function janela(hp, width, height, texto) {
    if (!width || width == "") {
        width = window.screen.width;
    }

    if (!height || height == "") {
        height = window.screen.height;
    }

    var w = window.screen.width;
    var h = window.screen.height;
    var l = (w - width) / 2;
    var t = (h - height) / 2;

    wAbout = window.open(hp, texto, "fullscreen=0, toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=1, resizable=1, top=" + t + ", left=" + l + ", width=" + width + ",height=" + height + " ");

    if (!wAbout) {
        alert('ATENÇÃO!\n\nHouve um erro ao abrir a janela.\nVocê pode estar com algum bloqueador de PopUp ligado.');
    }
    else {
        wAbout.focus();
    }
}

function janelaConsultaFrete(hp, width, height, texto) {
    if (!width || width == "") {
        width = window.screen.width;
    }

    if (!height || height == "") {
        height = window.screen.height;
    }

    var w = window.screen.width;
    var h = window.screen.height;
    var l = (w - width) / 2;
    var t = (h - height) / 2;

    wAbout = window.open(hp, texto, "fullscreen=0, toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0, top=" + t + ", left=" + l + ", width=" + width + ",height=" + height + " ");

    if (!wAbout) {
        alert('ATENÇÃO!\n\nHouve um erro ao abrir a janela.\nVocê pode estar com algum bloqueador de PopUp ligado.');
    }
    else {
        wAbout.focus();
    }
}

function janelaHipercard(url, width, height, texto) {

    if (!width || width == "") {
        width = window.screen.width;
    }

    if (!height || height == "") {
        height = window.screen.height;
    }

    var w = window.screen.width;
    var h = window.screen.height;
    var l = (w - width) / 2;
    var t = (h - height) / 2;

    window.showModalDialog(url, texto, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;fullscreen=0, toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0, top=" + t + ", left=" + l);




}


function Mostra(quem, tammax) {
    VerifiqueTAB = true;

    if (quem.value.length == tammax && VerifiqueTAB) {
        var i = 0, j = 0, indice = -1;

        for (i = 0; i < document.forms.length; i++) {
            for (j = 0; j < document.forms[i].elements.length; j++) {
                if (document.forms[i].elements[j].name == quem.name) {
                    indice = i;
                    break;
                }
            }
            if (indice != -1) {
                break;
            }
        }
        for (i = 0; i <= document.forms[indice].elements.length; i++) {
            if (document.forms[indice].elements[i].name == quem.name) {
                try {
                    while ((document.forms[indice].elements[(i + 1)].type == "hidden") && (i < document.forms[indice].elements.length)) {
                        i++;
                    }
                    document.forms[indice].elements[(i + 1)].focus();
                }
                catch (err) {
                }

                VerifiqueTAB = false;
                break;
            }
        }
    }
}

function ColocaFocoEm(NomeBtn, e) {
    try {
        var key;

        if (window.event) {
            key = event.keyCode;
        }
        else {
            key = e.which;
        }

        if (key == 13) {
            document.getElementById(NomeBtn).focus();
            key = 13;
        }
    }
    catch (err) {
        alert(err);
    }
}

function CamposPreenchidosFaleConosco() {
    retornoCamposPreenchidosFaleConosco = true;

    try {
        var CorErro = '#FF0000';
        var CorOk = '#E2E2E2';

        var ddlAssunto = document.getElementById('ddlAssunto');
        var txtNome = document.getElementById('txtNome');
        var txtEmail = document.getElementById('txtEmail');
        var txtDDD = document.getElementById('txtDDD');
        var txtTelefone = document.getElementById('txtTelefone');
        var txtMensagem = document.getElementById('txtMensagem');


        MudaCorBorda(txtNome, CorOk);
        MudaCorBorda(txtEmail, CorOk);
        MudaCorBorda(txtDDD, CorOk);
        MudaCorBorda(txtTelefone, CorOk);
        MudaCorBorda(txtMensagem, CorOk);
        MudaCorBorda(ddlAssunto, CorOk);

        if (Trim(txtNome.value) == '') { MudaCorBorda(txtNome, CorErro); retornoCamposPreenchidosFaleConosco = false; }
        if (Trim(txtEmail.value) == '') { MudaCorBorda(txtEmail, CorErro); retornoCamposPreenchidosFaleConosco = false; }
        if (Trim(txtDDD.value) == '') { MudaCorBorda(txtDDD, CorErro); retornoCamposPreenchidosFaleConosco = false; }
        if (Trim(txtTelefone.value) == '') { MudaCorBorda(txtTelefone, CorErro); retornoCamposPreenchidosFaleConosco = false; }
        if (Trim(txtMensagem.value) == '') { MudaCorBorda(txtMensagem, CorErro); retornoCamposPreenchidosFaleConosco = false; }
        if (Trim(ddlAssunto.value) == '') { MudaCorBorda(ddlAssunto, CorErro); retornoCamposPreenchidosFaleConosco = false; }

        if (Trim(txtEmail.value) != '' && !ValidaEmail(Trim(txtEmail.value))) {
            MudaCorBorda(txtEmail, CorErro);
            retornoCamposPreenchidosFaleConosco = false;
            document.getElementById('spanMsgValidacaoEmail').innerHTML = '« E-mail inválido';
        }

        if (Trim(txtDDD.value) != '' && Trim(txtTelefone.value) != '' && VerificaTelefoneFaleConosco() != '') {
            MudaCorBorda(txtDDD, CorErro);
            MudaCorBorda(txtTelefone, CorErro);
            retornoCamposPreenchidosFaleConosco = false;
        }


        if (!retornoCamposPreenchidosFaleConosco) {
            alert('Preencha os campos corretamente!');
        }
    }
    catch (err) {
        document.write("<!--" + err.description + "-->");
    }

    return retornoCamposPreenchidosFaleConosco;
}

function MudaCorBorda(obj, cor) {
    try {
        var Borda = '1px';
        var BordaEstilo = 'solid';

        obj.style.border = Borda;
        obj.style.borderStyle = BordaEstilo;
        obj.style.borderColor = cor;
    }
    catch (err) {
        document.write(err.description);
    }
}


function EnviarMensagem(botao) {
    try {
        OmitirBotao(botao);

        var ddlAssunto = document.getElementById('ddlAssunto');
        var txtNome = document.getElementById('txtNome');
        var txtSobrenome = document.getElementById('txtSobrenome');
        var txtEmail = document.getElementById('txtEmail');
        var txtDDD = document.getElementById('txtDDD');
        var txtTelefone = document.getElementById('txtTelefone');
        var txtMensagem = document.getElementById('txtMensagem');

        if (CamposPreenchidosFaleConosco()) {
            faleconosco.EnviarMensagem(txtNome.value, txtSobrenome.value, txtEmail.value, txtDDD.value, txtTelefone.value, ddlAssunto.options[ddlAssunto.selectedIndex].text, txtMensagem.value, EnviarMensagem_CallBack);
        }
        else {
            MostrarBotao(botao);
        }
    }
    catch (err) {
        alert(err.message);
        MostrarBotao(botao);
    }
}

function EnviarMensagem_CallBack(resp) {
    try {
        var lblMsgErro = document.getElementById('lblMsgErro');
        if (resp.value[0] == "1") {
            //lblMsgErro.innerHTML = resp.value[1];

            document.location.href = resp.value[2];

            var ddlAssunto = document.getElementById('ddlAssunto');
            var txtNome = document.getElementById('txtNome');
            var txtSobrenome = document.getElementById('txtSobrenome');
            var txtEmail = document.getElementById('txtEmail');
            var txtDDD = document.getElementById('txtDDD');
            var txtTelefone = document.getElementById('txtTelefone');
            var txtMensagem = document.getElementById('txtMensagem');

            ddlAssunto.value = "";
            txtNome.value = "";
            txtSobrenome.value = "";
            txtEmail.value = "";
            txtDDD.value = "";
            txtTelefone.value = "";
            txtMensagem.value = "";
        }
        else {
            if (resp.value[1].indexOf("http://") > -1 || resp.value[1].indexOf("https://") > -1) {
                document.location.href = resp.value[1];
            }
            else {
                lblMsgErro.innerHTML = resp.value[1];
            }
        }

        MostrarBotao(document.getElementById('btnEnviar'));

    }
    catch (err) {
        lblMsgErro.value = err.message;
    }
}

function AdicionarItemLista(ProdutoCodigo) {
    var enc = 0;
    var mensagem = "";

    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;
    var VitrineCodigo = 0;

    TrocaImagem("loading", "visible");

    try {
        CarValCod1 = (document.getElementById("DRP_SKU_1") ? document.getElementById("DRP_SKU_1").value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_2") ? document.getElementById("DRP_SKU_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_3") ? document.getElementById("DRP_SKU_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_4") ? document.getElementById("DRP_SKU_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_5") ? document.getElementById("DRP_SKU_5").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU") != -1 && campo.name.length == 9) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n";
                        break;
                    }
                }
            }
        }

        var ListaCodigo = '';

        for (k = 0; k < document.getElementsByTagName("input").length; k++) {
            var campo = document.getElementsByTagName("input")[k];

            if (campo.type == "radio" && campo.id.indexOf('fld_Lista') != -1 && campo.checked) {
                ListaCodigo = campo.value;
                break;
            }
        }

        if (ListaCodigo == '' && mensagem == '') {
            mensagem = 'Escolha uma lista!';
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            if (ListaCodigo.toString() == "ListaDesejo") {
                AdicionarListaDesejo();
            }
            else {
                detalhes.AdicionarItemLista(ListaCodigo.toString(), ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), document.location.href.toString(), AdicionarItemLista_callback)
            }
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function AdicionarItemLista_callback(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value[0]) {
        if (document.getElementById("FieldSetListas")) {
            document.getElementById("FieldSetListas").style.display = "none";
        }

        alert(res.value[0]);
    }
    if (res.value[1]) {
        window.location.href = res.value[1];
    }
}

function AdicionarListaDesejo() {
    var ProdutoCodigo = 0;
    var CategoriaCodigo = 0;
    var CarValCod1 = 0;
    var CarValCod2 = 0;
    var CarValCod3 = 0;
    var CarValCod4 = 0;
    var CarValCod5 = 0;
    var mensagem = '';

    try {

        ProdutoCodigo = (document.getElementById("ProdutoCodigo") ? document.getElementById("ProdutoCodigo").value : 0);
        CategoriaCodigo = (document.getElementById("CategoriaCodigo") ? document.getElementById("CategoriaCodigo").value : 0);

        CarValCod1 = (document.getElementById("DRP_SKU_1") ? document.getElementById("DRP_SKU_1").value : 0);
        CarValCod2 = (document.getElementById("DRP_SKU_2") ? document.getElementById("DRP_SKU_2").value : 0);
        CarValCod3 = (document.getElementById("DRP_SKU_3") ? document.getElementById("DRP_SKU_3").value : 0);
        CarValCod4 = (document.getElementById("DRP_SKU_4") ? document.getElementById("DRP_SKU_4").value : 0);
        CarValCod5 = (document.getElementById("DRP_SKU_5") ? document.getElementById("DRP_SKU_5").value : 0);

        for (j = 0; j < document.forms[0].elements.length; j++) {
            campo = document.forms[0].elements[j];

            if (campo.name) {
                if (campo.name.indexOf("DRP_SKU") != -1 && campo.name.length == 9) {
                    if (campo.value == "0") {
                        mensagem += "Escolha um tamanho!\n";
                        break;
                    }
                }
            }
        }

        if (Trim(mensagem) != '') {
            alert(mensagem);
        }
        else {
            detalhes.AdicionarListaDesejo(ProdutoCodigo.toString(), CategoriaCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), AdicionarListaDesejo_CallBack);
        }
    }
    catch (err) {
        alert(err.description);

    }
}

function AdicionarListaDesejo_CallBack(res) {
    try {
        if (res.value[0] == "0") {
            if (res.value[2] != "") {
                if (document.getElementById("FieldSetListas")) {
                    document.getElementById("FieldSetListas").style.display = "none";
                }

                alert(res.value[2]);
            }
            if (res.value[3] != "") {
                window.location = res.value[3];
            }
        }
        else {
            if (res.value[2] != "") {
                alert(res.value[2]);
            }
            if (res.value[3] != "") {
                window.location = res.value[3];
            }

        }
    }
    catch (err) {
        alert(err.description);
    }
}


function CompararTodos(campo) {
    divs = document.getElementsByTagName("input");
    for (i = 0; i < divs.length; i++) {
        if (divs[i].type == "checkbox") {
            if (divs[i].name.indexOf("CompProd_") >= 0) {
                divs[i].checked = campo.checked;
            }
        }
    }
}

function CompararProdutos(origem) {
    var totalItens = 0;
    var ItensCod = "";

    divs = document.getElementsByTagName("input");

    for (i = 0; i < divs.length; i++) {
        if (divs[i].type == "checkbox") {
            if (divs[i].name.indexOf("CompProd_") >= 0) {
                if (divs[i].checked) {
                    if (ItensCod == "") {
                        ItensCod = divs[i].value;
                    }
                    else {
                        ItensCod += "|" + divs[i].value;
                    }

                    totalItens++;
                }
            }
        }
    }

    if (totalItens > 1) {
        if (totalItens < 5) {
            if (origem == "C") {
                categoria.CompararProdutos(ItensCod.toString(), callback_CompararProdutos);
            }
            else if (origem == "B") {
                busca.CompararProdutos(ItensCod.toString(), callback_CompararProdutos);
            }
        }
        else {
            alert("Você pode selecionar no máximo 4 produtos para comparação!");
        }
    }
    else {
        alert("Você precisa selecionar mais de 1 produto para realizar a comparação!");
    }
}

function callback_CompararProdutos(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value) {
        window.location.href = res.value;
    }
}

function BuscaItensTrilha(PaginaAtual) {
    var mensagem = "";

    TrocaImagem("loading", "visible");

    if (document.getElementById("txtBuscaTrilha").value == "") {
        mensagem += "Busca inválida (vazia) !\n";
    }
    else {
        if (document.getElementById("txtBuscaTrilha").value.replace(" ", "").length < 3) {
            mensagem += "Busca inválida (menos de 3 letras) !\n";
        }
    }

    if (mensagem != "") {
        alert(mensagem);
        TrocaImagem("loading", "hidden");
    }
    else {
        incluir.BuscaItens(document.getElementById("txtBuscaTrilha").value, PaginaAtual, document.getElementById("ddlCampoBusca").selectedIndex, document.getElementById("ddlCampoBusca").value, callback_BuscaItensTrilha);
    }
}

function callback_BuscaItensTrilha(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value) {
        if (res.value.indexOf("Redirect:") > -1) {
            window.location = res.value.replace("Redirect:", "");
            return;
        }
        document.getElementById("spanResultado").innerHTML = res.value;
    }
    TrocaImagem("loading", "hidden");
}


function BuscaItensTrilhaEdit(PaginaAtual) {
    var mensagem = "";

    TrocaImagem("loading", "visible");

    if (document.getElementById("txtBuscaTrilha").value == "") {
        mensagem += "Busca inválida (vazia) !\n";
    }
    else {
        if (document.getElementById("txtBuscaTrilha").value.replace(" ", "").length < 3) {
            mensagem += "Busca inválida (menos de 3 letras) !\n";
        }
    }

    if (mensagem != "") {
        alert(mensagem);
        TrocaImagem("loading", "hidden");
    }
    else {
        editar.BuscaItens(document.getElementById("txtBuscaTrilha").value, PaginaAtual, document.getElementById("ddlCampoBusca").selectedIndex, document.getElementById("ddlCampoBusca").value, callback_BuscaItensTrilha);
    }
}

var arrItensDescricao = new Array();
function SalvarDescricaoTrilhaArray() {
    var Panel_Selecionados = document.getElementById("Panel_Selecionados");
    if (!Panel_Selecionados) {
        return;
    }
    var arrInputCommentProd = Panel_Selecionados.getElementsByTagName("textarea");
    for (var arrI = 0; arrI < arrInputCommentProd.length; arrI++) {
        arrItensDescricao[arrInputCommentProd[arrI].id] = arrInputCommentProd[arrI].value;
    }
}

function CarregarDescricaoTrilhaArray() {
    var Panel_Selecionados = document.getElementById("Panel_Selecionados");
    if (!Panel_Selecionados) {
        return;
    }
    var arrInputCommentProd = Panel_Selecionados.getElementsByTagName("textarea");
    for (var arrI = 0; arrI < arrInputCommentProd.length; arrI++) {
        if (arrItensDescricao[arrInputCommentProd[arrI].id]) {
            arrInputCommentProd[arrI].value = arrItensDescricao[arrInputCommentProd[arrI].id];
        }
    }
}

function AdicionarProdTrilha(ProCodigo) {
    var mensagem = "";
    var comentario = "";

    TrocaImagem("loading", "visible");

    if (document.getElementById("ProdComent_" + ProCodigo)) {
        comentario = document.getElementById("ProdComent_" + ProCodigo).value;
    }

    incluir.SalvaItens(ProCodigo.toString(), comentario, 'A', callback_SalvaItens);
}

function AdicionarProdTrilhaEdit(ProCodigo) {
    var mensagem = "";
    var comentario = "";

    TrocaImagem("loading", "visible");

    if (document.getElementById("ProdComent_" + ProCodigo)) {
        comentario = document.getElementById("ProdComent_" + ProCodigo).value;
    }

    editar.SalvaItens(ProCodigo.toString(), comentario, 'A', callback_SalvaItens);
}

function ExcluirProdTrilha(ProCodigo) {
    var mensagem = "";

    TrocaImagem("loading", "visible");
    incluir.SalvaItens(ProCodigo.toString(), '', 'E', callback_SalvaItens);
}

function ExcluirProdTrilhaEdit(ProCodigo) {
    var mensagem = "";

    TrocaImagem("loading", "visible");
    editar.SalvaItens(ProCodigo.toString(), '', 'E', callback_SalvaItens);
}


function ValidaTrilha() {
    var mensagem = "";

    if (document.getElementById("txtNomeTrilha").value == "") {
        mensagem += "Nome inválido (vazio) !\n";
    }

    if (document.getElementById("txtDescriTrilha").value == "") {
        mensagem += "Descrição inválida (vazia) !\n";
    }


    if (document.getElementById("spanEscolhidos").innerHTML == "" || document.getElementById("spanEscolhidos").innerHTML.indexOf("(0):") != -1) {
        mensagem += "Nenhum produto selecionado para sua Trilha!\n";
    }

    if (mensagem != "") {
        alert(mensagem);
        return false;
    }
    else {
        return true;
    }
}

function CancelarTrilha() {
    TrocaImagem("loading", "visible");
    incluir.CancelarTrilha(callback_SalvaTrilha);
}

function callback_SalvaTrilha(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
        return;
    }

    if (res.value) {
        if (res.value.indexOf("Redirect:") > -1) {
            window.location = res.value.replace("Redirect:", "");
            return;
        }
        else if (res.value.indexOf("ERRO: ") > -1) {
            window.alert(res.value);
            return;
        }
        else {
            alert(res.value);
        }
    }

    document.getElementById("spanEscolhidos").innerHTML = "Produtos cadastrados na trilha (0):";
    document.getElementById("spanResultado").innerHTML = "Produtos para a trilha (use a busca acima):";
    document.getElementById("txtDescriTrilha").value = "";
    document.getElementById("txtDescriTrilha").disabled = false;
    document.getElementById("txtBuscaTrilha").value = "";
    document.getElementById("txtBuscaTrilha").disabled = false;
    document.getElementById("txtNomeTrilha").value = "";
    document.getElementById("txtNomeTrilha").disabled = false;

    document.getElementById("fldUsuariosPerguntem").checked = false;
    document.getElementById("fldAutorizaExibicaoDados").checked = false;

    if (document.getElementById("criadaEm")) {
        document.getElementById("criadaEm").innerHTML = "";
    }
    if (document.getElementById("dataCriacao")) {
        document.getElementById("dataCriacao").innerHTML = "";
    }
    if (document.getElementById("ultimaAtual")) {
        document.getElementById("ultimaAtual").innerHTML = "";
    }
    if (document.getElementById("dataAtualizacao")) {
        document.getElementById("dataAtualizacao").innerHTML = "";
    }

    TrocaImagem("loading", "hidden");
}

function callback_SalvaItens(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
        TrocaImagem("loading", "hidden");
    }

    if (res.value) {
        document.getElementById("txtDescriTrilha").disabled = false;
        document.getElementById("txtBuscaTrilha").disabled = false;
        document.getElementById("txtNomeTrilha").disabled = false;

        document.getElementById("spanEscolhidos").innerHTML = res.value;
        CarregarDescricaoTrilhaArray();
        TrocaImagem("loading", "hidden");
    }
}

function EditarTrilha(TrilhaCodigo) {
    try {
        TrocaImagem("loading", "visible");

        if (TrilhaCodigo != "0" && TrilhaCodigo != "") {
            editar.EditarTrilha(TrilhaCodigo.toString(), callback_EditarTrilha)
        }
        else {
            TrocaImagem("loading", "hidden");
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}

function callback_EditarTrilha(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value[0].toString().indexOf("Redirect:") > -1) {
        window.location = res.value[0].toString().replace("Redirect:", "");
        return;
    }
    try {
        document.getElementById("txtNomeTrilha").value = res.value[0];
        document.getElementById("txtDescriTrilha").value = res.value[1];

        if (document.getElementById("criadaEm")) {
            document.getElementById("criadaEm").innerHTML = "Trilha criada em:";
        }

        if (document.getElementById("dataCriacao")) {
            document.getElementById("dataCriacao").innerHTML = res.value[2];
        }

        if (document.getElementById("ultimaAtual")) {
            document.getElementById("ultimaAtual").innerHTML = "Última atualização:";
        }

        if (document.getElementById("dataAtualizacao")) {
            document.getElementById("dataAtualizacao").innerHTML = res.value[3];
        }

        ExcluirProdTrilhaEdit(0);
    }
    catch (err) {
        alert("Erro: " + err + "\nErro Ajax : " + res.error);
    }

    TrocaImagem("loading", "hidden");
}

function ExcluirTrilha(TrilhaCodigo) {
    if (confirm('Você tem certeza que deseja excluir esta Trilha?')) {
        excluir.ExcluirTrilha(TrilhaCodigo.toString(), callback_ExcluirTrilha);
    }
}

function callback_ExcluirTrilha(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value.toString().indexOf("Redirect:") > -1) {
        window.location = res.value.toString().replace("Redirect:", "");
        return;
    }

    TrocaImagem("loading", "hidden");
}
function AtualizarComentarioEdit(ProdutoCodigo) {
    if (ProdutoCodigo != "") {
        var Comentario = "";

        if (document.getElementById('ProdComent_' + ProdutoCodigo)) {
            Comentario = document.getElementById('ProdComent_' + ProdutoCodigo).value;
        }

        editar.AtualizarComentario(ProdutoCodigo.toString(), Comentario.toString(), callback_AtualizarComentario);
    }
}

function ExcluirComentario(ComentarioCodigo, TrilhaCodigo) {
    if (ComentarioCodigo != "") {
        if (confirm('Você tem certeza que deseja EXCLUIR este Comentário?')) {
            trilha.ExcluirComentario(ComentarioCodigo.toString(), TrilhaCodigo.toString(), callback_ExcluirComentario)
        }
    }
}

function IndicarTrilha(TrilhaCodigo) {
    var NomeAmigo = "";
    var EmailAmigo = "";

    if (document.getElementById('txtNomeAmigo')) {
        NomeAmigo = Trim(document.getElementById('txtNomeAmigo').value);
    }

    if (document.getElementById('txtEmailAmigo')) {
        EmailAmigo = Trim(document.getElementById('txtEmailAmigo').value);
    }

    if (NomeAmigo != "" && EmailAmigo != "" && TrilhaCodigo != "") {
        trilha.IndicarTrilha(NomeAmigo.toString(), EmailAmigo.toString(), TrilhaCodigo.toString(), callback_IndicarTrilha);
    }
    else {
        alert("Obrigatório preenchimento de todos os campos! (Nome e E-mail)");
    }
}

function callback_IndicarTrilha(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value.toString() == "Redirect:") {
        window.location.href = window.location;
    }
    else if (res.value.toString().indexOf("Redirect:") > -1) {
        window.location = res.value.toString().replace("Redirect:", "");
    }
    else if (res.value.toString().indexOf("Aviso:") > -1) {
        if (document.getElementById('txtNomeAmigo')) {
            NomeAmigo = document.getElementById('txtNomeAmigo').value = "";
        }

        if (document.getElementById('txtEmailAmigo')) {
            EmailAmigo = document.getElementById('txtEmailAmigo').value = "";
        }

        alert(res.value.toString().replace("Aviso:", ""));
    }

    TrocaImagem("loading", "hidden");
}


function AvaliarTrilha(TriCodigo) {
    var mensagem = "";
    var botao = document.getElementById('btAvaliar');

    OmitirBotao(botao);

    var Nota = "";

    try {
        if (Trim(document.getElementById("txtNota").value) == "") {
            mensagem += "Nota inválida!\n";
        }

        if (mensagem != "") {
            alert(mensagem);
            MostrarBotao(botao);
        }
        else {
            Nota = document.getElementById("txtNota").value;
            trilha.AvaliarTrilha(TriCodigo.toString(), Nota.toString(), callback_AvaliarTrilha)
        }
    }
    catch (err) {
        alert(err.description);
        MostrarBotao(botao);
    }
}

function callback_AvaliarTrilha(res) {
    if (res.error) {
        document.location.href = res.error.Message;
    }

    if (res.value[0]) {
        alert(res.value[0]);

        MostrarBotao(document.getElementById("btAvaliar"));

        document.location.href = res.value[1];
    }
}

function Perguntar(ProdutoCodigo, TrilhaCodigo, acao) {
    var Pergunta = "";

    if (document.getElementById('ProdPergunta_' + ProdutoCodigo)) {
        Pergunta = document.getElementById('ProdPergunta_' + ProdutoCodigo).value;
    }

    if (Pergunta != "" && ProdutoCodigo != "" && TrilhaCodigo != "") {
        trilha.Perguntar(Pergunta.toString(), ProdutoCodigo.toString(), TrilhaCodigo.toString(), acao.toString(), callback_Perguntar)
    }
}

function callback_Perguntar(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value.toString() == "Redirect:") {
        window.location.href = window.location;
    }
    else if (res.value.toString().indexOf("Redirect:") > -1) {
        window.location = res.value.toString().replace("Redirect:", "");
    }

    TrocaImagem("loading", "hidden");
}

function callback_ExcluirComentario(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }

    if (res.value.toString() == "Redirect:") {
        window.location.href = window.location;
    }
    else if (res.value.toString().indexOf("Redirect:") > -1) {
        window.location = res.value.toString().replace("Redirect:", "");
    }

    TrocaImagem("loading", "hidden");
}

function AtualizarComentario(ProdutoCodigo) {
    if (ProdutoCodigo != "") {
        var Comentario = "";

        if (document.getElementById('ProdComent_UPD_' + ProdutoCodigo)) {
            Comentario = document.getElementById('ProdComent_UPD_' + ProdutoCodigo).value;
        }

        incluir.AtualizarComentario(ProdutoCodigo.toString(), Comentario.toString(), callback_AtualizarComentario);
    }
}

function callback_AtualizarComentario(res) {
    if (res.error) {
        AlertaErroAjax(res.error);
    }
    else {
        if (res.value.toString().indexOf("Redirect:") > -1) {
            window.location = res.value.toString().replace("Redirect:", "");
            return;
        }
        else if (res.value.toString().indexOf("Aviso:") > -1) {
            alert(res.value.toString().replace("Aviso:", ""));
        }
    }

    TrocaImagem("loading", "hidden");
}


/* Client-side access to querystring name=value pairs
Version 1.2.3
22 Jun 2005
Adam Vandenberg
*/
function Querystring(qs) { // optionally pass a querystring to parse
    this.params = new Object()
    this.get = Querystring_get

    if (qs == null)
        qs = location.search.substring(1, location.search.length)

    if (qs.length == 0) return

    // Turn <plus> back to <space>
    // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
    qs = qs.replace(/\+/g, ' ')
    var args = qs.split('&') // parse out name/value pairs separated via &

    // split out each name=value pair
    for (var i = 0; i < args.length; i++) {
        var value;
        var pair = args[i].split('=')
        var name = unescape(pair[0])

        if (pair.length == 2)
            value = unescape(pair[1])
        else
            value = name

        this.params[name] = value
    }
}

function Querystring_get(key, default_) {
    // This silly looking line changes UNDEFINED to NULL
    if (default_ == null) default_ = null;

    var value = this.params[key]
    if (value == null) value = default_;

    return value
}

function ContinuarParceiro() {
    TrocaImagem("loading", "visible");

    var mensagem = "";

    try {
        var password = document.getElementById("txtSenha").value;

        if (Trim(password) == '') {
            mensagem = 'Senha inválida!';
        }

        if (mensagem != "") {
            alert(mensagem);
            TrocaImagem("loading", "hidden");
        }
        else {
            login.ContinuarParceiro(password, Redirect_callback)
        }
    }
    catch (err) {
        alert(err.description);
        TrocaImagem("loading", "hidden");
    }
}




//BANNERS

function ContabilizarCliqueBannerFullSuperiorProduto(strCodigoBanner) {
    try {
        BannerSuperior.ContabilizarCliqueBannerFullSuperiorProduto(strCodigoBanner, ContabilizarCliqueBannerFullSuperiorProduto_CallBack);
    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerFullSuperiorProduto_CallBack(res) {
    try {
        if (res.value[0] != null && res.value[0] != "" && res.value[0] == 1) {
            if (res.value[1] != null && res.value[1] != "") {
                alert(res.value[1]);
            }
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }
        else if (res.value[0] != null && res.value[0] != "" && res.value[0] == 0) {
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }

    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerFullSuperior(strCodigoBanner) {
    try {
        BannerSuperior.ContabilizarCliqueBannerFullSuperior(strCodigoBanner, ContabilizarCliqueBannerFullSuperior_CallBack);
    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerFullSuperior_CallBack(res) {
    try {
        if (res.value[0] != null && res.value[0] != "" && res.value[0] == 1) {
            if (res.value[1] != null && res.value[1] != "") {
                alert(res.value[1]);
            }
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }
        else if (res.value[0] != null && res.value[0] != "" && res.value[0] == 0) {
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }

    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerFullInferior(strCodigoBanner) {
    try {
        BannerInferior.ContabilizarCliqueBannerFullInferior(strCodigoBanner, ContabilizarCliqueBannerFullInferior_CallBack);
    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerFullInferior_CallBack(res) {
    try {
        if (res.value[0] != null && res.value[0] != "" && res.value[0] == 1) {
            if (res.value[1] != null && res.value[1] != "") {
                alert(res.value[1]);
            }
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }
        else if (res.value[0] != null && res.value[0] != "" && res.value[0] == 0) {
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }

    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerLateralEsquerda(strCodigoBanner) {
    try {
        BannerLateralEsquerda.ContabilizarCliqueBannerLateralEsquerda(strCodigoBanner, ContabilizarCliqueBannerLateralEsquerda_CallBack);
    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerLateralEsquerda_CallBack(res) {
    try {
        if (res.value[0] != null && res.value[0] != "" && res.value[0] == 1) {
            if (res.value[1] != null && res.value[1] != "") {
                alert(res.value[1]);
            }
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }
        else if (res.value[0] != null && res.value[0] != "" && res.value[0] == 0) {
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }

    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerLojasEspeciais(strCodigoBanner) {
    try {
        BannerLojasEspeciais.ContabilizarCliqueBannerLojasEspeciais(strCodigoBanner, ContabilizarCliqueBannerLojasEspeciais_CallBack);
    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerLojasEspeciais_CallBack(res) {
    try {
        if (res.value[0] != null && res.value[0] != "" && res.value[0] == 1) {
            if (res.value[1] != null && res.value[1] != "") {
                alert(res.value[1]);
            }
            if (res.value[2] != null && res.value[2] != "") {
                janela(res.value[2], "", "", "LojasEspeciais")
            }
        }
        else if (res.value[0] != null && res.value[0] != "" && res.value[0] == 0) {
            if (res.value[2] != null && res.value[2] != "") {
                janela(res.value[2], "", "", "LojasEspeciais")
            }
        }

    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error);
    }
}

function ContabilizarCliqueBannerLateralDireita(strCodigoBanner) {
    try {
        BannerLateralDireita.ContabilizarCliqueBannerLateralDireita(strCodigoBanner, ContabilizarCliqueBannerLateralDireita_CallBack);
    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerLateralDireita_CallBack(res) {
    try {
        if (res.value[0] != null && res.value[0] != "" && res.value[0] == 1) {
            if (res.value[1] != null && res.value[1] != "") {
                alert(res.value[1]);
            }
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }
        else if (res.value[0] != null && res.value[0] != "" && res.value[0] == 0) {
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }

    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerLandingPage(strCodigoBanner) {
    try {
        BannerLandingPage.ContabilizarCliqueBannerLandingPage(strCodigoBanner, ContabilizarCliqueBannerLandingPage_CallBack);
    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ContabilizarCliqueBannerLandingPage_CallBack(res) {
    try {
        if (res.value[0] != null && res.value[0] != "" && res.value[0] == 1) {
            if (res.value[1] != null && res.value[1] != "") {
                alert(res.value[1]);
            }
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }
        else if (res.value[0] != null && res.value[0] != "" && res.value[0] == 0) {
            if (res.value[2] != null && res.value[2] != "") {
                window.location.href = res.value[2];
            }
        }

    }
    catch (err) {
        alert("Erro: " + err.message + "\nErro Ajax : " + res.error.Message);
    }
}

function ArmazenaDadosBusca(bfc, bp, bq, bo, bs, bcr, bcc, bprIni, bprFim) {
    busca.ArmazenaDadosBusca(bfc, bp, bq, bo, bs, bcr, bcc, bprIni, bprFim);
}

function ArmazenaDadosCategoria(cfc, cp, cq, co, cs, ccr, cc, cprIni, cprFim) {
    categoria.ArmazenaDadosCategoria(cfc, cp, cq, co, cs, ccr, cc, cprIni, cprFim);
}

function ArmazenaDadosFabricante(fc, fp, fq, fo, fs, fcr, fprIni, fprFim) {
    fabricante.ArmazenaDadosFabricante(fc, fp, fq, fo, fs, fcr, fprIni, fprFim);
}

function Ops() {
    alert("Ops! Nâo implementado...:D");
}

function ExibeBlocoLista() {
    document.getElementById('listaOpcoes_container').style.display = '';
}

function EscondeBlocoLista() {
    document.getElementById('listaOpcoes_container').style.display = 'none';
}

function LoginLista(ListaCodigo) {
    detalhes.LoginLista(document.location.href.toString(), LoginLista_callback);
}

function LoginLista_callback(res) {
    if (!res.error) {
        document.location.href = res.value;
    }
    else {
        AlertaErroAjax(res.error);
    }
}

function OmitirBotao(botao) {
    try {
        if (document.getElementById('msg_' + botao.id)) {
            document.getElementById('msg_' + botao.id).style.display = '';
        }
        botao.style.display = 'none';
    }
    catch (err) {
        alert(err.description);
    }
}

function MostrarBotao(botao) {
    try {
        botao.style.display = '';

        if (document.getElementById('msg_' + botao.id)) {
            document.getElementById('msg_' + botao.id).style.display = 'none';
        }
    }
    catch (err) {
        alert(err.description);
    }
}

function EscondeIMGS() {
    MostraSelo();
    document.getElementById('imgs').style.visibility = "hidden";
    document.getElementById('click').style.visibility = "hidden";
}
function VerIMGS() {
    OcultaSelo();
    document.getElementById('imgs').style.display = 'block';
    document.getElementById('imgs').style.height = getPageSize() + 'px';
    document.getElementById('imgs').style.visibility = 'visible';
    document.getElementById('click').style.display = 'block';
    document.getElementById('click').style.visibility = 'visible';
}
function getPageSize() {
    var yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        yScroll = document.body.scrollHeight;
    } else {
        yScroll = document.body.offsetHeight;
    }
    var windowHeight;
    if (self.innerHeight) {
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowHeight = document.body.clientHeight;
    }
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }
    return pageHeight;
}

/** 066 - Separar cesta de vale presente  (16-04-2010).docx **/

function VerificaValePresente(ProdutoCodigo, CarValCod1, CarValCod2, CarValCod3, CarValCod4, CarValCod5, VitrineCodigo) {
    detalhes.VerificaValePresente(ProdutoCodigo.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), VitrineCodigo.toString(), VerificaValePresente_callback)
}

function VerificaValePresente_callback(res) {
    if (res.value[0] == '1') {
        detalhes.AdicionarItemCesta(res.value[1].toString(), res.value[2].toString(), res.value[3].toString(), res.value[4].toString(), res.value[5].toString(), res.value[6].toString(), res.value[7].toString(), Redirect_callback)
    }
    else if (res.value[0] == '2') {
        document.location.href = res.value[1];
    }
    else if (res.value[0] == '3') {
        alert('Sua cesta de compras já possui itens.\nVale-presentes devem ser comprados separadamente.');

        if (document.getElementById("btComprarProduto") && document.getElementById("btAguarde")) {
            document.getElementById("btComprarProduto").style.display = 'block';
            document.getElementById("btAguarde").style.display = 'none';
        }
    }
    else if (res.value[0] == '4') {
        if (confirm('Existe um ou mais vale-presentes na sua cesta de compras. Eles devem ser comprados separadamente.\nSe adicionar este novo item, o(s) vale-presente(s) da cesta serão excluídos.\nDeseja continuar?')) {
            detalhes.AdicionarItemCesta(res.value[1].toString(), res.value[2].toString(), res.value[3].toString(), res.value[4].toString(), res.value[5].toString(), res.value[6].toString(), res.value[7].toString(), Redirect_callback)
        }
        else {
            if (document.getElementById("btComprarProduto") && document.getElementById("btAguarde")) {
                document.getElementById("btComprarProduto").style.display = 'block';
                document.getElementById("btAguarde").style.display = 'none';
            }
        }
    }
}

function VerificaValePresenteCross(ProdutoCodigoVenda, CarValCodVenda1, CarValCodVenda2, CarValCodVenda3, CarValCodVenda4, CarValCodVenda5, ProdutoCodigoCross, CarValCodCross1, CarValCodCross2, CarValCodCross3, CarValCodCross4, CarValCodCross5, VitrineCodigo) {
    detalhes.VerificaValePresenteCross(ProdutoCodigoVenda.toString(), CarValCodVenda1.toString(), CarValCodVenda2.toString(), CarValCodVenda3.toString(), CarValCodVenda4.toString(), CarValCodVenda5.toString(), ProdutoCodigoCross.toString(), CarValCodCross1.toString(), CarValCodCross2.toString(), CarValCodCross3.toString(), CarValCodCross4.toString(), CarValCodCross5.toString(), VitrineCodigo.toString(), VerificaValePresenteCross_callback)
}

function VerificaValePresenteCross_callback(res) {
    if (res.value[0] == '1') {
        detalhes.AdicionarItemCestaCross(res.value[1].toString(), res.value[2].toString(), res.value[3].toString(), res.value[4].toString(), res.value[5].toString(), res.value[6].toString(), res.value[7].toString(), res.value[8].toString(), res.value[9].toString(), res.value[10].toString(), res.value[11].toString(), res.value[12].toString(), res.value[13].toString(), Redirect_callback)
    }
    else if (res.value[0] == '2') {
        document.location.href = res.value[1];
    }
    else if (res.value[0] == '3') {
        if (confirm('Existe um ou mais vale-presentes na sua cesta de compras. Eles devem ser comprados separadamente.\nSe adicionar esta venda cruzada, o(s) vale-presente(s) da cesta serão excluídos.\nDeseja continuar?')) {
            detalhes.AdicionarItemCestaCross(res.value[1].toString(), res.value[2].toString(), res.value[3].toString(), res.value[4].toString(), res.value[5].toString(), res.value[6].toString(), res.value[7].toString(), res.value[8].toString(), res.value[9].toString(), res.value[10].toString(), res.value[11].toString(), res.value[12].toString(), res.value[13].toString(), Redirect_callback)
        }
    }
}


function VerificaValePresenteGrupoCross(GruSelCodigo, Produtos, CarValCod1, CarValCod2, CarValCod3, CarValCod4, CarValCod5, VitrineCodigo) {
    detalhes.VerificaValePresenteGrupoCross(GruSelCodigo.toString(), Produtos.toString(), CarValCod1.toString(), CarValCod2.toString(), CarValCod3.toString(), CarValCod4.toString(), CarValCod5.toString(), VitrineCodigo.toString(), VerificaValePresenteGrupoCross_callback)
}

function VerificaValePresenteGrupoCross_callback(res) {
    if (res.value[0] == '1') {
        detalhes.AdicionarItemCestaGrupoCross(res.value[1].toString(), res.value[2].toString(), res.value[3].toString(), res.value[4].toString(), res.value[5].toString(), res.value[6].toString(), res.value[7].toString(), res.value[8].toString(), Redirect_callback)
    }
    else if (res.value[0] == '2') {
        document.location.href = res.value[1];
    }
    else if (res.value[0] == '3') {
        if (confirm('Existe um ou mais vale-presentes na sua cesta de compras. Eles devem ser comprados separadamente.\nSe adicionar esta venda cruzada, o(s) vale-presente(s) da cesta serão excluídos.\nDeseja continuar?')) {
            detalhes.AdicionarItemCestaGrupoCross(res.value[1].toString(), res.value[2].toString(), res.value[3].toString(), res.value[4].toString(), res.value[5].toString(), res.value[6].toString(), res.value[7].toString(), res.value[8].toString(), Redirect_callback)
        }
    }
}



/** FIM 066 - Separar cesta de vale presente  (16-04-2010).docx **/


function AlertaErroAjax(error) {
    if (error.Message != "Unknown") {
        alert(error.Message);
    }
}

function TrocaImagemVitrine(image, pathImg) {
    if (image.src) {
        image.src = pathImg;
    }
}

function ValidaCodigoSeguranca(NumeroCartao, CodSeguranca, OperadoraCodigo) {
    var final1 = NumeroCartao.substr(NumeroCartao.length - 4, 3); //Pega os 3 últimos números do último quarteto do número do cartão
    var final2 = NumeroCartao.substr(NumeroCartao.length - 3, 3); //Pega os 3 primeiros números do último quarteto do número do cartão

    if (OperadoraCodigo != '1') {
        if (final1 == CodSeguranca || final2 == CodSeguranca)
            return false;
        else
            return true;
    }
    else {
        final1 = NumeroCartao.substr(NumeroCartao.length - 4, 4); //Pega os números do último quarteto do número do cartão

        if (final1 == CodSeguranca)
            return false;
        else
            return true;
    }

}
