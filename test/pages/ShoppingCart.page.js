const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    itemsName = '.inventory_item_name';

    itemsPrice = '.inventory_item_price';

    itemsDescription = '.inventory_item_desc';

    get headerTitle() { return $('.title'); }

    get cartItems() { return $$(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return $(`${this.cartItemSelector}=${name}`); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.$(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems[id].$(this.removeItemSelector).click();
    }


    async getItemsPrices() {
        const elements = await $$(this.itemsPrice);
        const prices = [];
        for (const element of elements) {
            const priceText = await element.getText();
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price);
        }
        return prices;
    }

    async getItemsNames() {
        const elements = await $$(this.itemsName);
        const names = [];
        for (const element of elements) {
            const name = await element.getText();
            names.push(name.toLowerCase());
        }
        return names;
    }

    async getItemsDescriptions() {
        const elements = await $$(this.itemsDescription);
        const descriptions = [];
        for (const element of elements) {
            const description = await element.getText();
            descriptions.push(description.toLowerCase());
        }
        return descriptions;
    }

    async getItemsDetails() {
        const [names, descriptions, prices] = await Promise.all([
            this.getItemsNames(),
            this.getItemsDescriptions(),
            this.getItemsPrices(),
        ]);

        return names.map((name, index) => ({
            name,
            description: descriptions[index],
            price: prices[index],
        }));
    }
}

module.exports = { ShoppingCartPage };
