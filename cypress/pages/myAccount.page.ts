export class MyAccountPage{
    private usernameLabel(){return cy.get('#username')}
    private passwordLabel(){return cy.get('#password')}
    private loginButton(){return cy.get('[name="login"]')}
    private loginMessageWelcome(){return cy.get('.woocommerce-MyAccount-content')}
    private messageError(){return cy.get('.woocommerce-error')}
    private loginSection(){return cy.get('.login')}
    private registerSection(){return cy.get('.register')}
    private registerEmailAddressLabel(){return cy.get('#reg_email')}
    private registerPasswordLabel(){return cy.get('#reg_password')}
    private registerButton(){return cy.get('[name="register"]')}


    logIn(username:string, password:string):void{
        this.usernameLabel().type(username);
        this.passwordLabel().type(password, {log:false});
        this.loginButton().click();
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