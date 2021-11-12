/// <reference types="cypress" />

const FIRST_NAME_ERRORS = {
  REQUIRED: "First name is required",
};
const LAST_NAME_ERRORS = {
  REQUIRED: "Last name is required",
};
const EMAIL_ERRORS = {
  REQUIRED: "Email is required",
  INVALID: "Invalid email address",
};
const PASSWORD_ERRORS = {
  REQUIRED: "Password is required",
};
const CHECKBOX_ERRORS = {
  REQUIRED: "You have to accept terms and conditions if you want to create an account.",
};

context("Filling sign-up form", () => {
  it("Navigate to sign-up page.", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/sign-up"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/sign-up");
    });
  });

  it("Checks required fields.", () => {
    cy.get('input[name="firstName"]').focus().blur();
    cy.contains(FIRST_NAME_ERRORS.REQUIRED);

    cy.get('input[name="lastName"]').focus().blur();
    cy.contains(LAST_NAME_ERRORS.REQUIRED);

    cy.get('input[name="email"]').focus().blur();
    cy.contains(EMAIL_ERRORS.REQUIRED);

    cy.get('input[name="password"]').focus().blur();
    cy.contains(PASSWORD_ERRORS.REQUIRED);

    cy.get('input[type="checkbox"]').focus().blur();
    cy.contains(CHECKBOX_ERRORS.REQUIRED);

    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Fills in first and last name.", () => {
    cy.get('input[name="firstName"]').type("John", { delay: 100 }).should("have.value", "John");
    cy.contains(FIRST_NAME_ERRORS.REQUIRED).should("not.exist");
    cy.get('button[type="submit"]').should("be.disabled");

    cy.get('input[name="lastName"]').type("Doe", { delay: 100 }).should("have.value", "Doe");
    cy.contains(LAST_NAME_ERRORS.REQUIRED).should("not.exist");
    cy.get('button[type="submit"]').should("be.disabled");
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

    cy.get('input[name="email"]')
      .clear()
      .type("john.doe@gmail.com", { delay: 100 })
      .should("have.value", "john.doe@gmail.com")
      .blur();
    cy.contains(EMAIL_ERRORS.INVALID).should("not.exist");
    cy.contains(EMAIL_ERRORS.REQUIRED).should("not.exist");

    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Fills in password input.", () => {
    cy.get('input[name="password"]').type("123", { delay: 100 }).should("have.value", "123").blur();
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Checks checkbox", () => {
    cy.get('input[type="checkbox"]').check({ force: true });
    cy.get('button[type="submit"]').should("not.be.disabled");
  });
});
export {};
