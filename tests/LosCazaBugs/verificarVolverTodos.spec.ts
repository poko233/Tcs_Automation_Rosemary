import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: 800 } });

test('CP-006 | Verificar que al volver a "Todos" se ve el historial completo', async ({ page }) => {
  // 1. Login
  await page.goto('https://servineo.app/es/login');
  await page.locator('input[name="email"]').fill('lili@gmail.com');
  await page.locator('input[name="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.waitForLoadState('networkidle');

  // --- MANEJO DE OBSTÁCULOS (MODAL) ---
  try {
    const botonNoGracias = page.getByRole('button', { name: 'No, gracias' });
    await botonNoGracias.waitFor({ state: 'visible', timeout: 7000 });
    await botonNoGracias.click();
    await page.waitForTimeout(1000); 
  } catch (error) {
    console.log('El modal no apareció, continuamos con la prueba de la campanita.');
  }

  // 3. Abrir Notificaciones
  //await page.locator('body > header > div > div > div:nth-child(1) > button > svg').click();
  await page.getByRole('button', { name: 'Notificaciones' }).click();
  // 4. PRUEBA ESPECÍFICA: Cambio de filtro y regreso a Todos
  // Primero filtramos por Billetera
  await page.locator('#notification-filter').selectOption('billetera');
  await expect(page.getByRole('listitem').first()).toContainText('BILLETERA');

  // Luego regresamos a Todos
  await page.locator('#notification-filter').selectOption('todos');

  // Validamos que vuelvan a cargar items
  const notificacion = page.getByRole('listitem').first();
  await expect(notificacion).toBeVisible({ timeout: 10000 });
  
  // Validar que el valor sea 'todos'
  await expect(page.locator('#notification-filter')).toHaveValue('todos');
});