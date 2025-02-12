require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password
    },
});

app.post('/send-email', async (req, res) => {
    const { fullName, phone, email, selectedCourses } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Send confirmation to the user
        subject: 'Enrollment Confirmation',
        text: `Hello ${fullName},\n\nYou have successfully enrolled in the following programs:\n${selectedCourses.join(
            ', '
        )}.\n\nWe will contact you at ${phone} for further details.\n\nBest Regards,\nYour Learning Platform`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
