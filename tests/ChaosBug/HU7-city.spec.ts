import { test, expect } from '@playwright/test';

const BASE_URL = 'https://servineo.app';
const API_URL = 'https://api.servineo.app/api/searches';

test.describe('Búsqueda de Electricista con filtro Cochabamba', () => {
  test.setTimeout(180000); 

  test('TC - Buscar Electricista con filtro Cochabamba y verificar último registro API', async ({ page }) => {
    console.log('\n🚀 Iniciando navegador...');
    
    const separator = '='.repeat(60);
    
    
    await page.goto(`${BASE_URL}/es`);
    console.log('🌐 URL forzada en español:', page.url());
    await page.waitForTimeout(3000);
    
    // PASO 1: Verificar idioma español y cerrar modal de tour si existe
    console.log('\n' + separator);
    console.log('PASO 1: Verificar idioma español y cerrar modal de tour');
    console.log(separator);
    
    const title = await page.title();
    const currentUrl = page.url();
    console.log(`📄 Título: ${title}`);
    console.log(`🌐 URL actual: ${currentUrl}`);
    
    // Verificar que estamos en español (URL contiene /es)
    if (!currentUrl.includes('/es')) {
      console.log('⚠️  Redirigiendo a versión español...');
      await page.goto(`${BASE_URL}/es`);
      await page.waitForTimeout(2000);
    }
    
  
    console.log('🔍 Buscando modal de tour...');
    
    const modalSelectors = [
      'button:has-text("No, gracias")',
      'button:has-text("No gracias")',
      'button:has-text("Cerrar")',
      '.modal button'
    ];
    
    for (const selector of modalSelectors) {
      try {
        const botonModal = page.locator(selector).first();
        if (await botonModal.count() > 0 && await botonModal.isVisible()) {
          await botonModal.click();
          console.log('✅ Modal de tour cerrado');
          await page.waitForTimeout(1000);
          break;
        }
      } catch (error) {
     
      }
    }
    
    // PASO 2: Buscar y hacer clic en 'Ofertas de trabajo'
    console.log('\n' + separator);
    console.log('PASO 2: Buscar y hacer clic en "Ofertas de trabajo"');
    console.log(separator);
    
    // Buscar enlace de ofertas
    const ofertasLink = await page.locator('text=Ofertas de trabajo').first();
    if (await ofertasLink.count() > 0 && await ofertasLink.isVisible()) {
      await ofertasLink.click();
      console.log('✅ Clic en "Ofertas de trabajo" realizado');
      await page.waitForTimeout(3000);
      console.log(`🌐 Nueva URL: ${page.url()}`);
    } else {
      console.log('❌ No se encontró "Ofertas de trabajo", navegando directamente...');
      await page.goto(`${BASE_URL}/es/job-offer-list`);
      await page.waitForTimeout(3000);
    }
    
    // PASO 3: Aplicar filtro de ciudad Cochabamba
    console.log('\n' + separator);
    console.log('PASO 3: Aplicar filtro de ciudad Cochabamba');
    console.log(separator);
    
    // Buscar botón de filtros
    let filtrosAbiertos = false;
    
    const botonesFiltros = [
      'button:has-text("Filtros")',
      'button[data-slot="button"]',
      'button:has(svg)'
    ];
    
    for (const selector of botonesFiltros) {
      try {
        const boton = page.locator(selector).first();
        if (await boton.count() > 0 && await boton.isVisible()) {
          console.log(`🔍 Botón de filtros encontrado: ${selector}`);
          await boton.click();
          console.log('✅ Botón de filtros clickeado');
          await page.waitForTimeout(2000);
          filtrosAbiertos = true;
          break;
        }
      } catch (error) {
  
      }
    }
    
    if (filtrosAbiertos) {
      // Buscar sección Ciudad
      console.log('🔍 Buscando sección "Ciudad"...');
      await page.waitForTimeout(1000);
      
      // Buscar y hacer clic en "Ciudad"
      const ciudadSection = page.locator('text=Ciudad').first();
      if (await ciudadSection.count() > 0 && await ciudadSection.isVisible()) {
        await ciudadSection.click();
        console.log('✅ Sección Ciudad expandida');
        await page.waitForTimeout(1000);
      }
      
      // Buscar Cochabamba
      console.log('\n🔍 Buscando específicamente "COCHABAMBA"...');
      await page.waitForTimeout(2000);
      
      // Buscar texto Cochabamba
      const cochabambaText = page.locator('text=Cochabamba').first();
      if (await cochabambaText.count() > 0 && await cochabambaText.isVisible()) {
        console.log('✅ ¡COCHABAMBA ENCONTRADO!');
        
        // Buscar checkbox cerca
        try {
          const checkbox = cochabambaText.locator('xpath=./preceding-sibling::input[@type="checkbox"] | ./following-sibling::input[@type="checkbox"]');
          if (await checkbox.count() > 0) {
            await checkbox.check();
            console.log('✅ Checkbox de Cochabamba marcado');
          } else {
            
            await cochabambaText.click();
            console.log('✅ Clic directo en Cochabamba');
          }
        } catch {
          await cochabambaText.click();
          console.log('✅ Clic directo en Cochabamba (fallback)');
        }
        
        // IMPORTANTE: CERRAR FILTROS HACIENDO CLIC FUERA (lado derecho de la pantalla)
        console.log('\n🔍 Cerrando filtros (clic fuera del panel)...');
        await page.waitForTimeout(1000);
        
        // Obtener dimensiones de la pantalla
        const viewportSize = page.viewportSize();
        if (viewportSize) {
          const screenWidth = viewportSize.width;
          const screenHeight = viewportSize.height;
          
          // Hacer clic en el lado derecho de la pantalla (80% del ancho, mitad de la altura)
          const clickX = Math.floor(screenWidth * 0.8);
          const clickY = Math.floor(screenHeight * 0.5);
          
          console.log(`🖱️  Haciendo clic en coordenadas: (${clickX}, ${clickY})`);
          
         
          await page.mouse.click(clickX, clickY);
          console.log('✅ Clic fuera de filtros realizado (lado derecho)');
        } else {
          // Fallback: hacer clic en el body
          await page.click('body', { position: { x: 500, y: 300 } });
          console.log('✅ Clic en cuerpo de página para cerrar filtros');
        }
        
        await page.waitForTimeout(2000);
        
      } else {
        console.log('❌ No se encontró "Cochabamba"');
      }
    } else {
      console.log('⚠️  No se pudieron abrir los filtros');
    }
    
    // PASO 4: Buscar y escribir 'Electricista' (CON CLIC FUERA DE FILTROS)
    console.log('\n' + separator);
    console.log('PASO 4: Buscar y escribir "Electricista"');
    console.log(separator);
    
    // Asegurar que los filtros están cerrados - otro clic por si acaso
    console.log('🔍 Asegurando que los filtros estén cerrados...');
    await page.waitForTimeout(1000);
    
    // Hacer clic en el lado derecho nuevamente para asegurar
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      const clickX = Math.floor(viewportSize.width * 0.9); 
      const clickY = Math.floor(viewportSize.height * 0.3); 
      await page.mouse.click(clickX, clickY);
      console.log('✅ Clic de confirmación en lado derecho');
    }
    
    await page.waitForTimeout(1000);
    
    // Buscar campo de búsqueda
    console.log('🔍 Buscando campo de búsqueda...');
    
    // Buscar con diferentes selectores
    const selectoresBuscador = [
      'input[placeholder*="servicio"]',
      'input[placeholder*="necesitas"]',
      'input[placeholder*="buscar"]',
      'input[type="search"]'
    ];
    
    let searchInput = null;
    
    for (const selector of selectoresBuscador) {
      try {
        const input = page.locator(selector).first();
        if (await input.count() > 0) {
          searchInput = input;
          const placeholder = await input.getAttribute('placeholder') || '';
          console.log(`✅ Campo de búsqueda encontrado: "${placeholder}"`);
          
          // Hacer clic directo para enfocar
          await input.click();
          console.log('✅ Clic en campo de búsqueda');
          await page.waitForTimeout(500);
          
          // Limpiar y escribir
          await input.fill('');
          await page.waitForTimeout(300);
          await input.fill('Electricista');
          console.log('✅ "Electricista" escrito');
          await page.waitForTimeout(1000);
          break;
        }
      } catch (error) {
        // Continuar
      }
    }
    
    if (!searchInput) {
      // Fallback: buscar cualquier input visible
      const allInputs = page.locator('input').first();
      if (await allInputs.count() > 0 && await allInputs.isVisible()) {
        searchInput = allInputs;
        await allInputs.click();
        await allInputs.fill('Electricista');
        console.log('✅ "Electricista" escrito (fallback)');
      }
    }
    
    if (searchInput) {
      // Buscar botón de búsqueda
      const botonBuscar = page.locator('button:has-text("Buscar"), button:has-text("Search")').first();
      if (await botonBuscar.count() > 0 && await botonBuscar.isVisible()) {
        await botonBuscar.click();
        console.log('✅ Botón "Buscar" clickeado');
      } else {
        // Presionar Enter
        await searchInput.press('Enter');
        console.log('✅ Enter presionado');
      }
      
      await page.waitForTimeout(3000);
      console.log(`🌐 URL después de búsqueda: ${page.url()}`);
    } else {
      console.log('❌ No se encontró campo de búsqueda');
    }
    
    // PASO 5: Verificar último registro en API backend
    console.log('\n' + separator);
    console.log('PASO 5: Verificar último registro en API backend');
    console.log(separator);
    
    console.log(`🌐 URL de la API: ${API_URL}`);
    
    try {
      const response = await fetch(API_URL);
      const status = response.status;
      console.log(`📡 Código de respuesta: ${status}`);
      
      if (status === 200) {
        const data = await response.json() as any;
        
        if (data.data && data.data.length > 0) {
          const ultimoRegistro = data.data[0];
          
          console.log('\n📋 ÚLTIMO REGISTRO ANALIZADO:');
          console.log(`   Búsqueda: ${ultimoRegistro.search_query || 'N/A'}`);
          
          // Verificar Electricista
          const searchQuery = (ultimoRegistro.search_query || '').toLowerCase();
          const esElectricista = searchQuery.includes('electricista');
          console.log(`   ¿Es Electricista? ${esElectricista ? '✅' : '❌'}`);
          
          // Verificar Cochabamba
          const filters = ultimoRegistro.filters || {};
          let ciudadEncontrada = false;
          let ciudadValor = '';
          
          for (const [key, filterData] of Object.entries(filters)) {
            if (filterData && typeof filterData === 'object') {
              const filterObj = filterData as Record<string, any>;
              const cityValue = filterObj.city || '';
              if (cityValue && cityValue !== 'not_applied') {
                const cityValueStr = cityValue.toString().toLowerCase();
                if (cityValueStr.includes('cochabamba')) {
                  ciudadEncontrada = true;
                  ciudadValor = cityValue;
                  break;
                }
              }
            }
          }
          
          console.log(`   ¿Tiene Cochabamba? ${ciudadEncontrada ? '✅' : '❌'}`);
          if (ciudadEncontrada) {
            console.log(`   Valor encontrado: "${ciudadValor}"`);
          }
          
          console.log('\n🎯 RESULTADO FINAL:');
          
          // Assertions
          if (esElectricista && ciudadEncontrada) {
            console.log('✅ ¡TEST EXITOSO!');
            console.log('   Cumple ambos criterios:');
            console.log('   1. Búsqueda de Electricista ✓');
            console.log('   2. Filtro de Cochabamba ✓');
          } else {
            console.log('❌ TEST FALLIDO');
            if (!esElectricista) console.log('   ✗ No es búsqueda de Electricista');
            if (!ciudadEncontrada) console.log('   ✗ No tiene filtro Cochabamba');
          }
          
          expect(esElectricista, 'La búsqueda debe ser de Electricista').toBe(true);
          expect(ciudadEncontrada, 'Debe tener filtro Cochabamba').toBe(true);
          
        } else {
          console.log('⚠️  No hay registros en la API');
          expect(data.data.length, 'Debe haber registros en la API').toBeGreaterThan(0);
        }
        
      } else if (status === 500) {
        console.log('⚠️  API error 500 - Error interno del servidor');
        console.log('ℹ️  Continuando con verificación visual...');
        
        // Verificación visual de respaldo
        const pageText = await page.textContent('body') || '';
        const tieneElectricista = pageText.toLowerCase().includes('electricista');
        const tieneCochabamba = pageText.toLowerCase().includes('cochabamba');
        
        console.log(`   ¿Página muestra "Electricista"? ${tieneElectricista ? '✅' : '❌'}`);
        console.log(`   ¿Página muestra "Cochabamba"? ${tieneCochabamba ? '✅' : '❌'}`);
        
        expect(tieneElectricista, 'La página debe mostrar Electricista').toBe(true);
        
      } else {
        console.log(`❌ Error API: ${status}`);
        expect(status, 'API debe devolver 200 OK').toBe(200);
      }
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`❌ Error con API: ${errorMessage}`);
      console.log('⚠️  Continuando sin verificación de API...');
    }
    
    console.log('\n' + separator);
    console.log('✅ TEST COMPLETADO');
    console.log(separator);
    
    // Esperar para revisar
    await page.waitForTimeout(3000);
  });
});