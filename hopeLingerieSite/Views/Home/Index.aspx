<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Untitled Document</title>
    <script src="../../Scripts/jquery.cycle.all.latest.js" type="text/javascript"></script>
    <style type="text/css">
        BODY
        {
            padding-bottom: 0px;
            margin: 0px;
            padding-left: 0px;
            padding-right: 0px;
            font-family: Tahoma, Geneva, sans-serif;
            padding-top: 0px;
        }
        .wrap
        
        {
            position: relative;
            margin: auto auto 5px;
            width: 970px;
            float: left;
        }
        .foto_gigi
        {
           /* width: 970px;*/
            background: url(/content/imgs/foto_gigi.jpg) no-repeat left top;
            /*height: 320px;*/
        }
        .logo_hope
        {
            position: absolute;
            top: 0px;
            right: 90px;
        }
        .vc_brasileira
        {
            position: absolute;
            top: 0px;
            right: 90px;
        }
        .botao_videos
        {
            position: absolute;
            top: 0px;
            right: 90px;
        }
        .foto_lingerie
        {
            position: absolute;
            top: 0px;
            right: 460px;
        }
        .logo_hope
        {
            margin-top: 60px;
        }
        .vc_brasileira
        {
            margin-top: 100px;
        }
        .botao_videos
        {
            margin-top: 215px;
            cursor: pointer;
        }
        .foto_lingerie
        {
            margin-top: 20px;
        }
        .box_franquia
        {
            position: relative;
         /*   width: 481px;*/
            float: left;
            cursor: pointer;
        }
        .box_nota
        {
            position: relative;
          /* width: 484px;*/
            float: right;
            cursor: pointer;
        }
        .container_modal
        {
            z-index: 101;
            position: absolute;
            margin: -10px 0px 0px 80px;
            width: 803px;
            display: none;
            background: url(/content/imgs/bg_modal_videos.png);
            height: 534px;
            top: 0px;
            left: 0px;
        }
        .modal_videos
        {
            z-index: 102 !important;
            position: absolute;
            width: 587px;
            height: 330px;
            top: 0px;
            left: 0px;
        }
        .videos
        {
            z-index: 102 !important;
            position: absolute;
            width: 587px;
            height: 330px;
            top: 0px;
            left: 0px;
        }
        .modal_videos
        {
            margin: 120px 0px 0px 100px;
        }
        UL.modal_videos_nav
        {
            list-style: none none outside;
            position: absolute;
            padding-bottom: 0px;
            margin: 0px;
            padding-left: 0px;
            padding-right: 0px;
            top: 75px;
            padding-top: 0px;
            left: 110px;
        }
        UL.modal_videos_nav LI
        {
            text-align: center !important;
            padding-bottom: 0px;
            line-height: 38px;
            list-style-type: none;
            cursor: pointer;
            margin: 0px 8px 0px 0px;
            padding-left: 0px;
            width: 38px;
            padding-right: 0px;
            background: #81827b;
            float: left;
            height: 38px;
            padding-top: 0px;
            color: #FFF;
        }
        .modal_videos_nav A
        {
            color: #fff;
            text-decoration: none;
        }
        .overlay
        {
            z-index: 100;
            position: absolute;
            width: 100%;
            display: none;
            background: url(/content/imgs/bg_modal.png);
            height: 100%;
            top: 0px;
            left: 0px;
        }
        .botao_fechar
        {
            position: absolute;
            top: 40px;
            cursor: pointer;
            right: 40px;
        }
        DIV#body_container
        {
            padding-bottom: 5px !important;
            background: 0px 0px;
            overflow: hidden !important;
        }
        .container_modal_texto
        {
            z-index: 101;
            position: absolute;
            margin: 80px 0px 0px 160px;
            width: 640px;
            display: none;
            background: #fff;
            height: 534px;
            top: 0px;
            left: 0px;
        }
        .container_modal_texto .botao_fechar
        {
            top: 12px;
            right: 10px;
        }
        .container_modal_texto_conteudo H1
        {
            border-bottom: #595959 1px solid;
            padding-bottom: 10px;
            line-height: 22px;
            margin: 0px 0px 10px;
            padding-left: 0px;
            padding-right: 0px;
            color: #404040;
            font-size: 20px;
            padding-top: 0px;
            width: 520px;
        }
        .container_modal_texto_conteudo
        {
            position: relative;
            line-height: 22px;
            margin: 50px 0px 0px 50px;
            width: 540px;
            padding-right: 40px;
            float: left;
            height: 450px;
            color: #595959;
            font-size: 12px;
            overflow: auto;
        }
        .container_modal_texto_conteudo P
        {
            padding-bottom: 10px;
            margin: 0px;
            padding-left: 0px;
            padding-right: 0px;
            padding-top: 0px;
        }
        .link_gigi
        {
            position: absolute;
            width: 440px;
            height: 645px;
            top: 0px;
            left: 70px;
        }
    </style>
    <script type="text/javascript">

        $(document).ready(function () {

            $(".modal_videos").cycle({

                fx: "scrollHorz",

                timeout: 0,

                pager: ".modal_videos_nav"

            });



            $(".botao_videos").click(function () {

                $(".overlay, .container_modal").fadeIn();

            });

            $(".botao_fechar").click(function () {

                $(".overlay, .container_modal, .container_modal_texto").fadeOut();

            });

            /*$(".box_nota").click(function () {

                $(".overlay, .container_modal_texto").fadeIn();

            });*/

            $(".slide0").click(function () {

                $(".modal_videos").cycle(0);

            });

            $(".slide1").click(function () {

                $(".modal_videos").cycle(1);

            });

            $(".slide2").click(function () {

                $(".modal_videos").cycle(2);

            });

        });

