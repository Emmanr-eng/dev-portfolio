import { test, expect } from '@playwright/test';

// ── FIX #7: shared viewport — identical across all machines ──────────────────
const VIEWPORT = { width: 1280, height: 900 };

// ── FIX #9: mask selectors for dynamic content ───────────────────────────────
// The StatusTile renders a live clock that changes every second.
// Masking it prevents false-positive diffs caused by time advancing.
const DYNAMIC_SELECTORS = [
  '[data-testid="status-tile"]', // add data-testid="status-tile" to StatusTile if not present
];

// ── FIX #10: split into focused, named tests so failures are actionable ──────

test.describe('Visual Regression — Portfolio', () => {

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.goto('/');
    // FIX #6: wait for the network to be idle + key element in DOM
    // instead of an arbitrary timeout.
    await page.waitForLoadState('networkidle');
    await page.locator('nav').waitFor({ state: 'visible' });
  });

  test('hero + bento grid', async ({ page }) => {
    // Scroll back to top to guarantee a clean starting position
    await page.evaluate(() => window.scrollTo(0, 0));

    await expect(page).toHaveScreenshot('01-hero-bento.png', {
      // FIX #8: capture the full page, not just the visible viewport
      fullPage: false,          // false = just the viewport (hero area)
      maxDiffPixelRatio: 0.02,
      // FIX #9: mask the live clock tile
      mask: DYNAMIC_SELECTORS.map(sel => page.locator(sel)),
    });
  });

  test('bug timeline section', async ({ page }) => {
    await page.locator('#about').scrollIntoViewIfNeeded();
    // FIX #6: wait for the section's heading to be visible, not a timeout
    await page.locator('#about h2').first().waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot('02-bug-timeline.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('component lab section', async ({ page }) => {
    await page.locator('#component-lab').scrollIntoViewIfNeeded();
    await page.locator('#component-lab h2').first().waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot('03-component-lab.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('full page snapshot', async ({ page }) => {
    // FIX #8: one full-page reference for overall regression catching
    await expect(page).toHaveScreenshot('04-full-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      mask: DYNAMIC_SELECTORS.map(sel => page.locator(sel)),
    });
  });

});