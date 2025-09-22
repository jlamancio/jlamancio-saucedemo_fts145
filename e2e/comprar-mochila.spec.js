// 1 - referências e bibliotecas

const { test, expect } = require('@playwright/test');

// 2 - classes funções ou métodos  
test.skip('Realizar o fluxo de compra da mochila', async ({ page }) => {

    // 1 - validar acesso à pagina e fazer login

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('/');

    const botao_login = page.locator('#login-button');
    await expect(botao_login).toHaveText('Login');

    await page.fill('[name="user-name"]', 'standard_user');
    await page.fill('[placeholder="Password"]', 'secret_sauce');
    await botao_login.click();

    // 2 - validar acesso à pagina de produtos selecionar produto e carrinho

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const tituloDaPagina = '.title';
    await expect(page.locator(tituloDaPagina)).toHaveText('Products');

    const btnAdicionarMochilaNoCarrinho = 'xpath=/html/body/div/div//div[2]/div//div/div/div[1]//button'
    await page.locator((btnAdicionarMochilaNoCarrinho)).click();

    const iconeDoCarrinho = '.shopping_cart_badge';
    await expect(page.locator(iconeDoCarrinho)).toHaveText('1');
    await page.locator(iconeDoCarrinho).click();

    // 3 - validar o item selecionado para compra

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    await expect(page.locator(tituloDaPagina)).toHaveText('Your Cart');
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')

    // 4 - realizar checkout

    const botaoCheckOut = await page.locator('#checkout');
    await expect(botaoCheckOut).toHaveText('Checkout');
    await botaoCheckOut.click();


    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator(tituloDaPagina)).toHaveText('Checkout: Your Information');

    await page.fill('#first-name', 'Jose');
    await page.fill('#last-name', 'Amancio');
    await page.fill('#postal-code', '12345-678');

    const botaoContinuar = page.locator('#continue');
    await expect(botaoContinuar).toHaveText('Continue');
    await botaoContinuar.click();

    // 4 - realizar checkout
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator(tituloDaPagina)).toHaveText('Checkout: Overview');
    await expect(page.locator('.cart_quantity')).toHaveText('1');;
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');

    await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
    await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337');

    await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
    await expect(page.locator('[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!');

    await expect(page.locator('[data-test="total-info-label"]')).toHaveText('Price Total');
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99');
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $2.40');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');

    const botaoFinalizar = page.locator('#finish');
    await expect(botaoFinalizar).toHaveText('Finish')
    await botaoFinalizar.click();

    //5 - validar compra finalizada com sucesso

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator(tituloDaPagina)).toHaveText('Checkout: Complete!');

    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');



    await page.waitForTimeout(2000);
});