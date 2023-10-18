// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("completeQuoteForm", (zipCode, material, proximity) => {
  // Step 1: Enter Zip Code
  if (zipCode.toString().length === 5) {
    cy.get('[data-testid="postalCode"]').type(zipCode).should("be.visible");
    cy.contains("button", "Get a quote").click();
    cy.location("pathname").should("eq", "/building-material");
  } else if (zipCode.toString().length < 5) {
    cy.get('[data-testid="postalCode"]').type(zipCode).should("be.visible");
    cy.contains("button", "Get a quote").click();
    cy.get('[class*="MuiFormHelperText-root Mui-error"]').should(
      "have.text",
      "Invalid zip code",
    );
    cy.log("Invalid zip code. You entered a zip code less than 5 digits");
    cy.url().should("eq", "/");
  } else {
    throw new Error(
      "Invalid zip code. You entered a zip code with more than 5 digits",
    );
  }
  // Step 2: Select Building Material
  const allowedMaterials = ["Straw", "Sticks", "Bricks"];
  cy.get(".MuiFormControlLabel-root").should(
    "have.length",
    allowedMaterials.length,
  );
  if (allowedMaterials.includes(material)) {
    cy.contains(material).should("exist").find('input[type="radio"]').check();
    cy.contains("button", "Next").click();
    cy.location("pathname").should("eq", "/water-proximity");
  } else {
    throw new Error(
      "Invalid material. Please select Straw, Sticks, or Bricks.",
    );
  }
  // Step 3. a) Select 'Yes' for Water Proximity
  if (proximity == "Yes") {
    cy.contains(proximity).find('input[type="radio"]').check();
    cy.contains("button", "Next").click();
    // Step 4: Validate the "Complete": unchecked by default checkbox with the label "Include Flood Protection (+$XX)"
    cy.get('div[class*="MuiPaper-root"]')
      .contains("h3", "Standard")
      .should("be.visible");
    cy.get('div[class*="MuiPaper-root"]')
      .contains("h3", "Complete")
      .should("be.visible");
    cy.contains('div[class*="MuiPaper-root"]', "Complete").within(() => {
      cy.get(`.MuiFormControlLabel-root`)
        .should("not.be.disabled")
        .and("not.be.checked")
        .invoke("text")
        .should("match", /Include Flood Protection \(\+\$\d+\)/);
    });
    // Step 3. b) Select 'No' for Water Proximity
  } else if (proximity === "No") {
    cy.contains(proximity).find('input[type="radio"]').check();
    cy.contains("button", "Next").click();
    // Step 4: Validate the "Complete": checked by default checkbox with the label "Flood Protection Included"
    cy.get('div[class*="MuiPaper-root"]')
      .contains("h3", "Standard")
      .should("be.visible");
    cy.get('div[class*="MuiPaper-root"]')
      .contains("h3", "Complete")
      .should("be.visible");
    cy.contains('div[class*="MuiPaper-root"]', "Complete").within(() => {
      cy.get(`.MuiFormControlLabel-root`)
        .should("be.disabled")
        .and("be.checked")
        .invoke("text")
        .should("have.text", "Flood Protection Included");
    });
  } else {
    throw new Error(
      "Invalid proximity value. Please select either 'Yes' or 'No'.",
    );
  }
});
