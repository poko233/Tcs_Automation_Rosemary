
import { test, expect } from '@playwright/test';
import { getLastEmail } from './emailUtils';

test('Verificar que se muestra el nombre en la notificacion en correo', async () => {
  
  const email = await getLastEmail(
    'adhemar00333@gmail.com',
    'fysw tjjj jwrm wxru'
  );

  // Verificar nombre
  expect(email.body).toContain('adhemar cruz');
});
