//Verificar la grafica de ingresos
// QA a cargo: Gabriel Mamani Guzman
import { test, expect } from '@playwright/test';

test.describe('Validación de monto máximo en Fixer Wallet', () => {
  test('Verificar que campo de monto no permita más de 4 dígitos', async ({ page }) => {
    // Aumentar el timeout del test a 60 segundos
    test.setTimeout(60000);
    
    console.log('Iniciando test case: Validación de monto máximo');

    // Paso 1: Navegar a la página principal
    console.log('Paso 1: Navegando a https://servineo-frontend-blush.vercel.app/es');
    await page.goto('https://servineo-frontend-blush.vercel.app/es', { waitUntil: 'domcontentloaded' });
    console.log('Página cargada correctamente');

    // Paso 1.5: Cerrar modal de bienvenida
    console.log('Paso 1.5: Cerrando modal de bienvenida');
    try {
      const noGraciasButton = page.getByRole('button', { name: 'No, gracias' });
      await noGraciasButton.waitFor({ state: 'visible', timeout: 5000 });
      await noGraciasButton.click();
      console.log('Modal de bienvenida cerrado');
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log('ℹModal de bienvenida no apareció');
    }

    // Paso 2: Click en "Iniciar Sesión"
    console.log('Paso 2: Haciendo click en "Iniciar Sesión"');
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    console.log('Click en "Iniciar Sesión" realizado');

    // Esperar a que aparezca el modal de login
    await page.waitForTimeout(1000);
    console.log('Modal de login cargado');

    // Paso 3: Ingresar email
    console.log('Paso 3: Ingresando email');
    const emailInput = page.getByRole('textbox', { name: 'Ingrese su correo electrónico' });
    await expect(emailInput).toBeVisible({ timeout: 10000 });
    await emailInput.fill('sadas9051@gmail.com');
    console.log('Email ingresado: sadas9051@gmail.com');

    // Paso 4: Ingresar contraseña
    console.log('Paso 4: Ingresando contraseña');
    const passwordInput = page.getByRole('textbox', { name: 'Ingrese su contraseña' });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('tatico12');
    console.log('Contraseña ingresada');

    // Paso 5: Click en botón "Iniciar Sesión" del formulario
    console.log('Paso 5: Haciendo click en botón de login');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    console.log('Click en botón de login realizado');

    // Esperar a que cargue la página después del login
    console.log('Esperando que cargue la página después del login...');
    await page.waitForTimeout(3000);
    console.log('Sesión iniciada correctamente');

    // Paso 6: Click en botón de usuario
    console.log('Paso 6: Haciendo click en botón de usuario');
    await page.getByRole('button', { name: 'Cristian Mita Cristian Mita' }).click();
    console.log('Click en botón de usuario realizado');

    // Esperar a que aparezca el menú
    await page.waitForTimeout(500);

    // Paso 7: Click en "Centro de Pagos"
    console.log('Paso 7: Haciendo click en "Centro de Pagos"');
    await page.getByRole('button', { name: 'Centro de Pagos' }).click();
    console.log('Click en "Centro de Pagos" realizado');

    // Esperar a que cargue la página
    await page.waitForTimeout(1500);

    // Paso 8: Click en "Fixer Wallet"
    console.log('Paso 8: Haciendo click en "Fixer Wallet"');
    await page.getByRole('button', { name: 'Fixer Wallet Ver saldo,' }).click();
    console.log('Click en "Fixer Wallet" realizado');

    // Esperar a que cargue la página
    await page.waitForTimeout(1500);

    // Paso 9: Click en "Recargar Saldo"
    console.log('Paso 9: Haciendo click en "Recargar Saldo"');
    await page.getByRole('link', { name: 'Recargar Saldo' }).click();
    console.log('Click en "Recargar Saldo" realizado');

    // Esperar a que cargue el formulario
    await page.waitForTimeout(1500);

    // Paso 10: Ingresar 5 dígitos en el campo de monto
    console.log('Paso 10: Ingresando 5 dígitos en el campo de monto');
    const montoInput = page.getByRole('textbox', { name: '0.00' });
    await expect(montoInput).toBeVisible({ timeout: 10000 });
    
    // Limpiar el campo primero
    await montoInput.clear();
    console.log('Campo de monto limpiado');
    
    // Ingresar 5 dígitos
    await montoInput.fill('55555');
    console.log('5 dígitos ingresados: 55555');

    // Hacer click fuera del input o presionar Tab para activar la validación
    await montoInput.press('Tab');
    
    // Esperar un momento para que se muestre el mensaje de error
    await page.waitForTimeout(1000);

    // Paso 11: Verificar que aparece el mensaje de error
    console.log('Paso 11: Verificando mensaje de error');
    
    // Buscar el mensaje de error con diferentes estrategias
    const errorMessage = page.locator('p.text-red-500').filter({ hasText: 'máximo permitido es de 4 dígitos' });
    
    // Verificar que el mensaje de error es visible
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    console.log('Mensaje de error visible correctamente');

    // Obtener el texto del mensaje para confirmar
    const errorText = await errorMessage.textContent();
    console.log(`Texto del mensaje de error: "${errorText}"`);

    // Verificación final
    expect(errorText).toContain('máximo permitido es de 4 dígitos');
    console.log('TEST CASE PASADO: La validación de 4 dígitos funciona correctamente');

    // Screenshot final para evidencia
    await page.screenshot({ 
      path: 'test-results/evidencia-validacion-monto-maximo.png', 
      fullPage: true 
    });
    console.log('Screenshot guardado como evidencia en test-results/');

    console.log('¡Test completado exitosamente!');
  });
});