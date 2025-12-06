import { test, expect } from '@playwright/test';

test('Crear promoción en Servineo', async ({ page }) => {
  // 1️⃣ Navegar a la página con timeout extendido y esperar carga completa
  await page.goto('https://servineo.app/es', { timeout: 60000, waitUntil: 'networkidle' });

  // 2️⃣ Cerrar modal "No, gracias" si aparece
  const noGraciasBtn = page.getByRole('button', { name: 'No, gracias' });
  if (await noGraciasBtn.isVisible({ timeout: 5000 })) {
    await noGraciasBtn.click();
  }

  // 3️⃣ Click en Iniciar Sesión
  const loginLink = page.getByRole('link', { name: 'Iniciar Sesión' });
  await loginLink.waitFor({ state: 'visible', timeout: 10000 });
  await loginLink.click();

  // 4️⃣ Llenar credenciales
  const emailInput = page.getByRole('textbox', { name: 'Ingrese su correo electrónico' });
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill('efrain.alucard@minuteafter.com');

  const passwordInput = page.getByRole('textbox', { name: 'Ingrese su contraseña' });
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.fill('1234qwer;');

  const loginBtn = page.getByRole('button', { name: 'Iniciar Sesión' });
  await loginBtn.waitFor({ state: 'visible', timeout: 10000 });
  await loginBtn.click();

  // 5️⃣ Esperar que el usuario esté logueado
  const userBtn = page.getByRole('button', { name: 'manuel merino manuel merino' });
  await userBtn.waitFor({ state: 'visible', timeout: 15000 });
  await userBtn.click();

  // 6️⃣ Navegar a Perfil de Fixer
  const perfilLink = page.getByRole('link', { name: 'Perfil de Fixer' });
  await perfilLink.waitFor({ state: 'visible', timeout: 10000 });
  await perfilLink.click();

  // 7️⃣ Abrir opciones y crear promoción
  const opcionesBtn = page.getByRole('button', { name: 'Más opciones' });
  await opcionesBtn.waitFor({ state: 'visible', timeout: 10000 });
  await opcionesBtn.click();

  const crearPromoBtn = page.getByRole('button', { name: 'Crear promoción' });
  await crearPromoBtn.waitFor({ state: 'visible', timeout: 10000 });
  await crearPromoBtn.click();

  // 8️⃣ Llenar título de la promoción
  const promoTitleInput = page.getByRole('textbox', { name: 'Promo title:' });
  await promoTitleInput.waitFor({ state: 'visible', timeout: 10000 });
  await promoTitleInput.fill('Promocion del 20% de descuento');

  // 9️⃣ Guardar promoción
  const savePromoBtn = page.getByRole('button', { name: 'Save promo' });
  await savePromoBtn.waitFor({ state: 'visible', timeout: 10000 });
  await savePromoBtn.click();

  // 10️⃣ Validación opcional
  await expect(page.locator('text=Promocion del 20% de descuento')).toBeVisible({ timeout: 15000 });
});
