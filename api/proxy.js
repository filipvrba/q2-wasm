export default async (req, res) => {
    const apiUrl = 'https://www.dropbox.com/scl/fi/dnya07isacbkq7okti7vg/quake2.data?rlkey=cmvb9dlrx4al6o59e07o45wtz&st=cahd3xro&dl=1';
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.arrayBuffer();  // nebo response.blob() podle potřeby
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(Buffer.from(data));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};