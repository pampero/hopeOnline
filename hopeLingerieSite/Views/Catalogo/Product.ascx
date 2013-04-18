<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieServices.Model.Product>"  %>
<% if (Model.Colors.Count > 0)
   {%>

        <li <% if (ViewData["counter"].ToString() == "1") { 
            %>class='fst' <%
            } 
          %>>
            <p class="photo_container">

                <a href='<%: Url.Action("ProductDetail", "Catalogo", new { @Id = Model.ProductId }) %>'>
                    <img src='<% if (Model.Colors.FirstOrDefault().ImageFrontFirstZoom  != null) { %>/Content/UploadControl/UploadFolder/Products/<%: Model.ProductId %>/detail_<%: Model.Colors.FirstOrDefault().ImageFrontFirstZoom %><%}else{ %> /Content/imgs/Catalogue/nodisponible.gif <%} %>' 
                    id='ImgCategoria<%:Model.ProductId  %>' 
                    alt='<%: Model.Name %>' 
                    title='<%: Model.Name %>' 
                    <% 
                    if ((Model.Colors.FirstOrDefault().ImageFrontFirstZoom != null) && (Model.Colors.FirstOrDefault().ImageFrontSecondZoom != null)) 
                    {
                    %>
                    onMouseOver='javascript:TrocaImagemVitrine(this, "/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/detail_<%: Model.Colors.FirstOrDefault().ImageFrontSecondZoom %>");' 
                    onMouseOut='javascript:TrocaImagemVitrine(this, "/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/detail_<%: Model.Colors.FirstOrDefault().ImageFrontFirstZoom %>");' 


                    <% } %>/><br />
                </a>
            </p>
            <h3 class="prodName">
                <a href='<%: Url.Action("ProductDetail", "Catalogo", new { @Id = Model.ProductId }) %>'>
                    <%: Model.Name%></a>
            </h3>
            <p class="price">
                <a href='<%: Url.Action("ProductDetail", "Catalogo", new { @Id = Model.ProductId }) %>'>


                <% if (Model.OldPrice != null && Model.OldPrice != 0)
                   { %>
                    <span class="block1">de <del><%: String.Format("{0:C2}", Model.OldPrice)%></del></span>
                <% }%>
                <span class="block2">por <strong><%: String.Format("{0:C2}", Model.CurrentPrice)%></strong></span> </a>
            </p>
        </li>
        
        <% if (ViewData["counter"].ToString() == "3")
           { %>
        <li class="ie_cb">
            <hr />
        </li>
        <% }
   }
   %>