import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://servineo.app/es');
  await page.locator('rect:nth-child(3)').click();
  await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).fill('efrain.alucard@minuteafter.com');
  await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
  await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).fill('1234qwer:');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'Cerrar' }).click();
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'manuel merino manuel merino' }).click();
  await page.getByRole('link', { name: 'Perfil de Fixer' }).click();
  await page.getByRole('button', { name: 'Más opciones' }).click();
  await page.getByRole('button', { name: 'Desactivar oferta' }).click();
  await page.getByRole('button', { name: 'Más opciones' }).click();
  await page.getByRole('button', { name: 'Activar oferta' }).click();
});
