<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieServices.Model.Product>" %>
<script language="javascript" type="text/javascript">

    jQuery(document).ready(function () {

        if ($(".colorSelector").length > 0) {
            $($(".colorSelector")[0]).click();
        }

    });

</script>

<%foreach (HopeLingerieServices.Model.Color color in Model.Colors.Where(x => x.Active))
  { %>
<div class="thumb_off">
    <a href="javascript:void(0);" class="colorSelector <%:color.Code %>" title="<%:color.Description %>"
        onclick="javascript:showImagesByColor('<%:color.Code %>', '<%:color.ColorId %>'); loadSizes('<%:color.ColorId %>, <%:Model.ProductId %>');">
        <img id="IMG_SKU_1_217886" src="/Content/UploadControl/UploadFolder/Products/<%:  Model.ProductId %>/<%:color.ColorId %>/<%:color.ColorThumb %>"
            class="SKU" alt="<%:color.Description %>" title="<%:color.Description %>">
    </a>
</div>
<%} %>
<br />
<div id="sizeContainer" />

