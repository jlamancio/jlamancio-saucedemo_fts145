const fs = require('fs');
const path = require('path');

// Armazena o path do diretório dos screenshots

const SHOTS_DIR = process.env.SCREENSHOTS_DIR;

// Garante padronização dos nomes 

function safeName(name) {
    return String(name).replace((/[^\w-:.]/g, '_')).slice(0, 120);
}

/**
 *  Salvar screenShot quando solicitado
 * 
 * @param { import 'playwright/test').Page} page            // captura informações da página 
 * @param { import 'playwright/test').TestInfo} testInfo    // captura informações do test
 * @param { string } label
 * 
 */

async function snap(page, testInfo, label) {
    const file = `${safeName(testInfo.title)}__${safeName(label)}.png`;
    const dest = path.join(SHOTS_DIR, file);

    fs.mkdirSync(SHOTS_DIR, { recursive: true });

    await page.screenshot({ path: dest, fullPage: true });
}

module.exports = { snap };
