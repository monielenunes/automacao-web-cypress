import { AsyncVoidFunction } from "async";

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Efetua login via requisição na API
     * @example
     * cy.LoginByApi()
     */
    LoginByApi(): void
    
  }
}