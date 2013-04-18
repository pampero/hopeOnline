/// <reference path="jquery-1.4.1.min.js" />




$(document).ready(function () {
							
    //centralizar a Gisele meu amor
    function centralizaGI() {

        var giseleV = $('.gi').height();
        var alturaPagina = $(document).height();
        var alturaJanela = $(window).height();

        var giseleH = $('.gi').width();
        var larguraPagina = $(document).width();
        var larguraJanela = $(window).width();

        var margemW;
        var margemH;

        if (alturaJanela < 550) {
            $('.ct-page').height(550 + 'px');
            $('.gi').css({ 'height': '550px', 'width': '100%', 'bottom': 'auto', 'top': '0px' });
			
        }
        else {
			var largura = (alturaJanela / 75) * 100;
			
            if ( $.browser.msie ) {
			  if($.browser.version == '8.0'){					  
					$('.ct-page').height(alturaJanela-10 + 'px');
				  }
			}
			else{				
	            $('.ct-page').height(alturaJanela-4 + 'px');
			}

			$('.gi').css({'height': alturaJanela + 'px','width': largura + 'px'});
        }


        if (larguraJanela < 1000) {
            $('.ct-page').width(1000 + 'px');
			$('#testando').append('<img src="Img/fundo_hope600.jpg" class="imagemTeste">');

            margemW = (1000 - $('.gi').width()) / 2;
            $('.gi').css('left', margemW + 'px');
        }
        else {
            $('.ct-page').width(larguraJanela + 'px');
			$('#testando').append('<img src="Img/fundo_hope.jpg" class="imagemTeste">');
            margemW = (larguraJanela - $('.gi').width()) / 2;
            $('.gi').css('left', margemW + 'px');
        }

    }
    var resizeTimer = null;
    $(window).bind('resize', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(centralizaGI, 100);
    });
    $(window).bind('load', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(centralizaGI, 100);
    });

  
});