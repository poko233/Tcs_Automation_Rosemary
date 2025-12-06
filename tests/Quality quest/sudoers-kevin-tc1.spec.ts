import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://servineo.app/es');
  await page.getByRole('button', { name: 'No, gracias' }).click();
  await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).fill('efrain.alucard@minuteafter.com');
  await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).fill('1234qwer;');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'manuel merino manuel merino' }).click();
  await page.getByRole('link', { name: 'Perfil de Fixer' }).click();
  await page.getByRole('button', { name: 'Más opciones' }).click();
  await page.getByRole('button', { name: 'Crear promoción' }).click();
  await page.getByRole('textbox', { name: 'Promo title:' }).click();
  await page.getByRole('textbox', { name: 'Promo title:' }).fill('Descuento de navidad 10% menos');
  await page.getByRole('textbox', { name: 'Promo description:' }).click();
  await page.getByRole('textbox', { name: 'Promo description:' }).fill('El descuento solo es valido hasta 26/12/2025');
  await page.getByRole('button', { name: 'Save promo' }).click();
});