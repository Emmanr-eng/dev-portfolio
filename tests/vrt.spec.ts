import { test, expect } from '@playwright/test';

test('visual regression of landing page', async ({ page }) => {
  await page.goto('http://localhost:5173/'); // Your Vite dev port
  await expect(page).toHaveScreenshot('landing-page.png', {
    maxDiffPixelRatio: 0.05,
  });
});
