import { test, expect } from '@playwright/test';

test('Actualizar estado de Fixer en Servineo', async ({ page }) => {
  // Timeout extendido para todo el test
  test.setTimeout(120000);

  // 1️⃣ Navegar a la página
  await page.goto('https://servineo.app/en', { waitUntil: 'networkidle' });

  // 2️⃣ Cerrar modal "No, gracias" si aparece
  const noGraciasBtn = page.getByRole('button', { name: 'No, gracias' });
  if (await noGraciasBtn.isVisible({ timeout: 10000 })) {
    await noGraciasBtn.click();
  }

  // 3️⃣ Cerrar overlay de Reactour si existe
  const reactourOverlay = page.locator('.reactour__mask');
  if (await reactourOverlay.isVisible({ timeout: 5000 })) {
    await page.keyboard.press('Escape'); // suele cerrar overlays / tours
  }

  // 4️⃣ Click en Sign In
  const signInLink = page.getByRole('link', { name: 'Sign In' });
  await signInLink.waitFor({ state: 'visible', timeout: 15000 });
  await signInLink.click();

  // 5️⃣ Llenar credenciales
  const emailInput = page.getByRole('textbox', { name: 'Enter your email' });
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill('pruebita1@pruebita.com');

  const passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.fill('12345678');

  const loginBtn = page.getByRole('button', { name: 'Log in' });
  await loginBtn.waitFor({ state: 'visible', timeout: 10000 });
  await loginBtn.click();

  // 6️⃣ Esperar usuario logueado
  const userBtn = page.getByRole('button', { name: 'Cam Noga Cam Noga' });
  await userBtn.waitFor({ state: 'visible', timeout: 15000 });
  await userBtn.click();

  // 7️⃣ Ir a Perfil de Fixer
  const perfilLink = page.getByRole('link', { name: 'Perfil de Fixer' });
  await perfilLink.waitFor({ state: 'visible', timeout: 10000 });
  await perfilLink.click();

  // 8️⃣ Cambiar estado a 'active'
  const statusCombo = page.getByRole('combobox');
  await statusCombo.waitFor({ state: 'visible', timeout: 10000 });
  await statusCombo.selectOption('active');

  // Validación opcional
  await expect(statusCombo).toHaveValue('active');
});
