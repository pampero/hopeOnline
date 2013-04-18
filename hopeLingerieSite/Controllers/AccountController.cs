using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using HopeLingerieSite.ViewModels;
using HopeLingerieServices.Model;
using HopeLingerieServices.Services.Security;
using HopeLingerieServices.Common;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Security.Principal;
using System.Data;
using HopeLingerieServices.Services;

namespace HopeLingerieSite.Controllers
{
    public partial class AccountController : Controller
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        public IFormsAuthenticationService FormsService
        {
            get;
            private set;
        }

        public IMembershipService MembershipService
        {
            get;
            private set;
        }

        public AccountController()
            : this(null, null)
        {
        }

        public AccountController(IFormsAuthenticationService formsService, IMembershipService membershipService)
        {
            FormsService = formsService ?? new FormsAuthenticationService();
            MembershipService = membershipService ?? new MembershipService();
        }

        [HttpGet]
        public virtual ActionResult CustomerLogOn()
        {
            if (this.User.Identity.IsAuthenticated)
                return RedirectToAction("Edit");

            return View();
        }


        [HttpGet]
        public virtual ActionResult LogOn()
        {
            CurrentSelection currentSelection = new CurrentSelection();
            currentSelection.CategoriesMenu = hopeLingerieEntities.Categories.Where(x => x.ParentCategoryId == null && x.Active).OrderBy(x => x.DisplayOrder).ToList();
            return View(currentSelection);
        }

        private string GetGuid()
        {
            HttpCookie httpCookie = HttpContext.Request.Cookies["ShoppingCart" + HttpContext.Request.Browser.Browser];

            if ((httpCookie == null) || (httpCookie != null && String.IsNullOrEmpty(httpCookie.Value)))
            {
                Guid guid = Guid.NewGuid();
                httpCookie = new HttpCookie("ShoppingCart" + HttpContext.Request.Browser.Browser, guid.ToString());
                httpCookie.Expires = DateTime.Now.AddDays(10);
                HttpContext.Response.Cookies.Add(httpCookie);
                return guid.ToString();
            }
            else
            {
                if (httpCookie.Value != "")
                    return httpCookie.Value;

                return string.Empty;
            }
        }

        [HttpPost]
        public virtual ActionResult ItemsQuantity()
        {
            var guid = GetGuid();
            var quantity = 0;
            try
            {
                quantity = hopeLingerieEntities.OrderDetails.Where(x => x.Active && x.OrderDetailStatusId == 1 && x.GUID == guid && x.OrderId == null).Sum(x => x.Quantity);
            }
            catch { }

            var results = new { Value = quantity };
            return Json(results);
        }

        [HttpPost]
        public virtual ActionResult GetUser()
        {
            string userName = string.Empty;

            if ((User.Identity != null) && (User.Identity.IsAuthenticated))
            {
                userName = "Hola " + ((CustomIdentity)(User.Identity)).FirstName + " bienvenido al sitio!";
            }
            else
            {
                userName = "¿Nuevo usuario?";
            }
            
            var results = new { Value = userName };
            return Json(results);
        }

