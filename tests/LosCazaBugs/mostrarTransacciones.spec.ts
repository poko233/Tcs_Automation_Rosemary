import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: 800 } });

test('CP-003 | Verificar filtro "Billetera" muestra transacciones', async ({ page }) => {
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
  // Usamos el nombre accesible del botón
  await page.getByRole('button', { name: 'Notificaciones' }).click();
  
  // 4. PRUEBA: Filtrar por Billetera
  console.log('Seleccionando filtro Billetera...');
  await page.locator('#notification-filter').selectOption('billetera');

  // Esperamos a que aparezca la primera notificación en la lista
  const notificacion = page.getByRole('listitem').first();
  await expect(notificacion).toBeVisible({ timeout: 10000 });

  // 5. VALIDACIÓN EXACTA
  // Buscamos que dentro de la tarjeta exista el texto "BILLETERA".
  // Playwright buscará dentro de ese <span> amarillo que me mostraste.
  await expect(notificacion).toContainText('BILLETERA');

  console.log('Test Exitoso: Se encontró la etiqueta "BILLETERA" en la notificación.');
});