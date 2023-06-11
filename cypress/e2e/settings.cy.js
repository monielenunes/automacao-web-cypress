/// <reference types="cypress"/>



describe('Settigns / Configuraçoēs', () => {
    beforeEach(() => {
        cy.LoginByApi()
        
        cy.visit('/#/settings');
    });

    it('efetuar logout', () => {
        cy.contains('Or click here to logout.').click()
        cy.screenshot()
    });
});