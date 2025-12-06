/**Verificar que el boton Register Job en el modal de appointment details te redirija al modal de register job luego de hacer click  */

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sudoers.servineo.app/');

  //Hacer click en Fixers
  await page.getByRole('link', { name: 'Fixers' }).click();

  //Hacer clik en view Jobs
  await page.getByRole('link', { name: 'View Jobs' }).click();

  //Hacer click en Abrir 
  await page.getByRole('button', { name: 'Open menu' }).first().click();
  await page.getByRole('menuitem', { name: 'Appointment details' }).click();
  await page.getByRole('button', { name: 'Register job' }).click();
});