import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./opility-audit',timeout:120000,expect:{timeout:8000},workers:1,retries:0,
reporter:[['list'],['json',{outputFile:'opility-results/browser.json'}],['html',{outputFolder:'opility-report',open:'never'}]],
use:{baseURL:process.env.AUDIT_URL,browserName:process.env.AUDIT_BROWSER||'chromium',viewport:{width:390,height:900},locale:'en-US',reducedMotion:'reduce',actionTimeout:15000,navigationTimeout:30000,trace:'retain-on-failure',screenshot:'only-on-failure'}});
