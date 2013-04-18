using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HopeLingerieServices.Model;

namespace HopeLingerieServices.Services.Security
{
    public interface IMembershipService
    {
        int MinPasswordLength { get; }

        bool Validate(string email, string password);
        bool ChangePassword(string userName, string oldPassword, string newPassword);
        MembershipCreationStatus Create(Customer customer);
    }

}
