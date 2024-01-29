export class MyAccountPage{
    private usernameLabel():Cypress.Chainable{return cy.get('#username')}
    private passwordLabel():Cypress.Chainable{return cy.get('#password')}
    private loginButton():Cypress.Chainable{return cy.get('[name="login"]')}
    private loginMessageWelcome():Cypress.Chainable{return cy.get('.woocommerce-MyAccount-content')}
    private messageError():Cypress.Chainable{return cy.get('.woocommerce-error')}
    private loginSection():Cypress.Chainable{return cy.get('.login')}
    private registerSection():Cypress.Chainable{return cy.get('.register')}
    private registerEmailAddressLabel():Cypress.Chainable{return cy.get('#reg_email')}
    private registerPasswordLabel():Cypress.Chainable{return cy.get('#reg_password')}
    private registerButton():Cypress.Chainable{return cy.get('[name="register"]')}
    private accountDetailsLink():Cypress.Chainable{return cy.contains('Account Details')}
    private passwordChangeTitle():Cypress.Chainable{return cy.get('fieldset>legend')}


    logIn(username:string, password:string):void{
        this.usernameLabel().type(username);
        this.passwordLabel().type(password, {log:false});
        this.loginButton().click();
    }

    getPasswordChangeSection():Cypress.Chainable{
        return this.passwordChangeTitle();
    }

    clickAccountDetailsLink():void{
        this.accountDetailsLink().click();
    }

    getLogInMesageWelcome():Cypress.Chainable{
        return this.loginMessageWelcome();
    }

    getLoginSection():Cypress.Chainable{
        return this.loginSection();
    }

    getUsernameLabel():Cypress.Chainable{
        return this.usernameLabel();
    }

    getPasswordLabel():Cypress.Chainable{
        return this.passwordLabel();
    }

    getErrorMessage():Cypress.Chainable{
        return this.messageError();
    }

    registerNewUser(username:string | null, password:string | null):void{
        this.registerEmailAddressLabel().type(username ?? '');
        this.registerPasswordLabel().invoke('val', password ?? '');
        this.registerButton().should('not.have.class', 'disabled').click({force: true});
    }
}

export const myAccountPage = new MyAccountPage()