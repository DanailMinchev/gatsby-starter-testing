/// <reference types="Cypress" />

describe(`Visual tests`, () => {
  beforeEach(() => {
    cy.visit(`/`)
  })

  it(`should match previous screenshot "Home Page"`, () => {
    cy.wait(1000)
    cy.matchImageSnapshot({
      capture: `fullPage`,
    })
  })
})
