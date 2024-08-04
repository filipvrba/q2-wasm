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

    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching file');
  }
}
