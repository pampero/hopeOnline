using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HopeLingerieServices.Common;
using System.Web.Security;
using System.Security.Principal;

namespace HopeLingerieServices.Services.Security
{
    public class FormsAuthenticationService : IFormsAuthenticationService
    {
        public void SignIn(string userName, bool createPersistentCookie)
        {
            ValidationUtil.ValidateRequiredStringValue(userName, "userName");
            FormsAuthentication.SetAuthCookie(userName, createPersistentCookie);
        }

        public void SignOut()
        {
            FormsAuthentication.SignOut();
        }
    }
}
