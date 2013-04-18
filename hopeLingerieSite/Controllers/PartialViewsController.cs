using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopeLingerieServices.Model;

namespace HopeLingerieSite.Controllers.Backoffice
{
    public partial class BackOfficeController : Controller
    {
        /*-------------------ORDER--------------------------*/

        public static IEnumerable<Color> GetColors(int productId)
        {
            var hopeLingerieEntities = new HopeLingerieEntities();

            var nullColor= new Color();
            nullColor.Code = "-- Seleccionar --";
            nullColor.ColorId = 0;

            var colors = hopeLingerieEntities.Colors.Where(x => x.ProductId == productId && x.Active).ToList();
            colors.Insert(0, nullColor);

            return colors;
        }


        public static IEnumerable<Size> GetSizes(int colorId)
        {
            var hopeLingerieEntities = new HopeLingerieEntities();
            var sizes = new List<Size>();
            
            var nullSize = new Size();
            nullSize.Code = "-- Seleccionar --";
            nullSize.SizeId = 0;

            try
            {
                var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == colorId && x.Active);
                sizes = color.Sizes.ToList();

                sizes.Insert(0, nullSize);
                return sizes;
            }
            catch 
            {
                sizes.Insert(0, nullSize);
                return sizes;
            }
        }

        public ActionResult MultiColumnCustomerComboBoxPartialView()
        {
            ViewData["Customers"] = hopeLingerieEntities.Customers.Where(a => a.Active);
            return PartialView();
        }

        public ActionResult ComboSizePartialView()
        {
            var nullSize = new Size();
            nullSize.Code = "-- Seleccionar --";
            nullSize.SizeId = 0;

            var sizes = hopeLingerieEntities.Sizes.OrderBy(x => x.Code).Where(x => x.Active).ToList();
            sizes.Insert(0, nullSize);
            ViewData["Sizes"] = sizes;

            return PartialView();
        }

        /*-------------------CASCADING COMBOS --------------------------*/

        public ActionResult MultiColumnProductComboBoxPartialView()
        {
            ViewData["Products"] = hopeLingerieEntities.Products.Where(a => a.Active).OrderBy(a => a.ProductId).ToList();
            
            var nullProduct = new Product();
            nullProduct.Code = "-- Seleccionar --";
            nullProduct.ProductId= 0;

            ((List<Product>)ViewData["Products"]).Insert(0, nullProduct);

            return PartialView();
        }

        public ActionResult CascadingComboSizePartialView()
        {
            int colorId = 0;

            try
            {
                colorId = (Request.Params["ColorId"] != null) ? int.Parse(Request.Params["ColorId"]) : -1;
            }
            catch {}

            return PartialView(new HopeLingerieServices.Model.Color { ColorId = colorId });
        }

        public ActionResult CascadingComboColorPartialView()
        {
            int productId = (Request.Params["ProductId"] != null) ? int.Parse(Request.Params["ProductId"]) : -1;
            return PartialView(new HopeLingerieServices.Model.Color { ProductId = productId });
        }

        /*-------------------GRIDVIEW--------------------------*/

        public virtual ActionResult CategoryGridView()
        {
            var listCategory = hopeLingerieEntities.Categories.OrderBy(a => a.Category2.Description).OrderBy(a => a.Description).Where(a => a.Active).Select(a => new { CategoryID = a.CategoryId, Parent = a.Category2.Description, Description = a.Description, DisplayOrder = a.DisplayOrder, Enabled = a.Enabled }).ToList();
            return PartialView(listCategory);
        }

        public virtual ActionResult NewsLetterGridView()
        {
            var listNewsLetter = hopeLingerieEntities.NewsLetters.OrderBy(a => a.AddedDate);
            return PartialView(listNewsLetter);
        }
        
        //---------------------------------- INICIO LOGISTICA -------------------------------------

