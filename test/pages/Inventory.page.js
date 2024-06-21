const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    inventoryItemsName = '.inventory_item_name';

    inventoryItemsPrice = '.inventory_item_price';

    get sort() { return $('.product_sort_container'); }

    get activeOption() { return $('.active_option'); }

    get sortOption() { return $('.product_sort_container'); }

    sortItems(value) {
        return `option[value="${value}"]`;
    }

    getSortItem(value) {
        return this.sortOption.$(this.sortItems(value));
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
}

module.exports = { InventoryPage };
