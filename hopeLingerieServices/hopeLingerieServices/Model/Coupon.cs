using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace HopeLingerieServices.Model
{
    [MetadataType(typeof(Coupon_Validation))]
    public partial class Coupon
    {

    }

    public class Coupon_Validation
    {
        [Required(ErrorMessage = "Campo obligatorio")]
        public string Code { get; set; }
    }
}
