export class ShopPage {
    navigationHome() { return cy.get('.woocommerce-breadcrumb a[href="https://practice.automationtesting.in"]'); }

    clickHome(): void {
        this.navigationHome().click();
    }
}

export const shopPage = new ShopPage();
