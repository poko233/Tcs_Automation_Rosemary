import { test, expect } from '@playwright/test';

test('Verificar video y URL en Servineo (Optimizado)', async ({ page }) => {
  
  console.log("1. Navegando al Home...");
  await page.goto('https://servineo.app/es');
  const botonSalir = page.locator('button:has(svg path)').last(); 
  
  
  try {
    if (await botonSalir.isVisible({ timeout: 5000 })) {
        await botonSalir.click();
        console.log('ℹ Se cerró el popup de la guía.');
    }
  } catch (e) {
    console.log('ℹ No apareció la guía o no se pudo cerrar (continuamos).');
  }

  console.log("2. Navegando al footer...");
  await page.getByRole('link', { name: 'Cómo funciona Servineo' }).click();

  console.log("3. Validando carga de página...");
  await expect(page).toHaveURL(/.*howUseServineo/);
  
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  const botonPlay = page.locator('xpath=/html/body/div[6]/div/div[3]/div/button');
  await botonPlay.waitFor({ state: 'visible', timeout: 15000 });
  await botonPlay.click();
  console.log("Click en Play (Intento 1)");

  console.log("4. Gestionando Permiso de Audio...");
const modalAudio = page.locator('[role="dialog"], [class*="radix"]');
  const btnPermiso = modalAudio.locator('button').first();
  if (await btnPermiso.isVisible({ timeout: 5000 })) {
      await btnPermiso.click();
      console.log("Permiso de audio autorizado.");
      
      await page.waitForTimeout(500); 
      
      if (await botonPlay.isVisible()) {
          await botonPlay.click();
          console.log("Click en Play (Intento 2)");
      }
  }

  console.log("5. Verificando reproducción...");
  await page.waitForTimeout(2000);
  const video = page.locator('video').first();
  const isPaused = await video.evaluate((vid: HTMLVideoElement) => vid.paused);
  const currentTime = await video.evaluate((vid: HTMLVideoElement) => vid.currentTime);

  console.log(`Estatus Video -> Pausado: ${isPaused}, Tiempo: ${currentTime}`);

  expect(isPaused).toBe(false);
  expect(currentTime).toBeGreaterThan(0);
  
  console.log("✅ PRUEBA FINALIZADA CON ÉXITO");
});