import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://servineo.app/en');
  await page.getByRole('button', { name: 'No, gracias' }).click();
  await page.locator('.absolute.inset-0.bg-\\[url\\(\\\'data\\:image\\/svg\\+xml\\;base64\\,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6IiBmaWxsPSJub25lIi8\\+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4\\=\\\'\\)\\]').click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('pruebita1@pruebita.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Cam Noga Cam Noga' }).click();
  await page.getByRole('link', { name: 'Perfil de Fixer' }).click();
  await page.getByRole('button', { name: 'Ver trabajos calificados' }).click();
});