import { test, expect } from '@playwright/test';
test.use({
  launchOptions: { slowMo: 800 },
});
test('UI - Verificar que se muestra el error de envío de notificación al fixer', async ({ page }) => {
  // 1. Ir al sitio principal
  await page.goto('https://byteboys-notifications.vercel.app/');
  // 2. Ingresar a la lista de microservicios
  await page.getByRole('button', { name: 'INGRESAR' }).click();
  // 3. Seleccionar el microservicio "Solicitud de Servicio"
  await page.getByRole('button', { name: 'Ver Solicitudes' }).click();
  // Completar el formulario de solicitud de servicio
  // 4. Datos del cliente
  await page.locator('#telefonoCliente').fill('59178197642');
  await page.locator('#nombreCliente').fill('Juan Perez');
  await page.locator('#descripcion').fill('Reparación de lavadora');
  // 5. Datos del fixer
  // Nombre del fixer
  const nombreFixerInput = page.locator('input[placeholder*="Carlos López"]');
  const nombreFixerButton = nombreFixerInput.locator('xpath=..').locator('button');
  await nombreFixerButton.click();
  await expect(nombreFixerInput).toBeEnabled();
  await nombreFixerInput.fill('Carlos Mamani');
  // Profesión del fixer
  const profesionFixerInput = page.locator('input[placeholder*="Técnico en electrónica"]');
  const profesionFixerButton = profesionFixerInput.locator('xpath=..').locator('button');
  await profesionFixerButton.click();
  await expect(profesionFixerInput).toBeEnabled();
  await profesionFixerInput.fill('Electrodomésticos');
  // Teléfono Fixer
  // Localizar input del FIXER por su valor actual (el precargado)
  const telefonoFixerInput = page.locator('input[value="59169542509"]');
  const telefonoFixerContainer = telefonoFixerInput.locator('..');
  const telefonoFixerButton = telefonoFixerContainer.locator('button');
  await telefonoFixerButton.click();
  await expect(telefonoFixerInput).not.toHaveAttribute('disabled', '');
  await telefonoFixerInput.fill('59176486581');
  // 6. Enviar notificación
  await page.getByRole('button', { name: 'Solicitar' }).click();
  const estadoCompletado = page.locator('span', { hasText: 'Fallido' });
  // 7. Se muestra el estado "Completado" indicando que la notificación fue enviada.
  await expect(estadoCompletado.first()).toBeVisible({
    timeout: 8000,
  });
  await page.waitForTimeout(4000);
  });
