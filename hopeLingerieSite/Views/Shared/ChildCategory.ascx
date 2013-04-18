<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<dd>
    <a href='<%: Url.Action("CategoryNavigation", "Catalogo", new { @Id = Model.Key.CategoryId }) %>'>
        <%: Model.Key.Description %>
        (<%: Model.Value %>) 
    </a>
</dd>
