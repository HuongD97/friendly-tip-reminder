const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const api_key = escape(process.env.MAILGUN_API_KEY);
const DOMAIN = 'sandbox6580114275734466bcb6d7f5550776fb.mailgun.org';
const mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: DOMAIN,
});
// const testEmailAddress = `huongd97@gmail.com`;
const testEmailAddresses = [
    'huongsocial@gmail.com',
    'huongd97@gmail.com',
    'jannyjenny811@gmail.com',
    'huong.cfp@gmail.com',
];
const testEmailAddress = `huongsocial@gmail.com`;
const myAccount = `Huong Dang <huongd97@gmail.com>`;

app.prepare()
    .then(() => {
        const server = express();

        server.post('/sendHTMLEmail', (req, res) => {
            const payload = {
                from: myAccount,
                to: testEmailAddress,
                subject: `An HTML email`,
                text: 'Sending message from me to me :)',
                html: `
                <html>
                <head></head>
                <body><p><b>what up</b></p></body>
                </html>
                `,
            };
        });
        server.post('/sendEmail', (req, res) => {
            const data = {
                from: 'Huong Dang <huongd97@gmail.com>',
                to: testEmailAddress,
                subject: 'Hello',
                text: 'Sending message from me to me :)',
            };

            mailgun.messages().send(data, function(error, body) {
                if (error) res.json(error);
                else {
                    res.json(body);
                }
            });
        });
        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
