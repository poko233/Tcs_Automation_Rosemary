import { test, expect } from '@playwright/test';

test.use({
  launchOptions: { 
    slowMo: 800,
    // headless: false 
  },
});

// TÍTULO ACTUALIZADO: Enfocado 100% en la campanita
test('CP-NOTIF-01 | Verificar interacción con la Campanita y carga de alertas', async ({ page }) => {
  
  // --- PRECONDICIÓN: LOGIN ---
  // Para probar la campanita, primero necesitamos entrar al sistema
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
  
  // --- INICIO DE LA PRUEBA REAL DE LA CAMPANITA ---
  
  // Paso 1: Localizar y hacer clic en el icono de la campanita
  console.log('Haciendo clic en la campanita...');
  //await page.locator('body > header > div > div > div:nth-child(1) > button > svg').click();
  await page.getByRole('button', { name: 'Notificaciones' }).click();
  // Paso 2: Verificar que se despliega el listado y carga al menos una notificación
  // Validamos que exista un item de lista (la notificación en sí)
  const notificacion = page.getByRole('listitem').first();
  
  await expect(notificacion).toBeVisible({ timeout: 10000 });
  
  console.log('¡Prueba de la campanita exitosa: Las notificaciones son visibles!');

  //await page.waitForTimeout(7000);
});