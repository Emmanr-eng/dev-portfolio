import { test, expect } from '@playwright/test';

test('should match the brutalist design snapshot', async ({ page }) => {
  // Update the URL if your dev server runs on a different port
  await page.goto('http://localhost:5173/'); 
  
  // Wait for animations to settle
  await page.waitForTimeout(1000); 
  
  // Takes a screenshot and compares it to the baseline
  await expect(page).toHaveScreenshot('landing-page.png', {
    maxDiffPixelRatio: 0.02,
  });
});
