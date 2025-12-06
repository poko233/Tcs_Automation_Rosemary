import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://servineo.app/en');
  await page.locator('rect:nth-child(3)').click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('pruebita1@pruebita.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Cam Noga Cam Noga' }).click();
  await page.getByRole('link', { name: 'Perfil de Fixer' }).click();
  await page.getByRole('button', { name: 'Ver trabajos calificados' }).click();
  await page.getByRole('link', { name: 'Ir a los comentarios' }).click();
});