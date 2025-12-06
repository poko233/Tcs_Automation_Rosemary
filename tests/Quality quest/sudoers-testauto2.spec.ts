import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sudoers.servineo.app/');
  await page.getByRole('link', { name: 'Requesters' }).click();
  await page.getByRole('link', { name: 'View Completed Jobs' }).click();
  await page.getByRole('button', { name: 'Rate job' }).first().click();
  await page.getByText('★').nth(2).click();
  await page.getByRole('textbox', { name: 'Escribe tu comentario (mínimo' }).click();
  await page.getByRole('textbox', { name: 'Escribe tu comentario (mínimo' }).fill('Buen trabajo bien trabajado');
  await page.getByRole('button', { name: 'Submit Review' }).click();
});