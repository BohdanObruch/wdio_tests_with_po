const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    get inventoryItemsNames() { return $$('.inventory_item_name'); }

    get inventoryItemsPrices() { return $$('.inventory_item_price'); }

    get sort() { return $('.product_sort_container'); }

    get activeOption() { return $('.active_option'); }

    // getSortItem(value) {
    //     return $(`.product_sort_container option[value="${value}"]`);
    // }
    getSortItem(value) {
        return $('.product_sort_container').$(`option[value="${value}"]`);
    }


    async getActiveOptionText() {
        return this.activeOption.getText();
    }

    async getInventoryItemsNamesText(item) {
        return this.inventoryItemsNames[item].getText();
    }

    async getInventoryItemsPricesText(item) {
        return this.inventoryItemsPrices[item].getText();
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
