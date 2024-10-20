const d3 = require('./Library/d3.js');
const { shell } = require('@electron/remote');
const { dialog} = require('electron');
var fs = require('fs');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const fileInput = document.getElementById('file-input');
const localDeviceButton = document.getElementById('CSVbutton');
const TemplateInput = document.getElementById('template-input');
const TemplateButton = document.getElementById('templatebutton');


localDeviceButton.addEventListener('click', () => {
    fileInput.click(); 
});

TemplateButton.addEventListener('click', () => {
    TemplateInput.click(); 
});

//uploading csv or exel data
var CSVdata;
document.getElementById('file-input').addEventListener('change', function() {

    const file = event.target.files[0];
    if(file){
            const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const csvText = reader.result;
            const jsonData = csvToJson(csvText);
            CSVdata = JSON.stringify(jsonData, null, 2);
        };
    }
    function csvToJson(csv) {
        const lines = csv.split('\n'); // Split the CSV into lines
        const result = [];
        const headers = lines[0].split(','); // Get the headers from the first line

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentLine = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentLine[j]?.trim(); // Store each key-value pair
            }

            if (Object.keys(obj).length > 0) { // Only add non-empty objects
                result.push(obj);
            }
        }
        return result;
    }
    
});

document.getElementById('template-input').addEventListener('change', function() {
    
    
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = event => {
            TemplateData = event.target.result;
            document.getElementById('emailBody').innerHTML=TemplateData;
            
        };
        
        reader.onerror = error => console.error(error);
        
        reader.readAsText(file);
    }
});


class MailConfig {
    constructor(timeInterval, subject) {
        this.mailData = JSON.parse(CSVdata); // Ensure CSVdata is an array
        this.mailCounter = 0;
        this.template = document.getElementById('emailBody').innerHTML;

        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email provider
            auth: {
                user: 'nihalthomas15@gmail.com', // Your email 
                pass: 'vxqgtfefcfaxosrl'  // Your app password
            }
        });

        this.subject = subject;
        this.Cronjob = cron.schedule(`*/${timeInterval} * * * * *`, () => {
            this.sendMail();
        }, {
            scheduled: false
        });
    }

    start() {
        this.Cronjob.start();
    }

    sendMail() {
        if (this.mailCounter < this.mailData.length) {
            let row = this.mailData[this.mailCounter]; // Get current row
            let emailBody = this.template.replace(/{(\w+)}/g, (_, key) => row[key] || '');
            let recipientEmail = row['mail'];
            let mailOptions = {
                from: 'nihalthomas15@gmail.com', // Your email 
                to: recipientEmail,
                subject: this.subject,
                html: emailBody
            };

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(`Error sending email to ${recipientEmail}:`, error);
                } else {
                    console.log(`Email sent to ${recipientEmail}: ${info.response}`);
                }
            });

            this.mailCounter++; // Move to the next row
        } else {
            this.Cronjob.stop(); // Stop cron job if all emails are sent
        }
    }
}





function userLogin(){
    shell.openExternal("http://localhost:3000/");
}