import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query, method, body } = req;

  const apiUrl = `https://www.dropbox.com/scl/fi/dnya07isacbkq7okti7vg/quake2.data?rlkey=cmvb9dlrx4al6o59e07o45wtz&st=cahd3xro&dl=1`;

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: {
        ...req.headers,
        host: new URL(apiUrl).host,
      },
      body: method !== 'GET' ? body : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error('Proxy request error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
}