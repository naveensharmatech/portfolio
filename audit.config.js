import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./audit', testMatch:'**/*.spec.js', timeout:120000, expect:{timeout:8000},
 fullyParallel:true, workers:2, retries:0,
 reporter:[['list'],['json',{outputFile:'audit-results/browser.json'}],['html',{outputFolder:'audit-report',open:'never'}]],
 use:{baseURL:process.env.AUDIT_URL, browserName:process.env.AUDIT_BROWSER||'chromium', viewport:{width:1440,height:900}, actionTimeout:15000,navigationTimeout:30000,trace:'retain-on-failure',screenshot:'only-on-failure'},
});
