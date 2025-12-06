// ------ TITULO ---------------------
//Verificar mensaje de éxito al agendar cita.

//QA a cargo: Quiroz Guzman Juan Pablo

//----DESCRIPCION -------
// Cuando ingresemos a la pagina Servineo, iniciamos sesión como REQUESTER nos dirigiremos al apartado 
// de Job Offers y seleccionaremos el perfil de un FIXER, y se desplegara su perfil con sus datos y el botón 
// "Ver calendario", haremos clic en el y visualizaremos el modulo calendario donde podremos agendar una cita 
// seleccionando día y hora, después se desplegara el modal de "Agendar cita" donde completaremos los campos
// y al pulsar el botón Añadir, el sistema debe registrar la cita en la base de datos, almacenando todos los 
// campos obligatorios completados y confirmando la correcta creación del registro.

import { test, expect } from '@playwright/test';

test('Verificar mensaje de éxito al agendar cita', async ({ page }) => {
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

  // Paso 7: Avanzar a la siguiente semana (o rango) con el botón "Siguiente".
  await page.getByRole('button', { name: 'Siguiente' }).click();

  // Paso 8: Seleccionar un bloque disponible (verde) del calendario
  //         Se valida que exista al menos un bloque con el texto "Disponible" y se hace clic en el primero.
  const availableSlot = page.getByText('Disponible').first();
  await expect(availableSlot).toBeVisible(); // validar que haya al menos un bloque disponible
  await availableSlot.click();

  // Paso 9: Completar todos los campos del formulario "Agendar cita" con datos válidos.
  //   - Campo "Cliente *": se registra el nombre del cliente "Bug Zero".
  await page.getByRole('textbox', { name: 'Cliente *' }).click();
  await page.getByRole('textbox', { name: 'Cliente *' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Cliente *' }).fill('B');
  await page.getByRole('textbox', { name: 'Cliente *' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Cliente *' }).fill('Bug ');
  await page.getByRole('textbox', { name: 'Cliente *' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Cliente *' }).fill('Bug Z');
  await page.getByRole('textbox', { name: 'Cliente *' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Cliente *' }).fill('Bug Zero');

  //   - Campo "Contacto *": se registra el teléfono del cliente.
  await page.getByRole('textbox', { name: 'Contacto *' }).click();
  await page.getByRole('textbox', { name: 'Contacto *' }).fill('79865322');

  //   - Campo "Correo electrónico (Opcional)": se registra el correo de contacto.
  await page.getByRole('textbox', { name: 'Correo electrónico (Opcional' }).click();
  await page
    .getByRole('textbox', { name: 'Correo electrónico (Opcional' })
    .fill('juanpabloquiroz45@gmail.com');

  //   - Campo "Descripción del trabajo *": se describe el servicio requerido.
  await page.getByRole('textbox', { name: 'Descripción del trabajo *' }).click();
  await page.getByRole('textbox', { name: 'Descripción del trabajo *' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción del trabajo *' }).fill('R');
  await page.getByRole('textbox', { name: 'Descripción del trabajo *' }).press('CapsLock');
  await page
    .getByRole('textbox', { name: 'Descripción del trabajo *' })
    .fill('Requiero electricista para reparar instalacion electrica de una cocina');

  //   - Campo "Enlace de reunión *": se registra el enlace de la reunión virtual.
  await page.getByRole('textbox', { name: 'Enlace de reunión *' }).click();
  await page
    .getByRole('textbox', { name: 'Enlace de reunión *' })
    .fill('https://meet.google.com/kwu-gawo-kzc');

  // Paso 10: Configurar el tiempo de recordatorio de la cita (abrir modal, seleccionar valor y confirmar).
  await page.getByRole('button', { name: '🔔 Configurar Tiempo de' }).click();
  await page.getByRole('button', { name: '▾' }).click();
  await page.getByRole('button', { name: '45' }).click();
  await page.getByRole('button', { name: 'Configurar', exact: true }).click();

  // Paso 11: Guardar la cita haciendo clic en el botón "Añadir".
  await page.getByRole('button', { name: 'Añadir' }).click();

  // Paso 12: Verificar que se muestre el mensaje de éxito "Cita agendada con éxito".
  await page.getByRole('heading', { name: 'Cita agendada con éxito' }).click();

  // Paso 13: Cerrar el modal de confirmación haciendo clic en el botón "Aceptar".
  await page.getByRole('button', { name: 'Aceptar' }).nth(1).click();
});
