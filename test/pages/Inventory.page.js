const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

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

    async getInventoryItems() {
        return this.inventoryItems.length;
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
        await this.addItemToCartBtns[id].click();
    }

    async getInventoryItemsPrices() {
        const elements = await $$(this.inventoryItemsPrice);
        const prices = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const element of elements) {
            // eslint-disable-next-line no-await-in-loop
            const priceText = await element.getText();
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price);
        }
        return prices;
    }

    async getInventoryItemsNames() {
        const elements = await $$(this.inventoryItemsName);
        const names = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const element of elements) {
            // eslint-disable-next-line no-await-in-loop
            const name = await element.getText();
            names.push(name.toLowerCase());
        }
        return names;
    }

    async addItemsToCart(randomItems) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of randomItems) {
            // eslint-disable-next-line no-await-in-loop
            await this.addItemToCartById(item);
        }
    }

    async getInventoryItemsDescriptions() {
        const elements = await $$(this.inventoryItemsDescription);
        const descriptions = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const element of elements) {
            // eslint-disable-next-line no-await-in-loop
            const description = await element.getText();
            descriptions.push(description.toLowerCase());
        }
        return descriptions;
    }
}
module.exports = { InventoryPage };
