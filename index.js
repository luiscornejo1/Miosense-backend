require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importa CORS

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Permitir solicitudes desde cualquier origen
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

// Ruta para recibir los datos desde el ESP32
app.post('/data', (req, res) => {
  const { muscle, value } = req.body;

  if (!muscle || value === undefined) {
    return res.status(400).send("Datos incompletos: se necesita 'muscle' y 'value'");
  }

  console.log(`Músculo: ${muscle}, Valor: ${value}`);

  // Emitir los datos a todos los clientes conectados
  io.emit('muscleData', { muscle, value });

  res.status(200).send({ message: "Datos recibidos correctamente", muscle, value });
});

// Manejo de conexiones WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor en el puerto asignado
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
