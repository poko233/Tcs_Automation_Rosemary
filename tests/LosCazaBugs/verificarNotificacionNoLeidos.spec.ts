import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: 800 } });

test('Verificar filtro "No leídas" muestra ítems pendientes de lectura', async ({ page }) => {
  // 1. Login
  await page.goto('https://servineo.app/es/login');
  await page.locator('input[name="email"]').fill('lili@gmail.com');
  await page.locator('input[name="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.waitForLoadState('networkidle');

  // 2. MANEJO DE OBSTÁCULOS (MODAL)
  try {
    const botonNoGracias = page.getByRole('button', { name: 'No, gracias' });
    await botonNoGracias.waitFor({ state: 'visible', timeout: 7000 });
    await botonNoGracias.click();
    console.log('Modal cerrado con éxito.');
    await page.waitForTimeout(1000); 
  } catch (error) {
    console.log('El modal no apareció, continuamos.');
  }

  // 3. Abrir Notificaciones
  await page.getByRole('button', { name: 'Notificaciones' }).click();
  
  // 4. PRUEBA: Filtrar por No Leídas
  await page.locator('#notification-filter').selectOption('no_leidas');

  // Seleccionamos la primera notificación
  const notificacion = page.getByRole('listitem').first();
  await expect(notificacion).toBeVisible({ timeout: 10000 });

  // --- CORRECCIÓN AQUÍ ---
  // En lugar de validar el texto, validamos el indicador visual de "No leído".
  // Opción A: Buscamos si tiene el fondo azul claro (bg-blue-50) que sale en tu error log.
  await expect(notificacion).toHaveClass(/bg-blue-50/);

  // Opción B (Alternativa más robusta): Buscar el puntito azul dentro de la tarjeta
  // const puntoAzul = notificacion.locator('.bg-blue-600');
  // await expect(puntoAzul).toBeVisible();

  console.log('Test exitoso: La notificación tiene el estilo de "No leída" (Fondo azul).');
});