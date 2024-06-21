const { pages } = require('../pages/Pages');
const credentials = require('../config/credentials');

async function login() {
    await pages.loginPage.navigate();
    await pages.loginPage.performLogin(credentials.username, credentials.password);
}

describe('Sorting the inventory items', () => {
    beforeEach(async () => {
        await login();
    });
    it('Sorting by name (A to Z)', async () => {
        // await pages.inventoryPage.sortItemsBy('az');
        expect(await pages.inventoryPage.getActiveOptionText())
            .toBe('Name (A to Z)');

        expect(await pages.inventoryPage.getInventoryItemsNamesText(0))
            .toBe('Sauce Labs Backpack');
        expect(await pages.inventoryPage.getInventoryItemsNamesText(5))
            .toBe('Test.allTheThings() T-Shirt (Red)');
    });

    it('Sorting by name (Z to A)', async () => {
        await pages.inventoryPage.sortItemsBy('za');

        expect(await pages.inventoryPage.getActiveOptionText()).toBe('Name (Z to A)');

        expect(await pages.inventoryPage.getInventoryItemsNamesText(0))
            .toBe('Test.allTheThings() T-Shirt (Red)');
        expect(await pages.inventoryPage.getInventoryItemsNamesText(5))
            .toBe('Sauce Labs Backpack');
    });

    it('Sorting by price (low to high)', async () => {
        await pages.inventoryPage.sortItemsBy('lohi');

        expect(await pages.inventoryPage.getActiveOptionText())
            .toBe('Price (low to high)');

        expect(await pages.inventoryPage.getInventoryItemsPricesText(0))
            .toBe('$7.99');
        expect(await pages.inventoryPage.getInventoryItemsPricesText(5))
            .toBe('$49.99');
    });

    it('Sorting by price (high to low)', async () => {
        await pages.inventoryPage.sortItemsBy('hilo');

        expect(await pages.inventoryPage.getActiveOptionText())
            .toBe('Price (high to low)');

        expect(await pages.inventoryPage.getInventoryItemsPricesText(0))
            .toBe('$49.99');
        expect(await pages.inventoryPage.getInventoryItemsPricesText(5))
            .toBe('$7.99');
    });
});
