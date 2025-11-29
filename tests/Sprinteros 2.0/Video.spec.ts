import { test, expect } from '@playwright/test';

test('Verificar video y URL en Servineo', async ({ page }) => {
  
  console.log("1. Encontrar home y cerrar guía interactiva...");
  await page.goto('https://servineo-frontend-j.onrender.com/');
  
  // Espera inicial para que cargue la página (equivalente a Thread.sleep(3500) en Java)
  await page.waitForTimeout(3500);
  
  // Cerrar la guía interactiva (verificar si existe antes de hacer click)
  const botonSalir = page.locator('xpath=/html/body/div[7]/button');
  if (await botonSalir.isVisible({ timeout: 15000 })) {
    await botonSalir.click();
    console.log('ℹ Se cerró el popup de la guía.');
  }

  console.log("2. Scrolleando hacia abajo y haciendo click en link...");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  
  // Usar el xpath específico del footer como en el código Java, o buscar por texto
  const linkComoFunciona = page.locator('xpath=//*[@id="footer-principal"]/footer/div[1]/div[3]/div[2]/ul/li[6]/a');
  await linkComoFunciona.waitFor({ state: 'visible', timeout: 15000 });
  await linkComoFunciona.click();

  console.log("3. Esperando a que la página 'Cómo funciona servineo' cargue...");
  await expect(page).toHaveURL(/.*comoUsarServineo/);
  
  // Esperar a que el botón Play sea clickeable
  const botonPlay = page.locator('xpath=/html/body/main/div[1]/div/div[3]/div/button');
  await botonPlay.waitFor({ state: 'visible', timeout: 15000 });
  console.log("Hacemos click al boton de Play (Intento 1)");
  await botonPlay.click();

  // Esperar antes de buscar el permiso de audio (equivalente a Thread.sleep(4000))
  await page.waitForTimeout(4000);

  console.log("4. Autorizamos la salida de audio...");
  // Buscar el botón de permiso de audio (puede que no siempre aparezca)
  const permisoAudio = page.locator('xpath=//*[@id="radix-_r_0_"]/div/button[1]');
  if (await permisoAudio.isVisible({ timeout: 5000 })) {
    await permisoAudio.click();
    console.log("Permiso de audio autorizado.");
  } else {
    console.log("Permiso de audio no requerido o ya autorizado.");
  }

  console.log("5. Click final para reproducir...");
  // Segundo click en Play después del permiso
  await botonPlay.waitFor({ state: 'visible', timeout: 15000 });
  console.log("Hacemos click al boton de Play (Intento 2)");
  await botonPlay.click();

  console.log("Esperando 2 segundos para que el video arranque...");
  await page.waitForTimeout(2000);

  // Verificaciones finales
  const urlActual = page.url();
  const video = page.locator('xpath=/html/body/main/div[1]/div/div[3]/video');
  
  // Verificar que el video existe y está visible
  await video.waitFor({ state: 'visible', timeout: 15000 });
  
  const esUrlCorrecta = urlActual.includes("comoUsarServineo");
  const estaReproduciendo = await video.evaluate((vid: HTMLVideoElement) => !vid.paused);
  const tiempoActual = await video.evaluate((vid: HTMLVideoElement) => vid.currentTime);

  if (esUrlCorrecta && estaReproduciendo) {
    console.log("✅ PRUEBA EXITOSA: Navegación correcta Y video reproduciéndose.");
    console.log(`   -> URL OK: ${urlActual}`);
    console.log(`   -> Video OK: El tiempo de reproducción es > 0s (${tiempoActual.toFixed(2)}s)`);
    
    // Assertions para Playwright
    expect(urlActual).toContain("comoUsarServineo");
    expect(estaReproduciendo).toBe(true);
    expect(tiempoActual).toBeGreaterThan(0);
  } else {
    console.log("❌ PRUEBA FALLIDA.");
    if (!esUrlCorrecta) {
      console.log(`   -> Fallo URL: Esperaba 'comoUsarServineo', pero estoy en: ${urlActual}`);
    }
    if (!estaReproduciendo) {
      console.log("   -> Fallo Video: El navegador lo reporta como PAUSADO.");
    }
    
    // Hacer fallar el test si algo no está bien
    expect(esUrlCorrecta && estaReproduciendo).toBe(true);
  }
});