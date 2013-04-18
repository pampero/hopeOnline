using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Principal;

namespace HopeLingerieServices.Services.Security
{
    public class CustomPrincipal : IPrincipal
    {
        private IIdentity CustomIdentity { get; set; }
        private string Roles { get; set; }

        public CustomPrincipal(IIdentity userIdentity, string roles)
        {
            Roles = roles;
            CustomIdentity = userIdentity;
        }

        public IIdentity Identity
        {
            get { return CustomIdentity; }
        }

        public bool IsInRole(string role)
        {
            return Roles.Contains(role);
        }
    }
}
