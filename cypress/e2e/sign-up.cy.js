/// <reference types="cypress"/>




describe('Sign Up / Cadastro', () => {
    beforeEach('', () => {
        cy.visit('/#/register');
    });
    it('cadastro com sucesso', () => {

        cy.intercept({ 
        method:'POST',
        hostname: 'api.realworld.io',
        pathname: '/api/users'   
        }).as('postUsers')

        

    
        const time = new Date().getTime()
        cy.get('input[ng-model$=username]').type(`username-${time}`);
        cy.get('input[ng-model$=email]').type(`username-${time}@mail.com`);
        cy.get('input[ng-model$=password]').type('12345678');
        cy.get ('form[ng-submit]').submit()

        //assert
        cy.contains('Your Feed').should('be.visible');
        cy.get('a[href*=username]').should('contain', `username-${time}`)

        //avaliando a rota

        cy.wait('@postUsers').then(interception => {
            expect(interception.response.statusCode).to.be.eq(200)
            expect(interception.response.body.user.token).to.not.be.empty

    
        })
    });

    it('usuario nao pode ser em branco', () => {
        const time = new Date().getTime()
        cy.get('input[ng-model$=email]').type(`username-${time}@mail.com`);
        cy.get('input[ng-model$=password]').type('12345678');
        cy.get ('form[ng-submit]').submit()
        cy.get('div.ng-scope > .ng-binding').should('contain', `username can't be blank`)
    });

    it('email nao pode ser em branco', () => {
        const time = new Date().getTime()
        cy.get('input[ng-model$=username]').type(`username-${time}`);
        cy.get('input[ng-model$=password]').type('12345678');
        cy.get ('form[ng-submit]').submit()
        cy.get('div.ng-scope > .ng-binding').should('contain', `email can't be blank`)
    });


    it('senha nao pode ser em branco', () => {
        const time = new Date().getTime()
        cy.get('input[ng-model$=username]').type(`username-${time}`);
        cy.get('input[ng-model$=email]').type(`username-${time}@mail.com`);
        cy.get ('form[ng-submit]').submit()
        cy.get('div.ng-scope > .ng-binding').should('contain', `password can't be blank`)
        
        
    });

    //usando mock

    it('cadastro com servidor fora do ar',() =>{
        cy.intercept({ 
            method:'POST',
            hostname: 'api.realworld.io',
            pathname: '/api/users'   
            },{
                statusCode:500,
                body:{"errors":{
                        "server":["is unavailable"]
                    }
                }
            }).as('postUsersMock')
    
            
    
            //act
            const time = new Date().getTime()
            cy.get('input[ng-model$=username]').type(`username-${time}`);
            cy.get('input[ng-model$=email]').type(`username-${time}@mail.com`);
            cy.get('input[ng-model$=password]').type('12345678');
            cy.get ('form[ng-submit]').submit()
    });
  
});













