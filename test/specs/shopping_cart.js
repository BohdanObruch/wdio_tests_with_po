const { randomChoiceItems } = require('../utils/choice_random_items');

const { pages } = require('../pages/Pages');
const { standardUser } = require('../config/credentials');
const deepEqual = require('deep-equal');

describe('Adding random items to the shopping cart', () => {
    it('Add and verify items', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin(standardUser.username, standardUser.password);

        const allItems = await pages.inventoryPage.inventoryItems.length;

        const randomItems = randomChoiceItems(allItems);

        await pages.inventoryPage.addItemsToCart(randomItems);

        const cartItemsNames = await pages.inventoryPage.getInventoryItemsNames(randomItems);
        const cartItemsDescriptions = await pages.inventoryPage.getInventoryItemsDescriptions(randomItems);
        const cartItemsPrices = await pages.inventoryPage.getInventoryItemsPrices(randomItems);

        await pages.baseSwagLabPage.shoppingCart.click();

        const shoppingCartItemsNames = await pages.shoppingCartPage.getItemsNames();
        const shoppingCartItemsDescriptions = await pages.shoppingCartPage.getItemsDescriptions();
        const shoppingCartItemsPrices = await pages.shoppingCartPage.getItemsPrices();

        deepEqual(cartItemsNames, shoppingCartItemsNames);
        deepEqual(cartItemsDescriptions, shoppingCartItemsDescriptions);
        deepEqual(cartItemsPrices, shoppingCartItemsPrices);
    });
});
