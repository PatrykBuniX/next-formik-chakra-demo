/// <reference types="cypress" />

context("Nagiation", () => {
  it("Navigate to sign-in page.", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/sign-in"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/sign-in");
    });
  });

  it("Navigate from sign-in page back to home.", () => {
    cy.get('[href="/"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("Navigate to sign-up page.", () => {
    cy.get('[href="/sign-up"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/sign-up");
    });
  });

  it("Navigate from sign-up page back to home.", () => {
    cy.get('[href="/"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });
});
export {};
