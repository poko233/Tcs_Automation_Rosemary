/** Verificar que el requester puede calificar un trabajo **/

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sudoers.servineo.app/');

  //Hacer click en Requester
  await page.getByRole('link', { name: 'Requesters' }).click();

  //Hacer click en View Completed Jobs
  await page.getByRole('link', { name: 'View Completed Jobs' }).click();

  //Hacer clicn en Rated Job 
  await page.getByRole('button', { name: 'Rate job' }).first().click();

  //Marcar las estrellas de calificacion 
  await page.getByText('★').nth(2).click();

  //Escribir el comentario de la calificacion
  await page.getByRole('textbox', { name: 'Escribe tu comentario (mínimo' }).click();

  //Trabajo escrito en descripcion
  await page.getByRole('textbox', { name: 'Escribe tu comentario (mínimo' }).fill('Buen trabajo bien trabajado');

  //Hacer click en Enviar Review
  await page.getByRole('button', { name: 'Submit Review' }).click();
});