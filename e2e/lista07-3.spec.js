const { test, expect } = require('@playwright/test');

test.skip('Realizar login com usuário válido', async ({ page }) => {

    // 1 - Validar acesso à página principal 

    await page.goto('/')

    const acessarHome = page.locator('body > div.navbar.navbar-inverse > div > div > a:nth-child(3)')
    await expect(acessarHome).toHaveText('home');
    await acessarHome.click();

    await expect(page).toHaveURL('/login')

    // 2 - Efetua login 

    await page.fill('#email', 'amancio@email.com');
    await page.fill('#password', '1234567777');

    await page.getByLabel('Remember me').check();

    const botaoLogin = page.locator('.btn-primary');
    await expect(botaoLogin).toHaveText('Login');
    await botaoLogin.click();

    // 3 - Valida acesso ao ambiente

    await expect(page.locator('body > div.flex-center.position-ref.full-height > div.message')).toHaveText('Page Expired');


});