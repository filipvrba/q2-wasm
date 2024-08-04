// api/download.js
import axios from 'axios';
import { JSDOM } from 'jsdom';  // Používáme jsdom pro parsing HTML

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing file ID parameter' });
  }

  try {
    // 1. Stáhnout HTML obsah
    const htmlResponse = await axios.get(`https://drive.google.com/uc?export=download&id=${id}`);
    const htmlContent = htmlResponse.data;

    // 2. Parsovat HTML a získat uuid a at
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    const uuid = document.querySelector('input[name="uuid"]').value;
    const at = document.querySelector('input[name="at"]').value;

    // 3. Sestavit URL pro stažení souboru
    const downloadUrl = `https://drive.usercontent.google.com/download?id=${id}&export=download&authuser=0&confirm=t&uuid=${uuid}&at=${at}`;

    res.status(500).send(downloadUrl);

    // 4. Stáhnout soubor
    const fileResponse = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    // 5. Nastavit hlavičky pro stažený soubor
    res.setHeader('Content-Type', fileResponse.headers['content-type'] || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="quake2.data"`);
    res.setHeader('Content-Length', fileResponse.headers['content-length']);

    res.send(fileResponse.data);
  } catch (error) {
    console.error("Error fetching file", error);
    res.status(500).send('Error fetching file');
  }
}
