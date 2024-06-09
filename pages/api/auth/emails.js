import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });
  const gmail = google.gmail({ version: 'v1', auth });

  const response = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
  const messages = response.data.messages;

  let emails = [];
  for (let message of messages) {
    const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
    emails.push(msg.data);
  }

  res.status(200).json(emails);
}
