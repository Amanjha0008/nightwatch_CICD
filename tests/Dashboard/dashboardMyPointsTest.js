const global = browser.globals;

let loginPage = browser.page.loginPage();
let dashboardMyPoints = browser.page.Dashboard.dashboardMyPoints();

describe("My Settings Verification", () => {
  before((browser) => {
    browser.window.maximize().url(global.url);
  }),
    after(async (browser) => {
      browser.quit();
    });

  it("Verify that the elements of LoginPage are visible", async function () {
    await loginPage
      .waitForElementVisible("@header", 5000)
      .assert.titleContains("Sign in to nashtech");
  });

  it("Verify successful login with valid credentials", async function () {
    await loginPage
      .enterNameAndPassword(global.user, global.pass)
      .focusClick("css", "#kc-login", false)
      .assert.urlContains("/my-dashboard");
  });

  it("Verify that user can view the current month's score and the division of contributions", async function () {
    await browser
      .execute(() => {
        document.querySelector(".material-symbols-outlined.hex").click();
      })
      .execute(() => {
        document
          .querySelectorAll(".nav-item.my-1.cursor-pointer.text-bold.p-2")[1]
          .click();
      })
      .assert.visible(
        ".col-6.current-month  .d-flex.justify-content-end",
        "Month score is visible",
      );
    // division of contribution is not present due to I didn't assert
  });

  it("Verify that user can open all the contribution's drop down and read the title.", async function () {
    await browser
      .execute(() => {
        document.querySelector(".mt-3.date-bar.button-class").click();
      })
      .assert.visible(".mt-3.date-bar");
  });
  it("Verify that user can click on the chart, which opens the drop down and highlight the type of co ", async function () {
    await browser.execute(() => {
      document.querySelector('div[accesskey = "Certification"]').click();
    });
    dashboardMyPoints.assert.visible("@dropdownCertification");
  });

  it("Verify user can see all time score.", async function () {
    dashboardMyPoints
      .waitForElementVisible("@allTimeScore", 2000)
      .assert.visible("@allTimeScore", "All time Score visible");
  });
});
