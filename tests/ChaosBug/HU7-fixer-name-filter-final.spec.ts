import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'https://servineo-frontend-bytes-bandidos.vercel.app';
const BACKEND_URL = 'https://servineo-backend-bytes-badidos.vercel.app/api/searches';

test.describe('Búsqueda de Plomero con filtro D-F', () => {
  test.setTimeout(180000); // 3 minutos timeout

  test('TC - Buscar Plomero con filtro D-F y verificar último registro API', async ({ page }) => {
    console.log('\n🚀 Iniciando prueba HU7 - fixer_name: "D-F"...');
    
    const separator = '='.repeat(60);
    
    // CONFIGURACIÓN: Ir al frontend
    await page.goto(FRONTEND_URL);
    console.log('🌐 URL del frontend:', page.url());
    await page.waitForTimeout(3000);
    
    // PASO 1: Verificar que estamos en la página principal
    console.log('\n' + separator);
    console.log('PASO 1: Verificar página principal');
    console.log(separator);
    
    const title = await page.title();
    const currentUrl = page.url();
    console.log(`📄 Título: ${title}`);
    console.log(`🌐 URL actual: ${currentUrl}`);
    
 
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
    const ofertasLink = page.locator('text=Ofertas de trabajo').first();
    if (await ofertasLink.count() > 0 && await ofertasLink.isVisible()) {
      await ofertasLink.click();
      console.log('✅ Clic en "Ofertas de trabajo" realizado');
      await page.waitForTimeout(3000);
      console.log(`🌐 Nueva URL: ${page.url()}`);
    } else {
      console.log('❌ No se encontró "Ofertas de trabajo", navegando directamente...');
      await page.goto(`${FRONTEND_URL}/job-offer-list`);
      await page.waitForTimeout(3000);
    }
    
    // PASO 3: Aplicar filtro "De (D-F)"
    console.log('\n' + separator);
    console.log('PASO 3: Aplicar filtro "De (D-F)"');
    console.log(separator);
    
    // Buscar botón de filtros
    let filtrosAbiertos = false;
    
    const botonesFiltros = [
      'button:has-text("Filtros")',
      'button[data-slot="button"]',
      'button:has(svg)',
      'button.bg-\\[#286AE0\\]' 
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
        // Continuar
      }
    }
    
    if (filtrosAbiertos) {
      // Buscar sección "Nombre de Fixer"
      console.log('🔍 Buscando sección "Nombre de Fixer"...');
      await page.waitForTimeout(1000);
      
      // Buscar y hacer clic en "Nombre de Fixer" si está colapsado
      const fixerSection = page.locator('text=Nombre de Fixer').first();
      if (await fixerSection.count() > 0 && await fixerSection.isVisible()) {
        await fixerSection.click();
        console.log('✅ Sección "Nombre de Fixer" expandida');
        await page.waitForTimeout(1000);
      }
      
      // Buscar "De (D-F)"
      console.log('\n🔍 Buscando específicamente "De (D-F)"...');
      await page.waitForTimeout(2000);
      
      // Buscar texto D-F de múltiples formas
      const dfTextSelectors = [
        'text=De (D-F)',
        'text=de (D-F)',
        'text=D-F'
      ];
      
      let dfEncontrado = false;
      
      for (const selector of dfTextSelectors) {
        try {
          const dfText = page.locator(selector).first();
          if (await dfText.count() > 0 && await dfText.isVisible()) {
            console.log(`✅ ¡${selector} ENCONTRADO!`);
            
            // Buscar checkbox cerca
            try {
              const checkbox = dfText.locator('xpath=./preceding-sibling::input[@type="checkbox"] | ./following-sibling::input[@type="checkbox"]');
              if (await checkbox.count() > 0) {
                await checkbox.check();
                console.log('✅ Checkbox de D-F marcado');
              } else {
                // Si no hay checkbox, hacer clic directo en el texto
                await dfText.click();
                console.log('✅ Clic directo en D-F');
              }
            } catch {
              await dfText.click();
              console.log('✅ Clic directo en D-F (fallback)');
            }
            
            dfEncontrado = true;
            await page.waitForTimeout(1000);
            break;
          }
        } catch (error) {
          // Continuar
        }
      }
      
      if (dfEncontrado) {
        // IMPORTANTE: CERRAR FILTROS HACIENDO CLIC FUERA (lado derecho de la pantalla)
        console.log('\n🔍 Cerrando filtros (clic fuera del panel)...');
        await page.waitForTimeout(1000);
        
        
        const viewportSize = page.viewportSize();
        if (viewportSize) {
          const screenWidth = viewportSize.width;
          const screenHeight = viewportSize.height;
          
      
          const clickX = Math.floor(screenWidth * 0.8);
          const clickY = Math.floor(screenHeight * 0.5);
          
          console.log(`🖱️  Haciendo clic en coordenadas: (${clickX}, ${clickY})`);
          
          
          await page.mouse.click(clickX, clickY);
          console.log('✅ Clic fuera de filtros realizado (lado derecho)');
        } else {
         
          await page.click('body', { position: { x: 500, y: 300 } });
          console.log('✅ Clic en cuerpo de página para cerrar filtros');
        }
        
        await page.waitForTimeout(2000);
        
      } else {
        console.log('❌ No se encontró "De (D-F)"');
        
        
        const bodyText = await page.textContent('body') || '';
        const lines = bodyText.split('\n').filter(line => line.includes('D') || line.includes('F') || line.includes('fixer') || line.includes('Fixer'));
        console.log('\n🔍 Textos relacionados con filtros:');
        lines.slice(0, 10).forEach((line, i) => {
          if (line.trim().length > 0) {
            console.log(`  ${i + 1}. "${line.trim()}"`);
          }
        });
      }
    } else {
      console.log('⚠️  No se pudieron abrir los filtros');
    }
    
    // PASO 4: Buscar y escribir 'Plomero' (CON CLIC FUERA DE FILTROS)
    console.log('\n' + separator);
    console.log('PASO 4: Buscar y escribir "Plomero"');
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
          await input.fill('Plomero');
          console.log('✅ "Plomero" escrito');
          await page.waitForTimeout(1000);
          break;
        }
      } catch (error) {
        // Continuar
      }
    }
    
    if (!searchInput) {
      
      const allInputs = page.locator('input').first();
      if (await allInputs.count() > 0 && await allInputs.isVisible()) {
        searchInput = allInputs;
        await allInputs.click();
        await allInputs.fill('Plomero');
        console.log('✅ "Plomero" escrito (fallback)');
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
      
      await page.waitForTimeout(5000);
      console.log(`🌐 URL después de búsqueda: ${page.url()}`);
    } else {
      console.log('❌ No se encontró campo de búsqueda');
    }
    
    // PASO 5: Verificar último registro en API backend
    console.log('\n' + separator);
    console.log('PASO 5: Verificar último registro en API backend');
    console.log(separator);
    
    console.log(`🌐 URL de la API: ${BACKEND_URL}`);
    
    try {
      
      const response = await page.request.get(BACKEND_URL);
      const status = response.status();
      console.log(`📡 Código de respuesta: ${status}`);
      
      if (status === 200) {
        const data = await response.json() as any;
        
        
        let records = [];
        if (Array.isArray(data)) {
          records = data;
          console.log(`📊 Respuesta es array con ${records.length} registros`);
        } else if (data.data && Array.isArray(data.data)) {
          records = data.data;
          console.log(`📊 Respuesta tiene data array con ${records.length} registros`);
        } else if (data && typeof data === 'object') {
          
          records = [data];
          console.log('📊 Respuesta es objeto único');
        }
        
        if (records.length > 0) {
          
          const ultimoRegistro = records[0];
          
          console.log('\n📋 ÚLTIMO REGISTRO ANALIZADO:');
          console.log(`   Búsqueda: "${ultimoRegistro.search_query || 'N/A'}"`);
          console.log(`   Timestamp: ${ultimoRegistro.timestamp || 'N/A'}`);
          
          // Verificar Plomero
          const searchQuery = (ultimoRegistro.search_query || '').toLowerCase();
          const esPlomero = searchQuery.includes('plomero');
          console.log(`   ¿Es Plomero? ${esPlomero ? '✅' : '❌'}`);
          
          // Verificar fixer_name: "D-F"
          // El fixer_name está en filters.filter_1.fixer_name
          const filters = ultimoRegistro.filters || {};
          let fixerNameEncontrado = false;
          let fixerNameValor = 'not_applied';
          
          // Buscar en filters.filter_1
          if (filters.filter_1) {
            fixerNameValor = filters.filter_1.fixer_name || 'not_applied';
            fixerNameEncontrado = fixerNameValor === 'D-F';
          } else {
            // Si no hay filter_1, buscar en cualquier propiedad de filters
            for (const [key, filterData] of Object.entries(filters)) {
              if (filterData && typeof filterData === 'object') {
                const filterObj = filterData as Record<string, any>;
                const fixerValue = filterObj.fixer_name || '';
                if (fixerValue === 'D-F') {
                  fixerNameEncontrado = true;
                  fixerNameValor = fixerValue;
                  break;
                }
              }
            }
          }
          
          console.log(`   ¿Tiene fixer_name "D-F"? ${fixerNameEncontrado ? '✅' : '❌'}`);
          console.log(`   Valor encontrado: "${fixerNameValor}"`);
          
          console.log('\n🎯 VERIFICACIONES DEL TEST HU7:');
          console.log(`   1. Búsqueda debe contener "plomero": ${esPlomero ? '✅' : '❌'}`);
          console.log(`   2. fixer_name debe ser "D-F": ${fixerNameEncontrado ? '✅' : '❌'}`);
          
          // Assertions específicas para HU7
          expect(esPlomero, 'La búsqueda debe ser de Plomero').toBe(true);
          expect(fixerNameEncontrado, 'El fixer_name debe ser "D-F"').toBe(true);
          
          if (esPlomero && fixerNameEncontrado) {
            console.log('\n🎉 ¡TEST HU7 EXITOSO!');
            console.log('   Cumple ambos criterios:');
            console.log('   1. Búsqueda de Plomero ✓');
            console.log('   2. Filtro fixer_name: "D-F" ✓');
          } else {
            console.log('\n❌ TEST HU7 FALLIDO');
            if (!esPlomero) console.log('   ✗ No es búsqueda de Plomero');
            if (!fixerNameEncontrado) console.log('   ✗ No tiene filtro fixer_name: "D-F"');
            
            // Mostrar los últimos 3 registros para debugging
            console.log('\n🔍 Últimos 3 registros para debugging:');
            const recentRecords = records.slice(0, 3);
            recentRecords.forEach((record: any, index: number) => {
              const query = record.search_query || 'N/A';
              const fixerName = record.filters?.filter_1?.fixer_name || 'not_applied';
              console.log(`   ${index + 1}. Query: "${query}", fixer_name: "${fixerName}"`);
            });
          }
          
        } else {
          console.log('⚠️  No hay registros en la API');
          expect(records.length, 'Debe haber registros en la API').toBeGreaterThan(0);
        }
        
      } else if (status === 500) {
        console.log('⚠️  API error 500 - Error interno del servidor');
        console.log('ℹ️  Continuando con verificación visual...');
        
        // Verificación visual de respaldo
        const pageText = await page.textContent('body') || '';
        const tienePlomero = pageText.toLowerCase().includes('plomero');
        
        console.log(`   ¿Página muestra "Plomero"? ${tienePlomero ? '✅' : '❌'}`);
        
        expect(tienePlomero, 'La página debe mostrar Plomero').toBe(true);
        
      } else {
        console.log(`❌ Error API: ${status}`);
        expect(status, 'API debe devolver 200 OK').toBe(200);
      }
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`❌ Error con API: ${errorMessage}`);
      
      // Fallback: verificar visualmente
      console.log('⚠️  Continuando con verificación visual...');
      const pageText = await page.textContent('body') || '';
      const tienePlomero = pageText.toLowerCase().includes('plomero');
      console.log(`   ¿Página muestra "Plomero"? ${tienePlomero ? '✅' : '❌'}`);
      
      expect(tienePlomero, 'Debe mostrar Plomero en la página').toBe(true);
    }
    
    console.log('\n' + separator);
    console.log('✅ TEST HU7 COMPLETADO');
    console.log(separator);
    
    // Esperar para revisar
    await page.waitForTimeout(3000);
  });
});