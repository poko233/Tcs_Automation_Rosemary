
import { test, expect } from '@playwright/test';
import { getLastEmail } from './emailUtils';

test('Verificar que la notificacion de nuevas ofertas se envia al correo', async () => {
  
  const email = await getLastEmail(
    'adhemar00333@gmail.com',
    'fysw tjjj jwrm wxru'
  );

  // Verificar nuevas ofertas
  //console.log(email.body);
  expect(email.body).toContain('nuevas promociones');
});
