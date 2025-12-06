// ------ TITULO ---------------------
//Verificar mensaje de éxito al confirmar cancelación.

//QA a cargo: Rocha Medina Vivian Ruby

//----DESCRIPCION -------
// Al ingresar a cancelar citas, seleccionar un día que tiene citas agendadas de confirmación,
// luego hacemos clic en Cancelar y confirmamos la acción mediante el modal
// se mostrará en mensaje “Se cancelaron X citas".

import { test, expect } from '@playwright/test';

test('Verificar mensaje de éxito al confirmar cancelación', async ({ page }) => {
  // Paso 1: Ingresar a la aplicación Servineo en el idioma Español.
  await page.goto('https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es');

  // Paso 2: Hacer clic en el enlace "Acceder Fixer" para ir al flujo de autenticación de Fixer.
  await page.getByRole('link', { name: 'Acceder Fixer' }).click();

  // Paso 3: Focalizar el campo de texto "id fixer".
  await page.getByRole('textbox', { name: 'id fixer' }).click();

  // Paso 4: Mover el cursor dentro del campo "id fixer" usando la tecla ArrowRight (acciones grabadas).
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id fixer' }).press('ArrowRight');

  // Paso 5: Ingresar el valor de "id fixer" correspondiente al usuario Fixer.
  await page.getByRole('textbox', { name: 'id fixer' }).fill('6932095cdf5c163a073107d5');

  // Paso 6: Focalizar el campo de texto "id requester".
  await page.getByRole('textbox', { name: 'id requester' }).click();

  // Paso 7: Mover el cursor dentro del campo "id requester" usando la tecla ArrowRight (acciones grabadas).
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'id requester' }).press('ArrowRight');

  // Paso 8: Ingresar el valor de "id requester" correspondiente al solicitante.
  await page.getByRole('textbox', { name: 'id requester' }).fill('6930df232279749245f7fbf7');

  // Paso 9: Confirmar los datos ingresados haciendo clic en el botón "Aceptar".
  await page.getByRole('button', { name: 'Aceptar' }).click();

  // Paso 10: Confirmar nuevamente en el segundo botón "Aceptar" (si aplica doble confirmación).
  await page.getByRole('button', { name: 'Aceptar' }).click();

  // Paso 11: Ingresar a la sección "Cancelar Citas".
  await page.getByRole('button', { name: 'Cancelar Citas' }).click();

  // Paso 12: Seleccionar un día en el calendario que tiene citas agendadas (primer elemento encontrado).
  await page.locator('.flex-shrink-0.w-5').first().click();

  // Paso 13: Hacer clic en el botón "Cancelar" de la cita seleccionada.
  await page.getByRole('button', { name: 'Cancelar' }).nth(2).click();

  // Paso 14: Confirmar la cancelación de la cita en el modal haciendo clic en "Sí, Cancelar".
  await page.getByRole('button', { name: 'Sí, Cancelar' }).click();

  // Paso 15: Verificar que se muestra el mensaje de éxito "Se cancelaron 1 cita".
  await page.getByText('Se cancelaron 1 cita').click();
});
