import { WaterProximityPage } from "../POM/waterProximity.page";

describe("Story 4:Customer can select whether I am within 1 mile of a body of water.", () => {
  beforeEach(() => {
    cy.visit("/water-proximity");
  });

  it("TC-012 - Validate that if the customer selects any option on the water proximity page, should be directed to the Quote page", () => {
    WaterProximityPage.getRadioButton().should("not.be.checked");
    WaterProximityPage.selectProximity("Yes");
    WaterProximityPage.getNextButton();
    cy.url().should("include", "/quote");
  });

  it("TC-013 - Validate that customer is not selecting any option on the water proximity page, the “Next” button is disabled and customer cant proceed to the next page.", () => {
    WaterProximityPage.getRadioButton().should("not.be.checked");
    WaterProximityPage.getNextButton();
    cy.url().should("include", "/water-proximity");
  });
});
