import nodemailer from 'nodemailer';

const emailOlvidePassword = async datos => {
    // Credenciales para crear una instancia de nodemailer
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { nombre, email, token } = datos;

    // Enviar email
    const info = await transport.sendMail({
        from: "APV - Administrador de pacientes de veterinaria",
        to: email,
        subject: "Restablecer tu contraseña",
        text: "Restablece tu contraseña",
        html: `<p>Hola ${nombre}, has solicitado restableces tu contraseña.</p>
            <p>Sigue en el siguiente enlace para poder restablecer la contraseña:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer contraseña</a></p>
            
            <p>Si tú no pediste el restablecer tu contraseña, puedes ignorar este correo.</p>`
    });

    console.log('Mensaje enviado: %s', info.messageId);
}

export default emailOlvidePassword;