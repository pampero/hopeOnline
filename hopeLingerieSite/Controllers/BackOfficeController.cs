using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopeLingerieSite.ViewModels;
using HopeLingerieServices.Services.Security;
using HopeLingerieServices.Model;
using HopeLingerieServices.Annotations;
using DevExpress.Web.Mvc;
using HopeLingerieServices.Services.Utils;
using System.Drawing;
using DevExpress.Web.ASPxUploadControl;
using System.IO;
using HopeLingerieServices.Services.Payment;
using HopeLingerieServices.Exceptions;
using HopeLingerieServices.Services.Validation;
using HopeLingerieServices.Common;
using HopeLingerieServices.Services;
using System.Globalization;

namespace HopeLingerieSite.Controllers.Backoffice
{
    [AuthorizeUser(Roles="Admin")]
    [LogAndHandleError(ExceptionType = typeof(Exception), View = "Error")]
    public partial class BackOfficeController : Controller
    {
        CurrentSelection currentSelection = new CurrentSelection();
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public ActionResult CallbacksXlsUpload()
        {
            UploadControlExtension.GetUploadedFiles("ucCallbacksXlsUpload", XlsValidationSettings, XlsUploadComplete);
            return null;
        }

        public static readonly ValidationSettings XlsValidationSettings = new ValidationSettings
        {
            AllowedFileExtensions = new string[] { ".xlsx" },
            MaxFileSize = 20971520,
            FileDoesNotExistErrorText = "El archivo seleccionado no existe!",
            NotAllowedFileExtensionErrorText = "Extensión del archivo incorrecta, debe ser .xlsx",
            GeneralErrorText = "Ha ocurrido un error externo!",
            MaxFileSizeErrorText = "Tamaño del archivo demasiado grande!"
        };

        private bool IsValidDocument(string filePath, out List<string> errorResults)
        {
            errorResults = new List<string>();
            int j = 2;

            while (!String.IsNullOrEmpty(ExcelUtils.GetCellValue(filePath, "Precios", "A" + j)))
            {
                try
                {
                    var productId= Convert.ToInt32(ExcelUtils.GetCellValue(filePath, "Precios", "A" + j));

                    if (productId == 0)
                        throw  new Exception();

                    var product = hopeLingerieEntities.Products.Single(x => x.ProductId == productId);

                    var unformattedProductPrice = ExcelUtils.GetCellValue(filePath, "Precios", "D" + j);
                    // TODO: IMPORTANTE - VERIFICAR QUE LA CULTURA SEA CORRECTA, QUIZAS CONVENGA CONVERTIR LA COMA O EL PUNTO Y LUEGO es-AR o en-US - Mejor ver openxml
                    var newPrice = Convert.ToDecimal(unformattedProductPrice, new CultureInfo("en-US"));

                    if (newPrice == 0)
                        throw new Exception();
                }
                catch (Exception)
                {
                    //loguea la fila erronea. Fila "j"
                    errorResults.Add("Fila: " + j + "\r\n");
                }

                j++;
            }

            return errorResults.Count > 0 ? false : true;
        }

        protected void XlsUploadComplete(object sender, FileUploadCompleteEventArgs e)
        {
            if (e.UploadedFile.IsValid)
            {
                string fullDir = Request.MapPath(UploadDirectory) + @"PriceUpdates\";
                var results = new List<string>();
                bool isValid;

                if (!Directory.Exists(fullDir))
                    Directory.CreateDirectory(fullDir);

                string filePath = fullDir + @"\Listado.Precios-" + DateTime.Now.Date.ToShortDateString().Replace("/", "-") + ".xlsx";
                e.UploadedFile.PostedFile.SaveAs(filePath);

                try
                {
                    isValid = IsValidDocument(filePath, out results);
                }
                catch (Exception)
                {
                    e.CallbackData = "Error: No se ha podido validar el documento. Verifique que no se hayan modificado datos clave en el archivo Excel. Por ej. nombre de la planilla.";
                    return;   
                }
                
                if (isValid)
                {
                    int j = 2;
                   
                    while (!String.IsNullOrEmpty(ExcelUtils.GetCellValue(filePath, "Precios", "A" + j)))
                    {
                        var ProductId = Convert.ToInt32(ExcelUtils.GetCellValue(filePath, "Precios", "A" + j));

                        var unformattedProductPrice = ExcelUtils.GetCellValue(filePath, "Precios", "D" + j);
                        var newPrice = Convert.ToDecimal(unformattedProductPrice, new CultureInfo("en-US"));

                        var product = hopeLingerieEntities.Products.SingleOrDefault(x => x.ProductId == ProductId);

                        if (product != null)
                        {
                            product.OldPrice = product.CurrentPrice;
                            product.CurrentPrice = newPrice;
                        }

                        j++;
                    }

                    try
                    {
                        hopeLingerieEntities.SaveChanges();
                    }
                    catch (Exception)
                    {
                        e.CallbackData = "Error: No se ha podido realizar la actualización, verifique que los precios tengan valores correctos.\r\n";
                        return;
                    }
                }
                else
                {
                    string msg = string.Empty;

                    foreach (var result in results)
                    {
                        msg += result + ".\r\n";
                    }

                    e.CallbackData = "Error: Importación cancelada, no se modificó ningún precio.\r\nSe han encontrado errores en las siguientes filas:" + msg;
                    return;
                }

                e.CallbackData = "Los precios fueron importados correctamente.";
            }
        }

        /*-------------------HOME--------------------------*/
        
