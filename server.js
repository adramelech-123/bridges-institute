import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rate limiter: Allows max 3 requests per 5 minutes per IP
const emailLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Max 3 requests per windowMs
    message: {
        success: false,
        message: "Too many requests! Please wait a few minutes before trying again."
    },
    headers: true
});

// Nodemailer Transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your app password
    }
});

app.get('/', (req, res) => {
    res.send('Server is running. Welcome to Bridges Institute API!');
});

// API Route for sending email with rate Limiter
app.post('/send-email',emailLimiter, async (req, res) => {
    const { fullName, phone, email, selectedCourses } = req.body;
    const submissionTime = new Date().toLocaleString(); // Capture the submission time

    try {
        // Email to the user (Confirmation Email)
        const userMailOptions = {
            from: `"Bridges Institute" <${process.env.EMAIL_USER}>`,
            to: email, 
            subject: "Enrollment Confirmation - Thank You for Registering!",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; background-color: white; padding: 20px; border-radius: 10px; margin: auto;">
                    <h2 style="color: #4a00e0; text-align: center;">🎉 Enrollment Confirmation 🎉</h2>
                    <p>Dear <strong>${fullName}</strong>,</p>
                    <p>Thank you for enrolling in our programs! We have successfully received your application. Below are your enrollment details:</p>
                    
                    <div style="background: #f9f9f9; padding: 15px; border-left: 5px solid #4a00e0; margin: 20px 0;">
                        <p><strong>📛 Name:</strong> ${fullName}</p>
                        <p><strong>📧 Email:</strong> ${email}</p>
                        <p><strong>📞 Phone:</strong> ${phone}</p>
                        <p><strong>📚 Selected Courses:</strong> ${selectedCourses.length > 0 ? selectedCourses.join(', ') : 'No courses selected'}</p>
                    </div>
        
                    <p>📅 We will contact you shortly with further details.</p>
                    <p>If you have any questions, feel free to contact us on WhatsApp: +263771326080.</p>
        
                    <p>Best Regards,</p>
                    <p><strong>Bridges Team</strong></p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="text-align: center; font-size: 12px; color: #666;">This is an automated email. Please do not reply.</p>
                </div>
            </div>
            `
        };
        
        // Email to the admin (Admin Notification)
        const adminMailOptions = {
            from: `"Bridges Institute" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL, // Replace with the institute's email
            subject: "New Enrollment Notification",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; background-color: white; padding: 20px; border-radius: 10px; margin: auto;">
                        <h2 style="color: #e0004a; text-align: center;">📩 New Enrollment Received</h2>
                        <p>A new student has enrolled. Here are the details:</p>

                        <div style="background: #f9f9f9; padding: 15px; border-left: 5px solid #e0004a; margin: 20px 0;">
                            <p><strong>📛 Name:</strong> ${fullName}</p>
                            <p><strong>📧 Email:</strong> ${email}</p>
                            <p><strong>📞 Phone:</strong> ${phone}</p>
                            <p><strong>📚 Selected Courses:</strong> ${selectedCourses.length > 0 ? selectedCourses.join(', ') : 'No courses selected'}</p>
                            <p><strong>⏳ Submission Time:</strong> ${submissionTime}</p>
                        </div>

                        <p>📌 Please review and follow up accordingly.</p>

                        <p>Best Regards,</p>
                        <p><strong>Automated Enrollment System</strong></p>
                        <hr style="border: none; border-top: 1px solid #ddd;">
                        <p style="text-align: center; font-size: 12px; color: #666;">This is an automated notification.</p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        res.status(200).json({ success: true, message: 'Emails sent successfully!' });

    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ success: false, message: 'Emails could not be sent.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
