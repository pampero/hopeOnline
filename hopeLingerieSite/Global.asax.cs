using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using HopeLingerieServices.Services.Security;
using System.Security.Principal;
using HopeLingerieServices.Model;
using System.Web.Security;

namespace hopeLinerieSite
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("{*favicon}", new { favicon = @"(.*/)?favicon.ico(/.*)?" });
            routes.IgnoreRoute("Scripts/{*pathInfo}");

            routes.MapRoute(
             "CatalogoMedidas", // Route name
             "Catalogo/Medidas", // URL with parameters
             new { controller = "Catalogo", action = "Medidas" } // Parameter defaults
          );

            routes.MapRoute(
              "CatalogoIndex", // Route name
              "Catalogo", // URL with parameters
              new { controller = "Catalogo", action = "Index" } // Parameter defaults
           );

            routes.MapRoute(
              "Sizes", // Route name
              "Catalogo/ProductSize", // URL with parameters
              new { controller = "Catalogo", action = "ProductSize"} // Parameter defaults
           );

            routes.MapRoute(
              "Novedades", // Route name
              "Catalogo/Novedades/{id}", // URL with parameters
              new { controller = "Catalogo", action = "Novedades", id = UrlParameter.Optional } // Parameter defaults
           );

            routes.MapRoute(
             "Liquidacion", // Route name
             "Catalogo/Liquidacion/{id}", // URL with parameters
             new { controller = "Catalogo", action = "Liquidacion", id = UrlParameter.Optional } // Parameter defaults
          );

            routes.MapRoute(
             "CategoryNavigation", // Route name
             "Catalogo/CategoryNavigation/{id}", // URL with parameters
             new { controller = "Catalogo", action = "CategoryNavigation", id = UrlParameter.Optional } // Parameter defaults
          );

            routes.MapRoute(
             "ProductDetail", // Route name
             "Catalogo/ProductDetail/{id}", // URL with parameters
             new { controller = "Catalogo", action = "ProductDetail", id = UrlParameter.Optional } // Parameter defaults
          );

            routes.MapRoute(
               "Buscar", // Route name
               "Catalogo/Buscar", // URL with parameters
               new { controller = "Catalogo", action = "Buscar" } // Parameter defaults
            );

            routes.MapRoute(
               "Catalogo", // Route name
               "Catalogo/{actionName}/{id}", // URL with parameters
               new { controller = "Catalogo", action = "GenericAction", actionName = UrlParameter.Optional, id = UrlParameter.Optional } // Parameter defaults
            );

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );

        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
        }


        void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            if ((Context.User != null) && (Context.User.Identity.IsAuthenticated))
            {
                string userInformation = String.Empty;//where the cookie info will be placed
                string roles = string.Empty;
                string email = string.Empty;
                string firstName = string.Empty;
                string lastName = string.Empty;

                // Create the roles cookie if it doesn't exist yet for this session.
                if ((Request.Cookies["cnstUserRole"] == null) || (Request.Cookies["cnstUserRole"].Value == ""))
                {
                    HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

                    Customer customer = hopeLingerieEntities.Customers.SingleOrDefault(a => a.Email == Context.User.Identity.Name && a.Active);

                    if (customer != null)
                    {
                        if (customer.IsAdmin)
                            roles = "Admin";
                        else
                            roles = "User";

                        userInformation = roles + ";" + Context.User.Identity.Name + ";" + customer.FirstName + ";" + customer.LastName;

                        email = Context.User.Identity.Name;
                        firstName = customer.FirstName;
                        lastName = customer.LastName;

                        // Create a cookie authentication ticket.
                        FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
                            1,                              // version
                            User.Identity.Name,             // user name
                            DateTime.Now,                   // issue time
                            DateTime.Now.AddHours(1),       // expires every hour
                            false,                          // don't persist cookie
                            userInformation);

                        // Encrypt the ticket
                        String cookieStr = FormsAuthentication.Encrypt(ticket);

                        // Send the cookie to the client
                        Response.Cookies["cnstUserRole"].Value = cookieStr;
                        Response.Cookies["cnstUserRole"].Path = "/";
                        Response.Cookies["cnstUserRole"].Expires = DateTime.Now.AddMinutes(1);
                    }
                }
                else
                {
                    FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(Context.Request.Cookies["cnstUserRole"].Value);
                    userInformation = ticket.UserData;

                    string[] cookieInfo = userInformation.Split(new char[] { ';' });
                    roles = cookieInfo[0];
                    email = cookieInfo[1];
                    firstName = cookieInfo[2];
                    lastName = cookieInfo[3];
                }

                CustomIdentity customIdentity = new CustomIdentity(email, firstName, lastName);
                HttpContext.Current.User = new CustomPrincipal(customIdentity, roles);
            }
        }
    }
}