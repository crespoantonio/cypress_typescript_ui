export class ProductPage{
    private addToBasketButton():Cypress.Chainable {return cy.get('button.single_add_to_cart_button')}

    getAddToBasketButton():Cypress.Chainable{
        return this.addToBasketButton();
    }
}

export const productPage = new ProductPage();