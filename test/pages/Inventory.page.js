const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    ItemToCartBatons = '[id^="add-to-cart"]';

    inventoryItemsName = '.inventory_item_name';

    inventoryItemsPrice = '.inventory_item_price';

    inventoryItemsDescription = '.inventory_item_desc';

    get sort() { return $('.product_sort_container'); }

    get activeOption() { return $('.active_option'); }

    sortItems(value) {
        return `option[value="${value}"]`;
    }

    getSortItem(value) {
        return this.sort.$(this.sortItems(value));
    }

    async getActiveOptionText() {
        return this.activeOption.getText();
    }

    async getInventoryItemsNamesText(item) {
        return this.inventoryItems[item].$(this.inventoryItemsName).getText();
    }

    async getInventoryItemsPricesText(item) {
        return this.inventoryItems[item].$(this.inventoryItemsPrice).getText();
    }

    async sortItemsBy(value) {
        await this.sort.click();
        await this.getSortItem(value).click();
    }

    async addItemToCartById(id) {
        await this.inventoryItems[id].$(this.ItemToCartBatons).click();
    }

    async getInventoryItemsAllPrices() {
        const elements = await $$(this.inventoryItemsPrice);
        const prices = [];
        for (const element of elements) {
            const priceText = await element.getText();
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price);
        }
        return prices;
    }

    async getInventoryItemsAllNames() {
        const elements = await $$(this.inventoryItemsName);
        const names = [];
        for (const element of elements) {
            const name = await element.getText();
            names.push(name.toLowerCase());
        }
        return names;
    }

    async addItemsToCart(randomItems) {
        for (const item of randomItems) {
            await this.addItemToCartById(item);
        }
    }

    async getInventoryItemsAllDescriptions() {
        const elements = await $$(this.inventoryItemsDescription);
        const descriptions = [];
        for (const element of elements) {
            const description = await element.getText();
            descriptions.push(description);
        }
        return descriptions;
    }

    async getInventoryItemsPrices(selectedItemsIndexes) {
        return Promise.all(selectedItemsIndexes.map(async (index) => {
            const priceText = await (await $$(this.inventoryItemsPrice))[index].getText();
            return parseFloat(priceText.replace('$', ''));
        }));
    }

    async getInventoryItemsNames(selectedItemsIndexes) {
        return Promise.all(selectedItemsIndexes.map(async (index) => (await $$(this.inventoryItemsName))[index].getText()));
    }

    async getInventoryItemsDescriptions(selectedItemsIndexes) {
        return Promise.all(selectedItemsIndexes.map(async (index) => (await $$(this.inventoryItemsDescription))[index].getText()));
    }

    async getItemsDetails(selectedItemsIndexes) {
        const details = await Promise.all([
            this.getInventoryItemsNames(selectedItemsIndexes),
            this.getInventoryItemsDescriptions(selectedItemsIndexes),
            this.getInventoryItemsPrices(selectedItemsIndexes),
        ]);

        return details[0].map((name, index) => ({
            name,
            description: details[1][index],
            price: details[2][index],
        }));
    }
}
module.exports = { InventoryPage };
