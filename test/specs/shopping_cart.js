const deepEqual = require('deep-equal');
const { randomChoiceItems } = require('../utils/choice_random_items');

const { pages } = require('../pages/Pages');
const { standardUser } = require('../config/credentials');

describe('Adding random items to the shopping cart', () => {
    it('Add and verify items', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin(standardUser.username, standardUser.password);

        const allItems = await pages.inventoryPage.inventoryItems.length;

        const randomItems = randomChoiceItems(allItems);

        await pages.inventoryPage.addItemsToCart(randomItems);

        const cartItemsDetails = await pages.inventoryPage.getItemsDetails(randomItems);

        await pages.baseSwagLabPage.shoppingCart.click();

        const shoppingCartItemsDetails = await pages.shoppingCartPage.getItemsDetails();

        deepEqual(cartItemsDetails, shoppingCartItemsDetails);
    });
});
