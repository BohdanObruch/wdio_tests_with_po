const { InventoryPage } = require('./Inventory.page');
const { LoginPage } = require('./Login.page');
const { ShoppingCartPage } = require('./ShoppingCart.page');
const { BaseSwagLabPage } = require('./BaseSwagLab.page');
const { CheckoutPage } = require('./Checkout.page');

module.exports = {
    pages: {
        loginPage: new LoginPage(),
        inventoryPage: new InventoryPage(),
        shoppingCartPage: new ShoppingCartPage(),
        baseSwagLabPage: new BaseSwagLabPage(),
        checkoutPage: new CheckoutPage(),
    },
};