        public virtual ActionResult OrdersToDeliverGridView()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.DeliveryStatusId == 1 && x.OrderStatusId == 8 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return PartialView(listOrder);
        }

        public virtual ActionResult DeliveredOrdersGridView()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.DeliveryStatusId == 2 && x.OrderStatusId == 8 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return PartialView(listOrder);
        }

        //---------------------------------- FIN LOGISTICA -------------------------------------

        //---------------------------------- INICIO VENTAS -------------------------------------

        public virtual ActionResult CancelledOrderGridView()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 2 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return PartialView(listOrder);
        }

        public virtual ActionResult ClosedOrderGridView()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 8 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return PartialView(listOrder);
        }

        public virtual ActionResult ClosedWithErrorsOrderGridView()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 3 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return PartialView(listOrder);
        }

        public virtual ActionResult ClosedNotPayedOrderGridView()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 5 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return PartialView(listOrder);
        }

        public virtual ActionResult InProcessOrderGridView()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 1 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return PartialView(listOrder);
        }

        //---------------------------------- FIN VENTAS -------------------------------------

        public virtual ActionResult ContactGridView()
        {
            List<Contact> listContact = hopeLingerieEntities.Contacts.OrderByDescending(a => a.ContactId).Where(a => a.Active).ToList();
            return PartialView(listContact);
        }

        public virtual ActionResult CouponGridView()
        {
            List<Coupon> listCoupon = hopeLingerieEntities.Coupons.OrderByDescending(a => a.Percentage).Where(a => a.Active).ToList();
            return PartialView(listCoupon);
        }

        public virtual ActionResult SizeGridView()
        {
            List<Size> listSize = hopeLingerieEntities.Sizes.OrderBy(a => a.Code).Where(a => a.Active).ToList();
            return PartialView(listSize);
        }

        public virtual ActionResult ProductGridView()
        {
            var listProduct = hopeLingerieEntities.Products.OrderBy(a => a.Code).Where(a => a.Active).Select(x =>
                new { Published = x.Published, ProductID = x.ProductId, Code = x.Code, Name = x.Name, Description = x.Description, OnSale = x.OnSale, IsNew = x.IsNew, CurrentPrice = x.CurrentPrice, OldPrice = x.OldPrice, Nombre = x.Name, CategoryDescription = x.Category.Description }).ToList();
            return PartialView(listProduct);
        }

        public virtual ActionResult ProductsPriceGridView()
        {
            var listProduct = hopeLingerieEntities.Products.OrderBy(a => a.Code).Where(a => a.Active).Select(x =>
                new { Published = x.Published, ProductID = x.ProductId, Code = x.Code, Name = x.Name, Description = x.Description, OnSale = x.OnSale, IsNew = x.IsNew, CurrentPrice = x.CurrentPrice, OldPrice = x.OldPrice, Nombre = x.Name, CategoryDescription = x.Category.Description }).ToList();
            return PartialView(listProduct);
        }

        public virtual ActionResult CustomerGridView()
        {
            var listCustomer = hopeLingerieEntities.Customers.OrderBy(a => a.LastName).OrderBy(a => a.FirstName).Where(a => a.Active && !a.IsAdmin);
            return PartialView(listCustomer);
        }

        public virtual ActionResult OperatorGridView()
        {
            var listOperator = hopeLingerieEntities.Customers.OrderBy(a => a.LastName).OrderBy(a => a.FirstName).Where(a => a.Active && a.IsAdmin);
            return PartialView(listOperator);
        }

        public virtual ActionResult FranchiseGridView()
        {
            var listFranchise = hopeLingerieEntities.Franchises.OrderBy(a => a.AddedDate).Where(a => a.Active);
            return PartialView(listFranchise);
        }

        public virtual ActionResult OrderDetailGridView()
        {
            if (Session["OrderID"] == null) return RedirectToAction("Orders");

            int ID = Convert.ToInt32(Session["OrderID"]);
            var order = hopeLingerieEntities.Orders.Include("OrderDetails").SingleOrDefault(x => x.OrderId == ID && x.Active);

            return PartialView("OrderDetailGridView", order.OrderDetails);
        }

        public virtual ActionResult ProductColorSizeGridView(int productId)
        {
            if (Session["ColorID"] == null) return RedirectToAction("Products");

            int ID = Convert.ToInt32(Session["ColorID"]);
            var color = hopeLingerieEntities.Colors.SingleOrDefault(x => x.ColorId == ID && x.Active);

            ViewData["sizeList"] = hopeLingerieEntities.Stocks.Where(a => a.Active && a.ColorId == ID && a.ProductId == productId).Select(x => new { ColorId = ID, ProductId = x.ProductId, SizeID = x.SizeId, Code = x.Size.Code, RealQuantity = x.RealQuantity, VirtualQuantity = x.VirtualQuantity, Description = x.Size.Description });

            return PartialView("ProductColorSizeGridView", color);
        }

        public virtual ActionResult OrderDetailOrderGridView()
        {
            if (Session["OrderID"] == null) return RedirectToAction("Orders");

            int ID = Convert.ToInt32(Session["OrderID"]);
            var order = hopeLingerieEntities.Orders.Include("OrderDetails").SingleOrDefault(x => x.OrderId == ID && x.Active);
            ViewData["Discount"] = Convert.ToDecimal(order.Discount) / 100;
            return PartialView("OrderDetailOrderGridView", order.OrderDetails.Where(x => x.Active).OrderByDescending(x => x.AddedDate));
        }

        /*-------------------COLORS NESTED GRIDVIEW (PRODUCT)--------------------------*/

        public ActionResult ProductColorGridView(int productId)
        {
            var colors = hopeLingerieEntities.Colors.Where(x => x.ProductId == productId && x.Active);
            ViewData["ProductId"] = productId;

            return View(colors);
        }


        /*-------------------STOCK--------------------------*/

        public virtual ActionResult StockGridView()
        {
            var listStock = hopeLingerieEntities.Stocks.OrderBy(a => a.StockId).Where(a => a.Active).Select(x =>
             new { ProductId = x.ProductId, ColorId = x.ColorId, StockId = x.StockId, Code = x.Product.Code, Name = x.Product.Name, Color = x.Color.Code, Size = x.Size.Code, RealQuantity = x.RealQuantity, VirtualQuantity = x.VirtualQuantity, }).ToList();
            return PartialView("StockGridView", listStock);
        }
        
    }
}
