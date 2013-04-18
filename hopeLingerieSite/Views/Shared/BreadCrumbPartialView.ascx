<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<HopeLingerieSite.ViewModels.CurrentSelection>" %>

<div id="breadcrumbs_container">
    <ul id="breadcrumbs" class="fc">
        <li>
        <%: ((Model.BrebreadCrumbsHierarchy.Count > 0) ? Model.BrebreadCrumbsHierarchy.Last().Description : "") %>
        </li>
    </ul>
</div>

