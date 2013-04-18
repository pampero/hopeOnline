using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HopeLingerieServices.Model;

namespace HopeLingerieSite.ViewModels
{
    public class CurrentSelection
    {
        public CurrentSelection()
        {
            PageSize = 21;
        }
        public int MenuIndex;
        public List<Product> Products = new List<Product>();
        public Product ProductSelected;
        public CategoryTreeDataHelper CategoryTreeData = new CategoryTreeDataHelper();
        public List<Category> BrebreadCrumbsHierarchy = new List<Category>();
        public List<Category> CategoriesMenu = new List<Category>();
        public int PageSize;
        public Category RootCategory;
        public int PageNumber;
        public string Action;
    }

    public class CategoryTreeDataHelper
    {
        public Category ParentCategory { get; set; }
        public int ParentProductsCount { get; set; }
        public Dictionary<Category, int> ChildCategories = new Dictionary<Category, int>();
    }
}