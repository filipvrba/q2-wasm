import axios from 'axios';
import cheerio from 'cheerio'; // Používáme cheerio pro parsing HTML

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    console.error('Missing file ID parameter');
    return res.status(400).json({ error: 'Missing file ID parameter' });
  }

  try {
    // 1. Stáhnout HTML obsah
    console.log(`Fetching HTML content from: https://drive.google.com/uc?export=download&id=${id}`);
    const htmlResponse = await axios.get(`https://drive.google.com/uc?export=download&id=${id}`, { timeout: 10000 });
    const htmlContent = htmlResponse.data;

    // 2. Parsovat HTML a získat uuid a at
    const $ = cheerio.load(htmlContent);
    const uuid = $('input[name=uuid]').val();
    const at = $('input[name=at]').val();

    console.log(`Parsed UUID: ${uuid}`);
    console.log(`Parsed AT: ${at}`);

    // Ověření, že uuid a at nejsou undefined
    if (!uuid) {
      console.error('Failed to extract uuid or at');
      return res.status(500).json({ error: 'Failed to extract uuid or at' });
    }

    // 3. Sestavit URL pro stažení souboru
    const downloadUrl = `https://drive.usercontent.google.com/download?id=${id}&export=download&authuser=0&confirm=t&uuid=${uuid}&at=${at}`;
    console.log(`Download URL: ${downloadUrl}`);

    // 4. Stáhnout soubor
    console.log('Fetching the file from download URL');
    const fileResponse = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: 30000
    });

    // 5. Nastavit hlavičky pro stažený soubor
    res.setHeader('Content-Type', fileResponse.headers['content-type'] || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="quake2.data"`);
    res.setHeader('Content-Length', fileResponse.headers['content-length']);

    console.log('Sending file response');
    res.send(fileResponse.data);
  } catch (error) {
    console.error("Error fetching file", error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    res.status(500).send('Error fetching file');
  }
}
