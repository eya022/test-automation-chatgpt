const { test, expect } = require('@playwright/test');

test.describe('Tests Simples - Google', () => {

  test('Ouvrir Google et vérifier le titre', async ({ page }) => {
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Google/);
    console.log('✅ Test réussi : Page Google chargée');
  });

  test('Effectuer une recherche sur Google', async ({ page }) => {
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

    // User-Agent réaliste
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36');

    // Accepter les cookies si présent
    try {
      const acceptBtn = page.locator('button:has-text("Tout accepter")');
      if(await acceptBtn.isVisible({ timeout: 5000 })) await acceptBtn.click();
    } catch(e) {
      console.log('Pas de popup cookies');
    }

    // Rechercher "Playwright"
    await page.fill('textarea[name="q"]', 'Playwright');
    await page.press('textarea[name="q"]', 'Enter');

    // Attendre les résultats avec timeout plus long
    await page.waitForSelector('#search', { timeout: 60000 });

    const results = await page.locator('#search').textContent();
    expect(results).toContain('Playwright');

    console.log('✅ Test réussi : Recherche effectuée');
  });

  test('Vérifier la présence du logo Google', async ({ page }) => {
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

    const logo = page.locator('img[alt="Google"]');
    await logo.waitFor({ state: 'visible', timeout: 60000 });
    await expect(logo).toBeVisible();

    console.log('✅ Test réussi : Logo Google visible');
  });
});

test.describe('Tests Simples - Navigation', () => {

  test('Naviguer entre plusieurs pages', async ({ page }) => {
    await page.goto('https://playwright.dev', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await expect(page).toHaveTitle(/Playwright/);

    await page.goto('https://playwright.dev/docs/intro', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await expect(page).toHaveURL(/docs\/intro/);

    await page.goBack();
    await expect(page).toHaveURL('https://playwright.dev/');

    console.log('✅ Test réussi : Navigation entre pages');
  });

  test('Tester un formulaire simple', async ({ page }) => {
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

    const searchBox = page.locator('textarea[name="q"]');
    await searchBox.fill('Test automation');
    const value = await searchBox.inputValue();
    expect(value).toBe('Test automation');

    console.log('✅ Test réussi : Formulaire rempli');
  });
});

test.describe('Tests avec Screenshots', () => {

  test('Prendre un screenshot de la page', async ({ page }) => {
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: 'test-results/google-homepage.png', fullPage: true });
    console.log('✅ Screenshot sauvegardé');
  });

  test('Screenshot d\'un élément spécifique', async ({ page }) => {
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

    const logo = page.locator('img[alt="Google"]');
    await logo.waitFor({ state: 'visible', timeout: 60000 });
    await logo.screenshot({ path: 'test-results/google-logo.png' });

    console.log('✅ Screenshot du logo sauvegardé');
  });
});

test.describe('Tests de Responsive Design', () => {

  test('Tester sur mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    const searchBox = page.locator('textarea[name="q"]');
    await expect(searchBox).toBeVisible();
    console.log('✅ Test mobile réussi');
  });

  test('Tester sur tablette', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    const searchBox = page.locator('textarea[name="q"]');
    await expect(searchBox).toBeVisible();
    console.log('✅ Test tablette réussi');
  });
});
