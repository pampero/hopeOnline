using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HopeLingerieServices.Model;
using System.Xml;
using System.Web;
using System.Net;
using System.IO;
using System.Configuration;
using HopeLingerieServices.Exceptions;
using HopeLingerieServices.Services.Payment;
using HopeLingerieServices.DineromailPRODUCTION;
using System.Threading;

namespace HopeLingerieServices.Services
{
    public class PaymentService
    {
        HopeLingerieEntities hopeLingerieEntities = new HopeLingerieEntities();

        // Este método de ACTUALIZACION DE ORDENES se ejecuta desde los metodos ClosedWithErrorsOrders, ClosedNotPayedOrders, InProcessOrders.
        // Envia el transactionId de la orden a DineroMail via WebService y luego actualiza el estado de la misma. 
        // NO ACTUALIZA LA BASE DE DATOS, la actualización se hace desde el llamante para que sea transaccional.
        public void UpdateOrderStatus(string transactionIds, ref HopeLingerieEntities context)
        {
            PaymentService paymentService = new PaymentService();
            
            var transactions = transactionIds.Split(',');

            DineroMail dineroMail = new DineroMail();

            // Evalúa y actualiza el estado de cada orden en el sistema local con cada operación en dineromail.
            foreach (var merchantTransactionId in transactions)
            {
                ResultGetOperations resultOGetOperations = dineroMail.GetOperation(merchantTransactionId);

                // Metodos Dummy para Testing
                //var resultOGetOperations = GetDummyDeniedOperation(merchantTransactionId);
                //var resultOGetOperations = GetDummyErrorOperation(merchantTransactionId);
                //var resultOGetOperations = GetDummyOKPendingOperation(merchantTransactionId);
                //var resultOGetOperations = GetDummyOKAccreditedOperation(merchantTransactionId);
                //var resultOGetOperations = GetDummyOKCanceledOperation(merchantTransactionId);

                DoUpdateOrderStatus(resultOGetOperations, merchantTransactionId, ref context);
            }
        }

        #region Dummies para Testing

        ResultGetOperations GetDummyDeniedOperation(string merchantTransactionId)
        {
            var resultGetOperations = new ResultGetOperations();
            resultGetOperations.Status = GetOperationsStatus.DENIED;
            resultGetOperations.MerchantTransactionId = merchantTransactionId;
            return resultGetOperations;
        }

        ResultGetOperations GetDummyErrorOperation(string merchantTransactionId)
        {
            var resultGetOperations = new ResultGetOperations();
            resultGetOperations.Status = GetOperationsStatus.ERROR;
            resultGetOperations.MerchantTransactionId = merchantTransactionId;
            return resultGetOperations;
        }

        ResultGetOperations GetDummyOKPendingOperation(string merchantTransactionId)
        {
            var resultGetOperations = new ResultGetOperations();
            resultGetOperations.Status = GetOperationsStatus.OK;
            resultGetOperations.MerchantTransactionId = merchantTransactionId;

            OperationDetail[] operations = { new OperationDetail { Amount = 90, NetAmount = 100, PaymentMethod = "Credito", State = OperationDetailState.PENDING } };
            resultGetOperations.Operations = operations;

            return resultGetOperations;
        }

        ResultGetOperations GetDummyOKAccreditedOperation(string merchantTransactionId)
        {
            var resultGetOperations = new ResultGetOperations();
            resultGetOperations.Status = GetOperationsStatus.OK;
            resultGetOperations.MerchantTransactionId = merchantTransactionId;

            OperationDetail[] operations = { new OperationDetail { Amount = 90, NetAmount = 100, PaymentMethod = "Credito", State = OperationDetailState.ACCREDITED } };
            resultGetOperations.Operations = operations;

            return resultGetOperations;
        }

        ResultGetOperations GetDummyOKCanceledOperation(string merchantTransactionId)
        {
            var resultGetOperations = new ResultGetOperations();
            resultGetOperations.Status = GetOperationsStatus.OK;
            resultGetOperations.MerchantTransactionId = merchantTransactionId;

            OperationDetail[] operations = { new OperationDetail { Amount = 90, NetAmount = 100, PaymentMethod = "Credito", State = OperationDetailState.CANCELED }};
            resultGetOperations.Operations = operations;
            
            return resultGetOperations;
        }

