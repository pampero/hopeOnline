<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieSite.ViewModels.CurrentSelection>" %>
    <ul class="fc lstProdutos">
<%
    int index = 0;

    // Pagina solo nivel root
    if ((Model.Action == "Buscar") || (Model.BrebreadCrumbsHierarchy.Count != 1))
    {
        foreach (HopeLingerieServices.Model.Product product in Model.Products)
        {
            index++;
            ViewData["counter"] = index;
            Html.RenderPartial("Product", product, ViewData);
            index = (index == 3) ? index = 0 : index++;
        }
    }
    else
    {

        int productsCount = Model.Products.Count;
        int totalPages = (productsCount  / Model.PageSize) + 1 ;
            
        int lengthItems = Model.PageSize;
            
        if (productsCount < Model.PageSize)
            lengthItems = productsCount;
        else 
        {
            if (totalPages == Model.PageNumber)
                lengthItems = productsCount % Model.PageSize;
        }

        try
        {
            foreach (HopeLingerieServices.Model.Product product in Model.Products.GetRange(Model.PageSize * (Model.PageNumber-1), lengthItems))
            {
                index++;
                ViewData["counter"] = index;
                Html.RenderPartial("Product", product, ViewData);
                index = (index == 3) ? index = 0 : index++;
            }
        }
        catch { }
    } 
%>
    </ul>

