import { test, expect, Page, Locator } from '@playwright/test';

//Nombre QA: Camilo Baltazar Nogales Fuentes
//TC > Servino - ID166 Verificar la normalización de mayúsuculas en la búsqueda

//Ajustamos la velocidad
test.use({
    headless: false,
    launchOptions: {
        slowMo: 1000,
    },
});

test('Normalización de Mayúsculas al Buscar', async ({ page, browserName }) => {
    test.setTimeout(90000);
    
    // Iniciamos el puntero rojo visual
    await instalarPunteroVisual(page);

    console.log(`--- INICIANDO TEST EN: ${browserName.toUpperCase()} ---`);

    // ==========================================
    // 1. INGRESAR A SERVINEO
    // ==========================================
    console.log('PASO 1: Ingresando al Home...');
    await page.goto('https://servineo.app/es');

    //Cerrarmos la notificación inicial
    try {
        const btnNoGracias = page.locator('//button[normalize-space()="No, gracias"]');
        await btnNoGracias.isVisible({ timeout: 4000 });
        console.log('   Publicidad detectada. Cerrando ventana...');
            await interactuar(page, btnNoGracias);
            await btnNoGracias.click();
        
    } catch (e) {
        console.log('   No se detectó publicidad.');
    }

    // ==========================================
    // 2. INGRESAR A OFERTAS DE TRABAJO
    // ==========================================
    console.log('PASO 2: Navegando a Ofertas...');
    const ofertasButton = page.locator('a, button').filter({ hasText: /Ofertas de Trabajo/i }).first();
    
    await interactuar(page, ofertasButton);
    await ofertasButton.click();
    await page.waitForTimeout(2000);

    // ==========================================
    // 3. BUSCAR "electricista" (Minúsculas)
    // ==========================================
    console.log('PASO 3: Buscando "electricista"...');
    
    //Ubicar según el placeholder la barra de búsqueda
    const searchInput = page.getByPlaceholder(/¿Qu. servicio necesitas\?/i);
    await expect(searchInput).toBeVisible();

    //Introducir el término electricista a buscar
    await interactuar(page, searchInput);
    await searchInput.fill('electricista');
    await page.keyboard.press('Enter');
    
    await page.waitForTimeout(3000);

    //3.1 Verificar Resultados en base al Mostrar resultados
    const resultsTextElement = page.locator('div.text-sm.text-gray-600.mt-3').first();
    await expect(resultsTextElement).toBeVisible();
    
    const resultsText1 = await resultsTextElement.innerText();
    let totalResults1 = 0;
    const match1 = resultsText1.match(/(\d+)\s+resultados/i) || resultsText1.match(/de\s+(\d+)/i);
    
    if (match1) {
        totalResults1 = parseInt(match1[1], 10);
        console.log(`   -> Resultados para "electricista": ${totalResults1}`);
    } else {
        console.log(`   -> Texto encontrado: "${resultsText1}"`);
    }
    
    expect(totalResults1).toBeGreaterThan(0);

    // ==========================================
    // 4. LIMPIAR BÚSQUEDA
    // ==========================================
    console.log('PASO 4: Limpiando búsqueda...');
    
    // Buscamos el botón "X" o "Limpiar búsqueda"
    const clearButton = page.locator('button').filter({ hasText: /Limpiar|Borrar/i }).or(page.locator('button svg.lucide-x').locator('..')).first();

    if (await clearButton.isVisible({ timeout: 2000 })) {
        await interactuar(page, clearButton);
        await clearButton.click();
    } else {

        //Borrado con teclado si no hay botón
        await interactuar(page, searchInput);
        await searchInput.click();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Backspace');
    }
    
    //Verificamos que no haya términos en la barra de búsqueda
    await expect(searchInput).toBeEmpty();

    // ==========================================
    // 5. BUSCAR "ElEcTRIcIsTa" (Mayúsculas)
    // ==========================================
    console.log('PASO 5: Buscando "ElEcTRIcIsTa"...');
    
    await interactuar(page, searchInput);
    await searchInput.fill('ElEcTRIcIsTa');
    await page.keyboard.press('Enter');
    
    await page.waitForTimeout(3000);

    // 5.1 Verificamos los resultados
    const resultsText2 = await resultsTextElement.innerText();
    let totalResults2 = 0;
    const match2 = resultsText2.match(/(\d+)\s+resultados/i) || resultsText2.match(/de\s+(\d+)/i);
    
    if (match2) {
        totalResults2 = parseInt(match2[1], 10);
        console.log(`   -> Resultados para "ElEcTRIcIsTa": ${totalResults2}`);
    }

    // ==========================================
    // COMPARACIÓN Y VALIDACIÓN FINAL
    // ==========================================
    console.log('PASO 6: Validando normalización...');
    
    // Validación 1: Misma cantidad de resultados
    if (totalResults1 === totalResults2) {
        console.log('   ✅ ÉXITO: La cantidad de resultados coincide.');
    } else {
        console.log('   ❌ ERROR: Diferente cantidad de resultados.');
    }
    expect(totalResults1).toBe(totalResults2);

    // Validación 2: Verificar contenido de la primera tarjeta
    console.log('   Verificando contenido de la primera tarjeta...');
    const jobCards = page.locator('.group.relative').first();
    if (await jobCards.isVisible()) {
        await interactuar(page, jobCards);
        const cardText = await jobCards.innerText();
        // Verificamos que contenga la palabra electricista ignorando mayúsculas
        expect(cardText.toLowerCase()).toContain('electricista');
        console.log('   ✅ El contenido es relevante.');
    }

    console.log('--- TEST COMPLETADO EXITOSAMENTE ---');
    await page.waitForTimeout(2000);
});

