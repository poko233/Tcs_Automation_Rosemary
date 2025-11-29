import { test, expect } from '@playwright/test';

test('Navegación y Existencia de página: Cómo funciona Servineo', async ({ page }) => {

  await page.goto('https://servineo-frontend-j.onrender.com/');
  
  // Espera inicial para que cargue la página completamente
  await page.waitForTimeout(3500);

  const botonSalir = page.locator('xpath=/html/body/div[7]/button');
  if (await botonSalir.isVisible({ timeout: 15000 })) {
    await botonSalir.click();
    console.log('ℹ Se cerró el popup de la guía.');
  }
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Esperar a que el link sea visible y clickeable
  await page.getByRole('link', { name: 'Cómo funciona Servineo' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('link', { name: 'Cómo funciona Servineo' }).click();

  await expect(page).toHaveURL(/.*comoUsarServineo/);

  console.log('La página existe y se cargó la URL correcta.');
});