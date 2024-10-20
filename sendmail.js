const fs = require('fs');
const nodemailer = require('nodemailer');
const csv = require('csv-parser');
require('dotenv').config();

// Create a transporter object using nodemailer
const pass = process.env.APP_PASS;
const mail_id = process.env.MAIL_ID;
let transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider
    auth: {
        user: mail_id,  // Your email 
        pass: pass  // Your app password
    }
});

// Function to send email
function sendMail(emailBody, subject, recipientEmail) {
    let mailOptions = {
        from: user, 
        to: recipientEmail,
        subject: subject,
        html: emailBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error sending email to ${recipientEmail}:`, error);
        } else {
            console.log(`Email sent to ${recipientEmail}: ${info.response}`);
        }
    });
}

// Function to handle email sending using CSV data, email body, and subject
function sendEmailsFromCSV(csvFilePath, emailBody, subject) {
    // Read the CSV file and process each row
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            try {
                // Dynamically replace placeholders using row data
                let personalizedEmailBody = emailBody.replace(/{(\w+)}/g, (_, key) => row[key] || '');

                // Get the recipient email from the CSV row
                let recipientEmail = row['mail'];

                // Send the email with the replaced HTML content and the provided subject
                sendMail(personalizedEmailBody, subject, recipientEmail);
            } catch (error) {
                console.log(`Error processing row:`, error.message);
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
        });
}

module.exports = { sendEmailsFromCSV };
