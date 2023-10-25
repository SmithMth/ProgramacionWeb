const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const Papa = require('papaparse');
const fs = require('fs');

const app = express();

// Configuración de multer para almacenar archivos subidos en la carpeta "uploads"
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/registrar_aulas_por_lote', upload.single('csvFile'), (req, res) => {
    const csvFilePath = req.file.path;
    const aulasData = fs.readFileSync(csvFilePath, 'utf8');

    Papa.parse(aulasData, {
        header: true,
        skipEmptyLines: true,
        complete: async function(results) {
            let addedCount = 0;

            for (let aula of results.data) {
                const { nombre, descripcion, capacidad, activo, tipoAmbiente } = aula;
                // Convertir "si" y "no" a valores booleanos
                const isActivo = activo.toLowerCase() === 'si' ? 1 : 0;
                try {
                    // Llamada al procedimiento almacenado
                    const [rows] = await db.promise().query("CALL agregar_ambiente(?, ?, ?, ?, ?)", [nombre, descripcion, parseInt(capacidad), parseInt(tipoAmbiente), isActivo]);
                    if (rows.affectedRows > 0) {
                        addedCount++;
                    }
                } catch (error) {
                    console.error('Error al insertar aula:', aula, error);
                }
            }
            // Elimina el archivo CSV una vez procesado
            fs.unlinkSync(csvFilePath);
            res.send(`${addedCount} aulas agregadas con éxito.`);
        }
    });
});



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'web'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    if (req.query.error) {
        res.send('credenciales incorrectos! <a href="/">Volver al login</a>');
    } else {
        res.sendFile(path.join(__dirname, 'views', 'login.html'));
    }
});

app.post('/login', (req, res) => {
    const { nombre, contraseña } = req.body;
    db.query("CALL iniciar_sesion(?, ?)", [nombre, contraseña], (err, results) => {
        if (err) {
            return res.status(500).send('Error en el servidor.');
        }
        if (results[0] && results[0].length > 0) {
            // Redireccionar a la página de registro de aulas si las credenciales son correctas
            res.redirect('/registro_aulas');
        } else {
            // Redireccionar al inicio de sesión con un mensaje de error si las credenciales no son válidas
            res.redirect('/?error=1');
        }
    });
});


app.get('/registro_aulas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro_aulas.html'));
});


app.get('/ver_aulas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ver_aulas.html'));
});

app.get('/api/aulas', (req, res) => {
    const query = `
        SELECT 
            ambientes.id,
            ambientes.nombre AS nombre, 
            ambientes.capacidad,
            ambientes.descripcion,
            ambientes.activo,
            tipos_ambientes.nombre AS tipo,
            GROUP_CONCAT(facilidades.nombre) AS facilidades
        FROM ambientes
        JOIN tipos_ambientes ON ambientes.tipos_ambientes_id = tipos_ambientes.id
        LEFT JOIN facilidades_ambientes ON ambientes.id = facilidades_ambientes.ambientes_id
        LEFT JOIN facilidades ON facilidades_ambientes.facilidades_id = facilidades.id
        GROUP BY ambientes.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener las aulas" });
        }
        res.json(results);
    });
});



app.post('/registrar_aula', (req, res) => {
    const { nombre, descripcion, capacidad, tipoAmbiente } = req.body;
    const activo = req.body.activo ? 1 : 0; // Ajustado para que sea un entero
    const callProcedure = "CALL agregar_ambiente(?, ?, ?, ?, ?)";
    db.query(callProcedure, [nombre, descripcion, capacidad, tipoAmbiente, activo], (err, result) => {
        if (err) {
            console.error(err);
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


//TIPOS DE AMBIENTES
app.get('/api/tipos_ambientes', (req, res) => {
    const query = "SELECT * FROM tipos_ambientes";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener los tipos de ambientes" });
        }
        res.json(results);
    });
});
