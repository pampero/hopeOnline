<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/NoCategory.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.RenderPartial("Products");  %> 

</asp:Content>
