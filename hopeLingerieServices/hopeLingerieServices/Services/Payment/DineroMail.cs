using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HopeLingerieServices.DineromailPRODUCTION;
using Dineromail;
using System.Configuration;

namespace HopeLingerieServices.Services.Payment
{
    public class DineroMail
    {
        public ResultGetOperations GetOperation(string merchantTransactionId)
        {
            //Consulta del balance en la cuenta del usuario.
            string Hash = "";
            string UniqueID = Guid.NewGuid().ToString();
            string OperationId = merchantTransactionId;
            string StartDate = null;
            string EndDate = null;

            //Creamos una instancia del objeto APICredential
            APICredential Credential = new APICredential();

            Credential.APIPassword = ConfigurationManager.AppSettings["APIPassword"];
            Credential.APIUserName = "772BA4F3-2E22-4341-94D0-4F2B44C39EEA";

            //preparamos la cadena de texto a utilizar en el hash
            Hash = merchantTransactionId + UniqueID + OperationId + StartDate + EndDate + Credential.APIPassword.ToString();

            DMCrypt CryptObject = new DMCrypt();
         
            Hash = CryptObject.GetHashMD5(Hash);
            DMAPISoapClient Client = new DMAPISoapClient();

            //consulta el servicio web
            return Client.GetOperations(Credential, false, merchantTransactionId, OperationId, StartDate, EndDate, UniqueID, Hash);
        }
    }
}
