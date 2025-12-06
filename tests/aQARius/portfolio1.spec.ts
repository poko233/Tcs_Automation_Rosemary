import { test, expect } from '@playwright/test';

// TC1: Verificar subida imagen 
test('subida imagen', async ({ page }) => {
  // Ingresar a la pagina
  await page.goto('https://servineo.app/en');
  // Iniciar sesion
  await page.getByRole('button', { name: 'Close Tour' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('reparador@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Log in' }).click();
  // Navegar al portafolio
  await page.getByRole('button', { name: 'Reparador Prueba Reparador' }).click();
  await page.getByRole('link', { name: 'Perfil de Fixer' }).click();
  await page.getByRole('button', { name: 'Portafolio' }).click();
  // Añadir una imagen
  await page.getByRole('button', { name: 'Image' }).click();
  await page.getByRole('textbox', { name: 'https://' }).click();
  await page.getByRole('textbox', { name: 'https://' }).fill('https://images.unsplash.com/photo-1722960961055-b9a8e77ddc9b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  // esperar 1 segundo porque hay un bug que no permite guardar bien
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Save' }).click();
  // esperar 1 segundo porque hay un bug que no permite guardar bien
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Cerrar' }).click();
});
