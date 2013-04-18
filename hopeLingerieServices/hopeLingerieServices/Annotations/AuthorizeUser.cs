using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web;
using HopeLingerieServices.Services.Security;
using System.Threading;
using System.Security.Principal;
using System.Web.Security;

namespace HopeLingerieServices.Annotations
{

    public class AuthorizeUserAttribute : AuthorizeAttribute
    {   
        protected override bool AuthorizeCore(HttpContextBase httpContext) 
        {
            if (!httpContext.User.Identity.IsAuthenticated)
                return false;

            return httpContext.User.IsInRole(Roles);
        }
    }
}
