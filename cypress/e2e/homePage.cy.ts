///<reference types="cypress"/>
import { homePage } from "../pages/home.page";
import { shopPage } from "../pages/shop.page";
import { productPage } from "../pages/product.page";

describe('Home Page', function() {
    beforeEach(function() {
        cy.visit('/');
        homePage.clickShopMenu();
        shopPage.clickHome();
    });

    it('Home page with three sliders only', function() {
        homePage.getAllSlides().should('have.length', 3);
    });

    it('Home page with three arrivals only', function() {
        homePage.getAllNewArrivals().should('have.length', 3);
    });

    it('Images in arrivals should navigate', function() {
        const imageNumber: number = Math.floor(Math.random() * 3) + 1;
        homePage.getAllNewArrivals().should('have.length', 3);
        homePage.getOneImageInArrivals(imageNumber).click();
        productPage.addToBasketButton().should('exist');
    });
});