        [HttpPost]
        [SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings",
            Justification = "Needs to take same parameter type as Controller.Redirect()")]
        public virtual ActionResult LogOn(FormCollection formCollection, string returnUrl)
        {
            string email = formCollection["Email"];
            string password = formCollection["Password"];
            string action = string.Empty;
            bool isValid = false;
            
            isValid = MembershipService.Validate(email, password);
            
            if (isValid)
            {
                FormsService.SignIn(email, false);

                if (!String.IsNullOrEmpty(returnUrl))
                {
                    return Redirect(returnUrl);
                }
                else
                {
                    return RedirectToAction("Edit");
                }
            }

            TempData["Message"] = "El Email o la clave ingresada no son correctos!";
            TempData["ActionType"] = ActionType.Back;

            return Redirect("/Account/Information");
        }

        [HttpGet]
        public virtual ActionResult ForgetPassword()
        {
            return View();
        }

        [HttpPost]
        public virtual ActionResult ForgetPassword(FormCollection formCollection)
        {
            String KeyString = "Gv7L3V15jCdb9P5XGKiPnhHZ7JlKcmU=";
            Mail mail = hopeLingerieEntities.Mails.SingleOrDefault(a => a.Code == "FORGETPWD");
            var email = formCollection["Email"];
            var customer = hopeLingerieEntities.Customers.SingleOrDefault(x=>x.Email == email && x.Active);

            if (customer == null)
            {
                TempData["Message"] = "No se ha encontrado el usuario con el mail ingresado, intente nuevamente!";
                TempData["ActionType"] = ActionType.Back;

                return Redirect("/Account/Information");
            }

            if ((mail != null) && (!String.IsNullOrEmpty(email)))
                MailService.Send(mail.From, email, mail.Subject, String.Format(mail.Body, customer.FirstName + " " + customer.LastName, email, EncryptionService.Decrypt(customer.Password, KeyString)));
             
            TempData["Message"] = "Los datos de ingreso al sitio han sido enviados a tu correo!";
            TempData["ActionType"] = ActionType.Catalogue;

            return Redirect("/Account/Information");
        }


        [HttpGet]
        [Authorize(Roles="User")]
        public virtual ActionResult Edit()
        {
            Customer customer = hopeLingerieEntities.Customers.First<Customer>(x=>x.Email == User.Identity.Name && x.Active);
            ViewData["States"] = hopeLingerieEntities.States;

            return View("Account", customer);
        }

        public virtual ActionResult Information()
        {
            MessageViewModel messageViewModel = new MessageViewModel();
            messageViewModel.Message = TempData["Message"] as string;
            
            if (TempData["ActionType"] == null)
                messageViewModel.ActionType = ActionType.Home;
            else
                messageViewModel.ActionType = (ActionType)TempData["ActionType"];

            return View("Information", messageViewModel);
        }

        [HttpPost]
        [Authorize(Roles="User")]
        public virtual ActionResult Edit(Customer customer)
        {
            var emailExists = hopeLingerieEntities.Customers.SingleOrDefault(a => a.CustomerId != customer.CustomerId && a.Email == customer.Email && a.Active);

            if (emailExists != null)
            {
                TempData["Message"] = "El Email ingresado ya existe en nuestra base de datos!";
                TempData["ActionType"] = ActionType.Back;

                return Redirect("/Account/Information");
            }
            
            var newCustomer = hopeLingerieEntities.Customers.SingleOrDefault(a => a.CustomerId == customer.CustomerId && a.Active);
            newCustomer.BirthDate = customer.BirthDate;
            newCustomer.Cellular = customer.Cellular;
            newCustomer.City = customer.City;
            newCustomer.DNI = customer.DNI;
            newCustomer.Fax = customer.Fax;
            newCustomer.FirstName = customer.FirstName;
            newCustomer.LastName = customer.LastName;
            newCustomer.NewsLetter = customer.NewsLetter;
            newCustomer.Number = customer.Number;
            newCustomer.StateId = customer.StateId;
            newCustomer.Telephone1 = customer.Telephone1;
            newCustomer.Telephone2 = customer.Telephone2;
            newCustomer.Telephone3 = customer.Telephone3;
            newCustomer.ZipCode = customer.ZipCode;
            newCustomer.Gender = customer.Gender;
            newCustomer.Address = customer.Address;

            if (!customer.NewsLetter)
            {
                var newsLetter = hopeLingerieEntities.NewsLetters.SingleOrDefault(x => x.Email == newCustomer.Email);
                hopeLingerieEntities.NewsLetters.DeleteObject(newsLetter);
            }
            else
            {
                var newsLetter = hopeLingerieEntities.NewsLetters.SingleOrDefault(x => x.Email == newCustomer.Email);

                if (newsLetter != null)
                {
                    newsLetter.Email = customer.Email;
                    newsLetter.Name = customer.LastName + ", " + customer.FirstName;
                }
                else
                {
                    newsLetter = new NewsLetter();
                    newsLetter.Email = customer.Email;
                    newsLetter.Name = customer.LastName + ", " + customer.FirstName;
                    newsLetter.AddedDate = DateTime.Now;
                    hopeLingerieEntities.NewsLetters.AddObject(newsLetter);
                }
            }

            // Si hay cambio de mail lo desloguea.
            if (newCustomer.Email != customer.Email)
            {
                newCustomer.Email = customer.Email;
                hopeLingerieEntities.SaveChanges();
                FormsService.SignOut();

                TempData["Message"] = "Tu cuenta ha sido modificada con éxito! Al modificar el Email deberás ingresar nuevamente al sitio";
                TempData["ActionType"] = ActionType.Catalogue;
                return Redirect("/Account/Information");
            }

            hopeLingerieEntities.SaveChanges();
            TempData["Message"] = "Tu cuenta ha sido modificada con éxito!";
            TempData["ActionType"] = ActionType.Catalogue;
            return Redirect("/Account/Information");
        }

        [HttpPost]
        public virtual ActionResult CreateFromLogOn(FormCollection formCollection)
        {
            var email = formCollection["Email2"];
            var emailExists = hopeLingerieEntities.Customers.SingleOrDefault(a => a.Email == email && a.Active) != null;

            if (emailExists)
            {
                TempData["Message"] = "El Email ingresado ya existe en nuestra base de datos!";
                TempData["ActionType"] = ActionType.Back;

                return Redirect("/Account/Information");
            }
            
            Customer customer = new Customer();
            customer.Email = formCollection["Email2"];
            customer.BirthDate = DateTime.Now;
            ViewData["States"] = hopeLingerieEntities.States;

            return View("Account", customer);
        }


        [HttpPost]
        public virtual ActionResult Create(Customer customer)
        {

            MembershipCreationStatus membershipCreationStatus = MembershipService.Create(customer);

            if (membershipCreationStatus == MembershipCreationStatus.Success)
            {
                // Si no está logueado
                if (String.IsNullOrEmpty(User.Identity.Name))
                {
                    FormsService.SignIn(customer.Email, false);
                    TempData["Message"] = "Tu cuenta ha sido creada con éxito, ya podés comenzar a operar con Hope!";
                }
                else // Si ya está logueado
                {
                    FormsService.SignOut();
                    TempData["Message"] = "Tu cuenta ha sido creada con éxito, ingesá al sitio y comenzá a operar con Hope!";
                }
                
                TempData["ActionType"] = ActionType.Catalogue;
            }

            if (membershipCreationStatus == MembershipCreationStatus.DuplicateEmail)
            {
                TempData["Message"] = "Ya existe una cuenta con el E-mail ingresado!";
                TempData["ActionType"] = ActionType.Back;
            }

            if (membershipCreationStatus == MembershipCreationStatus.Fail)
            {
                TempData["Message"] = "Ha ocurrido un error al crear su usuario!";
                TempData["ActionType"] = ActionType.Back;
            }

            return RedirectToAction("Information");

        }

        [HttpGet]
        //[Authorize(Roles="User")]
        public virtual ActionResult ChangePassword()
        {
            return View("ChangePassword");
        }

        [HttpPost]
        //  No se por qué está esto, por las dudas no lo saco por ahora
        // [Authorize(Roles="User")]
        public virtual ActionResult ChangePassword(ChangePasswordViewModel changePasswordViewModel)
        {
            bool passwordChanged = MembershipService.ChangePassword(changePasswordViewModel.Email, changePasswordViewModel.OldPassword, changePasswordViewModel.NewPassword);

            if (!passwordChanged)
            {
                TempData["Message"] = "Tu Email o contraseña no son válidos, intentá nuevamente!";
                TempData["ActionType"] = ActionType.Back;
                return RedirectToAction("Information");
            }
            else
            {
                TempData["Message"] = "Tu contraseña ha sido modificada con éxito!";
                TempData["ActionType"] = ActionType.Catalogue;
                return RedirectToAction("Information");
            }
        }

        public virtual ActionResult LogOff()
        {
            FormsService.SignOut();

            TempData["Message"] = "Ud. ha salido del sitio, para realizar una compra deberá ingresar nuevamente!";
            TempData["ActionType"] = ActionType.Home;

            return Redirect("/Account/Information");
        }
    }
}
