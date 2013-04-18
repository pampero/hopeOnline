<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieSite.ViewModels.CurrentSelection>" %>

    <div id="header_caterory_container">
        <dl id="header_menu_category">
		    <dt class="dn">
			    Menu Categoría
		    </dt>
            	<% foreach (HopeLingerieServices.Model.Category category in Model.CategoriesMenu.ToList())
	               { %>
	                    <dd><%: Html.ActionLink(category.Description, category.Description, "Catalogo", new { ID = 1 }, new { @length = 10 })%></dd>   
	               <%} %>
	    </dl>
    </div>
