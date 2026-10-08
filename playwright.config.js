import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.js', timeout: 60000, workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: process.env.ACCEPTANCE_URL || 'http://127.0.0.1:4173', trace: 'retain-on-failure',
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox', '--disable-dev-shm-usage'] } : {} },
  webServer: process.env.ACCEPTANCE_URL ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI
  }
});
