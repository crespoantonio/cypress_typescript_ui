export class HomePage {
    menuShopLink() { return cy.get('#menu-item-40'); }
    menuMyAccountLink() { return cy.get('#menu-item-50'); }
    menuTestCasesLink() { return cy.get('#menu-item-224'); }
    menuAtSitesLink() { return cy.get('#menu-item-244'); }
    menuDemoSitesLink() { return cy.get('#menu-item-251'); }
    menuCartLink() { return cy.get('#wpmenucartli'); }
    slideMenu() { return cy.get('.n2-ss-slider-3'); }
    slideMenuButtonNext() { return cy.get('#n2-ss-6-arrow-next'); }
    slideMenuButtonPrev() { return cy.get('#n2-ss-6-arrow-previous'); }
    newArrivalsSection() { return cy.get('.themify_builder_sub_row.sub_row_1-0-2'); }

    clickShopMenu(): void {
        this.menuShopLink().click();
    }

    clickMyAccountMenu():void {
        this.menuMyAccountLink().click();
    }

    getAllSlides() {
        return this.slideMenu().find('>div');
    }

    getAllNewArrivals() {
        return this.newArrivalsSection().find('>div');
    }

    getOneImageInArrivals(n: number) {
        if (n > 0 && n < 4) {
            return this.newArrivalsSection().find(`>div:nth-child(${n})`);
        } else {
            throw new Error('El valor ingresado es incorrecto');
        }
    }
}

export const homePage = new HomePage();
