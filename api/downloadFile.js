const { spawn } = require('child_process');

export default async function handler(req, res) {
  const { fileUrl } = req.query; // URL souboru v Git LFS

  // Spustit git-lfs-fetch pro stahování souboru
  const gitLfsProcess = spawn('git-lfs-fetch', [fileUrl]);

  gitLfsProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  gitLfsProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  gitLfsProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
      res.status(200).send('File downloaded successfully.');
    } else {
      res.status(500).send('Failed to download file.');
    }
  });
}
