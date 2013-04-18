<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieSite.ViewModels.CurrentSelection>" %>

<dl id="main_navigation_categorias">
	<dd>
		<dl>
			<dt>
				Categorías
			</dt>
			<dd>
                <%: String.Format(Model.CategoryTreeData.ParentCategory.Description)%> (<%: Model.CategoryTreeData.ParentProductsCount.ToString()%>)
            </dd>
            <%  
            foreach (var item in Model.CategoryTreeData.ChildCategories)
            {
                Html.RenderPartial("ChildCategory", item); 
            } 
            %>
		</dl>
	</dd>
</dl>

