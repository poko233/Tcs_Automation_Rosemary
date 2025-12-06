import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://servineo.app/en');
  await page.getByRole('button', { name: 'No, gracias' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('pruebita1@pruebita.com');
  await page.locator('.flex.flex-col > div:nth-child(2) > .relative').click();
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Cam Noga Cam Noga' }).click();
  await page.getByRole('link', { name: 'Perfil de Fixer' }).click();
  await page.getByRole('button', { name: 'New Offer' }).click();
  await page.getByRole('textbox', { name: 'Enter offer title' }).click();
  await page.getByRole('textbox', { name: 'Enter offer title' }).fill('Pintor');
  await page.locator('select[name="category"]').selectOption('Decorador');
  await page.getByText('TitleCategorySelect...Albañ').click();
  await page.getByRole('combobox').nth(2).selectOption('Decorador');
  await page.getByRole('textbox', { name: 'Describe your service...' }).click();
  await page.getByRole('textbox', { name: 'Describe your service...' }).fill('Soy un pinto de muebles ');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('30');
  await page.locator('.lucide.lucide-upload').click();
  await page.getByText('New OfferTitleCategorySelect').setInputFiles('muebles-imagen.webp');
  await page.getByRole('button', { name: 'Save' }).click();
});