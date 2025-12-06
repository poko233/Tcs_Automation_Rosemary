// ------ TITULO ---------------------
//Verificar guardado, cierre y feedback al presionar el botón "Guardar"
//QA a cargo: Arnez Nigoevic Sebastian

//----DESCRIPCION -------
// Al seleccionar días laborales desde la vista del Fixer en el apartado "Modificar Disponibilidad" y
// confirmar con "Guardar", la configuración se persista, el modal se cierre y el usuario reciba un mensaje de confirmación.
// QA a cargo: Arenz Nigoevic Sebastian

import { test, expect } from '@playwright/test';

test('Verificar guardado al presionar el botón "Guardar"', async ({ page }) => {
  //Navegar a la aplicación
  await page.goto('https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es/calendar?role=requester');
  //1. Acceder a la vista del Fixer
  await page.getByRole('link', { name: 'Acceder Fixer' }).click();
  //2. Abrir el modal "Modificar Disponibilidad"
  await page.getByRole('button', { name: 'Modificar Disponibilidad' }).click();
  //3. Abrir la configuración semanal
  await page.getByRole('button', { name: 'Configuración Semanal' }).click();
  //3. Seleccionar días no laborales y guardar cambios
  await page.getByRole('button', { name: 'Jue', exact: true }).click();
  await page.getByRole('button', { name: 'Vie', exact: true }).click();
  await page.getByRole('button', { name: 'Sab', exact: true }).click();
  await page.getByRole('button', { name: 'Dom', exact: true }).click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  //4. Verificar que el modal se cierre y aparezca el mensaje de confirmación
  await page.getByRole('button', { name: 'Entendido' }).click();
});