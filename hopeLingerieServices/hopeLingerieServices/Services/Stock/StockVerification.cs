using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HopeLingerieServices.Model;
using System.Configuration;

namespace HopeLingerieServices.Services
{
    public interface IStockValidate
    {
        bool IsValidStock(Stock stock, int quantity);
        bool HasStock(Stock stock);
        void AddStock(Stock stock, int quantity);
        void SubstractStock(Stock stock, int quantity);
    }

    public class RealStock : IStockValidate
    {
        public bool IsValidStock(Stock stock, int quantity)
        {
            return (stock.RealQuantity >= quantity);
        }

        public bool HasStock(Stock stock)
        {
            return (stock.RealQuantity > 0);
        }

        public void AddStock(Stock stock, int quantity)
        {
            stock.RealQuantity += quantity;
        }

        public void SubstractStock(Stock stock, int quantity)
        {
            stock.RealQuantity -= quantity;
        }
    }

    public class VirtualStock : IStockValidate
    {
        public bool IsValidStock(Stock stock, int quantity)
        {
            return (stock.VirtualQuantity >= quantity);
        }


        public bool HasStock(Stock stock)
        {
            return (stock.VirtualQuantity > 0);
        }


        public void AddStock(Stock stock, int quantity)
        {
            stock.VirtualQuantity += quantity;
        }


        public void SubstractStock(Stock stock, int quantity)
        {
            stock.VirtualQuantity -= quantity;
        }
         
    }

    public class StockService
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();
        IStockValidate stockValidate;

        #region Constructor 

        public StockService()
        {
            throw new NotImplementedException();
        }

        public StockService(IStockValidate stockValidateParam)
        {
            stockValidate = stockValidateParam;
        }

        #endregion

        public bool HasStock(List<OrderDetail> orderDetails, ref string productDescription, ref HopeLingerieEntities context)
        {
            if (stockValidate == null)
                return false;

            foreach (var orderDetail in orderDetails)
            {
                var productId = orderDetail.ProductId;
                var colorId = orderDetail.ColorId;
                var sizeId = orderDetail.SizeId;
                var quantity = orderDetail.Quantity;

                var stock = context.Stocks.SingleOrDefault(x => x.ProductId == productId && x.ColorId == colorId && x.SizeId == sizeId && x.Active);

                if (stock != null)
                { 
                    if (!stockValidate.IsValidStock(stock, quantity))
                    {
                        productDescription = orderDetail.Product.Name + " (" + orderDetail.Product.Code + ") - Color:" + stock.Color.Code + " - Talle:" + stock.Size.Code;
                        return false;
                    }
                }
            }

            return true;
        }
        

        public bool SubstractStock(List<OrderDetail> orderDetails, ref HopeLingerieEntities context)
        {
            if (stockValidate == null) 
                return false;

            foreach (var orderDetail in orderDetails)
            {
                var productId = orderDetail.ProductId;
                var colorId = orderDetail.ColorId;
                var sizeId = orderDetail.SizeId;
                var quantity = orderDetail.Quantity;
                
                var stock = context.Stocks.SingleOrDefault(x => x.ProductId == productId && x.ColorId == colorId && x.SizeId == sizeId && x.Active);

                if (stock != null)
                {
                    stockValidate.SubstractStock(stock, quantity);

                    // Si el stock es negativo realiza el proceso pero genera un error y lo almacena en la base de datos.
                    if (!stockValidate.HasStock(stock))
                    {
                        context.ErrorLogs.AddObject(new ErrorLog { AddedDate = DateTime.Now, Message = "Error: Producto " + orderDetail.ProductId + " tiene Stock Real NEGATIVO" });
                        context.SaveChanges();
                        return false;
                    }
                }
            }
            return true;

       //     hopeLingerieEntities.SaveChanges();
        }


        public void CancelStockAndOrder(Order order, ref HopeLingerieEntities context)
        {
            if (stockValidate == null)
                return;

            order.OrderStatusId = 2; //estado de orden cancelada.
          //  hopeLingerieEntities.SaveChanges();

            foreach (var orderDetail in order.OrderDetails)
            {
                var productId = orderDetail.ProductId;
                var colorId = orderDetail.ColorId;
                var sizeId = orderDetail.SizeId;
                var quantity = orderDetail.Quantity;

                var stock = context.Stocks.SingleOrDefault(x => x.ProductId == productId && x.ColorId == colorId && x.SizeId == sizeId && x.Active);

                if (stock != null)
                {
                    stockValidate.AddStock(stock, quantity);
                }
            }

          //  hopeLingerieEntities.SaveChanges();
        }

    }

}
