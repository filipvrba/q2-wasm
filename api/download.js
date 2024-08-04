import axios from 'axios';

export default async function handler(req, res) {
    const fileId = 'id:8Hd1Gj6sMs4AAAAAAAAAEA'
    const ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN; // Vložte svůj Dropbox access token

    try {
        const response = await axios({
            url: 'https://content.dropboxapi.com/2/files/download',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Dropbox-API-Arg': JSON.stringify({ path: fileId }),
                'Content-Type': ''
            },
            responseType: 'arraybuffer'
        });

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${fileId}"`);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching file from Dropbox:', error);
        res.status(500).send('Error fetching file from Dropbox');
    }
}
