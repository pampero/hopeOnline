<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Category.Master" Inherits="System.Web.Mvc.ViewPage<HopeLingerieSite.ViewModels.CurrentSelection>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.RenderPartial("Products"); %>

</asp:Content>
