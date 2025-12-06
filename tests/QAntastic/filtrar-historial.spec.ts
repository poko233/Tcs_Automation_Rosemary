// Ver Historial de Transacciones con Filtros - Multi-navegador
// QA a cargo: Dieter Olmos Alvarado

import { test, expect } from '@playwright/test';

test.describe('TC - Ver Historial de Transacciones con Filtros', () => {
  test('Flujo completo: Login hasta aplicar filtros de fecha', async ({ page, browserName }) => {
    // Aumentar el timeout del test a 90 segundos
    test.setTimeout(90000);
    
    console.log(`🚀 [${browserName.toUpperCase()}] Iniciando test case: Ver Historial con Filtros`);

    // Paso 1: Navegar a la página principal
    console.log(`📍 [${browserName.toUpperCase()}] Paso 1: Navegando a https://servineo-frontend-blush.vercel.app/es`);
    await page.goto('https://servineo-frontend-blush.vercel.app/es');
    console.log(`✅ [${browserName.toUpperCase()}] Página cargada correctamente`);
    await page.waitForTimeout(1000);

    // Paso 2: Cerrar modal de bienvenida
    console.log(`📍 [${browserName.toUpperCase()}] Paso 2: Cerrando modal de bienvenida`);
    await page.getByRole('button', { name: 'No, gracias' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Modal de bienvenida cerrado`);
    await page.waitForTimeout(1000);

    // Paso 3: Click en "Iniciar Sesión"
    console.log(`📍 [${browserName.toUpperCase()}] Paso 3: Click en "Iniciar Sesión"`);
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Modal de login abierto`);
    await page.waitForTimeout(1000);

    // Paso 4: Ingresar email
    console.log(`📍 [${browserName.toUpperCase()}] Paso 4: Ingresando email`);
    await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su correo electrónico' }).fill('sadas9051@gmail.com');
    console.log(`✅ [${browserName.toUpperCase()}] Email ingresado: sadas9051@gmail.com`);
    await page.waitForTimeout(1000);

    // Paso 5: Ingresar contraseña
    console.log(`📍 [${browserName.toUpperCase()}] Paso 5: Ingresando contraseña`);
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).click();
    await page.getByRole('textbox', { name: 'Ingrese su contraseña' }).fill('tatico12');
    console.log(`✅ [${browserName.toUpperCase()}] Contraseña ingresada`);
    await page.waitForTimeout(1000);

    // Paso 6: Click en botón "Iniciar Sesión" del formulario
    console.log(`📍 [${browserName.toUpperCase()}] Paso 6: Click en botón de login`);
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Login enviado`);
    await page.waitForTimeout(3000);

    // Screenshot después del login
    await page.screenshot({ 
      path: `test-results/${browserName}_paso6_login_exitoso.png`, 
      fullPage: true 
    });
    console.log(`📸 [${browserName.toUpperCase()}] Screenshot Paso 6 guardado`);
    await page.waitForTimeout(1000);

    // Paso 7: Click en botón de usuario
    console.log(`📍 [${browserName.toUpperCase()}] Paso 7: Click en botón de usuario`);
    await page.getByRole('button', { name: 'Cristian Mita Cristian Mita' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Menú de usuario abierto`);
    await page.waitForTimeout(1000);

    // Paso 8: Click en "Centro de Pagos"
    console.log(`📍 [${browserName.toUpperCase()}] Paso 8: Click en "Centro de Pagos"`);
    await page.getByRole('button', { name: 'Centro de Pagos' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Centro de Pagos abierto`);
    await page.waitForTimeout(1000);

    // Paso 9: Click en "Fixer Wallet"
    console.log(`📍 [${browserName.toUpperCase()}] Paso 9: Click en "Fixer Wallet"`);
    await page.getByRole('button', { name: 'Fixer Wallet Ver saldo,' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Fixer Wallet abierto`);
    await page.waitForTimeout(1000);

    // Screenshot después de abrir Fixer Wallet
    await page.screenshot({ 
      path: `test-results/${browserName}_paso9_fixer_wallet.png`, 
      fullPage: true 
    });
    console.log(`📸 [${browserName.toUpperCase()}] Screenshot Paso 9 guardado`);
    await page.waitForTimeout(1000);

    // Paso 10: Click en "Ver todo" (Ver Historial)
    console.log(`📍 [${browserName.toUpperCase()}] Paso 10: Click en "Ver todo"`);
    await page.getByRole('link', { name: 'Ver todo' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Historial de transacciones abierto`);
    await page.waitForTimeout(1000);

    // Screenshot después de abrir historial
    await page.screenshot({ 
      path: `test-results/${browserName}_paso10_historial_abierto.png`, 
      fullPage: true 
    });
    console.log(`📸 [${browserName.toUpperCase()}] Screenshot Paso 10 guardado`);
    await page.waitForTimeout(1000);

    // Paso 11: Click en "Añadir Filtro"
    console.log(`📍 [${browserName.toUpperCase()}] Paso 11: Click en "Añadir Filtro"`);
    await page.getByRole('button', { name: 'Añadir Filtro' }).click();
    console.log(`✅ [${browserName.toUpperCase()}] Modal de filtros abierto`);
    await page.waitForTimeout(1000);

    // Screenshot después de abrir modal de filtros
    await page.screenshot({ 
      path: `test-results/${browserName}_paso11_modal_filtros.png`, 
      fullPage: true 
    });
    console.log(`📸 [${browserName.toUpperCase()}] Screenshot Paso 11 guardado`);
    await page.waitForTimeout(1000);

    // Paso 12: Ingresar fecha DESDE (primer campo)
    console.log(`📍 [${browserName.toUpperCase()}] Paso 12: Ingresando fecha DESDE`);
    await page.getByRole('textbox', { name: 'MM/DD/YYYY' }).first().click();
    await page.getByRole('textbox', { name: 'MM/DD/YYYY' }).first().fill('12/06/2025');
    console.log(`✅ [${browserName.toUpperCase()}] Fecha DESDE ingresada: 12/06/2025`);
    await page.waitForTimeout(1000);

    // Paso 13: Ingresar fecha HASTA (segundo campo)
    console.log(`📍 [${browserName.toUpperCase()}] Paso 13: Ingresando fecha HASTA`);
    await page.getByRole('textbox', { name: 'MM/DD/YYYY' }).nth(1).click();
    await page.getByRole('textbox', { name: 'MM/DD/YYYY' }).nth(1).fill('12/06/2025');
    console.log(`✅ [${browserName.toUpperCase()}] Fecha HASTA ingresada: 12/06/2025`);
    await page.waitForTimeout(1000);

    // Screenshot con fechas ingresadas
    await page.screenshot({ 
      path: `test-results/${browserName}_paso13_fechas_ingresadas.png`, 
      fullPage: true 
    });
    console.log(`📸 [${browserName.toUpperCase()}] Screenshot Paso 13 guardado`);
    await page.waitForTimeout(1000);

    // Paso 14: Click en "Añadir Filtro" para aplicar
    console.log(`📍 [${browserName.toUpperCase()}] Paso 14: Click en "Añadir Filtro" para aplicar`);
    await page.getByRole('button', { name: 'Añadir Filtro' }).nth(1).click();
    console.log(`✅ [${browserName.toUpperCase()}] Filtros aplicados correctamente`);
    await page.waitForTimeout(1000);

    // Screenshot final con filtros aplicados
    await page.screenshot({ 
      path: `test-results/${browserName}_paso14_filtros_aplicados.png`, 
      fullPage: true 
    });
    console.log(`📸 [${browserName.toUpperCase()}] Screenshot Paso 14 guardado`);
    await page.waitForTimeout(1000);

    // Paso 15: Deslizar hacia abajo suavemente (MÁS LENTO)
    console.log(`📍 [${browserName.toUpperCase()}] Paso 15: Deslizando hacia abajo (scroll lento)`);
    
    // Obtener la altura total de la página
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`📏 [${browserName.toUpperCase()}] Altura total de la página: ${scrollHeight}px`);
    
    // Scroll gradual hacia abajo (más lento y suave)
    const scrollSteps = 5; // Número de pasos para el scroll
    const stepSize = scrollHeight / scrollSteps;
    
    for (let i = 1; i <= scrollSteps; i++) {
      await page.evaluate((scrollTo) => {
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      }, stepSize * i);
      
      console.log(`   ↓ [${browserName.toUpperCase()}] Scroll paso ${i}/${scrollSteps} (${Math.round((stepSize * i))}px)`);
      await page.waitForTimeout(1000); // 1 segundo entre cada paso de scroll
    }
    
    // Screenshot final después del scroll completo
    await page.screenshot({ 
      path: `test-results/${browserName}_paso15_scroll_completo.png`, 
      fullPage: true 
    });
    console.log(`📸 [${browserName.toUpperCase()}] Screenshot scroll completo guardado`);
    console.log(`✅ [${browserName.toUpperCase()}] Scroll hacia abajo completado (scroll lento y gradual)`);

    console.log(`🎉 [${browserName.toUpperCase()}] ¡Test completado exitosamente!`);
    
    // Pausa final para observar
    await page.waitForTimeout(3000);
  });
});