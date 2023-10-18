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
        skipEmptyLines: true,  // Esto omitirá las líneas vacías
        complete: async function(results) {
            let addedCount = 0;
    
            for (let aula of results.data) {
                const { nombre, descripcion, capacidad, activo } = aula;
    
                // Convertir "si" y "no" a valores booleanos
                const isActivo = activo.toLowerCase() === 'si';
    
                try {
                    const [rows] = await db.promise().query("INSERT INTO aula (nombre, descripcion, capacidad, activo, fecha_registro) VALUES (?, ?, ?, ?, ?)", [nombre, descripcion, parseInt(capacidad), isActivo, new Date()]);
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
    const query = "INSERT INTO aula (nombre, descripcion, capacidad, activo, fecha_registro) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [nombre, descripcion, capacidad, activo, new Date()], (err, result) => {
        if (err) {
            console.error(err);
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
