using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HopeLingerieServices.Common;
using HopeLingerieServices.Model;
using HopeLingerieServices.Services;
using System.Web;


namespace HopeLingerieServices.Services.Security
{
   
    public class MembershipService : IMembershipService
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();
        String KeyString = "Gv7L3V15jCdb9P5XGKiPnhHZ7JlKcmU=";

        public int MinPasswordLength
        {
            get
            {
                return 8;
            }
        }
     
        public bool Validate(string email, string uiPassword)
        {
            ValidationUtil.ValidateRequiredStringValue(email, "email");
            ValidationUtil.ValidateRequiredStringValue(uiPassword, "password");

            Customer customer = hopeLingerieEntities.Customers.SingleOrDefault(x => x.Email == email && x.Active);

            if (customer == null) return false;

            string dbPassword = EncryptionService.Decrypt(customer.Password, KeyString);

            return (dbPassword == uiPassword);
        }

        public bool ChangePassword(string email, string oldPassword, string newPassword)
        {
            ValidationUtil.ValidateRequiredStringValue(email, "email");
            ValidationUtil.ValidateRequiredStringValue(oldPassword, "oldPassword");
            ValidationUtil.ValidateRequiredStringValue(newPassword, "newPassword");

            try
            {
                Customer customer = hopeLingerieEntities.Customers.SingleOrDefault(x => x.Email == email && x.Active);

                if (customer == null) return false;

                var dbPassword = EncryptionService.Decrypt(customer.Password, KeyString);

                if (dbPassword != oldPassword) return false;

                customer.Password = EncryptionService.Encrypt(newPassword, KeyString);
                hopeLingerieEntities.SaveChanges();

                Mail mail = hopeLingerieEntities.Mails.SingleOrDefault(a=>a.Code == "CHANGEPWD");

                if (mail != null)
                    MailService.Send(mail.From, email, mail.Subject, String.Format(mail.Body, customer.FirstName + " " +customer.LastName, email, newPassword));

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        public MembershipCreationStatus Create(Customer customer)
        {
            try
            {
                string decriptedPassword = customer.Password;
                Customer newCustomer = hopeLingerieEntities.Customers.SingleOrDefault(x => x.Email == customer.Email && x.Active);

                if (newCustomer != null)
                    return MembershipCreationStatus.DuplicateEmail;

                customer.Password = EncryptionService.Encrypt(customer.Password, KeyString);
                customer.IsAdmin = false;
                customer.AddedDate = DateTime.Now;
                hopeLingerieEntities.Customers.AddObject(customer);

                if (customer.NewsLetter)
                {
                    NewsLetter newsLetter = new NewsLetter();
                    newsLetter.AddedDate = DateTime.Now;
                    newsLetter.Email = customer.Email;
                    newsLetter.Name = customer.LastName + ", " + customer.FirstName;
                    hopeLingerieEntities.NewsLetters.AddObject(newsLetter);
                }

                hopeLingerieEntities.SaveChanges();

                Mail mail = hopeLingerieEntities.Mails.SingleOrDefault(a => a.Code == "NEWUSER");

                if (mail != null)
                    MailService.Send(mail.From, customer.Email, mail.Subject, String.Format(mail.Body, customer.FirstName + " " + customer.LastName, customer.Email, EncryptionService.Decrypt(customer.Password, KeyString)));

                return MembershipCreationStatus.Success;
            }
            catch
            {
                return MembershipCreationStatus.Fail;
            }
        }


    }

   

}
