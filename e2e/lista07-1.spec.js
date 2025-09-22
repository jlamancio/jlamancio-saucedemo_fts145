const { test, expect } = require('@playwright/test');

test('Realizar fluxo de compra de viagem', async ({ page }) => {

    // 1 - acessar e validar que está na página de abertura do site

    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');
    await expect(page.getByText('The is a sample site you can test with BlazeMeter!')).toBeVisible();
    await expect(page.getByText('Check out our')).toBeVisible();
    await expect(page.getByText('Choose your departure city:')).toBeVisible();
    await expect(page.getByText('Choose your destination city:')).toBeVisible();

    // 2 - Selecionar destino e avançar para a pagina de reserva de voos 

    const cidadeOrigem = page.locator('select[name="fromPort"]');
    await expect(cidadeOrigem).toBeVisible();
    await cidadeOrigem.selectOption('São Paolo');

    const cidadeDestino = page.locator('select[name="toPort"]');
    await expect(cidadeDestino).toBeVisible();
    await cidadeDestino.selectOption('Cairo');

    const confirmarReserva = page.locator('.btn-primary');
    await expect(confirmarReserva).toBeVisible();
    await expect(confirmarReserva).toHaveText('Find Flights');
    await confirmarReserva.click();


    // 3 - Validar que a página de reserva de voos foi carregada corretamente

    await expect(page).toHaveURL('/reserve.php');

    await expect(page.locator('h3')).toBeVisible();
    await expect(page.locator('h3')).toHaveText('Flights from São Paolo to Cairo:');



    await expect(page.locator('body > div.container > table > thead > tr > th:nth-child(1)')).toHaveText('Choose');
    await expect(page.locator('body > div.container > table > thead > tr > th:nth-child(2)')).toHaveText('Flight #');
    await expect(page.locator('body > div.container > table > thead > tr > th:nth-child(3)')).toHaveText('Airline');
    await expect(page.locator('body > div.container > table > thead > tr > th:nth-child(4)')).toHaveText('Departs: São Paolo');
    await expect(page.locator('body > div.container > table > thead > tr > th:nth-child(5)')).toHaveText('Arrives: Cairo');
    await expect(page.locator('body > div.container > table > thead > tr > th:nth-child(6)')).toHaveText('Price');

    // 4 - Selecionar voo

    const vooSelecionado = page.locator('body > div.container > table > tbody > tr:nth-child(3) > td:nth-child(2) > input');

    await vooSelecionado.click();

    // 5 - Efetuar a compra dos tickets: Validação dos textos e inserção dos dados.

    await expect(page).toHaveURL('/purchase.php')
    await expect(page.locator('h2')).toHaveText('Your flight from TLV to SFO has been reserved.');

    await expect(page.locator('body > div.container > form > div:nth-child(2) > label')).toHaveText('Name');
    await page.fill('#inputName', 'Jose Luis Amancio');

    await expect(page.locator('body > div.container > form > div:nth-child(3) > label')).toHaveText('Address');
    await page.fill('#address', 'Rua das Flores, 123 - Jardim das Acácias');

    await expect(page.locator('body > div.container > form > div:nth-child(4) > label')).toHaveText('City');
    await page.fill('#city', 'São Paulo');

    await expect(page.locator('body > div.container > form > div:nth-child(5) > label')).toHaveText('State');
    await page.fill('#state', 'São Paulo');

    await expect(page.locator('body > div.container > form > div:nth-child(6) > label')).toHaveText('Zip Code');
    await page.fill('#zipCode', '06524-003');

    await expect(page.locator('body > div.container > form > div:nth-child(7) > label')).toHaveText('Card Type');

    await expect(page.locator('body > div.container > form > div:nth-child(8) > label')).toHaveText('Credit Card Number');
    await page.fill('#creditCardNumber', '12345678910112233');

    await expect(page.locator('body > div.container > form > div:nth-child(9) > label')).toHaveText('Month');
    await page.fill('#creditCardMonth', '09');

    await expect(page.locator('body > div.container > form > div:nth-child(10) > label')).toHaveText('Year');
    await page.fill('#creditCardYear', '2025');

    await expect(page.locator('body > div.container > form > div:nth-child(11) > label')).toHaveText('Name on Card');
    await page.fill('#nameOnCard', 'Jose Amancio');

    await page.getByLabel('Remember me').check();

    const botaoFinalizarCompra = page.locator('body > div.container > form > div:nth-child(12) > div > input')
    await expect(botaoFinalizarCompra).toBeVisible();
    await expect(botaoFinalizarCompra).toHaveValue('Purchase Flight');
    await botaoFinalizarCompra.click();

    // 6 - Validar que a compra foi efetuada com sucesso

    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!');


    /* este campo eu não consegui capturar ; o valor que recebo é diferente do valor que está no id 
     
    await expect(page.locator('body > div.container > div > table > tbody > tr:nth-child(1) > td:nth-child(2)')).toHaveText('1758550623316');

    */

    await page.screenshot({ path: 'evidencias/lista07-1/Realizar fluxo de compra de viagem.png', fullPage: true });

});
