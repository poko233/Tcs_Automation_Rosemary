//Herlan TC
import { test, expect } from '@playwright/test';

test('AQARius - Verificar icono de editar una experiencia - Luis Choque', async ({ page }) => {
  await page.goto('https://servineo.app/en');
  
  await page.getByRole('button', { name: 'Close Tour' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('herlan@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  // Esperar a que cargue y cerrar el tour de bienvenida que aparece después del login
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: /close tour|cerrar tour|skip|omitir|continuar/i }).click().catch(() => {});
  // También intentar cerrar el popover del tour directamente
  await page.locator('button[aria-label*="close" i], button[aria-label*="cerrar" i]').click().catch(() => {});
  await page.waitForTimeout(1000);
  
  await page.getByRole('button', { name: 'Herlan Terceros Herlan' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Perfil de Fixer' }).click();
  await page.getByRole('button', { name: 'Experiencia' }).click();
  await page.getByRole('button', { name: 'Edit' }).first().click();
});

