<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieSite.ViewModels.CurrentSelection>" %>
<% 
    // Pagina solo nivel root
    if ((Model.Action != "Buscar") && (Model.BrebreadCrumbsHierarchy.Count == 1))
    {
       int productsCount = Model.Products.Count;

       if (productsCount > Model.PageSize)
       {
           int pageLength = (productsCount / Model.PageSize) + 1;

           if (productsCount % Model.PageSize == 0)
           {
               pageLength = productsCount / Model.PageSize;
           }
       
%>
       <div class="barra_paginacao"> 
            <ul>
<%
           int pageLengthAux = pageLength;
           int currentPage = Model.PageNumber;

           while (pageLength > 0)
           {
               int pageCounter = pageLengthAux - pageLength + 1;
               if (pageCounter == currentPage)
               {%>
                    <li><a title="| actual |" href="javascript:;" class="selected"><%: pageCounter%></a></li>
             <%}
               else
               {%>   
               <li><a title="avanzar &gt;" href="/Catalogo/<%: Model.Action %>/<%: pageCounter %>"><%: pageCounter%></a></li>
             <%}
               pageLength--;
           }
           %> 
            </ul>
        </div>
<%
        }
   }
%>
    

