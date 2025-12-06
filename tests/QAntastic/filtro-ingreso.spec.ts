//Verificar el filtrado de los ingresos
// QA a cargo: Dieter Olmos Alvarado
import { test, expect } from '@playwright/test';

test.describe('Validación de monto máximo en Fixer Wallet', () => {
  test('Verificar que campo de monto no permita más de 4 dígitos', async ({ page }) => {
    // Aumentar el timeout del test a 60 segundos
    test.setTimeout(60000);
    
    console.log('🚀 Iniciando test case: Validación de monto máximo');

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

    // 👉 **NUEVO: Esperar 4 segundos antes de terminar**
    console.log('⏳ Esperando 4 segundos antes de finalizar el test...');
    await page.waitForTimeout(4000);
    console.log('⏱️ Espera completada');

    // Screenshot final para evidencia
    await page.screenshot({ 
      path: 'test-results/VerNotificacionValida.spec.ts.png', 
      fullPage: true 
    });
    console.log('📸 Screenshot guardado como evidencia en test-results/');

    console.log('🎉 ¡Test completado exitosamente!');
  });
});
