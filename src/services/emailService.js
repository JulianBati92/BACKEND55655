import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    // Configuración del servicio de correo electrónico
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(userEmail, verificationCode) {
    try {
      // Contenido del correo electrónico con la plantilla y el código de verificación
      const mailOptions = {
        from: `CODER <${process.env.G_MAIL}>`,
        to: userEmail, // Utiliza el correo electrónico del usuario
        subject: `Usuario Registrado!`,
        html: `<h1>Gracias por registrarte. Tu código de verificación es: ${verificationCode}</h1>`,
      };

      // Envío del correo electrónico
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar el correo electrónico de verificación:', error);
    }
  }
}

export default EmailService;
