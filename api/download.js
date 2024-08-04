import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  const fileUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  try {
    // Při stahování velkých souborů může Google Drive vracet stránku s varováním
    // Využijeme knihovnu Axios pro stahování souborů
    const response = await axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    // Kontrola hlaviček a přesměrování, pokud je to nutné
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="quake2.data"`); 
    res.setHeader('Content-Length', response.headers['content-length']);

    res.send(response.data);
  } catch (error) {
    console.error("Error fetching file", error);
    res.status(500).send('Error fetching file');
  }
}
