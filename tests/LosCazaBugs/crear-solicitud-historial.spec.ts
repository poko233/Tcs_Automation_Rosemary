import { test, expect } from '@playwright/test';

test.use({
  launchOptions: { 
    slowMo: 800,
    headless: false // Ejecutar en modo no headless para ver la UI
  },
});

test.describe.configure({ mode: 'serial' });

test('Verificar creación de solicitud en historial (SIN MODAL)', async ({ page }) => {
  
  // 1. Ir a la página de notificaciones
  await page.goto('https://byteboys-notifications.vercel.app/notifications/par3');
  
  // 2. Definimos el texto único para esta prueba
  const descripcionTexto = 'Reparación urgente de equipo TV en oficina 3B.';
  
  // 3. Completar formulario - Datos del Cliente
  await page.locator('#telefonoCliente').fill('59133344455');
  await page.locator('#nombreCliente').fill('Juan Requester');
  await page.locator('#descripcion').fill(descripcionTexto);
  
  // 4. Hacer clic en el botón "Solicitar"
  await page.getByRole('button', { name: 'Solicitar' }).click();
  
  // 5. Esperar a que la tarjeta con el texto específico sea visible
  // Playwright esperará automáticamente hasta que aparezca (default 5s, extendido a 10s por seguridad)
  const nuevaSolicitud = page.locator(`text=${descripcionTexto}`).first();
  await expect(nuevaSolicitud).toBeVisible({ timeout: 10000 });

  // 6. Validaciones finales sobre la tarjeta creada
  // Verificamos que el Fixer sea el correcto dentro del contexto
  await expect(page.locator(`text=María Fixer`).first()).toBeVisible();
  
  // Verificamos que el estado sea "Completado" específicamente para esta solicitud
  // CORRECCIÓN: Usamos '.border-l-4' para seleccionar solo la tarjeta, no el contenedor principal de la página
  const tarjetaContenedor = page.locator('.border-l-4').filter({ hasText: descripcionTexto }).first();
  const indicadorCompletado = tarjetaContenedor.locator('text=Completado');
  
  await expect(indicadorCompletado).toBeVisible();
  
  // Verificación de estilo (borde verde)
  await expect(tarjetaContenedor).toHaveClass(/border-\[#16A34A\]/);
});