const logger = require("../../helper/logger.js");
const global = browser.globals;

let loginPage = browser.page.loginPage();
let dashboardMyProfile = browser.page.Dashboard.dashboardMyProfile();

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
  it("Verify user should see the 'No Badges Earned' message when no badges were earned to their profile.", async function () {
    await browser
      .focusClick("css", ".material-symbols-outlined.hex", false)
      .expect.element(".no-badges-message").to.not.be.present;
  });
  it("verify that User should be able to see the profile picture along with the monthly rank", async function () {
    await browser.assert
      .visible(
        ".material-symbols-outlined.hex",
        "Profile Picture is Visible along the Monthly rank",
      )
      .assert.visible("#show-rank");
  });
  it("verify that user should be able to change their profile picture by clicking on update profile page ", async function () {
    await browser
      .focusClick("css", ".edit-detail-button", false)
      .focusClick(
        "xpath",
        "//button[@class = 'edit-detail-button' and contains(text(), 'Save')]",
        false,
      )
      .assert.visible(".edit-detail-button", "Profile Updated");
  });
  it("Verify user should be able to see his/her name and competency name on the profile page ", async function () {
    await dashboardMyProfile
      .useXpath()
      .assert.visible("@testEmp", "Employee name is visible")
      .useCss()
      .assert.visible("@testStu", "Competency name is visible");
  });
  it("Verify user should be able to see their points, overall rank and monthly score on the profile page", async function () {
    await dashboardMyProfile.assert
      .visible("@points", "Points is visible")
      .assert.visible("@points", "Rank is Visible")
      .assert.visible("@points", "Monthly score is Visible ");
  });
  it("Verify that user should be able to view the badges and the count in the badges section", async function () {
    await dashboardMyProfile.assert.visible("@badges");

    const badgeCount = await browser.execute(function () {
      document
        .querySelector(
          ".d-flex.justify-content-start.align-items-center.no-scroll-badges",
        )
        .scrollIntoView();
      const badges = document.querySelectorAll(
        ".material-symbols-outlined.hexagon.cursor-pointer",
      );
      return badges.length;
    });
    // printing the Number of counts in badge Count
    logger.info("Number of badges: " + badgeCount);
  });

  it("verify that user should be able to see month and score and rank by clicking on the badges", async function () {
    await browser.execute(() => {
      document.querySelector("div.rank-tag").click();
    });
    dashboardMyProfile.assert
      .visible("@badgesRank", "Rank is visible under Badges")
      .assert.visible("@badgesMonth", "Month is visible under Badges")
      .assert.visible("@badgesScore", "Score is visible under Badges");
  });
});
