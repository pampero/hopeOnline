using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopeLingerieServices.Model;
using HopeLingerieServices.Services;
using HopeLingerieSite.ViewModels;

namespace HopeLingerieSite.Controllers
{
    public partial class HomeController : Controller
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public virtual ActionResult Index()
        {
            var paymentService = new PaymentService();
            paymentService.PurgeOrdersAsync();

            Parameter parameterFrontLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "FRONTLINKIMAGE");
            Parameter parameterLeftLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "LEFTLINKIMAGE");
            Parameter parameterRightLinkImage = hopeLingerieEntities.Parameters.SingleOrDefault(x => x.ParameterCode == "RIGHTLINKIMAGE");

            ViewData["FrontLinkImage"] = parameterFrontLinkImage.ParameterValue;
            ViewData["LeftLinkImage"] = parameterLeftLinkImage.ParameterValue;
            ViewData["RightLinkImage"] = parameterRightLinkImage.ParameterValue;

            return View();
        }

        [ChildActionOnly]
        [OutputCache(Duration = 60, VaryByParam = "none")]
        public virtual ActionResult RenderMenu()
        {
            CurrentSelection currentSelection = new CurrentSelection();
            currentSelection.CategoriesMenu = hopeLingerieEntities.Categories.Where(x => x.ParentCategoryId == null && x.Active && x.Enabled).OrderBy(x => x.DisplayOrder).ToList();

            return PartialView("MenuPartialView", currentSelection);
        }
    }

    public partial class QuienesSomosController : Controller
    {
        public virtual ActionResult Index()
        {

            return View("../Home/AboutUs");
        }
    }

    public partial class ContactoController : Controller
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public virtual ActionResult Index()
        {
         
            return View("../Home/ContactUs", new Contact());
        }

        [HttpPost]
        public virtual ActionResult ContactUs(FormCollection formCollection)
        {
            var contact = new Contact();
            
            TryUpdateModel(contact, formCollection);
            
            contact.NewsLetter = (formCollection["NewsLetter"] != "N");
            contact.Description = formCollection["Descript"];
            contact.AddedDate = DateTime.Now;
            hopeLingerieEntities.Contacts.AddObject(contact);

            if (contact.NewsLetter)
            {
                var newsLetter = new NewsLetter();
                newsLetter.Email = contact.EMail;
                newsLetter.Name = contact.Name;
                newsLetter.AddedDate = DateTime.Now;
                hopeLingerieEntities.NewsLetters.AddObject(newsLetter);
            }
            
            hopeLingerieEntities.SaveChanges();

            return View("../Home/Index");
        }
    }


    public partial class SucursalesController : Controller
    {
        public virtual ActionResult Index()
        {
            return View("../Home/Branches");
        }
    }
}


