// @ts-check

/**0
 * @see https://playwright.dev/docs/test-configuration
 */

const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
const { computeRunFolder, ensureSubdirs } = require('./utils/pathTools.js');

// Diretórios onde serão armazenados os artefatos

const ARTIFACTS_ROOT = path.join(__dirname, 'artifacts');
const runDir = computeRunFolder(ARTIFACTS_ROOT);
const { resultsDir, screenShotDir } = ensureSubdirs(runDir);

// Expõe o path dos diretórios com variáveis de ambiente

process.env.RUN_DIR = runDir;
process.env.SCREENSHOTS_DIR = screenShotDir;



module.exports = defineConfig({

  testDir: './e2e',                             // diretório dos testes do projeto

  timeout: 30000,

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [['html', {

    outputFolder: resultsDir,

  }]],

  use: {
    //  baseURL: 'https://www.saucedemo.com',
    baseURL: 'https://blazedemo.com',
    headless: false,
    screenshot: 'on-first-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      slowMo: 500,
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },


  ],

});

