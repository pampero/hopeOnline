<head id="Head1"><link rel="stylesheet" type="text/css" href="//s7.addthis.com/static/r07/widget69.css" media="all"><title>
	Hope
</title><link href="/DXR.axd?r=3_1,3_0,2_2,2_1,2_0,1_2,1_1,4_1,4_0,5_0-cdOr2" type="text/css" rel="stylesheet">
    
    <script id="LR2" type="text/javascript" async="" src="//platform.twitter.com/js/xd/jsonrpc.js"></script><script id="LR1" type="text/javascript" async="" src="//platform.twitter.com/js/xd/parent.js"></script><script type="text/javascript" src="/Scripts/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="/DXR.axd?r=1_32,1_61,1_39,1_52,3_8,3_7,14_10,14_3,2_22,2_29,1_54,1_51,1_38,4_10,4_6,4_7,4_9,14_4,5_4,5_3,2_15,2_25,1_36,1_41,2_16,2_18,2_21,2_19,14_1,2_24,14_5,2_26,2_27,1_31,14_0,1_59,1_45,1_46,14_6,1_60,1_62,14_7,1_65,14_8,1_66,14_9-odOr2" id="dxis_579540850"></script><script type="text/javascript" id="dxss_108921897">
&lt;!--
window.__aspxEmptyImageUrl = '/DXR.axd?r=1_3-cdOr2';
//--&gt;
</script><script type="text/javascript" id="dxss_1902421437">
&lt;!--
ASPxHtmlEditorDialogSR={PasteFromWord:'Paste from Word',InsertImage:'Insert Image',ChangeImage:'Change Image',InsertLink:'Insert Link',ChangeLink:'Change Link',InsertTable:'Insert Table',ChangeTable:'Table Properties',ChangeTableCell:'Cell Properties',ChangeTableColumn:'Column Properties',ChangeTableRow:'Row Properties'}
//--&gt;
</script><script type="text/javascript" id="dxss_1550418459">
&lt;!--
(function(){var a = ({'shortDate':'dd/MM/yyyy','abbrMonthNames':['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic',''],'numNegInf':'-Infinito','yearMonth':'MMMM\' de \'yyyy','currGroupSeparator':'.','am':'a.m.','currPosPattern':2,'longDate':'dddd, dd\' de \'MMMM\' de \'yyyy','genMonthNames':['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre',''],'numNan':'NeuN','numPosInf':'Infinito','abbrDayNames':['dom','lun','mar','mié','jue','vie','sáb'],'longTime':'hh:mm:ss tt','numDecimalPoint':',','shortTime':'hh:mm tt','currNegPattern':2,'monthNames':['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre',''],'monthDay':'dd MMMM','pm':'p.m.','numGroupSeparator':'.','currDecimalPoint':',','dayNames':['domingo','lunes','martes','miércoles','jueves','viernes','sábado']});for(var b in a) __aspxCultureInfo[b] = a[b];})();
//--&gt;
</script><meta content="text/html; charset=iso-8859-1" http-equiv="Content-Type"><meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible"><meta name="description"><meta name="keywords"><meta content="Hope Argentina - Tienda virtual" name="copyright"><meta content="INDEX, FOLLOW" name="robots"><meta content="-1" http-equiv="Expires"><meta content="no-store, no-cache, must-revalidate" http-equiv="Cache-Control"><meta content="no-cache" http-equiv="Pragma"><link rel="shortcut icon" type="image/x-icon" href="../../Views/Shared/favicon.gif"><link media="screen" href="/Content/styles/Styles.css" type="text/css" rel="stylesheet"><link media="screen" href="/Content/styles/Institucional.css" type="text/css" rel="stylesheet">
    <!--<link rel="stylesheet" type="text/css" href="../../Views/Shared/Styleaaa.css" media="screen" />-->

    <script type="text/javascript" src="/Scripts/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/Scripts/MicrosoftMvcAjax.js"></script>
    <script src="/Scripts/funcoes.js" charset="iso-8859-1" type="text/javascript"></script>
    
    <link type="text/css" rel="stylesheet" href="../../Content/styles/main1.css">
    <link type="text/css" rel="stylesheet" href="../../Content/styles/produto.css-MagicZoom.css-jqueryfancybox.css">
    <script src="/Scripts/jquery-1.4.4.min.js" charset="iso-8859-1" type="text/javascript"></script>
    <script src="/Scripts/minified-main.jsflash.jsfunctions.js" charset="iso-8859-1" type="text/javascript"></script>
    <script src="/Scripts/jqueryScripts.js" charset="iso-8859-1" type="text/javascript"></script>
    <script src="/Scripts/jqueryJcarousel.js" type="text/javascript"></script>
    <script src="/Scripts/funcoes.js" charset="iso-8859-1" type="text/javascript"></script>
    <script src="/Scripts/dhtml.js" charset="iso-8859-1" type="text/javascript"></script>
    <script src="/Scripts/magiczoom.js" charset="iso-8859-1" type="text/javascript"></script>
    <script src="/Scripts/cadastro.js" charset="iso-8859-1" type="text/javascript"></script>
    <script src="/Scripts/jqueryFancybox.js" charset="iso-8859-1" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        jQuery.noConflict();
        jQuery(document).ready(function () {
            showFirstImage();
        });
    </script>
    <script language="javascript" type="text/javascript">
        function loadSizes(ColorId, ProductId) {

            $.get("/Catalogo/ProductSize", { "ColorId": ColorId, "ProductId": ProductId }, function (html) {
                $("#sizeContainer").html(html);
            });

        }

        function showFirstImage(codeColor) {
            if (codeColor == undefined || codeColor == null) {
                if ($(".lstThumbs").find("li").length &gt; 0) {
                    $($(".lstThumbs").find("li").find("a")[0]).click();
                }
            }
            else {
                if ($(".lstThumbs[colorCode='" + codeColor + "']").find("li").length &gt; 0) {
                    $($(".lstThumbs[colorCode='" + codeColor + "']").find("li").find("a")[0]).click();
                }
            }
        }

        function showBigImg() {

            var zoomImg = $($("#Zoom1").find(".MagicZoomBigImageCont").find('img')[0]).attr("src");

            $("#ImagemAmpliadaFoto").attr("src", zoomImg);
            $("#ImagemAmpliada").show();
        }

        function closeBigImg() {

            $("#ImagemAmpliada").hide();
            $("#ImagemAmpliadaFoto").attr("src", "");

        }

        function changeImg(lnk) {

            var zoomImg = $($(lnk).find("img")[0]).attr('zoomImg');

            $("#Zoom1").attr("href", zoomImg)
            $($("#Zoom1").find("img")[0]).attr("src", zoomImg)//MagicZoomBigImageCont
            $($("#Zoom1").find(".MagicZoomBigImageCont").find('img')[0]).attr("src", zoomImg);

            //restauro visibilidad
            $(lnk).parents('ul').find('a').show();

            //oculto el thumb que se esta mostrando
            $(lnk).hide();
        }


        function showImagesByColor(codeColor, ColorId) {
            $("a").parent().removeClass("thumb_on");
            $("a").parent().addClass("thumb_off");
            $("." + codeColor).parent().addClass("thumb_on");
            $("." + codeColor).parent().removeClass("thumb_off");

            jQuery(".lstThumbs[colorCode='" + codeColor + "']").show();
            jQuery(".lstThumbs[colorCode!='" + codeColor + "']").hide();

            //DRP_SKU_1 --&gt; hidden que guarda el color seleccionado
            $("#DRP_SKU_1").val(codeColor);

            $("#ColorId").val(ColorId);
            showFirstImage(codeColor);
        }

        function selectSize(size, SizeId) {

            if ($(".sizeSelector." + size).length &gt; 0) {
                var lnk = $(".sizeSelector." + size);

                $(".sizeSelector").parent().removeClass("thumb_on");
                $(".sizeSelector").parent().addClass("thumb_off");
                lnk.parent().addClass("thumb_on");
                lnk.parent().removeClass("thumb_off");

                //DRP_SKU_2 --&gt; hidden que guarda el talle seleccionado
                $("#DRP_SKU_2").val(size);
                $("#SizeId").val(SizeId);
            }

        }

    </script>


    <script type="text/javascript">

    $(document).ready(function () {
        $.ajax({
            type: "POST",
            cache: false,
            url: "/Account/GetUser",
            data: $(this).serializeArray(),
            success: function (data) {
                parent.$("#identificacao").text(data.Value);
                if (data.Value == "¿Nuevo usuario?") {
                    $("#clickSalir").attr("style", "display:none");
                    $("#clickAqui").attr("style", "display:inline");
                }
                else {
                    $("#clickAqui").attr("style", "display:none");
                    $("#clickSalir").attr("style", "display:inline");
                }
            }
        });
    });

    function OnComboRequiredValidation(s, e) {

        if (s.GetValue() == null)
            e.isValid = false;

        if (s.GetValue() == "0")
            e.isValid = false;
    }

    function OnRequiredValidation(s, e) {

        if (e.value == null)
            e.isValid = false;
        var name = String(e.value);
        if (name == "")
            e.isValid = false;
    }
    </script>

</head>