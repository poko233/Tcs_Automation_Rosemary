// Verificar que certificacion sea eliminada de manera correcta
//  ---- DESCRIPCIÓN -------
// Se accede a la página principal de Servineo y se cierra el modal inicial si aparece.
// Luego, se navega al formulario de inicio de sesión, se ingresan credenciales válidas y se hace login.
// Una vez dentro, se abre el menú de usuario, se accede al "Perfil de Fixer", se abre la sección de "Certificaciones",
// se elimina la primera certificación y se confirma la acción.
// Finalmente, se espera 5 segundos para verificar visualmente que la certificación fue eliminada.
//Correr con npx playwright test -g "Login en Servineo" --project=chromium --headed

import { test, expect } from '@playwright/test';

test('AQARius - Login en Servineo', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Solo ejecutar en Chrome');

  await page.goto('https://servineo.app/en');

  // Cerrar modal si aparece
  await page.getByRole('button', { name: 'No, gracias' }).click().catch(() => {});

  // Sign In
  await page.getByRole('link', { name: 'Sign In' }).click();

  // Email
  const email = page.getByRole('textbox', { name: 'Enter your email' });
  await expect(email).toBeVisible();
  await email.fill('202108297@est.umss.edu');

  // Password
  const password = page.getByRole('textbox', { name: 'Enter your password' });
  await expect(password).toBeVisible();
  await password.fill('pruebaqa123');

  // Login
  await page.getByRole('button', { name: 'Log in' }).click();

  // Menú de usuario
  const userMenu = page.getByRole('button', { name: /Kevin Calderon/i });
  await expect(userMenu).toBeVisible({ timeout: 15000 });
  await userMenu.click();

  // Perfil de Fixer
  const perfilFixer = page.getByRole('link', { name: 'Perfil de Fixer' });
  await expect(perfilFixer).toBeVisible({ timeout: 8000 });
  await perfilFixer.click();

  // Certificaciones
  const certBtn = page.getByRole('button', { name: 'Certificaciones' });
  await expect(certBtn).toBeVisible();
  await certBtn.click();

  // Eliminar una certificación
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.getByText('Delete', { exact: true }).click();

  // Cerrar modal
  await page.getByRole('button', { name: 'Cerrar' }).click();

  // ESPERAR 5 SEGUNDOS PARA VERIFICAR QUE SE ELIMINÓ
  await page.waitForTimeout(5000);

});
