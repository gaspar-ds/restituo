require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

// Ruta para manejar el formulario de contacto
app.post('/contacto', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: `"${nombre}" <${email}>`,
            to: process.env.MAIL_TO,
            subject: 'Nuevo mensaje desde el formulario de contacto',
            text: mensaje,
            html: `<p><strong>Nombre:</strong> ${nombre}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Mensaje:</strong><br>${mensaje}</p>`
        };

        await transporter.sendMail(mailOptions);
        res.send('Mensaje enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).send('Error al enviar el mensaje');
    }
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
