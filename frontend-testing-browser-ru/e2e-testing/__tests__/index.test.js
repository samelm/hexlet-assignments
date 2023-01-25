/* eslint-disable  no-undef */

const port = 8080;
const host = "localhost";
const appUrl = `http://${host}:${port}`;

// BEGIN
const appArticlesUrl = `${appUrl}/articles`;

describe("app", () => {
  it("main page opens", async () => {
    await page.goto(appUrl);
    await expect(page).toMatch("Welcome to a Simple blog!");
  });

  it("articles opens", async () => {
    await page.goto(appUrl);
    await Promise.all([
      page.click('a[data-testid="nav-articles-index-link"]'),
      page.waitForNavigation(),
    ]);

    await expect(page).toMatch("Create new article");
  });

  it("open and submit create form", async () => {
    await page.goto(appArticlesUrl);
    await Promise.all([
      page.click('a[data-testid="article-create-link"]'),
      page.waitForNavigation(),
    ]);

    await expect(page).toMatch("Create article");
    await expect(page).toMatch("Content");
    await expect(page).toFillForm("form", {
      "article[name]": "Hexlet",
      "article[content]": "Awesome Hexlet Content!",
    });
    await expect(page).toSelect('select[name="article[categoryId]"]', "1");

    await Promise.all([
      page.click('input[data-testid="article-create-button"]'),
      page.waitForNavigation(),
    ]);

    await expect(page).toMatch("Hexlet");
  });

  it("open edit article and edit it", async () => {
    await page.goto(appArticlesUrl);
    await Promise.all([
      page.click('a[data-testid="article-edit-link-4"]'),
      page.waitForNavigation(),
    ]);

    await expect(page).toMatch("Edit article");
    await expect(page).toMatch("Content");
    await expect(page).toFillForm("form", {
      "article[name]": "Hexlet One Love",
      "article[content]": "More Awesome Hexlet Content!",
    });
    await expect(page).toSelect('select[name="article[categoryId]"]', "2");

    await Promise.all([
      page.click('input[data-testid="article-update-button"]'),
      page.waitForNavigation(),
    ]);

    await expect(page).toMatch("Hexlet One Love");
  });
});
// END
