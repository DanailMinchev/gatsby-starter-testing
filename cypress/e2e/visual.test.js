/// <reference types="Cypress" />

describe(`Visual tests`, () => {
  beforeEach(() => {
    cy.visit(`/`)
  })

  it(`should match previous screenshot "Home Page"`, () => {
    if (!Cypress.env(`isDockerEnvironment`)) {
      cy.log(`ignoring the test`)
      cy.log(
        `isDockerEnvironment value is: ${Cypress.env(`isDockerEnvironment`)}`
      )
      return
    }

    cy.wait(1000)
    cy.matchImageSnapshot({
      capture: `fullPage`,
    })
  })
})
