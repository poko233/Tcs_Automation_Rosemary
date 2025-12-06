import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sudoers.servineo.app/');
  await page.getByRole('link', { name: 'Fixers' }).click();
  await page.getByRole('link', { name: 'View Jobs' }).click();
  await page.getByRole('button', { name: 'Open menu' }).first().click();
  await page.getByRole('menuitem', { name: 'Appointment details' }).click();
  await page.getByRole('button', { name: 'Register job' }).click();
});