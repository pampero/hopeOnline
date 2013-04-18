using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HopeLingerieServices.Model
{
    public class Notification
    {
        public string NotificationType { get; set; }
        public List<Operation> Operations { get; set; }
    }

    public class Operation
    {
        public int OperationId { get; set; }
        public int OperationType { get; set; }
    }

    public class Report
    {
        public int ReportStatus { get; set; }
        public List<ReportOperation> Operations {get; set; }
        public string ErrorDescription { get; set; }
    }
    
    public class ReportOperation
    {
        public int Id  {get; set; }
        public string Date  {get; set; }
        public int Status  {get; set; }
        public string TransactionId {get; set; }
        public Buyer Buyer  {get; set; }
        public decimal Amount {get; set; }
        public decimal AmountNeto {get; set; }
        public int PaymentMethod {get; set; }
        public string PaymentType {get; set; }
        public int Cuotas {get; set; }
        public List<Item> Items {get; set; }
    }

    public class  Buyer
    {
        public string EMail {get; set; }
        public string Address {get; set; }
        public string Comment {get; set; }
        public string FirstName {get; set; }
        public string Telephone {get; set; }
        public string DocType {get; set; }
        public string DocNumber {get; set; }
    }

    public class Item
    {
        public string Description {get; set; }
         public string Currency {get; set; }
         public Decimal Price { get; set; }
         public int Quantinty { get; set; }
    }

    public class Seller
    {
        public string DocType {get; set; }
        public string DocNumber {get; set; }
    }

}
