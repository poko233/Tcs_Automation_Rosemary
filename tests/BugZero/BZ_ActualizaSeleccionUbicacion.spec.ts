// ------ TITULO ---------------------
//Verificar que el REQUESTER seleccione una dirección.

//QA a cargo: Quiroz Guzman Juan Pablo

//----DESCRIPCION -------
// Al entrar a la pagina Servineo como REQUESTER nos dirigiremos al apartado seleccionaremos el perfil de un 
// FIXER, y se desplegara su perfil con sus datos y el botón "Ver calendario", haremos clic en el y 
// visualizaremos el modulo calendario donde podremos agendar una cita, en este pulsaremos sobre el selector de 
// modalidad y escogeremos "Presencial", luego pulsaremos sobre el boton "Seleccionar Ubicacion" y se nos abrira
// un modal con un mapa donde podremos escoger una direccion y hacer clic en "Confirmar Ubicacion" esta quedara
// puesta en el formulario de agendar cita

import { test, expect } from '@playwright/test';

test('Verificar que el REQUESTER seleccione una dirección', async ({ page }) => {
  // Paso 1: Ingresar a la aplicación Servineo en el idioma Español.
  await page.goto('https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es');

  // Paso 2: Acceder a la vista de Requester desde la página principal.
  await page.getByRole('link', { name: 'Acceder Requester' }).click();

  // Paso 3: Ingresar el ID del FIXER (limpiar el campo y escribir el identificador correspondiente).
  await page.getByRole('textbox', { name: 'id fixer' }).click();
  await page.getByRole('textbox', { name: 'id fixer' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'id fixer' }).fill('6932095cdf5c163a073107d5');

  // Paso 4: Ingresar el ID del REQUESTER (limpiar el campo y escribir el identificador correspondiente).
  await page.getByRole('textbox', { name: 'id requester' }).click();
  await page.getByRole('textbox', { name: 'id requester' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'id requester' }).fill('6930df232279749245f7fbf7');

  // Paso 5: Confirmar los datos de acceso con el botón "Aceptar".
  await page.getByRole('button', { name: 'Aceptar' }).click();

  // Paso 6: Cambiar la vista del calendario a "Semana".
  await page.getByRole('button', { name: 'Semana' }).click();

  // Paso 7: Avanzar en el calendario con el botón "Siguiente".
  await page.getByRole('button', { name: 'Siguiente' }).click();

  // Paso 8: Seleccionar un bloque disponible (verde) del calendario
  //         Se valida que exista al menos un bloque con el texto "Disponible" y se hace clic en el primero.
  const availableSlot = page.getByText('Disponible').first();
  await expect(availableSlot).toBeVisible();
  await availableSlot.click();

  // Paso 9: Configurar la modalidad de la cita como "Presencial" y seleccionar una ubicación en el mapa.
  //   - Cambiar el selector de "Modalidad *" a la opción "Presencial".
  await page.getByLabel('Modalidad *VirtualPresencial').selectOption('presential');
  //   - Pulsar el botón "📍 Seleccionar ubicación" para abrir el modal con el mapa.
  await page.locator('div').filter({ hasText: /^📍 Seleccionar ubicación$/ }).click();
  //   - Hacer clic dentro del mapa (Leaflet) para escoger una dirección.
  await page.locator('div').filter({ hasText: /^\+− Leaflet$/ }).first().click();
  //   - Confirmar la ubicación seleccionada con el botón "Confirmar ubicación".
  await page.getByRole('button', { name: 'Confirmar ubicación' }).click();

  // Paso 10: Guardar la cita con la dirección presencial seleccionada, haciendo clic en "Añadir".
  await page.getByRole('button', { name: 'Añadir' }).click();
});