</script>
    <div id="top">
    </div>
    <div class="container_modal">
        <div class="botao_fechar">
            <img alt="" src="/content/imgs/botao_fechar.png" border="0"></div>
        <ul class="modal_videos_nav">
            <li class="slide0 activeSlide">1</li><li class="slide1">2</li><li class="slide2">3</li><a
                href="#">1</a><a href="#">2</a><a href="#">3</a></ul>
        <div style="overflow: hidden;" class="modal_videos">
            <div style="position: absolute; top: 0px; left: 0px; display: block; z-index: 4; opacity: 1;" class="videos">
                <iframe id="player_1" src="http://player.vimeo.com/video/29048567?api=1&amp;player_id=player_1&amp;loop=1"
                    webkitallowfullscreen="" frameborder="0" height="330" width="587"></iframe>
            </div>
            <div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 2;" class="videos">
                <iframe id="player_2" src="http://player.vimeo.com/video/29048157?api=1&amp;player_id=player_2&amp;loop=1"
                    webkitallowfullscreen="" frameborder="0" height="330" width="587"></iframe>
            </div>
            <div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 1;" class="videos">
                <iframe id="player_3" src="http://player.vimeo.com/video/29047915?api=1&amp;player_id=player_3&amp;loop=1"
                    webkitallowfullscreen="" frameborder="0" height="330" width="587"></iframe>
            </div>
        </div>
    </div>
    <div class="overlay">
    </div>
    <div class="wrap foto_gigi">        
       <a href="<%: ViewData["FrontLinkImage"] %>"><img alt="" src="/Content/UploadControl/UploadFolder/Home/FrontMain.jpg" border="0"></a>
    </div>
    <div class="wrap">
        <div class="box_franquia">
            <a href="<%: ViewData["LeftLinkImage"] %>" target="_blank"><img alt="" src="/Content/UploadControl/UploadFolder/Home/FrontLeft.jpg" border="0"></a>
        </div>
        <div class="box_nota">
            <a href="<%: ViewData["RightLinkImage"] %>"><img alt="" src="/Content/UploadControl/UploadFolder/Home/FrontRight.jpg" border="0"></a>
        </div>    
    </div>
</asp:Content>
