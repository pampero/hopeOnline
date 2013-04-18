using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DevExpress.Web.ASPxUploadControl;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace HopeLingerieServices.Services.Utils
{
    public static class PhotoUtils
    {

        public static Image Inscribe(Image image, int size)
        {
            return Inscribe(image, size, size);
        }

        public static Image Inscribe(Image image, int width, int height)
        {
            Bitmap result = new Bitmap(width, height);
            using (Graphics graphics = Graphics.FromImage(result))
            {
                double factor = 1.0 * width / image.Width;
                if (image.Height * factor < height)
                    factor = 1.0 * height / image.Height;
                Size size = new Size((int)(width / factor), (int)(height / factor));
                Point sourceLocation = new Point((image.Width - size.Width) / 2, (image.Height - size.Height) / 2);

                SmoothGraphics(graphics);
                graphics.DrawImage(image, new Rectangle(0, 0, width, height), new Rectangle(sourceLocation, size), GraphicsUnit.Pixel);
            }
            return result;
        }

        static void SmoothGraphics(Graphics g)
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
        }

        public static void SaveToJpeg(Image image, Stream output)
        {
            image.Save(output, ImageFormat.Jpeg);
        }

        public static void SaveToJpeg(Image image, string fileName)
        {
            image.Save(fileName, ImageFormat.Jpeg);
        }

        public static readonly DevExpress.Web.ASPxUploadControl.ValidationSettings ValidationSettings = new ValidationSettings
        {
            AllowedContentTypes = new string[] { "image/jpeg", "image/gif", "image/pjpeg" },
            AllowedFileExtensions = new string[] { ".jpg", ".jpeg", ".jpe", ".gif" },
            MaxFileSize = 20971520,
            FileDoesNotExistErrorText = "El archivo seleccionado no existe!",
            NotAllowedContentTypeErrorText = "Contenido incorrecto!",
            NotAllowedFileExtensionErrorText = "Extensión del archivo incorrecta, debe ser .jpg, .jpeg y .gif",
            GeneralErrorText = "Ha ocurrido un error externo!",
            MaxFileSizeErrorText = "Tamaño del archivo demasiado grande!"
        };
    }
}


