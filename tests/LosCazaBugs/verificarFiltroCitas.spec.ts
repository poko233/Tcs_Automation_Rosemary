import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: 800 } });

test('CP-004 | Verificar filtro "Citas" muestra servicios agendados', async ({ page }) => {
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
  
  // 4. PRUEBA: Filtrar por Citas
  console.log('Seleccionando filtro Citas...');
  await page.locator('#notification-filter').selectOption('citas');

  // Esperamos a que la lista se actualice y aparezca la primera tarjeta
  const notificacion = page.getByRole('listitem').first();
  await expect(notificacion).toBeVisible({ timeout: 10000 });

  // 5. VALIDACIÓN EXACTA
  // Verificamos que dentro de la tarjeta exista el texto "CITAS".
  // Esto confirma que el span <span ...>CITAS</span> está presente.
  await expect(notificacion).toContainText('CITAS');

  console.log('Test Exitoso: Se encontró la etiqueta "CITAS" en la notificación.');
});