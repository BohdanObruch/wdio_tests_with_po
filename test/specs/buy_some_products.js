const deepEqual = require('deep-equal');
const { randomChoiceItems } = require('../utils/choice_random_items');
const { pages } = require('../pages/Pages');
const { standardUser } = require('../config/credentials');
const { generateRandomData } = require('../utils/random_data');

describe('Adding random items to the shopping cart', () => {
    it('Add and verify items', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin(standardUser.username, standardUser.password);

        const allItems = await pages.inventoryPage.inventoryItems.length;
        const randomItems = randomChoiceItems(allItems);

        await pages.inventoryPage.addItemsToCart(randomItems);

        const cartItemsDetails = await pages.inventoryPage.getItemsDetails(randomItems);

        await pages.baseSwagLabPage.shoppingCart.click();

        await pages.shoppingCartPage.checkoutButton.click();

        const { firstName, lastName, zipCode } = generateRandomData();

        await pages.checkoutPage.fillCheckoutForm(firstName, lastName, zipCode);

        const checkoutItemsDetails = await pages.checkoutPage.getItemsDetails();

        const totalPrice = await pages.checkoutPage.getTotalPrice();

        const totalPriceWithTax = await pages.checkoutPage.calculateTotalPriceWithTax();

        expect(totalPrice).toBeCloseTo(totalPriceWithTax, 2);

        deepEqual(cartItemsDetails, checkoutItemsDetails);
    });
});
