import { LandingPage } from "../POM/landing.page";

describe("Story 2: Customer can enter a 5-digit zip code to begin the quote process.", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("h1", "Hurricane Insurance");
  });
  it("TC-005 - Verify that when user enters a valid 5-digit zip code, the system accepts the input and proceeds to the next step.", () => {
    LandingPage.getZipCode("33101").should("be.visible");
    LandingPage.getSubmit();
    cy.url().should("contains", "/building-material");
  });

  it("TC-006 - The customer submits a blank zip code field the “Required” error message should be displayed", () => {
    cy.get(`[name="postalCode"]`)
      .should("have.prop", "value")
      .should("be.empty");
    LandingPage.getSubmit();
    LandingPage.showsError("Required").should("be.visible");
  });

  it('TC-007 - Verify that when a user enters an invalid zip code the system displays an appropriate error message "Invalid zip code"', () => {
    LandingPage.getZipCode("1234").should("be.visible");
    LandingPage.getSubmit();
    LandingPage.showsError("Invalid zip code").should("be.visible");
  });

  it('TC-008 - Verify that when a user enters a 6-digit zip code, the system displays an appropriate error message "Invalid zip code"', () => {
    LandingPage.getZipCode("331011").should("be.visible");
    LandingPage.noError();
    LandingPage.getSubmit();
    LandingPage.showsError("Invalid zip code").should("be.visible");
    cy.url().should("eq", "https://sure-qa-challenge.vercel.app/");
  });

  it('TC-009 - Verify that when a user enters letters or special characters in the zip code, the system displays an appropriate error message "Invalid zip code"', () => {
    LandingPage.getZipCode("33A55").should("be.visible");
    LandingPage.getSubmit();
    LandingPage.showsError("Invalid zip code").should("be.visible");
  });
});
