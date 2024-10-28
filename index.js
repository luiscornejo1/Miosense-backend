require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Ruta principal para recibir datos
app.post('/data', (req, res) => {
  const { muscle, value } = req.body;

  if (!muscle || value === undefined) {
    return res.status(400).send("Datos incompletos: se necesita 'muscle' y 'value'");
  }

  console.log(`Músculo: ${muscle}, Valor: ${value}`);

  // Aquí puedes almacenar los datos en una base de datos o procesarlos.
  // Por ahora, solo enviaremos una respuesta de éxito.
  res.status(200).send({ message: "Datos recibidos correctamente", muscle, value });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
