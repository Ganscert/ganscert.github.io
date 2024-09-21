const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde el directorio raíz
app.use(express.static(__dirname));

// Ruta para manejar las solicitudes que no coinciden con archivos estáticos
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
