import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  const DROPBOX_APP_KEY = 'wuz68gb2c2v0dew';
  const DROPBOX_APP_SECRET = 'p4j2qddohxkxkxi';
  const REDIRECT_URI = 'http://localhost:3000';

  const tokenUrl = 'https://api.dropbox.com/oauth2/token';

  const params = new URLSearchParams();
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('client_id', DROPBOX_APP_KEY);
  params.append('client_secret', DROPBOX_APP_SECRET);
  params.append('redirect_uri', REDIRECT_URI);

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();
    if (response.ok) {
      res.status(200).json({ accessToken: data.access_token });
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
}
