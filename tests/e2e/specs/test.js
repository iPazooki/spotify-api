// https://docs.cypress.io/api/introduction/api.html

describe('Check home page', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h2', 'Your recently played tracks')
  })
})
