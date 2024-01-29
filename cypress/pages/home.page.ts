export class HomePage {
    private menuShopLink() { return cy.get('#menu-item-40'); }
    private menuMyAccountLink() { return cy.get('#menu-item-50'); }
    private menuTestCasesLink() { return cy.get('#menu-item-224'); }
    private menuAtSitesLink() { return cy.get('#menu-item-244'); }
    private menuDemoSitesLink() { return cy.get('#menu-item-251'); }
    private menuCartLink() { return cy.get('#wpmenucartli'); }
    private slideMenu() { return cy.get('.n2-ss-slider-3'); }
    private slideMenuButtonNext() { return cy.get('#n2-ss-6-arrow-next'); }
    private slideMenuButtonPrev() { return cy.get('#n2-ss-6-arrow-previous'); }
    private newArrivalsSection() { return cy.get('.themify_builder_sub_row.sub_row_1-0-2'); }

    clickShopMenu(): void {
        this.menuShopLink().click();
    }

    clickMyAccountMenu():void {
        this.menuMyAccountLink().click();
    }

    getAllSlides():Cypress.Chainable {
        return this.slideMenu().find('>div');
    }

    getAllNewArrivals():Cypress.Chainable {
        return this.newArrivalsSection().find('>div');
    }

    getOneImageInArrivals(n: number):Cypress.Chainable {
        if (n > 0 && n < 4) {
            return this.newArrivalsSection().find(`>div:nth-child(${n})`);
        } else {
            throw new Error('El valor ingresado es incorrecto');
        }
    }
}

export const homePage = new HomePage();
