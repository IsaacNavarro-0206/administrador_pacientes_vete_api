import nodemailer from 'nodemailer';

const emailReigstro = async datos => {
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
        subject: "Comprueba tu cuenta en APV",
        text: "Comprobar tu cuenta",
        html: `<p>Hola ${nombre}, comprueba tu cuenta en APV.</p>
            <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>
            
            <p>Si tú no creaste esta cuenta, puedes ignorar este correo.</p>`
    });

    console.log('Mensaje enviado: %s', info);
}

export default emailReigstro;