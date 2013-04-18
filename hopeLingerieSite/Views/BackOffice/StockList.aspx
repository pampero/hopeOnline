<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/MainBackOfficeRaw.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

 <script type="text/javascript">
//<![CDATA[
     function SelectionChanged(s, e) {
         s.GetSelectedFieldValues("StockId", GetSelectedFieldValuesCallback);
     }

     function GetSelectedFieldValuesCallback(values) {
         document.getElementById('printItems_I').value = values;
     } 
// ]]>
    </script>
    <% 
        using (Html.BeginForm("ExportStockToXls", "Print"))
        {%>


        <%    Html.DevExpress().TextBox(
  settings =>
  {
      settings.Name = "printItems";
      settings.ControlStyle.CssClass = "button";
      settings.ClientVisible = false;
  })
  .Render();%>

  <h2>
        Listado de Stock
    </h2>
    <br />
  <table>
  <tr>
  <td><%
            Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdPrint";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Exportar";
                settings.UseSubmitBehavior = false;
                settings.ClientSideEvents.Click = "function(s, e) { if($('#printItems_I').val() != '') document.forms[0].submit(); }";
            })
            .Render();    %></td>
            <td>
            
    <%  Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdSelectAll";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Seleccionar Todo";
                settings.ClientSideEvents.Click = "function(s, e) { gvStock.SelectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            
            </td>
            <td>
            <%              Html.DevExpress().Button(
            settings =>
            {
                settings.Name = "cmdDeSelectAll";
                settings.ControlStyle.CssClass = "button";
                settings.Text = "Deseleccionar Todo";
                settings.ClientSideEvents.Click = "function(s, e) { gvStock.UnselectRows(); }";
                settings.UseSubmitBehavior = false;
            })
            .Render(); %>
            </td>
  </tr>
  </table>

  
    



   <%     }
    %>
    
    <%
        Html.RenderPartial("StockGridView", Model); 
    %>

</asp:Content>
