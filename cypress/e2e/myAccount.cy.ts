///<reference types="cypress"/>

import { homePage } from "../pages/home.page";
import { myAccountPage } from "../pages/myAccount.page";

describe('MY ACCOUNT', function(){
    beforeEach(function(){
        cy.visit('/');
        homePage.clickMyAccountMenu();
    })
    const username:string = Cypress.env('username');
    const password:string = Cypress.env('password');
    describe('MY ACCOUNT - LOGIN', function(){
        it('Login with valid username and password',function(){
            myAccountPage.logIn(username, password);
            myAccountPage.getLogInMesageWelcome().should('exist').and('include.text', 'tonytest');
        })
        it('Login with incorrect username and incorrect password', function(){
            myAccountPage.logIn('prueba', 'prueba');
            myAccountPage.getLogInMesageWelcome().should('not.exist');
            myAccountPage.getErrorMessage().should('exist').and('be.visible');
            myAccountPage.getLoginSection().should('exist').and('be.visible');
        })
        it('Password should be masked', function(){
            myAccountPage.getUsernameLabel().type(username);
            myAccountPage.getPasswordLabel().type(password, {log:false});
            myAccountPage.getPasswordLabel().should('have.attr', 'type', 'password');
        })
    })
    
    describe('MY ACCOUNT - DASHBOARD', function(){
        it('Account details', function(){
            myAccountPage.logIn(username, password);
            myAccountPage.getLogInMesageWelcome().should('exist').and('include.text', 'tonytest');
            myAccountPage.clickAccountDetailsLink();
            cy.url().should('include', '/my-account/edit-account/');
            myAccountPage.getPasswordChangeSection().should('have.text', 'Password Change');
        })

        it.only('Log out',function(){
            myAccountPage.logIn(username, password);
            myAccountPage.getLogInMesageWelcome().should('exist').and('include.text', 'tonytest');
            myAccountPage.clickLogoutButton();
            myAccountPage.getLoginSection().should('exist').and('be.visible');
            cy.url().should('include', '/my-account/');
        })
    })
})
