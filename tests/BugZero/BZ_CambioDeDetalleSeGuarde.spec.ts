//Verificar edición de detalles adicionales se guarde.
//Windows 11, Chrome 141, Desktop.
//citariginal: Detalles = "Revisión equipo".
//QA a cargo: Max Diego Copa Ovando

//----DESCRIPCION -------
// Modificar solo el campo "detalles" 
// debe conservar fecha/hora/fixer y actualizar el texto en DB.
import { test, expect } from '@playwright/test';

test('Verificar edición de detalles adicionales se guarde', async ({ page }) => {
  //ingresamos al link de seervineo
  await page.goto('https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es/calendar?role=requester');
  //hacermos clic en acceder en modo requester
  await page.getByRole('link', { name: 'Acceder Requester' }).click();
  //cambiamos la vista a semana para mayor infoemacion
  await page.getByRole('button', { name: 'Semana' }).click();
  //cambiamos a otra semana
  await page.getByRole('button', { name: 'Siguiente' }).click();
  //ingresamos a una cita reservada
  await page.getByText('Reservado').first().click();
  //modificamos la descripcion
  await page.getByRole('textbox', { name: 'Descripción del trabajo' }).click();
  await page.getByRole('textbox', { name: 'Descripción del trabajo' }).click();
  await page.getByRole('textbox', { name: 'Descripción del trabajo' }).fill('PLOMERIA ');
  await page.getByRole('textbox', { name: 'Descripción del trabajo' }).press('CapsLock');
  const r = Math.floor(Math.random() * 100000);
  await page.getByRole('textbox', { name: 'Descripción del trabajo' }).fill(`plomeria - ${r}`);

 //y guardamos cambios
  await page.getByRole('button', { name: 'Editar' }).click();
  await page.getByText('Reservado').first().click();
  //cerificamos que se haya gusradadoS
  await page.getByRole('textbox', { name: 'Descripción del trabajo' }).click();
});
