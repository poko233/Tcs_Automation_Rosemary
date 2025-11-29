// ------ TITULO ---------------------
//Verificar disponibilidad de horarios Calendario FIXER
//QA a cargo: .....

//----DESCRIPCION -------
// El siguiente test case tiene por objeto verificar la disponibilidad
// de un FIXER en el calendario, navegando por la vista mensual, semanal
// y diaria

import { test, expect } from '@playwright/test';

test.use({
  launchOptions: { slowMo: 1000 },
});

test('Verificar navegación en Calendario (Mensual/Semanal/Diaria)', async ({ page }) => {
  // 1. Ir a la página
  await page.goto('https://servineo-frontend-lorem-1ffgpwync-sergio-maldonados-projects.vercel.app/');
  
  // 2. Navegar al calendario
  await page.getByRole('link', { name: 'perfil' }).click();
  await page.getByRole('link', { name: 'Ver Calendario' }).click();
  
  // 3. Probar navegación de fechas
  await page.getByRole('button', { name: 'Siguiente' }).click();
  
  // 4. Probar cambio de vistas
  await page.getByRole('button', { name: 'Semana', exact: true }).click();
  await page.getByRole('button', { name: 'Día', exact: true }).click();
  
  // 5. Volver a vista mes y anterior
  await page.getByRole('button', { name: 'Mes' }).click();
  await page.getByRole('button', { name: 'Anterior' }).click();

  // Opcional: Una pausa final de 2 segundos para que veas el resultado antes de que se cierre
  await page.waitForTimeout(2000); 
});