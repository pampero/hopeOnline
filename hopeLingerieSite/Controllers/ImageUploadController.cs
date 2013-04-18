using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DevExpress.Web.ASPxUploadControl;
using System.IO;
using System.Drawing;
using DevExpress.Web.Mvc;
using HopeLingerieServices.Services.Utils;

namespace HopeLingerieSite.Controllers.Backoffice
{
    public partial class BackOfficeController : Controller
    {
        public const string UploadDirectory = "~/Content/UploadControl/UploadFolder/Products/";
        public const string UploadCategoryDirectory = "~/Content/UploadControl/UploadFolder/Categories/";
        public const string UploadHomeDirectory = "~/Content/UploadControl/UploadFolder/HomeDraft/";

        public ActionResult CallbacksImageDetailFirst(int Id)
        {
            var product = hopeLingerieEntities.Products.Single(x => x.ProductId == Id && x.Active);

            TempData["ProductId"] = product.ProductId;
            TempData["FilePrefix"] = "imagedetailfirst_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageDetailFirst", PhotoUtils.ValidationSettings, DetailImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageDetailSecond(int Id)
        {
            var product = hopeLingerieEntities.Products.Single(x => x.ProductId == Id && x.Active);

            TempData["ProductId"] = product.ProductId;
            TempData["FilePrefix"] = "imagedetailsecond_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageDetailSecond", PhotoUtils.ValidationSettings, DetailImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageBackFirst(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "imagebackfirst_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageBackFirst", PhotoUtils.ValidationSettings, ImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageBackSecond(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "imagebacksecond_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageBackSecond", PhotoUtils.ValidationSettings, ImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageFrontFirst(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "zoomimagefrontfirst_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageFrontFirst", PhotoUtils.ValidationSettings, ImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageFrontSecond(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "zoomimagefrontsecond_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageFrontSecond", PhotoUtils.ValidationSettings, ImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageBackFirstZoom(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "imagebackfirstzoom_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageBackFirstZoom", PhotoUtils.ValidationSettings, ZoomImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageBackSecondZoom(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "imagebacksecondzoom_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageBackSecondZoom", PhotoUtils.ValidationSettings, ZoomImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageFrontFirstZoom(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "imagefrontfirstzoom_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageFrontFirstZoom", PhotoUtils.ValidationSettings, ZoomImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksImageFrontSecondZoom(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "imagefrontsecondzoom_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksImageFrontSecondZoom", PhotoUtils.ValidationSettings, ZoomImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksColorThumb(int Id)
        {
            var color = hopeLingerieEntities.Colors.Single(x => x.ColorId == Id && x.Active);

            TempData["ProductId"] = color.ProductId;
            TempData["ColorId"] = color.ColorId;
            TempData["FilePrefix"] = "color_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksColorThumb", PhotoUtils.ValidationSettings, ImageUploadComplete);
            return null;
        }

        public ActionResult CallbacksCategoryThumb(int Id)
        {
            TempData["CategoryId"] = Id;
            TempData["FilePrefix"] = "category_";
            UploadControlExtension.GetUploadedFiles("ucCallbacksCategoryThumb", PhotoUtils.ValidationSettings, CategoryImageUploadComplete);
            return null;
        }

        protected void CategoryImageUploadComplete(object sender, FileUploadCompleteEventArgs e)
        {
            if (e.UploadedFile.IsValid)
            {
                string fullDir = Request.MapPath(UploadCategoryDirectory + TempData["CategoryId"]);

                if (!Directory.Exists(fullDir))
                    Directory.CreateDirectory(fullDir);

                string filePath = UploadCategoryDirectory + TempData["CategoryId"] + "/" + TempData["FilePrefix"] + e.UploadedFile.FileName;

                using (Image original = Image.FromStream(e.UploadedFile.FileContent))
                {
                    PhotoUtils.SaveToJpeg(original, Request.MapPath(filePath));
                }

                e.CallbackData = TempData["FilePrefix"] + e.UploadedFile.FileName + "|" + Url.Content(filePath) + "?refresh=" + Guid.NewGuid();
            }
        }

        protected void ImageUploadComplete(object sender, FileUploadCompleteEventArgs e)
        {
            if (e.UploadedFile.IsValid)
            {
                string fullDir = Request.MapPath(UploadDirectory + TempData["ProductId"]);

                if (!Directory.Exists(fullDir))
                    Directory.CreateDirectory(fullDir);

                fullDir = Request.MapPath(UploadDirectory + TempData["ProductId"]) + "/" + TempData["ColorId"];

                if (!Directory.Exists(fullDir))
                    Directory.CreateDirectory(fullDir);

                string filePath = UploadDirectory + TempData["ProductId"] + "/" + TempData["ColorId"] + "/" + TempData["FilePrefix"] + e.UploadedFile.FileName;
                string filePathThumbnail = UploadDirectory + TempData["ProductId"] + "/" + TempData["ColorId"] + "/thumb_" + TempData["FilePrefix"] + e.UploadedFile.FileName;

                using (Image original = Image.FromStream(e.UploadedFile.FileContent))
                {
                    PhotoUtils.SaveToJpeg(original, Request.MapPath(filePath));
                }

                e.CallbackData = TempData["FilePrefix"] + e.UploadedFile.FileName + "|" + Url.Content(filePath) + "?refresh=" + Guid.NewGuid();
            }
        }


        protected void ZoomImageUploadComplete(object sender, FileUploadCompleteEventArgs e)
        {
            if (e.UploadedFile.IsValid)
            {
                string fullDir = Request.MapPath(UploadDirectory + TempData["ProductId"]);

                if (!Directory.Exists(fullDir))
                    Directory.CreateDirectory(fullDir);

                fullDir = Request.MapPath(UploadDirectory + TempData["ProductId"]) + @"\" + TempData["ColorId"];

                if (!Directory.Exists(fullDir))
                    Directory.CreateDirectory(fullDir);

                string filePath = UploadDirectory + TempData["ProductId"] + "/" + TempData["ColorId"] + "/" + TempData["FilePrefix"] + e.UploadedFile.FileName;
                string filePathDetail = UploadDirectory + TempData["ProductId"] + "/detail_" + TempData["FilePrefix"] + e.UploadedFile.FileName;

                using (Image original = Image.FromStream(e.UploadedFile.FileContent))
                {
                    PhotoUtils.SaveToJpeg(original, Request.MapPath(filePath));
                    if ((TempData["FilePrefix"] == "imagefrontfirstzoom_") || (TempData["FilePrefix"] == "imagefrontsecondzoom_"))
                    PhotoUtils.SaveToJpeg(PhotoUtils.Inscribe(original, 200,200), Request.MapPath(filePathDetail));
                }

                e.CallbackData = TempData["FilePrefix"] + e.UploadedFile.FileName + "|" + Url.Content(filePath) + "?refresh=" + Guid.NewGuid();
            }
        }


        protected void DetailImageUploadComplete(object sender, FileUploadCompleteEventArgs e)
        {
            if (e.UploadedFile.IsValid)
            {
                string fullDir = Request.MapPath(UploadDirectory + TempData["ProductId"]);

                if (!Directory.Exists(fullDir))
                    Directory.CreateDirectory(fullDir);

                string filePath = UploadDirectory + TempData["ProductId"] + "/" + TempData["FilePrefix"] + e.UploadedFile.FileName;

                using (Image original = Image.FromStream(e.UploadedFile.FileContent))
                {
                    PhotoUtils.SaveToJpeg(original, Request.MapPath(filePath));
                }

                e.CallbackData = TempData["FilePrefix"] + e.UploadedFile.FileName + "|" + Url.Content(filePath) + "?refresh=" + Guid.NewGuid();
            }
        }

        public ActionResult CallbacksFrontMainImage(int Id)
        {
            TempData["HomeImageName"] = "FrontMain.jpg";
            UploadControlExtension.GetUploadedFiles("ucCallbacksFrontMainImage", PhotoUtils.ValidationSettings, ImageHomeUploadComplete);
            return null;
        }

        public ActionResult CallbacksFrontLeftImage(int Id)
        {
            TempData["HomeImageName"] = "FrontLeft.jpg";
            UploadControlExtension.GetUploadedFiles("ucCallbacksFrontLeftImage", PhotoUtils.ValidationSettings, ImageHomeUploadComplete);
            return null;
        }

        public ActionResult CallbacksFrontRightImage(int Id)
        {
            TempData["HomeImageName"] = "FrontRight.jpg";
            UploadControlExtension.GetUploadedFiles("ucCallbacksFrontRightImage", PhotoUtils.ValidationSettings, ImageHomeUploadComplete);
            return null;
        }

        protected void ImageHomeUploadComplete(object sender, FileUploadCompleteEventArgs e)
        {
            if (e.UploadedFile.IsValid)
            {
                string filePath = UploadHomeDirectory + TempData["HomeImageName"];
        
                using (Image original = Image.FromStream(e.UploadedFile.FileContent))
                {
                    PhotoUtils.SaveToJpeg(original, Request.MapPath(filePath));
                }

                e.CallbackData = TempData["HomeImageName"] + "|" + Url.Content(filePath) + "?refresh=" + Guid.NewGuid();
            }
        }

    }
}
