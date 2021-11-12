/// <reference types="cypress" />

const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  password: "123",
};

const badUser = {
  email: "bad.cridentials@sorry.com",
  password: "idontremember",
};

const USER_EXISTS_ERROR = "User with given email already exists, please log in.";
const BAD_CRIDENTIALS_ERROR = "Username or password incorrect.";

context("Filling sign-up form", () => {
  it("Creates new account.", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('input[name="firstName"]').type(user.firstName, { delay: 100 });
    cy.get('input[name="lastName"]').type(user.lastName, { delay: 100 });
    cy.get('input[name="email"]').type(user.email, { delay: 100 });
    cy.get('input[name="password"]').type(user.password, { delay: 100 });
    cy.get('input[name="termsAndConditions"]').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
    cy.contains(`You are logged in as: ${user.email}`);
  });

  it("Logs out the user.", () => {
    cy.contains("Logout").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("Fails to create an account with existing email.", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('input[name="firstName"]').type(user.firstName, { delay: 100 });
    cy.get('input[name="lastName"]').type(user.lastName, { delay: 100 });
    cy.get('input[name="email"]').type(user.email, { delay: 100 });
    cy.get('input[name="password"]').type(user.password, { delay: 100 });
    cy.get('input[name="termsAndConditions"]').check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.contains(USER_EXISTS_ERROR);
  });

  it("Fails to log in.", () => {
    cy.visit("http://localhost:3000/sign-in");
    cy.get('input[name="email"]').type(badUser.email, { delay: 100 });
    cy.get('input[name="password"]').type(badUser.password, { delay: 100 });
    cy.get('button[type="submit"]').click();
    cy.contains(BAD_CRIDENTIALS_ERROR);
  });

  it("Logs in the user.", () => {
    cy.visit("http://localhost:3000/sign-in");
    cy.get('input[name="email"]').type(user.email, { delay: 100 });
    cy.get('input[name="password"]').type(user.password, { delay: 100 });
    cy.get('button[type="submit"]').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
    cy.contains(`You are logged in as: ${user.email}`);
  });

  it("Loads books for logged in user.", () => {
    cy.contains("Load books").click();
    cy.get('[role="list"]').should("exist");
  });

  it("Deletes the user.", () => {
    cy.contains("Delete account").click();
    cy.visit("http://localhost:3000/");
    cy.contains(`You are logged in as: ${user.email}`).should("not.exist");
  });
});
export {};
