import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://servineo.app/en');
  await page.getByRole('button', { name: 'No, gracias' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('pedropozo@gmail.com');
  await page.locator('div').filter({ hasText: /^Password\*$/ }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Ofertas de trabajo' }).click();
  await page.getByText('1,000 BsCarpenter near your').click();
  await page.getByRole('button', { name: 'Solicitar trabajo' }).click();
  await page.getByRole('textbox', { name: 'Motivo del trabajo:' }).click();
  await page.getByRole('textbox', { name: 'Motivo del trabajo:' }).fill('fuga de agua');
  await page.getByRole('textbox', { name: 'Descripción del trabajo:' }).click();
  await page.getByRole('textbox', { name: 'Descripción del trabajo:' }).fill('canieria rota en mi casa');
  await page.getByRole('radio', { name: 'Modificar la ubicación del' }).check();
  await page.getByRole('radio', { name: 'Modificar la ubicación del' }).uncheck();
  await page.getByRole('radio', { name: 'Modificar la ubicación del' }).uncheck();
  await page.getByRole('textbox', { name: 'De:' }).click();
  await page.getByRole('textbox', { name: 'De:' }).click();
  await page.getByRole('textbox', { name: 'De:' }).fill('07:00');
  await page.getByRole('textbox', { name: 'Hasta:' }).click();
  await page.getByRole('textbox', { name: 'Hasta:' }).fill('10:44');
  await page.getByRole('spinbutton', { name: 'Tarifa sugerida (opcional):' }).click();
  await page.getByRole('spinbutton', { name: 'Tarifa sugerida (opcional):' }).fill('17');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Guardar' }).click();
});