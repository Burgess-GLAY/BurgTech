import { test, expect } from '@playwright/test';

test.describe('Services Section Responsive Design', () => {
  test('Desktop Layout', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(2000);

    // Desktop should have tabs and preview cards
    await expect(page.locator('text=Development')).toBeVisible();
    await expect(page.locator('.glass-card.group.overflow-hidden')).toHaveCount(4); // Default category has 4 services
    await page.locator('text=Data & Intelligence').click();
    await page.waitForTimeout(500); // give it a chance to transition

    const isVisible = await page.locator('text=Data Science').isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('Mobile Layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(2000);

    // Mobile should have accordion structure
    const accordionHeader = page.locator('button:has-text("Development")').first();
    await expect(accordionHeader).toBeVisible();

    // The items inside might initially be hidden or collapsed with zero height.
    // They appear after clicking
    await accordionHeader.click();
    await page.waitForTimeout(1000); // Give transition time

    const firstMobileService = page.locator('text=Custom Software Development').first();
    await expect(firstMobileService).toBeVisible();
    await firstMobileService.click();

    // Verify detail box expands
    const detailBtn = page.locator('text=View Full Details');
    await expect(detailBtn).toBeVisible();
  });
});
