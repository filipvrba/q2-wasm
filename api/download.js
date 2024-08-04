import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    console.error('Missing file ID parameter');
    return res.status(400).json({ error: 'Missing file ID parameter' });
  }

  try {
    console.log(`Fetching HTML content from: https://drive.google.com/uc?export=download&id=${id}`);
    const htmlResponse = await axios.get(`https://drive.google.com/uc?export=download&id=${id}`);
    const htmlContent = htmlResponse.data;

    // Uložení HTML obsahu do souboru pro kontrolu
    fs.writeFileSync('/mnt/data/downloaded_content.html', htmlContent);
    console.log('HTML content saved to downloaded_content.html');

    const $ = cheerio.load(htmlContent);
    const uuid = $('input[name="uuid"]').val();
    const at = $('input[name="at"]').val();

    console.log(`Parsed UUID: ${uuid}`);
    console.log(`Parsed AT: ${at}`);

    if (!uuid || !at) {
      console.error('Failed to extract uuid or at');
      return res.status(500).json({ error: 'Failed to extract uuid or at' });
    }

    const downloadUrl = `https://drive.usercontent.google.com/download?id=${id}&export=download&authuser=0&confirm=t&uuid=${uuid}&at=${at}`;
    console.log(`Download URL: ${downloadUrl}`);

    console.log('Fetching the file from download URL');
    const fileResponse = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    res.setHeader('Content-Type', fileResponse.headers['content-type'] || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="quake2.data"`);
    res.setHeader('Content-Length', fileResponse.headers['content-length']);

    console.log('Sending file response');
    res.send(fileResponse.data);
  } catch (error) {
    console.error("Error fetching file", error);
    res.status(500).send('Error fetching file');
  }
}
