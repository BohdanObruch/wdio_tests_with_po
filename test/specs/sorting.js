const { pages } = require('../pages/Pages');
const { standardUser } = require('../config/credentials');

const {
    isSortedAlphabetically,
    isSortedByPrice,
} = require('../utils/sorting');

describe('Sorting the inventory items', () => {
    const sorting = [
        ['Name (A to Z)', 'az', isSortedAlphabetically, false, 'getInventoryItemsAllNames'],
        ['Name (Z to A)', 'za', isSortedAlphabetically, true, 'getInventoryItemsAllNames'],
        ['Price (low to high)', 'lohi', isSortedByPrice, false, 'getInventoryItemsAllPrices'],
        ['Price (high to low)', 'hilo', isSortedByPrice, true, 'getInventoryItemsAllPrices'],
    ];

    sorting.forEach(([expectedText, sortType, sortFunction, isDescending, getItemsMethod]) => {
        it(`Validates sorting for ${expectedText}`, async () => {
            await pages.loginPage.navigate();
            await pages.loginPage.performLogin(standardUser.username, standardUser.password);

            await pages.inventoryPage.sortItemsBy(sortType);

            expect(await pages.inventoryPage.getActiveOptionText()).toBe(expectedText);

            const items = await pages.inventoryPage[getItemsMethod]();
            expect(await sortFunction(items, isDescending)).toBe(true);
        });
    });
});
