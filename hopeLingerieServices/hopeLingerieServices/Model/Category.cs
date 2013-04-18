using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace HopeLingerieServices.Model
{
    [MetadataType(typeof(Category_Validation))]
    public partial class Category
    {
        
    }

    public class Category_Validation
    {
        [Required(ErrorMessage = "Campo obligatorio")]
        public string Description { get; set; }
    }
}
