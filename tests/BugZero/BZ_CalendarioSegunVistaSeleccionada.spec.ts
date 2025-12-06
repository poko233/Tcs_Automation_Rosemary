// ------ TITULO ---------------------
// Verificar actualización del calendario según la vista seleccionada
// QA a cargo: Ramirez Galarza Jhonny Fabian

// ---- DESCRIPCION -------
// Alternamos entre Mes/Semana/Día; el calendario actualiza
// la información, mostrando para cada vista el subconjunto
// de datos (Mes/Semana/Día) esperado.

import { test, expect } from '@playwright/test';

const STEP_DELAY = 1000; // milisegundos de espera entre pasos

async function pause() {
  await new Promise((resolve) => setTimeout(resolve, STEP_DELAY));
}

test.use({
  launchOptions: { slowMo: 1000 },
});

test('Verificar actualización del calendario según la vista seleccionada', async ({ page }, testInfo) => {
  // 1. Ir directamente a la página del calendario como requester
  await page.goto(
    'https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es/calendar?role=requester'
  );
  await pause();

  // (Si en esta ruta aún hay link "Acceder Requester", lo dejamos por compatibilidad)
  const accederRequester = page.getByRole('link', { name: 'Acceder Requester' });
  if (await accederRequester.isVisible().catch(() => false)) {
    await accederRequester.click();
    await pause();
  }

  // Vista SEMANA
  // Verificar botón "Semana"
  const btnSemana = page.getByRole('button', { name: 'Semana' });
  await expect(btnSemana, 'El botón "Semana" debe ser visible').toBeVisible();
  await pause();

  // Cambiar a vista Semana
  await btnSemana.click();
  await pause();

  // Verificar encabezado de rango de fechas en vista Semana
  const headerSemana = page.getByText('Diciembre 1 - 7', { exact: false });
  await expect(
    headerSemana,
    'El encabezado de la vista Semana debe mostrar "Diciembre 1 - 7"'
  ).toBeVisible();
  await pause();

  // Evidencia Semana
  const semanaShot = await page.screenshot({ fullPage: true });
  await testInfo.attach('Vista Semana', {
    body: semanaShot,
    contentType: 'image/png',
  });


  // Vista DÍA
  // Verificar botón "Día"
  const btnDia = page.getByRole('button', { name: 'Día' });
  await expect(btnDia, 'El botón "Día" debe ser visible').toBeVisible();
  await pause();

  // Cambiar a vista Día
  await btnDia.click();
  await pause();

  // Verificar encabezado en vista Día
  const headerDia = page.getByText('Diciembre 5', { exact: false });
  await expect(
    headerDia,
    'El encabezado de la vista Día debe mostrar "Diciembre 5"'
  ).toBeVisible();
  await pause();

  // Evidencia Día
  const diaShot = await page.screenshot({ fullPage: true });
  await testInfo.attach('Vista Día', {
    body: diaShot,
    contentType: 'image/png',
  });

  // Vista MES
  // Verificar botón "Mes"
  const btnMes = page.getByRole('button', { name: 'Mes' });
  await expect(btnMes, 'El botón "Mes" debe ser visible').toBeVisible();
  await pause();

  // Cambiar a vista Mes
  await btnMes.click();
  await pause();

  // Verificar encabezado Mes
  const headerMes = page.getByText('Diciembre 2025', { exact: false });
  await expect(
    headerMes,
    'El encabezado de la vista Mes debe mostrar "Diciembre 2025"'
  ).toBeVisible();
  await pause();

  // Evidencia Mes
  const mesShot = await page.screenshot({ fullPage: true });
  await testInfo.attach('Vista Mes', {
    body: mesShot,
    contentType: 'image/png',
  });
});
