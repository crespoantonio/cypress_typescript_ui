///<reference types="cypress"/>

import { homePage } from "../pages/home.page";
import { myAccountPage } from "../pages/myAccount.page";

describe('MY ACCOUNT - LOGIN', function(){
    const username:string = Cypress.env('username');
    const password:string = Cypress.env('password');
    beforeEach(function(){
        cy.visit('/');
        homePage.clickMyAccountMenu();
    })
    it('Login with valid username and password',function(){
        myAccountPage.logIn(username, password);
        myAccountPage.loginMessageWelcome().should('exist').and('include.text', 'tonytest');
    })
    it('Login with incorrect username and incorrect password', function(){
        myAccountPage.logIn('prueba', 'prueba');
        myAccountPage.loginMessageWelcome().should('not.exist');
        myAccountPage.loginMessageError().should('exist').and('be.visible');
        myAccountPage.loginSection().should('exist').and('be.visible');
    })
    it('Password should be masked', function(){
        myAccountPage.usernameLabel().type(username);
        myAccountPage.passwordLabel().type(password, {log:false});
        myAccountPage.passwordLabel().should('have.attr', 'type', 'password');
    })
})