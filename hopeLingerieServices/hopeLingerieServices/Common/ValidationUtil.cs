using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HopeLingerieServices.Common
{
    internal static class ValidationUtil
    {
        private const string _stringRequiredErrorMessage = "Value cannot be null or empty.";

        public static void ValidateRequiredStringValue(string value, string parameterName)
        {
            if (String.IsNullOrEmpty(value))
            {
                throw new ArgumentException(_stringRequiredErrorMessage, parameterName);
            }
        }
    }
}
