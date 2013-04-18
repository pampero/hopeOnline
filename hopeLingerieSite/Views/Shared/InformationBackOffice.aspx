<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieSite.ViewModels.MessageViewModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <link href="../../Content/styles/Information.css" rel="stylesheet" type="text/css" media="screen" />

    <div id="main_content_container">
        <div id="main_content">
            <div id="retorno_container">
                <p class="txtConfirmacao">
                  <%: Model.Message %>
                </p>
                <p class="btConfirmacao">
                    <a id="A1" href="javascript:history.back();" title="Volver">Volver</a>
                </p>
            </div>
        </div>
    </div>
</asp:Content>
