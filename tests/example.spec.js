// @ts-check
const { test, expect } = require('@playwright/test');

/*

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  console.log(__filename);

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  
});
*/

test('Alert with ok', async ({ page }) => {
  let t = 5000;
  let localHtml = 'file:///' + __filename.replace('example.spec.js', 'test.html').replace(/\\/g, '/');
  console.log(localHtml);
  await page.goto(localHtml);  
  page.on('dialog', async (dialog) => {
    console.log('Alert text: ' + dialog.message());    
    await dialog.accept();    
  });

  await page.click('#alert-btn');
  
});
