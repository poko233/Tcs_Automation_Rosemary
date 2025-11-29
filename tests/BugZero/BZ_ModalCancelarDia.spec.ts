// ------ TITULO ---------------------
//Verificar Carga de citas en Modal Cancelacion Dia
//QA a cargo: .....

//----DESCRIPCION -------
// El siguiente test case tiene por objeto verificar la carga de citas
// agendadas, navegando entre meses y para poder ver las citas que se
// pueden cancelar.
// QA a cargo: .....

import { test, expect } from '@playwright/test';

test.use({
  launchOptions: { slowMo: 1000 },
});


test('Verificar Carga de citas en Modal Cancelacion Dia', async ({ page }) => {
  // 1. Navegar a la aplicación
  await page.goto('https://servineo-frontend-lorem-1ffgpwync-sergio-maldonados-projects.vercel.app/');
  
  // 2. Ir al Calendario
  await page.getByRole('link', { name: 'perfil' }).click();
  await page.getByRole('link', { name: 'Ver Calendario' }).click();
  
  // 3. Abrir el modal de cancelar citas
  await page.getByRole('button', { name: 'Cancelar Citas' }).click();
  
  // 4. Navegar dentro del modal (Clics en botones de navegación)
  // Nota: Estos selectores usan índices (.nth(3)), si la interfaz cambia podrían fallar.
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();

  // 5. Pausa final para observar el resultado antes de cerrar
  await page.waitForTimeout(2000);
});