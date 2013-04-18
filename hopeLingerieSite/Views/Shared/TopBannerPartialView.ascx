<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="banner banner_main" id="banner_content_topo">
<% if (Model.RootCategory != null) {%>
    <div class='bannerTopo'>
        <div id='divBannerInferiorPos1' class='bannerTopo1'>
        <% if (Model.RootCategory.Image == null)
           {%>
           <img src="" border="0" />
        <% }
           else
           {%>
            <img src="../../Content/UploadControl/UpLoadFolder/Categories/<%: Model.RootCategory.CategoryId %>/<%: Model.RootCategory.Image %>" border="0" />
        <% } %>
        </div>
    </div>
<%} %>
</div>