// ==========================================
// 🎨 FUNCIONES VISUALES
// ==========================================

async function interactuar(page: Page, locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });

    // Scroll suave
    await scrollLentoAlElemento(page, locator);
    
    // Mover puntero
    await moverPunteroAlCentro(page, locator);

    // Efecto Puntero
    await locator.evaluate((node) => {
        node.style.transition = 'all 0.3s ease';
        node.style.outline = '3px solid #00ffcc'; 
        node.style.boxShadow = '0 0 15px #00ffcc'; 
        node.style.transform = 'scale(1.05)';
    });
}

async function scrollLentoAlElemento(page: Page, locator: Locator) {
    const box = await locator.boundingBox();
    if (!box) return;

    await page.evaluate(async (yPosition) => {
        const currentY = window.scrollY;
        const targetY = yPosition + currentY - (window.innerHeight / 2); 
        const distance = targetY - currentY;
        const steps = 30;
        const duration = 800;
        const stepTime = duration / steps;
        const stepSize = distance / steps;
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 1; i <= steps; i++) {
            window.scrollBy(0, stepSize);
            await delay(stepTime);
        }
    }, box.y);
    await page.waitForTimeout(300);
}

async function moverPunteroAlCentro(page: Page, locator: Locator) {
    const box = await locator.boundingBox();
    if (box) {
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await moverPunteroVisual(page, x, y);
    }
}

async function instalarPunteroVisual(page: Page) {
    await page.evaluate(() => {
        const cursor = document.createElement('div');
        cursor.id = 'playwright-cursor';
        Object.assign(cursor.style, {
            width: '20px', height: '20px', backgroundColor: 'rgba(255, 0, 0, 0.8)',
            border: '2px solid white', borderRadius: '50%', position: 'fixed',
            zIndex: '999999', pointerEvents: 'none',
            transition: 'top 0.3s ease-out, left 0.3s ease-out', 
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
            top: '-50px', left: '-50px'
        });
        document.body.appendChild(cursor);
    });
}

async function moverPunteroVisual(page: Page, x: number, y: number) {
    await page.evaluate(({ x, y }) => {
        let cursor = document.getElementById('playwright-cursor');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.id = 'playwright-cursor';
            Object.assign(cursor.style, {
                width: '20px', height: '20px', backgroundColor: 'rgba(255, 0, 0, 0.7)',
                border: '2px solid white', borderRadius: '50%', position: 'fixed',
                zIndex: '999999', pointerEvents: 'none',
                transition: 'top 0.1s ease-out, left 0.1s ease-out',
                top: '-50px', left: '-50px'
            });
            document.body.appendChild(cursor);
        }
        cursor.style.left = `${x - 10}px`;
        cursor.style.top = `${y - 10}px`;
        cursor.style.transform = 'scale(0.8)';
        setTimeout(() => cursor.style.transform = 'scale(1)', 100);
    }, { x, y });
}
