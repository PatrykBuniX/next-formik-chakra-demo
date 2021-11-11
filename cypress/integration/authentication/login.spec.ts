/// <reference types="cypress" />

const EMAIL_ERRORS = {
  REQUIRED: "Email is required",
  INVALID: "Invalid email address",
};
const PASSWORD_ERRORS = {
  REQUIRED: "Password is required",
};

context("Filling login form", () => {
  it("Navigate to sign-in page.", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/sign-in"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/sign-in");
    });
  });

  it("Checks required fields.", () => {
    cy.get('input[name="email"]').focus().blur();
    cy.contains(EMAIL_ERRORS.REQUIRED);
    cy.get('input[name="password"]').focus().blur();
    cy.contains(PASSWORD_ERRORS.REQUIRED);
  });

  it("Checks email input.", () => {
    cy.get('input[name="email"]')
      .clear()
      .type("test", { delay: 100 })
      .should("have.value", "test")
      .blur();
    cy.contains(EMAIL_ERRORS.INVALID);

    cy.get('input[name="email"]').clear().type("test@", { delay: 100 }).blur();
    cy.contains(EMAIL_ERRORS.INVALID);

    cy.get('input[name="email"]').clear().type("test@test", { delay: 100 }).blur();
    cy.contains(EMAIL_ERRORS.INVALID);

    cy.get('input[name="email"]').clear().type("test@gmail.com", { delay: 100 }).blur();
    cy.contains(EMAIL_ERRORS.INVALID).should("not.exist");
  });

  it("Checks password input.", () => {
    cy.get('input[name="password"]').type("123", { delay: 100 }).should("have.value", "123");
  });
});
export {};
