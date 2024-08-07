// pages/api/getFrontendLink.js
export default function handler(req, res) {
    const link = 'https://www.dropbox.com/scl/fi/dnya07isacbkq7okti7vg/quake2.data?rlkey=cmvb9dlrx4al6o59e07o45wtz&st=cahd3xro&dl=1';
    res.status(200).json({ link });
  }
  