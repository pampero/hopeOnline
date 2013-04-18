using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HopeLingerieServices.Model;
using HopeLingerieServices.Services;

namespace HopeLingerieSite.Controllers
{
    public class InstitutionalController : Controller
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public ActionResult Index()
        {
            return View("Landing");
        }

        public ActionResult Faq()
        {
            return View("Faq");
        }

        public ActionResult HowToNavigate()
        {
            return View("HowToNavigate");
        }

        public ActionResult SafeBuy()
        {
            return View("SafeBuy");
        }

        public ActionResult HowToBuy()
        {
            return View("HowToBuy");
        }

        public ActionResult PrivacyPolicy()
        {
            return View("PrivacyPolicy");
        }

        public ActionResult UpdateShippingAddress()
        {
            return View("UpdateShippingAddress");
        }

        public ActionResult PaymentsMethods()
        {
            return View("PaymentsMethods");
        }

        public ActionResult DeliveryService()
        {
            return View("DeliveryService");
        }

        public ActionResult NotAviableProducts()
        {
            return View("NotAviableProducts");
        }

        public ActionResult ChangesAndRefound()
        {
            return View("ChangesAndRefound");
        }

        public ActionResult DivergentdataPurchase()
        {
            return View("DivergentdataPurchase");
        }
        public ActionResult CollectionProblemsCard()
        {
            return View("CollectionProblemsCard");
        }
        public ActionResult CollectionProblems()
        {
            return View("CollectionProblems");
        }
        public ActionResult Cancellations()
        {
            return View("Cancellations");
        }

        [HttpGet]
        public ActionResult ContactUs()
        {
            return View("ContactUs");
        }

        [HttpPost]
        public virtual ActionResult ContactUs(FormCollection formCollection)
        {
            var contact = new Contact();

            TryUpdateModel(contact, formCollection);

            contact.Description = formCollection["Descript"];
            contact.Telephone = formCollection["Telephone"];
            contact.EMail = formCollection["EMail"];
            contact.Subject = formCollection["Subject"];
            contact.AddedDate = DateTime.Now;
            contact.Active = true;
            
            hopeLingerieEntities.Contacts.AddObject(contact);
            hopeLingerieEntities.SaveChanges();

            Mail mail = hopeLingerieEntities.Mails.SingleOrDefault(a => a.Code == "CONTACTUS");
            if (mail != null)
                MailService.Send(mail.From, "sac@hopeonline.com.ar", mail.Subject, mail.Body);

            return View("Enviado");
        }

        public ActionResult AboutUs()
        {
            return View("AboutUs");
        }

        public ActionResult OurStores()
        {
            return View("OurStores");
        }

        //Nossas Lojas 

    }
}
