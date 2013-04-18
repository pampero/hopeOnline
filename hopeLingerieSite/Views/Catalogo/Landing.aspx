<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Main.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <style type="text/css">
        body
        {
            background-color: #d0c3c6;
            margin-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            text-align: center;
        }
    </style>
    <script type="text/javascript">

        $(document).ready(function () {
            $("#body_bg").css({ "backgroundColor": "#d0c3c6", "backgroundImage": "none" });
        });

    </script>
    <img src="../../Content/imgs/banners/foto.jpg" />
    
</asp:Content>
