
import { test, expect } from '@playwright/test';
import { getLastEmail } from './emailUtils';

test('Verificar que el remitente en la notificacion en correo se muestra como servineo', async () => {
  
  const email = await getLastEmail(
    'adhemar00333@gmail.com',
    'fysw tjjj jwrm wxru'
  );

  // Verificar remitente
  expect(email.from).toContain('servineo');
  //expect(email.body).toContain('adhemar cruz');
});
