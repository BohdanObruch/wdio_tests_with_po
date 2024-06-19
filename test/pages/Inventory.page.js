const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    // eslint-disable-next-line class-methods-use-this
    get headerTitle() { return $('.title'); }

    // eslint-disable-next-line class-methods-use-this
    get inventoryItems() { return $$('.inventory_item'); }

    // eslint-disable-next-line class-methods-use-this
    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    // eslint-disable-next-line class-methods-use-this
    get inventoryItemsNames() { return $$('.inventory_item_name'); }

    // eslint-disable-next-line class-methods-use-this
    get inventoryItemsPrices() { return $$('.inventory_item_price'); }

    // eslint-disable-next-line class-methods-use-this
    get sort() { return $('.product_sort_container'); }

    // eslint-disable-next-line class-methods-use-this
    get activeOption() { return $('.active_option'); }

    // eslint-disable-next-line class-methods-use-this
    getSortItem(value) {
        return $(`.product_sort_container option[value="${value}"]`);
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
