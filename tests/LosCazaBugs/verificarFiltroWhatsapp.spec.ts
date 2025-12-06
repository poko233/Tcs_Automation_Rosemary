import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: 800 } });

test('CP-005 | Verificar filtro "WhatsApp": Valida lista o mensaje de vacío', async ({ page }) => {
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
  
  // 4. PRUEBA: Filtrar por WhatsApp
  console.log('Seleccionando filtro WhatsApp...');
  await page.locator('#notification-filter').selectOption('whatsapp');
  
  // Esperamos un momento para que la UI reaccione al filtro (cargue datos o muestre mensaje vacío)
  await page.waitForTimeout(2000);

  // --- LÓGICA CONDICIONAL ---
  const hayNotificaciones = await page.getByRole('listitem').count() > 0;

  if (hayNotificaciones) {
      // CASO A: SI HAY NOTIFICACIONES
      console.log('Se encontraron notificaciones. Verificando etiqueta "WHATSAPP"...');
      const notificacion = page.getByRole('listitem').first();
      
      // Buscamos "WHATSAPP" o "WhatsApp" (La 'i' significa que no importa mayúsculas/minúsculas)
      await expect(notificacion).toContainText(/WHATSAPP/i);
      
      console.log('Test Pasado: Se encontró notificación con etiqueta WhatsApp.');

  } else {
      // CASO B: NO HAY NOTIFICACIONES (LISTA VACÍA)
      console.log('La lista está vacía. Verificando mensaje de "No hay notificaciones"...');
      
      // Buscamos el texto que mencionaste. Usamos un selector de texto flexible.
      // Esto buscará cualquier texto visible que contenga "No hay notificaciones"
      const mensajeVacio = page.getByText(/No hay notificaciones/i);
      
      // Si el mensaje es visible, el test pasa.
      await expect(mensajeVacio).toBeVisible();
      
      console.log('Test Pasado: Se mostró correctamente el mensaje de lista vacía.');
  }
});