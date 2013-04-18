<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<li>
<a href='<%: Url.Action("CategoryNavigation", "Catalogo", new { @Id = Model.CategoryId }) %>'>
    <%:Model.Description%>  </a>
</li>


