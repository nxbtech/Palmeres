const nodemailer = require('nodemailer');

exports.sendContact = async (req, res) => {
  const { name, email, phone, website, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_app_password',
    },
  });

  const mailOptions = {
    from: email,
    to: 'your_email@gmail.com',
    subject: `Contact from ${name} - ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email' });
  }
};