using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopeLingerieServices.Model;
using HopeLingerieServices.Services;

namespace HopeLingerieSite.Controllers
{
    public partial class FranquiciasController : Controller
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public ActionResult Display(int Id)
        {
            Franchise franchise = hopeLingerieEntities.Franchises.SingleOrDefault(x => x.FranchiseId== Id && x.Active);

            return View("FranchiseDisplay", franchise);
        }

        public ActionResult RecibeNewsLetter(FormCollection formCollection)
        { 
            var step = formCollection["Step"];
            var email = formCollection["receba_novidades"];

            var exists = (hopeLingerieEntities.NewsLetters.SingleOrDefault(x => x.Email == email && x.Active) != null) ? true : false;
            
            if (!exists)
            {
                hopeLingerieEntities.AddToNewsLetters(new NewsLetter { Email = email, Active = true, Name = "", AddedDate = DateTime.Now });
                hopeLingerieEntities.SaveChanges();
            }
            
            return RedirectToAction("GoStep", new { Step = step});
        }

        public virtual ActionResult Index()
        {
            return View();
        }

        public ActionResult GoStep(string Step)
        {
            switch (Step)
            {
                case "0":
                    return View();

                case "1":
                    return View("1");
                
                case "2":
                    return View("2");

                case "3":
                    return View("3");

                case "4":
                    return View("4");

                case "5":
                    ViewData["States"] = hopeLingerieEntities.States;
                    ViewData["Cities"] = hopeLingerieEntities.Cities;
                    return View("5");

                default:
                    return View(); 
            }
        }

        [HttpPost]
        public virtual ActionResult Create(Franchise franchise)
        {
            franchise.AddedDate = DateTime.Now;
            hopeLingerieEntities.AddToFranchises(franchise);
            hopeLingerieEntities.SaveChanges();

            MailService.Send("noreply@hopeonline.com.ar", "monique@hopeonline.com.ar", "Consulta de Franquicias", "Has recibido una nueva consulta por Franquicias en el sitio web. Podes revisar la misma desde el administrador.");
            
            return RedirectToAction("Index", "Home");
        }
    }
}
