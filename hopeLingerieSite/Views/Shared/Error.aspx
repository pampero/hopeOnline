<%@ Page Language="C#" MasterPageFile="~/Views/Shared/MainRaw.Master" Inherits="System.Web.Mvc.ViewPage<System.Web.Mvc.HandleErrorInfo>" %>


<asp:Content ID="errorContent" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript">
        function EnableDisableViewDetail() {
            if (document.getElementById("divDetail").style["visibility"] == "hidden") {
                document.getElementById("divDetail").style["visibility"] = "visible";
                document.getElementById("btnOpenView").value = "Hide Detail";
                
            }
            else {
                document.getElementById("divDetail").style["visibility"] = "hidden";
                document.getElementById("btnOpenView").value = "View Detail";
            } 
        }
    </script>
    <h2>
        Ha ocurrido un error al solicitar su requerimiento.
    </h2>
    <ul>
        <li>Action: <%=Model.ActionName %></li>
        <li>Controller: <%=Model.ControllerName %></li>
        <li>Message: <%=Model.Exception.Message %></li>
    </ul>
    <button id="btnOpenView" onclick="EnableDisableViewDetail();">View Detail</button>
    <div id="divDetail" 
        style="padding: 1px; margin: 1px; border: 1px solid #000000; visibility:hidden; border-spacing:1px; font-style: italic;">
        <%=Model.Exception.ToString() %>
    </div>
</asp:Content>
