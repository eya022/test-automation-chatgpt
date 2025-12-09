const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser;
let context;
let page;

// Avant chaque scénario
Before(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

// Après chaque scénario
After(async function () {
  await browser.close();
});

// Aller sur une URL et gérer popup cookies
Given('je vais sur la page {string}', async function (url) {
  await page.goto(url);


  const acceptButton = page.locator('text=Tout accepter, Accept all');
  if (await acceptButton.count() > 0) {
    await acceptButton.click();
  }
});

// Saisir dans la barre de recherche
When('je saisis {string} dans la barre de recherche', async function (text) {
  const searchBox = page.locator('input[name="q"]');
  await searchBox.waitFor({ state: 'visible', timeout: 1000000 }); 
  await searchBox.fill(text);
});

// Lancer la recherche avec Enter
When('je lance la recherche', async function () {
  await page.keyboard.press('Enter');
});

// Vérifier le titre
Then('le titre de la page doit contenir {string}', async function (title) {
  await expect(page).toHaveTitle(new RegExp(title), { timeout: 1000000 });
});

// Vérifier qu'il y a des résultats de recherche
Then('je vois des résultats de recherche', async function () {
  const results = await page.locator('h3').count();
  expect(results).toBeGreaterThan(0);
});

// Prendre un screenshot
Then('je prends un screenshot de la page', async function () {
  await page.screenshot({ path: 'test-results/google-page.png', fullPage: true });
});
