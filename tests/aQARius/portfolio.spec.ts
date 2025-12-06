import { test, expect } from '@playwright/test';

// TC2: Verificar subida video
test('subida video', async ({ page}) => {
  test.skip(test.info().project.name !== 'chromium', 'Solo correr en Chromium');
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
  //esperar por si hay algun bug que no deja entrar al portafolio
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Portafolio' }).click();
  // Añadir un video
  await page.getByRole('button', { name: 'Video' }).click();
  await page.getByRole('textbox', { name: 'https://www.youtube.com/watch?v=' }).click();
  // esperar 1 segundo porque hay un bug que no permite guardar bien
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'https://www.youtube.com/watch?v=' }).fill('https://www.youtube.com/watch?v=m6a-I4y8CG4');
  await page.getByRole('button', { name: 'Save' }).click();
    // esperar 1 segundo porque hay un bug que no permite guardar bien
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Cerrar' }).click();
});
