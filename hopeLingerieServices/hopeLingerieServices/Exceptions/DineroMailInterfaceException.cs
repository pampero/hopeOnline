using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HopeLingerieServices.Exceptions
{
    class DineroMailInterfaceException: Exception
    {
         public DineroMailInterfaceException()
           {
           }

         public DineroMailInterfaceException(string message)
             : base(message)
           {
           }
    }
}
