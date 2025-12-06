import { ImapFlow } from 'imapflow';

export async function getLastEmail(email: string, appPassword: string) {
  const client = new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
      user: email,
      pass: appPassword
    }
  });

  await client.connect();

  const lock = await client.getMailboxLock('INBOX');
  let lastMsg;

  // Recorremos los mensajes y guardamos el último
  for await (const msg of client.fetch('*', {
    envelope: true,
    source: true,
  })) {
    lastMsg = msg;
  }

  lock.release();
  await client.logout();

  if (!lastMsg || !lastMsg.envelope) {
    throw new Error('No emails found in inbox');
  }

  if (!lastMsg.envelope.from || lastMsg.envelope.from.length === 0) {
    throw new Error('No sender address found in email');
  }

  return {
    subject: lastMsg.envelope.subject,
    from: lastMsg.envelope.from[0].address,
    body: lastMsg.source ? lastMsg.source.toString() : ''
  };
}
