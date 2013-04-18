// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591
#region T4MVC

using System;
using System.Diagnostics;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Web.Mvc.Html;
using System.Web.Routing;
using T4MVC;
namespace HopeLingerieSite.Controllers {
    public partial class AccountController {
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected AccountController(Dummy d) { }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected RedirectToRouteResult RedirectToAction(ActionResult result) {
            var callInfo = result.GetT4MVCResult();
            return RedirectToRoute(callInfo.RouteValueDictionary);
        }

        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.ActionResult CreateFromLogOn() {
            return new T4MVC_ActionResult(Area, Name, ActionNames.CreateFromLogOn);
        }
        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.ActionResult Create() {
            return new T4MVC_ActionResult(Area, Name, ActionNames.Create);
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public AccountController Actions { get { return MVC.Account; } }
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Area = "";
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Name = "Account";

        static readonly ActionNamesClass s_actions = new ActionNamesClass();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionNamesClass ActionNames { get { return s_actions; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionNamesClass {
            public readonly string CustomerLogOn = "CustomerLogOn";
            public readonly string LogOn = "LogOn";
            public readonly string ForgetPassword = "ForgetPassword";
            public readonly string Edit = "Edit";
            public readonly string Information = "Information";
            public readonly string CreateFromLogOn = "CreateFromLogOn";
            public readonly string Create = "Create";
            public readonly string ChangePassword = "ChangePassword";
            public readonly string LogOff = "LogOff";
        }


        static readonly ViewNames s_views = new ViewNames();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ViewNames Views { get { return s_views; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ViewNames {
            public readonly string Account = "~/Views/Account/Account.aspx";
            public readonly string ChangePassword = "~/Views/Account/ChangePassword.aspx";
            public readonly string CustomerLogOn = "~/Views/Account/CustomerLogOn.aspx";
            public readonly string ForgetPassword = "~/Views/Account/ForgetPassword.aspx";
            public readonly string LogOn = "~/Views/Account/LogOn.aspx";
        }
    }

    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public class T4MVC_AccountController: HopeLingerieSite.Controllers.AccountController {
        public T4MVC_AccountController() : base(Dummy.Instance) { }

        public override System.Web.Mvc.ActionResult CustomerLogOn() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.CustomerLogOn);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult LogOn() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.LogOn);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult LogOn(System.Web.Mvc.FormCollection formCollection, string returnUrl) {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.LogOn);
            callInfo.RouteValueDictionary.Add("formCollection", formCollection);
            callInfo.RouteValueDictionary.Add("returnUrl", returnUrl);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult ForgetPassword() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.ForgetPassword);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Edit() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.Edit);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Information() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.Information);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Edit(HopeLingerieServices.Model.Customer customer) {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.Edit);
            callInfo.RouteValueDictionary.Add("customer", customer);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult CreateFromLogOn(System.Web.Mvc.FormCollection formCollection) {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.CreateFromLogOn);
            callInfo.RouteValueDictionary.Add("formCollection", formCollection);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Create(HopeLingerieServices.Model.Customer customer) {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.Create);
            callInfo.RouteValueDictionary.Add("customer", customer);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult ChangePassword() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.ChangePassword);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult ChangePassword(HopeLingerieSite.ViewModels.ChangePasswordViewModel changePasswordViewModel) {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.ChangePassword);
            callInfo.RouteValueDictionary.Add("changePasswordViewModel", changePasswordViewModel);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult LogOff() {
            var callInfo = new T4MVC_ActionResult(Area, Name, ActionNames.LogOff);
            return callInfo;
        }

    }
}

#endregion T4MVC
#pragma warning restore 1591