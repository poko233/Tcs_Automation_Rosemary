import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://servineo.app/en');
  await page.getByRole('button', { name: 'Close Tour' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('efrain.alucard@minuteafter.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1234qwer;');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'manuel merino manuel merino' }).click();
  await page.getByRole('link', { name: 'Perfil de Fixer' }).click();
  await page.locator('.absolute.inset-0.bg-gradient-to-t').click();
  await page.getByRole('button', { name: 'Más opciones' }).click();
  await page.getByRole('button', { name: 'Ver promociones' }).click();
  await page.locator('div:nth-child(9) > .flex.items-center.gap-2 > .w-6').click();
  await page.getByRole('button', { name: 'Remove selected promos' }).click();
  await page.getByRole('button', { name: 'Accept' }).click();
});