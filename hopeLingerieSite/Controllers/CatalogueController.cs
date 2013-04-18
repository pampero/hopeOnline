using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopeLingerieSite.ViewModels;
using HopeLingerieServices.Model;
using HopeLingerieServices.Services;
using HopeLingerieServices.Annotations;

namespace HopeLingerieSite.Controllers
{
    public enum CatalogueType
    {
        Standard,
        OnSale,
        New
    }

    public interface IExecuter
    {
        bool IsValid(CatalogueType catalogueType);
        IEnumerable<Product> DoQuery();
        string PickView();
    }

    public class OnSale:IExecuter
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public IEnumerable<Product> DoQuery()
        {
            return hopeLingerieEntities.Products.ToList<Product>().FindAll(x => x.OnSale && x.Published && x.Active);
        }

        public bool IsValid(CatalogueType catalogueType)
        {
            return (catalogueType == CatalogueType.OnSale);
        }

        public string PickView()
        {
            return "NoCategories";
        }
    }

    public class IsNew : IExecuter
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public IEnumerable<Product> DoQuery()
        {
            return hopeLingerieEntities.Products.ToList<Product>().FindAll(x => x.IsNew && x.Published && x.Active);
        }

        public bool IsValid(CatalogueType catalogueType)
        {
            return (catalogueType == CatalogueType.New);
        }

        public string PickView()
        {
            return "NoCategories";
        }
    }


    public class Standard : IExecuter
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public IEnumerable<Product> DoQuery()
        {
            return new List<Product>();
        }

        public bool IsValid(CatalogueType catalogueType)
        {
            return (catalogueType == CatalogueType.Standard);
        }

        public string PickView()
        {
            return "Categories";
        }
    }

    public partial class CatalogoController : Controller
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();
        CurrentSelection currentSelection = new CurrentSelection();
        
        public virtual ActionResult Index()
        {
            return Novedades(1);
        }


        [HttpGet]
        public virtual ActionResult Novedades(Int16 Id)
        {
            Category category = hopeLingerieEntities.Categories.SingleOrDefault(x => x.Description == "Novedades" && x.ParentCategoryId == null && x.Active);
            return SendToView(category.Description, category.CategoryId, Id, CatalogueType.New); 
        }

        [HttpGet]
        public virtual ActionResult Liquidacion(Int16 Id)
        {
            Category category = hopeLingerieEntities.Categories.SingleOrDefault(x => x.Description == "Liquidacion" && x.ParentCategoryId == null && x.Active);
            return SendToView(category.Description, category.CategoryId, Id, CatalogueType.OnSale); 
        }

        [HttpGet]
        public virtual ActionResult GenericAction(Int16 Id, string actionName)
        {
            Category category = hopeLingerieEntities.Categories.SingleOrDefault(x => x.Description == actionName && x.ParentCategoryId == null && x.Active);
            return SendToView(actionName, category.CategoryId, Id, CatalogueType.Standard); 
        }

        public virtual ActionResult Buscar(FormCollection formCollection)
        {
            currentSelection.MenuIndex = 0;
            var searchName = formCollection["Name"];
            
            if ((searchName == null) || (searchName.Length == 0))
            {
                searchName = "Busca";
            }

            var products = hopeLingerieEntities.Products.Where(x => (x.Name.Contains(searchName) || x.Code.Contains(searchName)) && x.Active && x.Published).ToList();
            
            if (products.Count == 0)
            {
                if (searchName == "Busca")
                    searchName = "Ingrése el nombre del producto o parte de el en el cuadro de búsqueda!";
                else
                    searchName = "La búsqueda '" + searchName + "' no obtuvo ningún resultado!";

                ViewData["SearchResult"] = searchName;
                return View("NoProducts", currentSelection);
            }
            currentSelection.Action = "Buscar";
            currentSelection.Products = products;
            currentSelection.PageNumber = 1;
            
            return View("NoCategories", currentSelection);
        }


        private ActionResult SendToView(string categoryDescription, int categoryId, Int16 pageNumber, CatalogueType catalogueType)
        {
            currentSelection.MenuIndex = GetCategoryIdByDescription(categoryDescription);
            Category parentCaregory = hopeLingerieEntities.Categories.FirstOrDefault(x => x.CategoryId == categoryId && x.Active);

            currentSelection.RootCategory = hopeLingerieEntities.Categories.FirstOrDefault(x => x.CategoryId == categoryId);
            currentSelection.PageNumber = pageNumber;
            currentSelection.CategoriesMenu = hopeLingerieEntities.Categories.Where(x => x.ParentCategoryId == null && x.Active).OrderBy(x => x.DisplayOrder).ToList();
            currentSelection.Action = categoryDescription;

            IExecuter[] executers = { new OnSale(), new IsNew(), new Standard() };

            IExecuter executer = executers.First(x => x.IsValid(catalogueType));
            currentSelection.Products = executer.DoQuery().ToList();

            PrepareNavigationSettings(parentCaregory);

            return View(executer.PickView(), currentSelection);
        }

        public virtual ActionResult ProductDetail(Int32 Id)
        {
            int productId = Id;

            var product = hopeLingerieEntities.Products.SingleOrDefault(x => x.ProductId == productId && x.Active && x.Published);

            Category CategoryToNavigate = hopeLingerieEntities.Categories.FirstOrDefault(x => x.CategoryId == product.CategoryId);
            Category ParentRootCategory = new Category();
            GetParentRootCategory(CategoryToNavigate, ref ParentRootCategory);
            currentSelection.MenuIndex = GetCategoryIdByDescription(ParentRootCategory.Description);
            currentSelection.ProductSelected = product;
            BulidParentCategoryHierarchy(CategoryToNavigate, ref currentSelection.BrebreadCrumbsHierarchy);

            return View("ProductDetail", currentSelection);
        }

        public virtual ActionResult CategoryNavigation(object Id)
        {
            int categoryId = Convert.ToInt32(Id);

            Category CategoryToNavigate = hopeLingerieEntities.Categories.FirstOrDefault(x => x.CategoryId == categoryId);
            Category ParentRootCategory = new Category();
            GetParentRootCategory(CategoryToNavigate, ref ParentRootCategory);
            currentSelection.MenuIndex = GetCategoryIdByDescription(ParentRootCategory.Description);

            List<Category> childCategories = hopeLingerieEntities.Categories.ToList<Category>().FindAll(x => x.ParentCategoryId == CategoryToNavigate.CategoryId && x.Active == true);
            List<Category> Result = new List<Category>();

            Result.AddRange(childCategories.GetRange(0, childCategories.Count));

            GetCategoriesChildsRecursive(childCategories, ref Result);

            int ParentCountProduct = 0;

            GetProductCountRecursive(CategoryToNavigate, ref ParentCountProduct);

            BulidParentCategoryHierarchy(CategoryToNavigate, ref currentSelection.BrebreadCrumbsHierarchy);

            currentSelection.CategoryTreeData.ParentCategory = CategoryToNavigate;
            currentSelection.CategoryTreeData.ParentProductsCount = ParentCountProduct;

            foreach (var cat in childCategories)
            {
                int ChildrenCountProduct = 0;

                GetProductCountRecursive(cat, ref ChildrenCountProduct);
                currentSelection.CategoryTreeData.ChildCategories.Add(cat, ChildrenCountProduct);
            }

            GetAllProductsUnderCategory(CategoryToNavigate);
            
            currentSelection.RootCategory = ParentRootCategory;

            currentSelection.PageNumber = 1;
            currentSelection.Action = ParentRootCategory.Description;

            return View("Categories", currentSelection);
        }

        public ActionResult ProductSize(string ColorId)
        {   
            Color colorSelected = new Color();
            int ProdColorId = Convert.ToInt32(ColorId.Split(',')[0]);
            int ProductId = Convert.ToInt32(ColorId.Split(',')[1]);

            currentSelection.ProductSelected = hopeLingerieEntities.Products.FirstOrDefault(x => x.ProductId == ProductId && x.Active);

            if (currentSelection.ProductSelected != null)
                colorSelected = currentSelection.ProductSelected.Colors.FirstOrDefault(x => x.ColorId == ProdColorId && x.Active);

            colorSelected.Sizes.OrderBy(x => x.Order);
            return PartialView(colorSelected);
        }

        
       [HttpPost]
        public virtual string RegisterNewsletter(string name, string email)
        {
            var newsLetter = hopeLingerieEntities.NewsLetters.SingleOrDefault(x => x.Email == email);
            if (newsLetter == null)
            {
                NewsLetter nl = new NewsLetter();
                nl.Active = true;
                nl.AddedDate = DateTime.Now;
                nl.Email = email;
                nl.Name = name;
                hopeLingerieEntities.NewsLetters.AddObject(nl);
                hopeLingerieEntities.SaveChanges();
            }
            
            return "";
        }
        
        public ActionResult medidas()
        {
            return View("medidas");
        }

        private void GetCategoriesChildsRecursive(List<Category> categories, ref List<Category> Result)
        {
            foreach (Category cat in categories)
            {
                List<Category> childCategories = hopeLingerieEntities.Categories.ToList<Category>().FindAll(x => (x.ParentCategoryId == cat.CategoryId && x.Active));

                if (childCategories.Count > 0)
                {
                    Result.AddRange(childCategories.GetRange(0, childCategories.Count));
                    GetCategoriesChildsRecursive(childCategories, ref Result);
                }
            }
        }

        private void GetProductCountRecursive(Category category, ref int Result)
        {
            List<Category> childCategories = hopeLingerieEntities.Categories.ToList<Category>().FindAll(x => (x.ParentCategoryId == category.CategoryId && x.Active));

            Result += hopeLingerieEntities.Products.ToList<Product>().FindAll(x => x.CategoryId == category.CategoryId && x.Active && x.Published).Count;

            foreach (Category cat in childCategories)
            {
                GetProductCountRecursive(cat, ref Result);
            }
        }

        private void BulidParentCategoryHierarchy(Category category, ref List<Category> Result)
        {
            Result.Add(category);

            if (category.ParentCategoryId != null)
            {
                BulidParentCategoryHierarchy(hopeLingerieEntities.Categories.ToList<Category>().FirstOrDefault(x => x.CategoryId == category.ParentCategoryId), ref Result);
            }
            else
            {
                Result.Reverse();
            }
        }
        
        private void PrepareNavigationSettings(Category parentCaregory)
        {
            List<Category> childCategories = hopeLingerieEntities.Categories.ToList<Category>().FindAll(x => x.ParentCategoryId == parentCaregory.CategoryId && x.Active == true);
            List<Category> Result = new List<Category>();

            Result.AddRange(childCategories.GetRange(0, childCategories.Count));

            GetCategoriesChildsRecursive(childCategories, ref Result);

            int ParentCountProduct = 0;

            GetProductCountRecursive(hopeLingerieEntities.Categories.FirstOrDefault(x => x.Description == parentCaregory.Description), ref ParentCountProduct);

            currentSelection.CategoryTreeData.ParentCategory = hopeLingerieEntities.Categories.FirstOrDefault(x => x.Description == parentCaregory.Description);
            currentSelection.CategoryTreeData.ParentProductsCount = ParentCountProduct;

            BulidParentCategoryHierarchy(parentCaregory, ref currentSelection.BrebreadCrumbsHierarchy);

            foreach (var cat in childCategories)
            {
                int ChildrenCountProduct = 0;

                GetProductCountRecursive(cat, ref ChildrenCountProduct);
                currentSelection.CategoryTreeData.ChildCategories.Add(cat, ChildrenCountProduct);

            }

            GetAllProductsUnderCategory(parentCaregory);
        }

        private void GetParentRootCategory(Category category, ref Category ParentCategory)
        {
            if (category.ParentCategoryId != null)
            {
                Category parentCat = hopeLingerieEntities.Categories.FirstOrDefault(x => x.CategoryId == category.ParentCategoryId && x.Active);
                GetParentRootCategory(parentCat, ref ParentCategory);
            }
            else
            {
                ParentCategory = category;
            }
        }

        private void GetAllProductsUnderCategory(Category parentCaregory)
        {
            List<Category> childCategories = hopeLingerieEntities.Categories.ToList<Category>().FindAll(x => (x.ParentCategoryId == parentCaregory.CategoryId && x.Active));
            currentSelection.Products.AddRange(hopeLingerieEntities.Products.ToList<Product>().FindAll(x => x.CategoryId == parentCaregory.CategoryId && x.Active && x.Published));

            foreach (Category cat in childCategories)
            {
                GetAllProductsUnderCategory(cat);
            }
        }

        private int GetCategoryIdByDescription(string description)
        {
            Category category = hopeLingerieEntities.Categories.SingleOrDefault(x => x.Description == description && x.ParentCategoryId != null && x.Active);
            
            if (category == null)
                category = hopeLingerieEntities.Categories.SingleOrDefault(x => x.Description == description && x.ParentCategoryId == null && x.Active);

            return category.CategoryId;
        }


    }
}
