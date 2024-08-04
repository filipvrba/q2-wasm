import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  const fileUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  try {
    const response = await axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    // Uložení typu obsahu do hlavičky
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Disposition', `attachment; filename="quake2.data"`); // Nastavení názvu souboru
    res.setHeader('Content-Length', response.headers['content-length']);

    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching file');
  }
}
