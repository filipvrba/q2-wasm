import axios from 'axios';

export default async function handler(req, res) {
    const file         = req.query.file;
    const filePath     = `/${file}`;
    const ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;

    try {
        const response = await axios({
            url: 'https://api.dropboxapi.com/2/files/get_temporary_link',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                path: filePath
            }
        });

        const { link } = response.data;

        res.status(200).json({ link });
    } catch (error) {
        console.error('Error fetching file from Dropbox:', error);
        res.status(500).send('Error fetching file from Dropbox');
    }
}
