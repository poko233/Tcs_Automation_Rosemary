// Verificar limite de caracteres no mas de 300 en justificación.
//Verificar disponibilidad de horarios Calendario FIXER
//QA a cargo: Max Diego Copa Ovando

//----DESCRIPCION -------
// El campo “ Justificación ” debe restringir la longitud máxima
//  definida por el sistema (300 caracteres).
import { test, expect } from '@playwright/test';

test('Verificar limite de caracteres no mas de 300 en justificación', async ({ page }) => {
  //ingresamos al link 
  await page.goto('https://servineo-frontend-lorem-3niapthx8-sergio-maldonados-projects.vercel.app/es/calendar?role=requester');
  //home visible y cambimos a requester
  await page.getByRole('link', { name: 'Acceder Requester' }).click();
  //cambiamos a vista semanal
  await page.getByRole('button', { name: 'Semana' }).click();
  //nos movemos a otra fecha
  await page.getByRole('button', { name: 'Siguiente' }).click();
  //hacemos clic en cita reservada
  await page.getByText('Reservado').first().click();
  //hacemos clic en reprogrmar cita
  await page.getByRole('button', { name: 'Reprogramar' }).click();
 //confirmamos que queremos reprogramar
  await page.getByRole('button', { name: 'Confirmar' }).click();
//ingresamos la justificacion que es mas de 300 caacteres
  await page.getByRole('textbox', { name: 'Describe brevemente el motivo…' }).click();
  await page.getByRole('textbox', { name: 'Describe brevemente el motivo…' }).press('ControlOrMeta+b');
  await page.getByRole('textbox', { name: 'Describe brevemente el motivo…' }).fill('Para "dar más de 300 caracteres", necesitas escribir un texto que supere ese número, y la mejor manera es usar un contador de caracteres en herramientas como Word (pestaña "Revisar" > "Contar palabras") o sitios web como Expertouniversitario.es para verificarlo, ya que 300 caracteres son aproximadam');
  //verificamos que no nos deje ingrear mas de 300 caracteres
  await page.getByText('300/300').click();
});