        #endregion

        // Actualiza los estados de la orden, si llega por Cancelada se le cambia el estado y se recupera el stock virtual tomado previamente.
        // NO ACTUALIZA LA BASE DE DATOS, la actualización se hace desde el llamante para que sea transaccional.
        private void DoUpdateOrderStatus(ResultGetOperations resultGetOperations, string merchantTransactionId, ref HopeLingerieEntities context)
        {
            var transactionId = Convert.ToInt32(merchantTransactionId);
            var order = context.Orders.SingleOrDefault(a => a.OrderId == transactionId);

            // Si el estado de la Orden es En Proceso realiza la operación sino no hace nada
            if ((order == null) || (order.OrderStatusId != 1)) return;

            // TODO: Poner estado que no se encontró el Trx_Id, poner estado 5 (FinalizadaConError) y recuperar stock
            if (resultGetOperations.Status == GetOperationsStatus.DENIED)
            {
                // No encontró el TransactionId en DineroMail
                var stockService = new StockService(new VirtualStock());
                // Cancela la orden y recupera Stock Virtual
                stockService.CancelStockAndOrder(order, ref context);

                //throw new DineroMailInterfaceException("ACCESO DENEGADO A DINEROMAIL" + resultGetOperations.Message);
            }
            else if (resultGetOperations.Status == GetOperationsStatus.ERROR)
            {
                throw new DineroMailInterfaceException("ERROR AL CONECTAR CON DINEROMAIL-" + resultGetOperations.Message);
            }
            else if (resultGetOperations.Status == GetOperationsStatus.OK)
            {
                // Debería tener una sola operación asociada al transactionId
                var operationDetail = resultGetOperations.Operations.LastOrDefault();

                if (operationDetail != null)
                {
                    if (operationDetail.State == OperationDetailState.PENDING)
                    {
                        //order.PaymentStatus = "Pendiente";
                        // TODO: Definir Status correcto
                        order.OrderStatusId = 5; //realizada sin cobrar
                    }
                    else if (operationDetail.State == OperationDetailState.ACCREDITED)
                    {
                        //order.PaymentStatus = "Pagada";
                        order.OrderStatusId = 8; // Finalizada
                    }
                    else if (operationDetail.State == OperationDetailState.CANCELED)
                    {
                        //  order.PaymentStatus = "Cancelada";
                        var stockService = new StockService(new VirtualStock());
                        // Cancela la orden y recupera Stock Virtual
                        stockService.CancelStockAndOrder(order, ref context);
                    }

                    order.PaymentMethod = operationDetail.PaymentMethod;
                }
                else  // en caso de que no se haya ingresado la orden a dineromail por fallo o porque se arrepintió, acredito stock, cancelo la orden y la pongo en finalizada con error.
                {
                    var stockService = new StockService(new VirtualStock());
                    // Cancela la orden y recupera Stock Virtual
                    stockService.CancelStockAndOrder(order, ref context);
                }
            }
        }

        // Este proceso corre en la home, obtiene todas las ventas en estado "En Proceso" e itera las mismas comparando su fecha-hora de creación con la actual. 
        // Aquellas que superen el tiempo permitido serán pasada a estado "Cancelada" y se reintegrará su stock.
        public void PurgeOrders()
        { 
            var purgeMinutes = Convert.ToInt16(ConfigurationManager.AppSettings["PurgeMinutes"]);
            DateTime purgeDateTime = DateTime.Now.AddMinutes(-1 * purgeMinutes);
            // Pendientes cuya fecha-hora de alta sea menor al tiempo definido por PurgeMinutes
            var orders = hopeLingerieEntities.Orders.Where(x => x.OrderStatusId == 1 && x.AddedDate < purgeDateTime && x.Active);
            var stockService = new StockService(new VirtualStock());

            if (orders.Count() > 0)
            {
                foreach (var order in orders)
                {
                    // Verifica si existe en dineromail, si no existe Cancela la orden y recupera Stock Virtual
                    UpdateOrderStatus(order.OrderId.ToString(), ref hopeLingerieEntities);
                }

                hopeLingerieEntities.SaveChanges();
            }
        }

        public void PurgeOrdersAsync()
        {
            ThreadStart job = delegate { PurgeOrders(); };
            new Thread(job).Start();
        }
    }
}
