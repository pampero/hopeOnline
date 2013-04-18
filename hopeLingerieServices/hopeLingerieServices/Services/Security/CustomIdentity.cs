using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Principal;

namespace HopeLingerieServices.Services.Security
{
    
    public class CustomIdentity : IIdentity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public CustomIdentity(string email, string firstName, string lastName)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
        }

        public string AuthenticationType
        {
            get { return "Forms"; }
        }

        public bool IsAuthenticated
        {
            get { return true; }
        }

        public string FullName
        {
            get { return FirstName + ", " + LastName; }
        }

        public string Name
        {
            get { return Email; }
        }
    }
}
