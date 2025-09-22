const { test, expect } = require('@playwright/test');

test('Realizar cadastro de novo usuário', async ({ page }) => {
    await page.goto('/')

    const acessarHome = page.locator('body > div.navbar.navbar-inverse > div > div > a:nth-child(3)')
    await expect(acessarHome).toHaveText('home');
    await acessarHome.click();

    await expect(page).toHaveURL('/login')

    const cadastrarNovoUsuario = page.locator('#app-navbar-collapse > ul.nav.navbar-nav.navbar-right > li:nth-child(2) > a');
    await expect(cadastrarNovoUsuario).toHaveText('Register');
    await cadastrarNovoUsuario.click();
    
    await expect(page).toHaveURL('/register');

    await page.fill('#name', 'Jose Amancio');
    await page.fill('#company', 'Iterasys - fts145');
    await page.fill('#email', 'amancio@email.com');
    await page.fill('#password', '1234567777');
    await page.fill('#password-confirm', '1234567777');

    const botaoRegistrarNovoUsuario = page.locator('xpath=//*[@id="app"]//div[6]/div/button');
    await expect(botaoRegistrarNovoUsuario).toHaveText('Register');
    await botaoRegistrarNovoUsuario.click();

    await expect(page.locator('body > div.flex-center.position-ref.full-height > div.message')).toHaveText('Page Expired');

    
});