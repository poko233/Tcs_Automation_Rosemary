import { test, expect } from '@playwright/test';

test('Verificar video y URL en Servineo', async ({ page }) => {

  await page.goto('https://servineo-frontend-j.onrender.com/');

  await page.locator('xpath=/html/body/div[7]/button').click();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await page.getByText('Cómo funciona Servineo').click();

  await expect(page).toHaveURL(/.*comoUsarServineo/);

  const video = page.locator('video'); 
  

  const isPaused = await video.evaluate((vid: HTMLVideoElement) => vid.paused);

  console.log(`¿El video está pausado?: ${isPaused}`);
});