//Verificar descarga de la Factura en PDF
// QA a cargo: Jair Pedrazas ramos
import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Descarga de factura en PDF', () => {
  test('Verificar que se puede descargar una factura en formato PDF', async ({ page }) => {
    // Aumentar el timeout del test a 60 segundos
    test.setTimeout(60000);
    
    console.log('🚀 Iniciando test case: Descarga de factura en PDF');

    // Paso 1: Navegar a la página principal
    console.log('📍 Paso 1: Navegando a https://servineo-frontend-blush.vercel.app/es');
    await page.goto('https://servineo-frontend-blush.vercel.app/es', { waitUntil: 'domcontentloaded' });
    console.log('✅ Página cargada correctamente');

    // Paso 1.5: Cerrar modal de bienvenida
    console.log('📍 Paso 1.5: Cerrando modal de bienvenida');
    try {
      const noGraciasButton = page.getByRole('button', { name: 'No, gracias' });
      await noGraciasButton.waitFor({ state: 'visible', timeout: 5000 });
      await noGraciasButton.click();
      console.log('✅ Modal de bienvenida cerrado');
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log('ℹ️ Modal de bienvenida no apareció');
    }

    // Paso 2: Click en "Iniciar Sesión"
    console.log('📍 Paso 2: Haciendo click en "Iniciar Sesión"');
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    console.log('✅ Click en "Iniciar Sesión" realizado');

    // Esperar a que aparezca el modal de login
    await page.waitForTimeout(1000);
    console.log('⏳ Modal de login cargado');

    // Paso 3: Ingresar email
    console.log('📍 Paso 3: Ingresando email');
    const emailInput = page.getByRole('textbox', { name: 'Ingrese su correo electrónico' });
    await expect(emailInput).toBeVisible({ timeout: 10000 });
    await emailInput.fill('sadas9051@gmail.com');
    console.log('✅ Email ingresado: sadas9051@gmail.com');

    // Paso 4: Ingresar contraseña
    console.log('📍 Paso 4: Ingresando contraseña');
    const passwordInput = page.getByRole('textbox', { name: 'Ingrese su contraseña' });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('tatico12');
    console.log('✅ Contraseña ingresada');

    // Paso 5: Click en botón "Iniciar Sesión" del formulario
    console.log('📍 Paso 5: Haciendo click en botón de login');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    console.log('✅ Click en botón de login realizado');

    // Esperar a que cargue la página después del login
    console.log('⏳ Esperando que cargue la página después del login...');
    await page.waitForTimeout(3000);
    console.log('✅ Sesión iniciada correctamente');

    // Paso 6: Click en botón de usuario
    console.log('📍 Paso 6: Haciendo click en botón de usuario');
    await page.getByRole('button', { name: 'Cristian Mita Cristian Mita' }).click();
    console.log('✅ Click en botón de usuario realizado');

    // Esperar a que aparezca el menú
    await page.waitForTimeout(500);

    // Paso 7: Click en "Centro de Pagos"
    console.log('📍 Paso 7: Haciendo click en "Centro de Pagos"');
    await page.getByRole('button', { name: 'Centro de Pagos' }).click();
    console.log('✅ Click en "Centro de Pagos" realizado');

    // Esperar a que cargue la página
    await page.waitForTimeout(1500);

    // Paso 8: Click en "Mis Facturas"
    console.log('📍 Paso 8: Haciendo click en "Mis Facturas"');
    await page.getByRole('button', { name: 'Mis Facturas' }).click();
    console.log('✅ Click en "Mis Facturas" realizado');

    // Esperar a que cargue la lista de facturas
    await page.waitForTimeout(1500);

    // Paso 9: Click en la factura específica (TXN-AUTO-FINAL)
    console.log('📍 Paso 9: Buscando y haciendo click en la factura con ID: TXN-AUTO-FINAL');
    
    // Buscar el botón de la factura que contiene el ID específico
    const facturaButton = page.locator('button:has-text("TXN-AUTO-FINAL")').first();
    
    // Verificar que la factura existe
    await expect(facturaButton).toBeVisible({ timeout: 10000 });
    console.log('✅ Factura encontrada');
    
    // Click en la factura
    await facturaButton.click();
    console.log('✅ Click en factura realizado');

    // Esperar a que cargue el detalle de la factura
    await page.waitForTimeout(2000);
    console.log('⏳ Detalle de factura cargado');

    // Paso 10: Configurar la espera de la descarga y hacer click en "Descargar PDF"
    console.log('📍 Paso 10: Preparando descarga del PDF');
    
    // Configurar la promesa de descarga antes de hacer click
    const downloadPromise = page.waitForEvent('download');
    
    // Buscar y hacer click en el botón "Descargar PDF"
    const descargarButton = page.locator('button:has-text("Descargar PDF")').first();
    await expect(descargarButton).toBeVisible({ timeout: 10000 });
    console.log('✅ Botón "Descargar PDF" encontrado');
    
    await descargarButton.click();
    console.log('✅ Click en "Descargar PDF" realizado');

    // Paso 11: Esperar y validar la descarga
    console.log('📍 Paso 11: Esperando que se complete la descarga...');
    
    const download = await downloadPromise;
    console.log('✅ Descarga iniciada');
    
    // Obtener el nombre del archivo
    const fileName = download.suggestedFilename();
    console.log(`📄 Nombre del archivo: ${fileName}`);
    
    // Guardar el archivo en una ubicación específica
    const downloadPath = path.join('test-results', 'downloads', fileName);
    await download.saveAs(downloadPath);
    console.log(`💾 Archivo guardado en: ${downloadPath}`);

    // Verificaciones
    expect(fileName).toContain('.pdf');
    console.log('✅ Verificación: El archivo es un PDF');
    
    expect(fileName.length).toBeGreaterThan(0);
    console.log('✅ Verificación: El nombre del archivo es válido');

    // Screenshot final para evidencia
    await page.screenshot({ 
      path: 'test-results/evidencia-descarga-factura-pdf.png', 
      fullPage: true 
    });
    console.log('📸 Screenshot guardado como evidencia en test-results/');

    console.log('✅ TEST CASE PASADO: La descarga de factura en PDF funciona correctamente');
    console.log('🎉 ¡Test completado exitosamente!');
  });
});
