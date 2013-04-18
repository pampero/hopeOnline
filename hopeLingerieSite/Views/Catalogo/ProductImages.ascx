<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieServices.Model.Product>" %>



<%for (int i = 0; i < Model.Colors.Count; i++ )
  { %>


<ul style='padding-left: 0px; padding-top: 0px; height: 67px; <% if (i != 0){%> display: none; <%}%>' class="lstThumbs" colorCode="<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].Code %>">
    


    <% if (Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageFrontFirstZoom != null) 
       { %>
    <li style="margin-left: 0px; padding-bottom: 0px;" class="fst">
        <a class="miniatura" href="javascript:void(0);"
            rel="zoom-id:Zoom1" onclick="javascript:changeImg(this);">
            <img  src="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageFrontFirstZoom %>" 
                zoomImg="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageFrontFirstZoom %>"
                border="0" />
        </a>
    </li>
    <%}
       else
       { %> 
        <li style="margin-left: 0px; padding-bottom: 0px;" class="fst">
            <a href="javascript:;" class="miniatura" onclick="javascrit:TrocaImagemDetalhe(document.getElementById('ImgDetalhe1'))">
                <img id="Img1" src="" border="0"  style="cursor: default; display: none;"/>
            </a>
        </li>    
    <%} %>


    <% if (Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageFrontSecondZoom != null)
       { %>
        <li style="margin-left: 0px; padding-bottom: 0px;" >
            <a class="miniatura" 
                onclick="javascript:changeImg(this);" 
                rel="zoom-id:Zoom1">
                <img 
                    src="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageFrontSecondZoom %>"
                    zoomImg="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageFrontSecondZoom %>"
                    border="0" />
            </a>
         </li>
    <%}
       else
       { %> 
        <li style="margin-left: 0px; padding-bottom: 0px;" class="fst">
            <a href="javascript:;" class="miniatura" onclick="javascrit:TrocaImagemDetalhe(document.getElementById('ImgDetalhe2'))">
                <img id="Img3" src="" border="0"  style="cursor: default; display: none;"/>
            </a>
        </li>    
    <%} %>



    <% if (Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageBackFirstZoom != null)
       { %>
        <li style="margin-left: 0px; padding-bottom: 0px;" >
            <a class="miniatura" 
                onclick="javascript:changeImg(this);" 
                rel="zoom-id:Zoom1">
                <img src="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageBackFirstZoom %>"
                    zoomImg="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageBackFirstZoom %>"
                    border="0" />
            </a>
        </li>
    <%}
       else
       { %> 
        <li style="margin-left: 0px; padding-bottom: 0px;" class="fst">
            <a href="javascript:;" class="miniatura" onclick="javascrit:TrocaImagemDetalhe(document.getElementById('ImgDetalhe3'))">
                <img id="ImgDetalhe3" src="" border="0"  style="cursor: default; display: none;"/>
            </a>
        </li>    
    <%} %>

    
    <% if (Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageBackSecondZoom != null)
       { %>
        <li style="margin-left: 0px; padding-bottom: 0px;" >
            <a class="miniatura" 
                onclick="javascript:changeImg(this);" 
                rel="zoom-id:Zoom1">
                <img src="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageBackSecondZoom %>"
                    zoomImg="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ColorId %>/<%:  Model.Colors.ToList<HopeLingerieServices.Model.Color>()[i].ImageBackSecondZoom %>"
                    border="0" />
            </a>
        </li>
    <%}
       else
       { %> 
        <li style="margin-left: 0px; padding-bottom: 0px;" class="fst">
            <a href="javascript:;" class="miniatura" onclick="javascrit:TrocaImagemDetalhe(document.getElementById('ImgDetalhe4'))">
                <img id="ImgDetalhe4" src="" border="0"  style="cursor: default; display: none;"/>
            </a>
        </li>    
    <%} %>
</ul>

<%} %>






