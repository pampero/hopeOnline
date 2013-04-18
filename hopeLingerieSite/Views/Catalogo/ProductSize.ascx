<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieServices.Model.Color>" %>

<input value="0" name="DRP_SKU_2" id="DRP_SKU_2" title="Tamanho" type="hidden">

<script language="javascript" type="text/javascript">

    jQuery(document).ready(function () {

        if ($(".sizeSelector").length > 0) {
            $($(".sizeSelector")[0]).click();
        }

    });


</script>
 <br>
<dt>
    <label class="labelQuantidade" for="DRP_SKU_2">Talles</label>
<%
    foreach (HopeLingerieServices.Model.Size size in Model.Sizes.OrderBy(x => x.Order))
{ 
%>
    <div class="thumb_off">
        <a href="javascript:void(0);" 
            title="<%: size.Description%>"  
            class="sizeSelector <%:size.Code %>"  
            onclick="javascript:selectSize('<%:size.Code %>','<%:size.SizeId %>');"
             style="text-align: center;">
            <%: size.Code%>
        </a>
    </div>

<%} %>

</dt>