        [HttpGet]
        public virtual ActionResult HomeImagesUpdate()
        {
            Parameter parameterFrontLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "FRONTLINKIMAGE");
            Parameter parameterLeftLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "LEFTLINKIMAGE");
            Parameter parameterRightLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "RIGHTLINKIMAGE");

            ViewData["FrontLinkImage"] = parameterFrontLinkImage.ParameterValue;
            ViewData["LeftLinkImage"] = parameterLeftLinkImage.ParameterValue;
            ViewData["RightLinkImage"] = parameterRightLinkImage.ParameterValue;

            return View();
        }

        [HttpPost]
        public virtual ActionResult HomeImagesUpdate(FormCollection formCollection)
        {
            Parameter parameterFrontLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "FRONTLINKIMAGE");
            Parameter parameterLeftLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "LEFTLINKIMAGE");
            Parameter parameterRightLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "RIGHTLINKIMAGE");

            parameterFrontLinkImage.ParameterValue = formCollection["txtFrontLinkImage"];
            parameterLeftLinkImage.ParameterValue = formCollection["txtLeftLinkImage"];
            parameterRightLinkImage.ParameterValue = formCollection["txtRightLinkImage"];

            hopeLingerieEntities.SaveChanges();

            return View("/");
        }

        /*-------------------HOME--------------------------*/

        /*-------------------CONTACTS--------------------------*/

        public virtual ActionResult Contacts()
        {
            List<Contact> listContact = hopeLingerieEntities.Contacts.OrderByDescending(a => a.ContactId).Where(a => a.Active).ToList();
            return PartialView("ContactList", listContact);
        }

        /*-------------------CONTACTS--------------------------*/

        /*-------------------COUPON--------------------------*/

        public virtual ActionResult Coupons()
        {
            List<Coupon> listCoupon = hopeLingerieEntities.Coupons.OrderBy(a => a.Percentage).Where(a => a.Active).ToList();
            return PartialView("CouponList", listCoupon);
        }

        [HttpGet]
        public virtual ActionResult CouponUpdate(int Id)
        {
            if (Id > 0)
            {
                var coupon = hopeLingerieEntities.Coupons.SingleOrDefault(a => a.CouponId == Id);
                return View(coupon);
            }

            var newCoupon = new Coupon { Code = "" };
            return View(newCoupon);
        }

     
        [HttpGet]
        public virtual ActionResult CouponDelete(int Id)
        {
            var coupon = hopeLingerieEntities.Coupons.SingleOrDefault(a => a.CouponId == Id && a.Active);

            if (coupon != null)
            {
                coupon.Active = false;
                hopeLingerieEntities.SaveChanges();
            }

            return Redirect("/BackOffice/Coupons");
        }

        [HttpPost]
        public virtual ActionResult CouponUpdate(FormCollection formCollection)
        {
            var couponId = Convert.ToInt32(formCollection["CouponId"]);
            var couponNew = hopeLingerieEntities.Coupons.SingleOrDefault(a => a.CouponId == couponId && a.Active);
            var percentage = Convert.ToInt32(formCollection["Percentage_Raw"]);

            if (couponNew == null)
                couponNew = new Coupon();

            TryUpdateModel(couponNew, formCollection);

            couponNew.Percentage = percentage;

            if (couponNew.CouponId <= 0)
            {
                couponNew.AddedDate = DateTime.Now;
                couponNew.AddedBy = User.Identity.Name;
                couponNew.Active = true;
                hopeLingerieEntities.Coupons.AddObject(couponNew);
                hopeLingerieEntities.SaveChanges();
            }
            else
            {
                var couponExists = hopeLingerieEntities.Coupons.SingleOrDefault(a => a.Code == couponNew.Code && a.Active);
                // Si no existe el código
                if (couponExists == null)
                {
                    var attachedCoupon = hopeLingerieEntities.Coupons.SingleOrDefault(a => a.CouponId == couponNew.CouponId && a.Active);
                    attachedCoupon.Code = couponNew.Code;
                    attachedCoupon.OrderId = couponNew.OrderId;
                    hopeLingerieEntities.SaveChanges();
                }
            }
            
            return Redirect("/BackOffice/Coupons");
        }

        [HttpGet]
        public virtual ActionResult CouponCreate()
        {
            return View();
        }


        [HttpPost]
        public virtual ActionResult CouponCreate(FormCollection formCollection)
        {
            Coupon couponBase = new Coupon();
            var count = 1;

            TryUpdateModel(couponBase, formCollection);

            var total = 0;
            var percentage = 0;

            try
            {
                total = Convert.ToInt32(formCollection["Total_Raw"]);
            }
            catch { }

            try
            {
                percentage = Convert.ToInt32(formCollection["Percentage_Raw"]); 
            }
            catch {
                total = 0;
            }
            
            

            while (count <= total)
            {
                string generatedCode = KeyGenerationService.Generate(8);

                Coupon coupon = hopeLingerieEntities.Coupons.SingleOrDefault(x => x.Code == generatedCode);
                
                // Código repetido
                if (coupon != null)
                    count--;
                else
                    hopeLingerieEntities.Coupons.AddObject(
                        new Coupon { 
                            Campaign = couponBase.Campaign,
                            Code = generatedCode, 
                            ExpirationDate = couponBase.ExpirationDate, 
                            Percentage = Convert.ToInt32(formCollection["Percentage_Raw"]), 
                            Active = true, 
                            AddedDate = DateTime.Now,
                            AddedBy = User.Identity.Name
                        });
                count++;
            }
            
            hopeLingerieEntities.SaveChanges();

            return Redirect("/BackOffice/Coupons");
        }

        /*-------------------COUPON--------------------------*/

        /*-------------------PRODUCTS--------------------------*/

        
        public virtual ActionResult Products()
        {
            var listProduct = hopeLingerieEntities.Products.OrderBy(a => a.Code).Where(a => a.Active).Select(x =>
             new { Published = x.Published, ProductID = x.ProductId, Code = x.Code, Name = x.Name, Description = x.Description, OnSale = x.OnSale, IsNew = x.IsNew, CurrentPrice = x.CurrentPrice, OldPrice = x.OldPrice, Nombre = x.Name, CategoryDescription = x.Category.Description }).ToList();
            return PartialView("ProductList", listProduct);
        }

        public virtual ActionResult ProductsPrice()
        {
            var listProduct = hopeLingerieEntities.Products.OrderBy(a => a.Code).Where(a => a.Active).Select(x =>
             new { Published = x.Published, ProductID = x.ProductId, Code = x.Code, Name = x.Name, Description = x.Description, OnSale = x.OnSale, IsNew = x.IsNew, CurrentPrice = x.CurrentPrice, OldPrice = x.OldPrice, Nombre = x.Name, CategoryDescription = x.Category.Description }).ToList();
            return PartialView("ProductsPriceList", listProduct);
        }

        [HttpGet]
        public virtual ActionResult ProductStockUpdate(int sizeId, int colorId)
        {
            var stock = hopeLingerieEntities.Stocks.SingleOrDefault(x => x.SizeId == sizeId && x.ColorId == colorId);
            
            if (TempData["Error"] == null)
                TempData["Error"] = string.Empty;
            
            return View(stock);
        }

        [HttpPost]
        public virtual ActionResult ProductStockUpdate(Stock updatedStock)
        {
            var Stock = hopeLingerieEntities.Stocks.SingleOrDefault(x => x.StockId == updatedStock.StockId);

            var stockTomado = Stock.RealQuantity - Stock.VirtualQuantity;
            var incremento = updatedStock.RealQuantity - Stock.RealQuantity;

            var auxRealQuantity = updatedStock.RealQuantity;
            var auxVirtualQuantity = updatedStock.VirtualQuantity + incremento;


            if (auxVirtualQuantity < 0)
            {
                TempData["Error"] = "El stock real no puede ser menor al stock tomado!";
                return RedirectToAction("ProductStockUpdate", new { sizeId = Stock.SizeId, colorId = Stock.ColorId });
            }

            Stock.RealQuantity = auxRealQuantity;
            Stock.VirtualQuantity = auxVirtualQuantity;

            hopeLingerieEntities.SaveChanges();

            return RedirectToAction("ProductColorUpdate", new { productId = Stock.ProductId, colorId = Stock.ColorId });
        }


        [HttpPost]
        public string ProductColorSizeAdd(FormCollection formCollection)
        {
            var sizeId = Convert.ToInt16(formCollection["SizeId_VI"]);
            var quantity = Convert.ToInt16(formCollection["Quantity_Raw"]);

            var size = hopeLingerieEntities.Sizes.SingleOrDefault(a=>a.SizeId == sizeId && a.Active);

            // Actualizo la cantidad real y la cantidad virtual, la virtual es la cantidad suponiendo que se entregaron todos los pedidos de las ventas realizadas hasta el momento.
            if (size != null)
            {
                var colorId = Convert.ToInt16(formCollection["ColorId"]);
                var color = hopeLingerieEntities.Colors.Single(a => a.ColorId == colorId && a.Active);

                var sizeExists = (color.Sizes.SingleOrDefault(a=>a.SizeId == size.SizeId && a.Active) != null);

                if (!sizeExists)
                {
                    color.Sizes.Add(size);
                    
                    var stock = hopeLingerieEntities.Stocks.SingleOrDefault(x => x.ColorId == colorId && x.ProductId == color.ProductId && x.SizeId == sizeId);

                    if (stock == null)
                    {
                        var newStock = new Stock { ProductId = color.ProductId, SizeId = sizeId, ColorId = colorId, RealQuantity = quantity, VirtualQuantity = quantity };
                        hopeLingerieEntities.Stocks.AddObject(newStock);

                        if ((newStock.VirtualQuantity >= 0) && (newStock.RealQuantity >= 0))
                            hopeLingerieEntities.SaveChanges();
                    }
                }
            }		

            return "";
    
        }

        public virtual string PublishProduct(int Id)
        {
            var product = hopeLingerieEntities.Products.SingleOrDefault(x => x.ProductId == Id);
            
            if (product != null)
            {
                if (product.Colors.Count > 0)
                {
                    if (product.Colors.First().Sizes.Count > 0)
                    {
                        if (product.CurrentPrice > 0)
                        {
                            product.Published = true;
                            hopeLingerieEntities.SaveChanges();
                            return "El producto ha sido publicado";
                        }
                        else
                            return "El producto NO ha sido publicado ya que su precio es menor o igual a cero";
                    }
                    else
                        return "El producto NO ha sido publicado ya que no posee talle asociado";
                }
                else
                    return "El producto NO ha sido publicado ya que no posee color asociado";
            }
            
            return "El producto NO ha podido ser publicado ya que no se encontró";
        }


        public virtual string PublishHome()
        {
            string UploadHomeDirectory = "~/Content/UploadControl/UploadFolder/Home/";
            string UploadHomeDraftDirectory = "~/Content/UploadControl/UploadFolder/HomeDraft/";

            try 
	        {	        
		        System.IO.File.Copy(Request.MapPath(UploadHomeDraftDirectory + "FrontLeft.jpg"), Request.MapPath(UploadHomeDirectory + "FrontLeft.jpg"), true);
                System.IO.File.Copy(Request.MapPath(UploadHomeDraftDirectory + "FrontRight.jpg"), Request.MapPath(UploadHomeDirectory + "FrontRight.jpg"), true);
                System.IO.File.Copy(Request.MapPath(UploadHomeDraftDirectory + "FrontMain.jpg"), Request.MapPath(UploadHomeDirectory + "FrontMain.jpg"), true);

                return "Las imágenes han sido publicadas";
	        }
	        catch (Exception ex)
	        {

	        }

            return "Ha ocurrido un error. Uno o más imágenes no han sido publicadas.";
        }

        
        public virtual string UnPublishProduct(int Id)
        {
            var product = hopeLingerieEntities.Products.SingleOrDefault(x => x.ProductId == Id);

            if (product != null)
            {
                product.Published = false;
                hopeLingerieEntities.SaveChanges();
                return "El producto ha sido despublicado";
            }

            return "El producto NO ha podido ser despublicado";
        }

        public virtual string ProductColorDelete(int colorId)
        {
            var color = hopeLingerieEntities.Colors.SingleOrDefault(x => x.ColorId == colorId);

            // Si elimino el último color entonces despublico el producto.
            if (color != null)
            {
                color.Active = false;

                int activeColors = color.Product.Colors.Where(x => x.Active).ToList().Count;

                if (activeColors == 0)
                    color.Product.Published = false;
                    
                hopeLingerieEntities.SaveChanges();
            }

            return "";
        }


        [HttpGet]
        public virtual ActionResult ProductColorUpdate(int productId, int colorId)
        {
            Session["ColorID"] = colorId;
            ViewData["ProductId"] = productId;

            var nullSize = new HopeLingerieServices.Model.Size();
            nullSize.Code = "-- Seleccionar --";
            nullSize.SizeId = 0;

            var sizes = hopeLingerieEntities.Sizes.OrderBy(x => x.Code).Where(x => x.Active).ToList();
            sizes.Insert(0, nullSize);
            ViewData["Sizes"] = sizes;

            if (colorId > 0)
            {
                var color = hopeLingerieEntities.Colors.SingleOrDefault(a => a.ColorId == colorId && a.Active);

                ViewData["sizeList"] = hopeLingerieEntities.Stocks.Where(a => a.Active && a.ColorId == colorId && a.ProductId == productId).Select(x => new { ColorId = x.ColorId, ProductId = x.ProductId, SizeID = x.SizeId, Code = x.Size.Code, RealQuantity = x.RealQuantity, VirtualQuantity = x.VirtualQuantity, Description = x.Size.Description }).ToList();
                
                return View(color);
            }
            
            var newColor = new HopeLingerieServices.Model.Color();
            return View(newColor);
        }

        [HttpPost]
        public virtual ActionResult ProductColorUpdate(int colorId, FormCollection formCollection)
        {
            var color = hopeLingerieEntities.Colors.SingleOrDefault(a => a.ColorId == colorId && a.Active);
            bool isNew = false;

            if (color == null)
            {
                isNew = true;
                color = new HopeLingerieServices.Model.Color();
            }

            TryUpdateModel(color, formCollection);
            
            color.Description = formCollection["Descript"];

            if (isNew)
            {
                hopeLingerieEntities.Colors.AddObject(color);
            }

            hopeLingerieEntities.SaveChanges();

            return RedirectToAction("ProductUpdate", new { Id = color.ProductId });
        }

        [HttpGet]
        public virtual ActionResult ProductUpdate(int Id)
        {
            ViewData["Categories"] = hopeLingerieEntities.Categories.OrderBy(x => x.Description).Where(x => x.Active && x.ParentCategoryId == null).ToList();
            
            if (Id > 0)
            {
                var product = hopeLingerieEntities.Products.SingleOrDefault(a => a.ProductId == Id && a.Active);
                
                ViewData["ProductId"] = Id;
                return View(product);
            }

            var newProduct = new Product();
            return View(newProduct);
        }

     
        [HttpPost]
        public virtual ActionResult ProductUpdate(int Id, FormCollection formCollection)
        {
            var product = hopeLingerieEntities.Products.SingleOrDefault(a => a.ProductId == Id && a.Active);
            bool isNew = false;

            if (product == null)
            {
                isNew = true;
                product = new Product();
            }
            
            TryUpdateModel(product, formCollection);
            product.Description = formCollection["Descript"];
            product.IsNew = (formCollection["IsNew"] != "U");
            product.OnSale= (formCollection["OnSale"] != "U");
            product.CurrentPrice = Convert.ToDecimal(formCollection["CurrentPrice_Raw"]);
            if(!string.IsNullOrEmpty(formCollection["OldPrice_Raw"]))
                product.OldPrice = Convert.ToDecimal(formCollection["OldPrice_Raw"]);

            // Valida código no repetido
            if (isNew)
            {
                bool exists = (hopeLingerieEntities.Products.SingleOrDefault(a => a.Code == product.Code && a.Active) != null);

                if (exists) return RedirectToAction("Products");

                hopeLingerieEntities.Products.AddObject(product);
            }
            else
            {
                bool exists = (hopeLingerieEntities.Products.SingleOrDefault(a => a.Code == product.Code && a.ProductId != Id && a.Active) != null);

                if (exists) return RedirectToAction("Products");
            }

            hopeLingerieEntities.SaveChanges();
            
            TempData["Legend"] = "Producto actualizado correctamente!";

            return RedirectToAction("ProductUpdate", new { Id = product.ProductId });
        }

        [HttpGet]
        public virtual ActionResult ProductDelete(int Id)
        {
            var product = hopeLingerieEntities.Products.SingleOrDefault(a => a.ProductId == Id && a.Active);

            if (product != null)
            {
                product.Active = false;
                product.DeletedBy = User.Identity.Name;
                product.DeletedDate = DateTime.Now;
                hopeLingerieEntities.SaveChanges();
            }

            return RedirectToAction("Products");
        }


        [HttpPost]
        public virtual string ProductColorSizeDelete(int sizeId, int colorId)
        {
            var color = hopeLingerieEntities.Colors.SingleOrDefault(a => a.ColorId == colorId && a.Active);
            var size = color.Sizes.SingleOrDefault(a => a.SizeId == sizeId && a.Active);

            if (size != null)
            {
                color.Sizes.Remove(size);
                var stock = hopeLingerieEntities.Stocks.SingleOrDefault(x => x.ColorId == colorId && x.ProductId == color.ProductId && x.SizeId == sizeId);

                if (stock != null)
                {
                    hopeLingerieEntities.Stocks.DeleteObject(stock);
                }

                hopeLingerieEntities.SaveChanges();
            }

            return "";
        }


        /*-------------------PRODUCTS--------------------------*/


        /*-------------------CUSTOMERS--------------------------*/

        public virtual ActionResult Customers()
        {
            var listCustomer = hopeLingerieEntities.Customers.OrderBy(a => a.LastName).OrderBy(a => a.FirstName).Where(a => a.Active && !a.IsAdmin);
            return PartialView("CustomerList", listCustomer);
        }

        [HttpGet]
        public virtual ActionResult CustomerUpdate(int Id)
        {
            ViewData["States"] = hopeLingerieEntities.States.OrderBy(x => x.Description).ToList();

            if (Id > 0)
            {
                var customer = hopeLingerieEntities.Customers.Include("Orders").SingleOrDefault(a => a.CustomerId == Id && a.Active && !a.IsAdmin);
                ViewData["Orders"] = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.CustomerId == Id && x.Active).Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();

                customer.Password = EncryptionService.Decrypt(customer.Password, "Gv7L3V15jCdb9P5XGKiPnhHZ7JlKcmU=");
                return View(customer);
            }

            var newCustomer = new Customer();
            return View(newCustomer);
        }

        [HttpPost]
        public virtual ActionResult CustomerUpdate(int Id, FormCollection formCollection)
        {
            var customer = hopeLingerieEntities.Customers.SingleOrDefault(a => a.CustomerId == Id && a.Active && !a.IsAdmin);

            if (customer == null)
            {
                customer = new Customer();
                customer.Active = true;
                customer.AddedDate = DateTime.Now;
                hopeLingerieEntities.Customers.AddObject(customer);
            }

            TryUpdateModel(customer, formCollection);

            customer.IsAdmin = false;
            customer.NewsLetter = formCollection["NewsLetter"] == "U" ? false : true;
            customer.Gender = formCollection["Gender"] == "Femenino"?false: true;
            customer.Password = EncryptionService.Encrypt(customer.Password, "Gv7L3V15jCdb9P5XGKiPnhHZ7JlKcmU=");

            var newsLetter = hopeLingerieEntities.NewsLetters.SingleOrDefault(x=>x.Email == customer.Email);

            if (!customer.NewsLetter)
            {   // Si existe y está deschequeado entonces lo borro.
                if (newsLetter != null)
                    hopeLingerieEntities.NewsLetters.DeleteObject(newsLetter);
            }
            else
            {
                // Si no existe y está chequeado entonces lo agrego.
                if (newsLetter == null)
                {
                    hopeLingerieEntities.NewsLetters.AddObject(new NewsLetter { Email = customer.Email, Name = customer.LastName + " " + customer.FirstName, AddedDate = DateTime.Now });
                }
            }

            hopeLingerieEntities.SaveChanges();

            return RedirectToAction("Customers");
        }

        [HttpGet]
        public virtual ActionResult CustomerDelete(int Id)
        {
            var customer = hopeLingerieEntities.Customers.SingleOrDefault(a => a.CustomerId == Id && a.Active);

            if (this.User.Identity.Name != customer.Email)
            {
                if (customer != null)
                {
                    customer.Active = false;
                    customer.DeletedBy = User.Identity.Name;
                    customer.DeletedDate = DateTime.Now;
                    hopeLingerieEntities.SaveChanges();
                }
            }
            return RedirectToAction("Customers");
        }

        /*-------------------OPERATORS--------------------------*/

        public virtual ActionResult Operators()
        {
            var listOperator = hopeLingerieEntities.Customers.OrderBy(a => a.LastName).OrderBy(a => a.FirstName).Where(a => a.Active && a.IsAdmin);
            return PartialView("OperatorList", listOperator);
        }

        [HttpGet]
        public virtual ActionResult OperatorUpdate(int Id)
        {
            if (Id > 0)
            {
                var Operator = hopeLingerieEntities.Customers.SingleOrDefault(a => a.CustomerId == Id && a.Active && a.IsAdmin);
                Operator.Password = EncryptionService.Decrypt(Operator.Password, "Gv7L3V15jCdb9P5XGKiPnhHZ7JlKcmU=");
                return View(Operator);
            }

            var newOperator = new Customer();
            return View(newOperator);
        }

        [HttpPost]
        public virtual ActionResult OperatorUpdate(int Id, FormCollection formCollection)
        {
            var Operator = hopeLingerieEntities.Customers.SingleOrDefault(a => a.CustomerId == Id && a.Active);

            if (Operator == null)
            {
                Operator = new Customer();
                Operator.Active = true;
                Operator.IsAdmin = true;
                Operator.AddedDate = DateTime.Now;
                Operator.StateId = 1;
                Operator.DNI = "-1";
                Operator.Address = "-1";
                Operator.ZipCode = "-1";
                Operator.City = "-1";
                Operator.Number = "-1";
                hopeLingerieEntities.Customers.AddObject(Operator);
            }

            TryUpdateModel(Operator, formCollection);

            Operator.IsAdmin = true;
            Operator.Gender = formCollection["Gender"] == "Femenino" ? false : true;
            Operator.Password = EncryptionService.Encrypt(Operator.Password, "Gv7L3V15jCdb9P5XGKiPnhHZ7JlKcmU=");

            hopeLingerieEntities.SaveChanges();

            return RedirectToAction("Operators");
        }


        [HttpGet]
        public virtual ActionResult OperatorDelete(int Id)
        {
            var Operator = hopeLingerieEntities.Customers.SingleOrDefault(a => a.CustomerId == Id && a.Active);

            if (Operator != null)
            {
                Operator.Active = false;
                Operator.DeletedBy = User.Identity.Name;
                Operator.DeletedDate = DateTime.Now;
                hopeLingerieEntities.SaveChanges();
            }

            return RedirectToAction("Operators");
        }

        /*-------------------FRANCHISES--------------------------*/

        public virtual ActionResult Franchises()
        {
            var listFranchise = hopeLingerieEntities.Franchises.OrderBy(a => a.AddedDate).Where(a => a.Active);
            return PartialView("FranchiseList", listFranchise);
        }

        /*-------------------FRANCHISES--------------------------*/

        /*-------------------ORDERS--------------------------*/

        public virtual ActionResult Index()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.DeliveryStatusId == 1 && x.OrderStatusId == 8 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("OrdersToDeliverList", listOrder);
        }

        public virtual ActionResult CustomerOrderGridView(int Id)
        {
            ViewData["Orders"] = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId != 5 && x.CustomerId == Id && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
       
            return View(Id);
        }

        //---------------------------------- INICIO LOGISTICA -------------------------------------

        public virtual ActionResult OrdersToDeliver()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.DeliveryStatusId == 1 && x.OrderStatusId == 8 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("OrdersToDeliverList", listOrder);
        }

        public virtual ActionResult DeliveredOrders()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.DeliveryStatusId == 2 && x.OrderStatusId == 8 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("DeliveredOrdersList", listOrder);
        }

        //---------------------------------- FIN LOGISTICA -------------------------------------

        //---------------------------------- INICIO VENTAS -------------------------------------

        public virtual ActionResult CancelledOrders()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 2 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("CancelledOrderList", listOrder);
        }

        public virtual ActionResult ClosedOrders()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 8 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("ClosedOrderList", listOrder);
        }

        public virtual ActionResult ClosedWithErrorsOrders()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 3 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("ClosedWithErrorsOrderList", listOrder);
        }

        public virtual ActionResult ClosedNotPayedOrders()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 5 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("ClosedNotPayedOrderList", listOrder);
        }

        public virtual ActionResult InProcessOrders()
        {
            var listOrder = hopeLingerieEntities.Orders.OrderByDescending(a => a.AddedDate).Where(x => x.OrderStatusId == 1 && x.DeliveryStatusId == 1 && x.Active).
                Select(x => new { OrderID = x.OrderId, DeliveryDate = x.DeliveryDate, DeliveryAddress = x.DeliveryAddress, AddedDate = x.AddedDate, Discount = x.Discount, OrderStatus = x.OrderStatus.Description, Cellular = x.Customer.Cellular, Telephone = x.Customer.Telephone1, LastName = x.Customer.LastName, FirstName = x.Customer.FirstName, Email = x.Customer.Email }).ToList();
            return View("InProcessOrderList", listOrder);
        }

        //---------------------------------- FIN VENTAS -------------------------------------
        
        [HttpGet]
        public virtual ActionResult OrderDelete(int Id)
        {
            var order = hopeLingerieEntities.Orders.SingleOrDefault(a => a.OrderId == Id && a.Active);

            if (order != null)
            {
                order.Active = false;
                order.DeletedBy = User.Identity.Name;
                order.DeletedDate = DateTime.Now;
                hopeLingerieEntities.SaveChanges();
            }

            return RedirectToAction("InProcessOrders");
        }

        [HttpPost]
        public virtual ActionResult OrderDetailDelete(int Id)
        {
            var orderDetail = hopeLingerieEntities.OrderDetails.SingleOrDefault(a => a.OrderDetailId == Id && a.Active);

            if (orderDetail != null)
            {
                orderDetail.Active = false;
                orderDetail.DeletedBy = User.Identity.Name;
                orderDetail.DeletedDate = DateTime.Now;
                hopeLingerieEntities.SaveChanges();
            }

            return RedirectToAction("Products");
        }

        [HttpPost]
        public string OrderDetailAdd(FormCollection formCollection)
        {
            try
            {
                OrderDetail orderDetail = new OrderDetail();
                TryUpdateModel(orderDetail, formCollection);
                
                orderDetail.ProductId = Convert.ToInt16(formCollection["ProductId_VI"]);
                orderDetail.ColorId = Convert.ToInt16(formCollection["ColorId_VI"]);
                orderDetail.SizeId = Convert.ToInt16(formCollection["SizeId_VI"]);
                
                var product = hopeLingerieEntities.Products.Single(x=>x.ProductId == orderDetail.ProductId && x.Active);

                orderDetail.Price = product.CurrentPrice;
                
                if (orderDetail.SizeId == 0) throw new Exception();

                orderDetail.ProductId = Convert.ToInt32(formCollection["ProductID_VI"]);
                orderDetail.AddedDate = DateTime.Now;
                orderDetail.AddedBy = User.Identity.Name;
                orderDetail.OrderId = Convert.ToInt32(formCollection["orderId"]);

                hopeLingerieEntities.OrderDetails.AddObject(orderDetail);
                hopeLingerieEntities.SaveChanges();
            }
            catch (Exception)
            { }

            return "";
        }


        [HttpGet]
        public virtual ActionResult OrderUpdate(int Id)
        {
            ViewData["OrderStatus"] = hopeLingerieEntities.OrderStatus1.OrderBy(x => x.Description).Where(x => x.Active).ToList();
            ViewData["Products"] = hopeLingerieEntities.Products.OrderBy(x => x.ProductId).ToList();

            var nullProduct = new Product();
            nullProduct.Code = "-- Seleccionar --";
            nullProduct.ProductId = 0;

            ((List<Product>)ViewData["Products"]).Insert(0, nullProduct);

            if (Id > 0)
            {
                var order = hopeLingerieEntities.Orders.SingleOrDefault(a => a.OrderId == Id && a.Active);
                
                Session["OrderID"] = order.OrderId;
                
                if (order.CouponId.HasValue)
                {
                    var coupon = hopeLingerieEntities.Coupons.SingleOrDefault(x => x.CouponId == order.CouponId);
                    ViewData["Coupon"] = coupon.Code;
                }
                else
                    ViewData["Coupon"] = string.Empty;

                ViewData["Discount"] = Convert.ToDecimal(order.Discount) / 100;
                return View(order);
            }

            var newCustomer = new Customer();
            var newOrder = new Order();
            newOrder.OrderStatusId = 1;
            newOrder.Customer = newCustomer;

            return View(newOrder);
        }

        [HttpPost]
        public virtual ActionResult OrderUpdate(int Id, FormCollection formCollection)
        {
            var order = hopeLingerieEntities.Orders.SingleOrDefault(a => a.OrderId == Id && a.Active);
            bool isNew = false;
/*
            if (order == null)
            {
                isNew = true;
                order = new Order();
                order.AddedDate = DateTime.Now;
                // Agregado manual
                order.PaymentStatus = "SinIniciar";
                order.AddedBy = User.Identity.Name;
                order.CustomerId = Convert.ToInt16(formCollection["CustomerID_VI"]);
            }
*/
            TryUpdateModel(order, formCollection);

            order.Discount = Convert.ToInt32(formCollection["Discount_Raw"]);

            if (isNew)
            {
                hopeLingerieEntities.Orders.AddObject(order);
                hopeLingerieEntities.SaveChanges();
                return RedirectToAction("OrderUpdate", new { Id = order.OrderId });
            }
            else
            {
                hopeLingerieEntities.SaveChanges();
                return RedirectToAction("Orders");
            }
        }

        [HttpGet]
        public virtual ActionResult DeliveredOrder(int Id)
        {
            if (Id > 0)
            {
                var order = hopeLingerieEntities.Orders.SingleOrDefault(a => a.OrderId == Id && a.Active);

                Session["OrderID"] = order.OrderId;

                if (order.CouponId.HasValue)
                {
                    var coupon = hopeLingerieEntities.Coupons.SingleOrDefault(x => x.CouponId == order.CouponId);
                    ViewData["Coupon"] = coupon.Code;
                }
                else
                    ViewData["Coupon"] = string.Empty;

                return View(order);
            }

            return View("DeliveredOrders");
        }

        [HttpGet]
        public virtual ActionResult DeliverOrder(int Id)
        {
            if (Id > 0)
            {
                var order = hopeLingerieEntities.Orders.SingleOrDefault(a => a.OrderId == Id && a.Active);

                Session["OrderID"] = order.OrderId;

                if (order.CouponId.HasValue)
                {
                    var coupon = hopeLingerieEntities.Coupons.SingleOrDefault(x => x.CouponId == order.CouponId);
                    ViewData["Coupon"] = coupon.Code;
                }
                else
                    ViewData["Coupon"] = string.Empty;

                return View(order);
            }

            return View("OrdersToDeliver");
        }


        public virtual ActionResult InformationBackOffice()
        {
            MessageViewModel messageViewModel = new MessageViewModel();
            messageViewModel.Message = TempData["Message"] as string;

            return View(messageViewModel);
        }

        [HttpPost]
        public virtual ActionResult DeliverOrder(int Id, FormCollection formCollection)
        {
            var order = hopeLingerieEntities.Orders.SingleOrDefault(a => a.OrderId == Id && a.Active);

            order.DeliveryBy = formCollection["DeliveryBy"];
            order.Comments = formCollection["Comments"];
            order.DeliveryDate = DateTime.Now;
            order.DeliveryStatusId = 2;
            
            var stockService = new StockService(new RealStock());
            var productDescription = string.Empty;

            // Si tiene Stock Real actualiza y graba
            if (!stockService.HasStock(order.OrderDetails.ToList(), ref productDescription, ref hopeLingerieEntities))
            {
                TempData["Message"] = "No existe stock del producto: " + productDescription + ". El pedido no puede ser entregado hasta que no actualice el stock!";

                return Redirect("/Backoffice/InformationBackOffice");
            }
            else
                stockService.SubstractStock(order.OrderDetails.ToList(), ref hopeLingerieEntities);

            hopeLingerieEntities.SaveChanges();

            return RedirectToAction("OrdersToDeliver");
        }
        /*-------------------ORDERS--------------------------*/

        /*-------------------NEWSLETTERS--------------------------*/

        public virtual ActionResult NewsLetters()
        {
            var listNewsLetter = hopeLingerieEntities.NewsLetters.OrderBy(a => a.AddedDate);
            return PartialView("NewsLetterList", listNewsLetter);
        }

        /*-------------------NEWSLETTERS--------------------------*/

        /*-------------------CATEGORIES--------------------------*/

        public virtual ActionResult Categories()
        {
            var listCategory = hopeLingerieEntities.Categories.OrderBy(a => a.Category2.Description).OrderBy(a => a.DisplayOrder).Where(a => a.Active).Select(a => new { CategoryID = a.CategoryId, Parent = a.Category2.Description, Description = a.Description, DisplayOrder = a.DisplayOrder, Enabled = a.Enabled }).ToList();
            return PartialView("CategoryList", listCategory);
        }

        [HttpGet]
        public virtual ActionResult CategoryUpdate(int Id)
        {
            List<Category> categories = hopeLingerieEntities.Categories.Where(a => a.Active).OrderBy(a => a.Description).ToList();

            // Si es alta agrega la opción de categoría root
            if (Id == -1)
            {
                categories.Insert(0, new Category { CategoryId = -1, Description = "- Seleccione -", Active = true });
            }

            ViewData["categories"] = categories;

            if (Id != -1)
            {
                var category = hopeLingerieEntities.Categories.SingleOrDefault(a => a.CategoryId == Id);
                return View(category);
            }
       
            return View(new Category { CategoryId = Id });
        }

       
        [HttpPost]
        public virtual ActionResult CategoryUpdate(FormCollection formCollection)
        {
            Category category = new Category();

            if (Convert.ToInt16(formCollection["CategoryId"]) > 0)
            {
                int categoryId = Convert.ToInt16(formCollection["CategoryId"]);
                category = hopeLingerieEntities.Categories.Single(x => x.CategoryId == categoryId && x.Active);
            }

            TryUpdateModel(category, formCollection);

            category.Enabled = (formCollection["IsEnabled"] == "C");
            
            category.Description = formCollection["Descript"];

            /* Verificar si es categoria root => no se repita el nombre */
            if ((category.ParentCategoryId == -1) || (category.ParentCategoryId == null))
            {
                var newCategory = hopeLingerieEntities.Categories.SingleOrDefault(x => x.Description == category.Description && x.CategoryId != category.CategoryId && x.Active && x.ParentCategoryId == null);

                if (newCategory != null)
                {
                    TempData["Legend"] = "Ya existe una categoría Menú con ese nombre, intente con uno distinto!";
                    return RedirectToAction("CategoryUpdate", Convert.ToInt16(formCollection["CategoryId"]));
                }
            }

            if (category.CategoryId <= 0)
            {
                if (category.ParentCategoryId == -1)
                    category.ParentCategoryId = null;

                hopeLingerieEntities.Categories.AddObject(category);
            }
                        
            hopeLingerieEntities.SaveChanges();

            return Redirect("/BackOffice/Categories");
        }

        [HttpGet]
        public virtual ActionResult CategoryDelete(int Id)
        {
           var category = hopeLingerieEntities.Categories.SingleOrDefault(a=>a.CategoryId == Id && a.Active);

           if (category != null)
           {
               category.Active = false;
               hopeLingerieEntities.SaveChanges();
           }

           return Redirect("/BackOffice/Categories");
        }

        /*-------------------SIZES--------------------------*/

        public virtual ActionResult Sizes()
        {
            var listSize = hopeLingerieEntities.Sizes.OrderBy(a => a.Code).Where(a => a.Active).ToList();
            return PartialView("SizeList", listSize);
        }

        [HttpGet]
        public virtual ActionResult SizeUpdate(int Id)
        {
            if (Id != -1)
            {
                var size = hopeLingerieEntities.Sizes.SingleOrDefault(a => a.SizeId == Id);
                return View(size);
            }

            return View(new HopeLingerieServices.Model.Size { SizeId = Id });
        }


        [HttpPost]
        public virtual ActionResult SizeUpdate(FormCollection formCollection)
        {
            HopeLingerieServices.Model.Size size = new HopeLingerieServices.Model.Size();

            if (Convert.ToInt16(formCollection["SizeId"]) > 0)
            {
                int sizeId = Convert.ToInt16(formCollection["SizeId"]);
                size = hopeLingerieEntities.Sizes.Single(x => x.SizeId == sizeId && x.Active);
            }

            TryUpdateModel(size, formCollection);

            if (size.SizeId <= 0)
            {
                hopeLingerieEntities.Sizes.AddObject(size);
            }

            hopeLingerieEntities.SaveChanges();

            return Redirect("/BackOffice/Sizes");
        }

        [HttpGet]
        public virtual ActionResult SizeDelete(int Id)
        {
            var size = hopeLingerieEntities.Sizes.SingleOrDefault(a => a.SizeId == Id && a.Active);

            if (size != null)
            {
                size.Active = false;
                hopeLingerieEntities.SaveChanges();
            }

            return Redirect("/BackOffice/Sizes");
        }

        /*-----------------------------STOCK------------------------------*/

        public virtual ActionResult Stock()
        {
            var listStock = hopeLingerieEntities.Stocks.OrderBy(a => a.StockId).Where(a => a.Active).Select(x =>
             new { ProductId = x.ProductId, ColorId = x.ColorId, StockId = x.StockId, Code = x.Product.Code, Name = x.Product.Name, Color = x.Color.Code, Size = x.Size.Code, RealQuantity = x.RealQuantity, VirtualQuantity = x.VirtualQuantity}).ToList();
            return PartialView("StockList", listStock);
        }


        public ActionResult AsyncSubCategory(string categoryId)
        {
            var catId = Convert.ToInt32(categoryId);
            var categories = hopeLingerieEntities.Categories.Where(x => x.Active && x.ParentCategoryId == catId).ToList().OrderBy(x=>x.Description).Select(a => new SelectListItem()
            {
                Text = a.Description,
                Value = a.CategoryId.ToString(),
            });

            return Json(categories);
        }
    }
}
