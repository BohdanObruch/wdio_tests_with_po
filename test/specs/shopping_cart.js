const { randomChoiceItems } = require('../utils/choice_random_items');

const { pages } = require('../pages/Pages');
const { standardUser } = require('../config/credentials');

describe('Adding random items to the shopping cart', () => {
    it('Add and verify items', async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin(standardUser.username, standardUser.password);

        const allItems = await pages.inventoryPage.getInventoryItems();

        const randomItems = await randomChoiceItems(allItems);

        await pages.inventoryPage.addItemsToCart(randomItems);

        const cartItemsNames = await pages.inventoryPage.getInventoryItemsNames();
        const cartItemsDescriptions = await pages.inventoryPage.getInventoryItemsDescriptions();
        const inventoryItemsPrices = await pages.inventoryPage.getInventoryItemsPrices();

        await pages.baseSwagLabPage.clickOnShoppingCart;

        const shoppingCartItemsNames = await pages.inventoryPage.getInventoryItemsNames();
        const shoppingCartItemsDescriptions = await pages.inventoryPage.getInventoryItemsDescriptions();
        const shoppingCartItemsPrices = await pages.inventoryPage.getInventoryItemsPrices();

        expect(cartItemsNames).toEqual(shoppingCartItemsNames);
        expect(cartItemsDescriptions).toEqual(shoppingCartItemsDescriptions);
        expect(inventoryItemsPrices).toEqual(shoppingCartItemsPrices);
    });
});
