///<reference types="cypress"/>

import { homePage } from "../pages/home.page";
import { myAccountPage } from "../pages/myAccount.page";

describe.only('MY ACCOUNT - LOGIN', function(){
    beforeEach(function(){
        cy.visit('/');
        homePage.clickMyAccountMenu();
    })
    it('Login with valir username and password',function(){
        myAccountPage.logIn(Cypress.env('username'), Cypress.env('password'));
        myAccountPage.loginMessageWelcome().should('exist').and('include.text', 'tonytest');
    })
    it('Login with incorrect username and incorrect password', function(){
        myAccountPage.logIn('prueba', 'prueba');
        myAccountPage.loginMessageWelcome().should('not.exist');
        myAccountPage.loginMessageError().should('exist').and('be.visible');
        myAccountPage.loginSection().should('exist').and('be.visible');
    })
    it('Password should be masked', function(){
        myAccountPage.usernameLabel().type(Cypress.env('username'));
        myAccountPage.passwordLabel().type(Cypress.env('password'), {log:false});
        myAccountPage.passwordLabel().should('have.attr', 'type', 'password');
    })
})