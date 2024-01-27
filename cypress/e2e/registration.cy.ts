///<reference types="cypress"/>

import { homePage } from "../pages/home.page";
import { myAccountPage } from "../pages/myAccount.page";
import { helpers } from "../support/helper";
import { IUserInfo } from '../support/types';

describe('MY ACCOUNT - REGISTRATION', function(){
    beforeEach(function(){
        cy.visit('/');
        homePage.clickMyAccountMenu();
    })
    
    it('Sign in', function(){
        const user:IUserInfo = helpers.createsNewUser();
        myAccountPage.registerNewUser(user.email, user.password);
        myAccountPage.loginMessageWelcome().should('exist').and('include.text', `${user.name}.${user.lastname}`);
    })

    it('Registration with invalid email', function(){
        const user:IUserInfo = helpers.createsNewUser();
        myAccountPage.registerNewUser(`${user.name}@lamd`, user.password);
        myAccountPage.messageError().should('exist').and('include.text', 'Error: Please provide a valid email address.');
    })

    it('Registration with empty password', function(){
        const user:IUserInfo = helpers.createsNewUser();
        myAccountPage.registerNewUser(user.email, null);
        myAccountPage.messageError().should('exist').and('include.text', 'Error: Please enter an account password.');
    })
})