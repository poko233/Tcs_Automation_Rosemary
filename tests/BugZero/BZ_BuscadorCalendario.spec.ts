// ------ TITULO ---------------------
//Verificar restricción de datos en campos del buscador por fechas
//QA a cargo: Arnez Nigoevic Sebastian

//----DESCRIPCION -------
// Verificar que los campos de ingreso de fechas (día, mes, año) en el buscador solo permitan 
// la entrada de caracteres numéricos y que los datos ingresados se encuentren dentro de un rango de fechas 
// lógicamente válido.

import { test, expect } from '@playwright/test';

test('Verificar restricción de datos en campos del buscador por fechas', async ({ page }) => {
  //1. Navegar a la aplicación
  await page.goto('https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es/calendar?role=requester');
  //2. Acceder a la vista del Fixer e ingresar al buscador por fechas
  await page.getByRole('button', { name: 'Semana' }).click();
//3. Ingresar datos inválidos en los campos de día, mes y año
//4 ingresar dias
  await page.getByRole('textbox', { name: 'DD' }).click();
  await page.getByRole('textbox', { name: 'DD' }).fill('1');
  //5 ingresar meses
  await page.getByRole('textbox', { name: 'MM' }).click();
  await page.getByRole('textbox', { name: 'MM' }).fill('2');
  await page.getByRole('textbox', { name: 'MM' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'MM' }).fill('1');
  //6 ingresar años
  await page.getByRole('textbox', { name: 'YYYY' }).click();
  await page.getByRole('textbox', { name: 'YYYY' }).click();
  await page.getByRole('textbox', { name: 'YYYY' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'YYYY' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'YYYY' }).fill('2026');
});