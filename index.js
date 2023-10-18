const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'RegistroAulas'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro_aulas.html'));
});

app.get('/ver_aulas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ver_aulas.html'));
});

app.get('/api/aulas', (req, res) => {
    const query = "SELECT * FROM aula";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener las aulas" });
        }
        res.json(results);
    });
});



app.post('/registrar_aula', (req, res) => {
    const { nombre, descripcion, capacidad } = req.body;
    const activo = req.body.activo ? true : false;
    const query = "INSERT INTO aula (nombre, descripcion, capacidad, activo) VALUES (?, ?, ?, ?)";

    db.query(query, [nombre, descripcion, capacidad, activo], (err, result) => {
        if (err) {
            // Puedes ser más específico aquí verificando el tipo de error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('El nombre del aula ya está registrado.');
            }
            return res.status(500).send('Hubo un error al registrar el aula.');
        }
        res.send('Aula registrada exitosamente!');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
