export class ProductPage{
    addToBasketButton() {return cy.get('button.single_add_to_cart_button')}
}

export const productPage = new ProductPage();