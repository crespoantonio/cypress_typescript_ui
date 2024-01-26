export class MyAccountPage{
    usernameLabel(){return cy.get('#username')}
    passwordLabel(){return cy.get('#password')}
    loginButton(){return cy.get('[name="login"]')}
    loginMessageWelcome(){return cy.get('.woocommerce-MyAccount-content')}
    loginMessageError(){return cy.get('.woocommerce-error')}
    loginSection(){return cy.get('.login')}

    logIn(username:string, password:string):void{
        this.usernameLabel().type(username);
        this.passwordLabel().type(password, {log:false});
        this.loginButton().click();
    }
}

export const myAccountPage = new MyAccountPage()