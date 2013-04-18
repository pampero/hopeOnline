<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="header_caterory_container">
    <dl id="header_menu_category">
        <% 
            Html.DevExpress().Menu(
                settings =>
                {
                    settings.Name = "menu1";
                    settings.ShowPopOutImages = DefaultBoolean.True;

                    var itemUsers = settings.Items.Add("Usuarios", "", "");

                    itemUsers.Items.Add("Clientes", "Clientes", "", "/BackOffice/Customers");
                    itemUsers.Items.Add("Operadores", "Operadores", "", "/BackOffice/Operators");

                    var item = settings.Items.Add("Ventas", "", "");

                    item.Items.Add("En Proceso", "En Proceso", "", "/BackOffice/InProcessOrders");
                    item.Items.Add("Finalizadas", "Finalizadas", "", "/BackOffice/ClosedOrders");
                    item.Items.Add("Canceladas", "Canceladas Huerfanas", "", "/BackOffice/CancelledOrders");
                    item.Items.Add("Finalizadas con Error", "Finalizadas con Error", "", "/BackOffice/ClosedWithErrorsOrders");
                    item.Items.Add("Finalizadas sin Cobrar", "Finalizadas sin Cobrar", "", "/BackOffice/ClosedNotPayedOrders");

                    var itemDelivery = settings.Items.Add("Logística", "", "");
                    
                    itemDelivery.Items.Add("Para Entregas", "Para Entregas", "", "/BackOffice/OrdersToDeliver");
                    itemDelivery.Items.Add("Entregadas", "Entregadas", "", "/BackOffice/DeliveredOrders");
                    
                    settings.Items.Add("Contactos", "Contactos", "", "/BackOffice/Contacts");

                    var itemProducto = settings.Items.Add("Productos", "", "");
                    itemProducto.Items.Add("Productos", "Productos", "", "/BackOffice/Products");
                    itemProducto.Items.Add("Talles", "Size", "", "/BackOffice/Sizes");
                    itemProducto.Items.Add("Categorías", "Categorias", "", "/BackOffice/Categories");
                    itemProducto.Items.Add("Stock", "Stock", "", "/BackOffice/Stock");
                    itemProducto.Items.Add("Actualizar Precios", "Actualizar Precios", "", "/BackOffice/ProductsPrice");

                    settings.Items.Add("Franquicias", "Franquicias", "", "/BackOffice/Franchises");
                    settings.Items.Add("NewsLetters", "NewsLetters", "", "/BackOffice/NewsLetters");
                    settings.Items.Add("Cupones", "Cupones", "", "/BackOffice/Coupons");
                    settings.Items.Add("Imagenes Home", "Imagenes Home", "", "/BackOffice/HomeImagesUpdate");
                })
                .Render();
        %>
    </dl>
</div>

               