const { ShoppingCartPage } = require('./ShoppingCart.page');

class CheckoutPage extends ShoppingCartPage {
    url = '/checkout-step-one.html';

    itemTotalPrice = '[data-test="subtotal-label"]';

    taxPrice = '[data-test="tax-label"]';

    totalPrice = '[data-test="total-label"]';

    get firstName() { return $('#first-name'); }

    get lastName() { return $('#last-name'); }

    get zipCode() { return $('#postal-code'); }

    get continueButton() { return $('#continue'); }

    async fillCheckoutForm(firstName, lastName, zipCode) {
        await (await this.firstName).setValue(firstName);
        await (await this.lastName).setValue(lastName);
        await (await this.zipCode).setValue(zipCode);
        await (await this.continueButton).click();
    }

    async getTaxPrice() {
        const taxText = await (await $(this.taxPrice)).getText();
        const taxValue = taxText.replace('Tax: $', '');
        return parseFloat(taxValue);
    }

    async getItemTotalPrice() {
        const itemTotal = await (await $(this.itemTotalPrice)).getText();
        const itemValue = itemTotal.replace('Item total: $', '');
        return parseFloat(itemValue);
    }

    async getTotalPrice() {
        const total = await (await $(this.totalPrice)).getText();
        const itemValueTotal = total.replace('Total: $', '');
        return parseFloat(itemValueTotal);
    }

    async calculateTotalPriceWithTax() {
        const itemTotal = await this.getItemTotalPrice();
        const tax = await this.getTaxPrice();
        return itemTotal + tax;
    }
}

module.exports = { CheckoutPage };
