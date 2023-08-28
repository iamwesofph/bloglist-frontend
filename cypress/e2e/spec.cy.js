// describe("template spec", () => {
//     it("passes", () => {
//         cy.visit("http://localhost:5173/");
//     });
// });

describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
        const user = {
            name: "Superuser",
            username: "root",
            password: "salainen",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
        cy.visit("");
    });

    it("Login form is shown", function () {
        cy.contains("Login to Application");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            // cy.contains("log in").click();
            cy.get("#username").type("root");
            cy.get("#password").type("salainen");
            cy.get("#login-button").click();
            cy.contains("Superuser logged in");
        });

        it("fails with wrong credentials", function () {
            // cy.contains("log in").click();
            cy.get("#username").type("root");
            cy.get("#password").type("wrong");
            cy.get("#login-button").click();
            cy.get(".error").should("contain", "Wrong credentials").and("have.css", "color", "rgb(255, 0, 0)").and("have.css", "border-style", "solid");
            cy.get("html").should("not.contain", "Superuser logged in");
        });
    });
});
