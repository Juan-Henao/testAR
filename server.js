const https = require('https');
const fs = require('fs');
const path = require('path');

const hostname = '192.168.1.9'; // Cambia a tu dirección IP local si quieres acceder desde otros dispositivos en tu red
const port = 3000; // Cambia el puerto si es necesario

const options = {
    key: fs.readFileSync(path.join(__dirname, './key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './cert.pem'))
  };

  const server = https.createServer(options, (req, res) => {

  const filePath = path.join(__dirname, './index.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Error: Archivo no encontrado');
      return;
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en https://${hostname}:${port}/`);
});
