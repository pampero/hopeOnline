using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DevExpress.Web.ASPxEditors;

namespace HopeLingerieServices.Services.Validation
{

    public class EditorsHelper
    {
        static ValidationSettings nameValidationSettings;
        public static ValidationSettings NameValidationSettings
        {
            get
            {
                if (nameValidationSettings == null)
                {
                    nameValidationSettings = ValidationSettings.CreateValidationSettings();
                    nameValidationSettings.Display = Display.Dynamic;
                    nameValidationSettings.ErrorDisplayMode = ErrorDisplayMode.ImageWithText;
                    nameValidationSettings.ErrorText = "Campo requerido";
                }
                return nameValidationSettings;
            }
        }

        static ValidationSettings ageValidationSettings;
        public static ValidationSettings AgeValidationSettings
        {
            get
            {
                if (ageValidationSettings == null)
                {
                    ageValidationSettings = ValidationSettings.CreateValidationSettings();
                    ageValidationSettings.Display = Display.Dynamic;
                    ageValidationSettings.ErrorDisplayMode = ErrorDisplayMode.ImageWithText;
                    ageValidationSettings.ErrorText = "Must be between 18 and 100";
                }
                return ageValidationSettings;
            }
        }

        static ValidationSettings emailValidationSettings;
        public static ValidationSettings EmailValidationSettings
        {
            get
            {
                if (emailValidationSettings == null)
                {
                    emailValidationSettings = ValidationSettings.CreateValidationSettings();
                    emailValidationSettings.Display = Display.Dynamic;
                    emailValidationSettings.ErrorDisplayMode = ErrorDisplayMode.ImageWithText;
                    emailValidationSettings.RequiredField.IsRequired = true;
                    emailValidationSettings.RequiredField.ErrorText = "Campo requerido";
                    emailValidationSettings.RegularExpression.ValidationExpression = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
                    emailValidationSettings.RegularExpression.ErrorText = "Email inválido";
                }
                return emailValidationSettings;
            }
        }

        static ValidationSettings dateValidationSettings;
        public static ValidationSettings DateValidationSettings
        {
            get
            {
                if (dateValidationSettings == null)
                {
                    dateValidationSettings = ValidationSettings.CreateValidationSettings();
                    dateValidationSettings.Display = Display.Dynamic;
                    dateValidationSettings.ErrorDisplayMode = ErrorDisplayMode.ImageWithText;
                    dateValidationSettings.ErrorText = "Fecha requerida";
                    dateValidationSettings.RequiredField.IsRequired = true;
                    dateValidationSettings.RequiredField.ErrorText = "";
                }
                return dateValidationSettings;
            }
        }

        public static void OnRequiredValidation(object sender, ValidationEventArgs e)
        {
            if (e.Value == null)
            {
                e.IsValid = false;
                return;
            }
            var name = e.Value.ToString();
            if (name == string.Empty)
                e.IsValid = false;
        }
       
    }
}