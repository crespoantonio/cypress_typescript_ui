export class MyAccountPage{
    usernameLabel(){return cy.get('#username')}
    passwordLabel(){return cy.get('#password')}
    loginButton(){return cy.get('[name="login"]')}
    loginMessageWelcome(){return cy.get('.woocommerce-MyAccount-content')}
    messageError(){return cy.get('.woocommerce-error')}
    loginSection(){return cy.get('.login')}
    registerSection(){return cy.get('.register')}
    registerEmailAddressLabel(){return cy.get('#reg_email')}
    registerPasswordLabel(){return cy.get('#reg_password')}
    registerButton(){return cy.get('[name="register"]')}


    logIn(username:string, password:string):void{
        this.usernameLabel().type(username);
        this.passwordLabel().type(password, {log:false});
        this.loginButton().click();
    }

    registerNewUser(username:string | null, password:string | null):void{
        this.registerEmailAddressLabel().type(username ?? '');
        this.registerPasswordLabel().invoke('val', password ?? '');
        this.registerButton().should('not.have.class', 'disabled').click({force: true});
    }
}

export const myAccountPage = new MyAccountPage()