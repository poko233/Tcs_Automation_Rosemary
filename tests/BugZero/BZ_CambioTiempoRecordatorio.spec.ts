// ------ TITULO ---------------------
//Verificar selección de unidad de tiempo en configurar recordatorio.
//QA a cargo: Rocha Medina Vivian Ruby

//----DESCRIPCION -------
// Al ingresar al modal de agendar cita desde la vista del Requester, se visualizan todos los campos para agendar la cita,
// incluyendo el apartado de Configurar tiempo de recordatorio el cual debe estar en la parte inferior,
// donde si hacemos clic en el botón "Configurar Tiempo de Recordatorio" se despliega el modal,
// quedando al lado derecho el dropdown para unidad de tiempo (minutos, horas, días),
// donde si selecciono otra opción a la por defecto, esta seleccion debe actualizarse
// en el campo del modal Agendar Cita, llamado "Tiempo de Recordatorio: "

import { test, expect } from '@playwright/test';

test('Verificar selección de unidad de tiempo en configurar recordatorio', async ({ page }) => {
  // Paso 1: Ingresar a la aplicación Servineo en idioma Español.
  await page.goto('https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es');

  // Paso 2: Desde la pantalla inicial, acceder a la vista del Requester.
  await page.getByRole('link', { name: 'Acceder Requester' }).click();

  // Paso 3: Cambiar la vista del calendario a vista "Día".
  await page.getByRole('button', { name: 'Día' }).click();

  // Paso 4: Navegar en el calendario usando el botón "Siguiente" (avanzar varios días).
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('button', { name: 'Siguiente' }).click();

  // Paso 5: Seleccionar un slot horario disponible para agendar una cita.
  await page.getByText('Disponible').first().click();

  // Paso 6: Dentro del modal "Agendar Cita", abrir la sección "Configurar Tiempo de Recordatorio".
  await page.getByRole('button', { name: '🔔 Configurar Tiempo de' }).click();

  // Paso 7: Desplegar el dropdown de selección de unidad/tiempo de recordatorio.
  await page.getByRole('button', { name: '▾' }).click();

  // Paso 8: Seleccionar una opción distinta a la que está por defecto (ejemplo: 45).
  await page.getByRole('button', { name: '45' }).click();

  // Paso 9: Confirmar la configuración del tiempo de recordatorio en el modal de configuración.
  await page.getByRole('button', { name: 'Configurar', exact: true }).click();

  // Paso 10: Verificar/consultar que en el campo de texto de "Tiempo de Recordatorio"
  // se haya actualizado el valor mostrado de acuerdo a la selección realizada.
  await page
    .locator(
      '.mt-1.block.w-full.bg-gray-100.border.border-gray-200.rounded.px-3.py-2.text-sm.text-center'
    )
    .click();
});
