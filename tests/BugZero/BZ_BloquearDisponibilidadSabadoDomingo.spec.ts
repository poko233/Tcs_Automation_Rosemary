// ------ TITULO ---------------------
// Verificar que el sistema no muestre horarios disponibles en días sábado o domingo
// QA a cargo: Ramirez Galarza Jhonny Fabian

// ---- DESCRIPCION -------
// Al seleccionar una fecha correspondiente a fin de semana (sábado o domingo),
// el sistema debería mostrar todos los horarios como "Inhabilitado" (no disponible).
// Se valida que, en la vista de calendario para el rol Fixer, los días sábado y domingo
// no presenten horarios disponibles.

import { test, expect } from '@playwright/test';

const STEP_DELAY = 1000; // milisegundos de espera entre pasos

async function pause() {
  await new Promise((resolve) => setTimeout(resolve, STEP_DELAY));
}

test.use({
  launchOptions: { slowMo: 1000 },
});

test(
  'Verificar que el sistema no muestre horarios disponibles en días sábado o domingo',
  async ({ page }, testInfo) => {
    // 1. Ir al calendario como Fixer
    await page.goto(
      'https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es/calendar?role=fixer'
    );
    await pause();

    // Verificar que estamos en el mes correcto
    await expect(
      page.getByText('Diciembre 2025'),
      'El encabezado del calendario debe mostrar "Diciembre 2025"'
    ).toBeVisible();
    await pause();

    // Screenshot de contexto general del calendario
    const calendarioShot = await page.screenshot({ fullPage: true });
    await testInfo.attach('Vista Calendario - Mes Diciembre 2025', {
      body: calendarioShot,
      contentType: 'image/png',
    });

    // VALIDACIÓN: SÁBADO
    // Verificar que exista la columna de Sábado
    const sabadoCol = page.locator('div').filter({ hasText: /^Sabado$/ });
    await expect(
      sabadoCol.first(),
      'Debe existir la columna correspondiente al día Sábado'
    ).toBeVisible();
    await pause();

    // Verificar que los horarios relacionados a Sábado estén inhabilitados
    await expect(
      page.getByText('Inhabilitado').first(),
      'Primer horario de Sábado debe estar "Inhabilitado"'
    ).toBeVisible();

    await expect(
      page.getByText('Inhabilitado').nth(2),
      'Segundo horario de Sábado debe estar "Inhabilitado"'
    ).toBeVisible();

    await expect(
      page.getByText('Inhabilitado').nth(4),
      'Tercer horario de Sábado debe estar "Inhabilitado"'
    ).toBeVisible();

    // Validar que el contenedor de horarios para Sábado exista
    await expect(
      page.locator('div:nth-child(27) > .h-30 > .flex-1 > .w-full > p'),
      'Debe existir el contenedor de horarios para Sábado'
    ).toBeVisible();
    await pause();

    // Screenshot de Sábado
    const sabadoShot = await page.screenshot({ fullPage: true });
    await testInfo.attach('Vista Sábado - Horarios Inhabilitados', {
      body: sabadoShot,
      contentType: 'image/png',
    });

    // VALIDACIÓN: DOMINGO
    // Verificar que exista la columna de Domingo
    const domingoCol = page.locator('div').filter({ hasText: /^Domingo$/ });
    await expect(
      domingoCol.first(),
      'Debe existir la columna correspondiente al día Domingo'
    ).toBeVisible();
    await pause();

    // Verificar que los horarios relacionados a Domingo estén inhabilitados
    await expect(
      page.getByText('Inhabilitado').nth(1),
      'Primer horario de Domingo debe estar "Inhabilitado"'
    ).toBeVisible();

    await expect(
      page.getByText('Inhabilitado').nth(3),
      'Segundo horario de Domingo debe estar "Inhabilitado"'
    ).toBeVisible();

    await expect(
      page.getByText('Inhabilitado').nth(5),
      'Tercer horario de Domingo debe estar "Inhabilitado"'
    ).toBeVisible();

    // Validar que el contenedor de horarios para Domingo exista
    await expect(
      page.locator('div:nth-child(28) > .h-30 > .flex-1 > .w-full > p'),
      'Debe existir el contenedor de horarios para Domingo'
    ).toBeVisible();
    await pause();

    // Screenshot de Domingo
    const domingoShot = await page.screenshot({ fullPage: true });
    await testInfo.attach('Vista Domingo - Horarios Inhabilitados', {
      body: domingoShot,
      contentType: 'image/png',
    });
  }
);
