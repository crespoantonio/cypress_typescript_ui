///<reference types="cypress"/>

import { homePage } from "../pages/home.page";
import { myAccountPage } from "../pages/myAccount.page";
declare var process: {
    env:{
        CYPRESS_USERNAME:string;
        CYPRESS_PASSWORD:string
    }
}
describe('MY ACCOUNT - LOGIN', function(){
    const username:string = process.env.CYPRESS_USERNAME || Cypress.env('username');
    const password:string = process.env.CYPRESS_PASSWORD || Cypress.env('password');
    beforeEach(function(){
        cy.visit('/');
        homePage.clickMyAccountMenu();
    })
    it('Login with valir username and password',function(){
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