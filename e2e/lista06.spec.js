const { test, expect } = require('@playwright/test');

test.skip('Selecionar @viagem e ir para página de com lista de voos', async ({ page }) => {

    await page.goto('https://www.blazedemo.com/');
    await expect(page).toHaveURL('https://www.blazedemo.com');

    const textoPaginaSelecaoDeVoos = 'Welcome to the Simple Travel Agency!';
    await expect(page.locator('h1')).toHaveText(textoPaginaSelecaoDeVoos);

    await expect(page.locator('input.btn.btn-primary')).toHaveText('Find Flights')
    await page.locator('input.btn.btn-primary').click();

    await expect(page).toHaveURL('https://www.blazedemo.com/reserve.php');

});
