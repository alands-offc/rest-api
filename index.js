import express from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path, { join } from 'path';
import { gen } from 'n-digit-token';
import yts from 'yt-search';
import { platform } from 'process';
import mime from 'mime-types';
import { fileURLToPath, pathToFileURL } from 'url';
import mongoose from './db/database.js';
import User from './db/handler.js';
import { ssweb, Library, Ai, gpt4, PlayStore, mcpedllist, mcpedld, pixivsearch, nvidia, GoogleGemini, IGDLV2, NasaNews, youtubeDL, tiktokDL, instagramDL, pinterestDL, remini } from './lib/scraper.js';
import { minl, plusl, claimDailyReward, claimWeeklyReward } from './db/limit.js';
import { createRequire } from 'module';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';

dotenv.config();

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { 
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() 
}; 

global.__dirname = function dirname(pathURL) { 
    return path.dirname(global.__filename(pathURL, true)) 
}; 

global.__require = function require(dir = import.meta.url) { 
    return createRequire(dir) 
};

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('json spaces', 2);
console.log('App.js Running Completed');

const __dirname = global.__dirname(import.meta.url);

global.baseurl;
function generateErrorPage(status, message) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error ${status}</title>
  <style>
    body {
      background-image: url('https://www.transparenttextures.com/patterns/snow.png');
      color: white;
      text-align: center;
      font-family: Arial, sans-serif;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0;
    }
    h1 {
      font-size: 5em;
      animation: blink 1s step-end infinite;
    }
    p {
      font-size: 2em;
    }
    a {
      font-size: 1.5em;
      color: lightblue;
      text-decoration: none;
      margin-top: 20px;
    }
    @keyframes blink {
      from, to {
        visibility: hidden;
      }
      50% {
        visibility: visible;
      }
    }
  </style>
</head>
<body>
  <h1>Error ${status}</h1>
  <p>${message}</p>
  <a href="/docs">Back to Docs</a>
</body>
</html>
  `;
}

app.use((req, res, next) => {
    const host = req.get('host');
    const path = req.originalUrl;
    global.baseurl = `https://${host}/`;
    next();
});
process.env.BASE_URL = global.baseurl
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000 // 30 minutes
    },
    store: MongoStore.create({
        mongoUrl: global.mongouri,
        ttl: 30 * 60 // 30 minutes
    })
}));


async function ytdl(url) {
    let lagu = await youtubeDL.mp3(url);
    let video = await youtubeDL.mp4(url);
    let videoResponse = await fetch(video.videoUrl);
    let buffer = await videoResponse.buffer();
    let path = "./tmp/" + Date.now() + ".mp4";
    
    await fs.promises.writeFile(path, buffer);
    
    return {
        data: lagu.meta,
        download: {
            video: {
                '360p': baseurl + 'file?path=' + (path) + "&filename=" + encodeURIComponent(lagu.meta.title) + ".mp4"
            },
            audio: {
                '128kbps': baseurl + 'file?path=' + (lagu.path) + "&filename=" + encodeURIComponent(lagu.meta.title) + ".mp3"
            }
        },
    };
}


const openRoutes = ['/claim-rewards', '/login', '/signup', '/file', "/api/", "/verify-email"];

app.use(async (req, res, next) => {
    const isRouteOpen = openRoutes.some(route => req.path.startsWith(route));

    if (isRouteOpen) {
        next();
    } else if (req.session.name) {
        try {
            const user = await User.findOne({ name: req.session.name });
            if (user && user.verified) {
                next();
            } else {
                res.redirect('/signup');
            }
        } catch (err) {
            next(err);
        }
    } else {
        res.redirect('/signup');
    }
});
//router
await (await import("./public/router.js")).default(app, User)
//Features downloader
await (await import("./public/f1.js")).default(app, User, ytdl)
//features tools
await (await import("./public/f2.js")).default(app, User)
//features ai
await (await import("./public/f3.js")).default(app, User)
//features image
await (await import("./public/f4.js")).default(app, User)
// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    debug: true // Enable debugging
  });
function sendVerificationEmail(email, token) {
    const url = `${baseurl}/verify-email?token=${token}`;

    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<p>Please verify your email by clicking the link below:</p><a href="${url}">Verify</a>`
    });
}

async function verifyRecaptcha(token) {
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    });
    const data = await response.json();
    return data.success;
} catch (error) {
  return ({error: true, msg: error})
}
}
app.post('/signup', async (req, res) => {
    const { name, email, pass, 'g-recaptcha-response': token } = req.body;
    if (!await verifyRecaptcha(token)) {
        return res.status(400).send('Recaptcha verification failed');
    }
    try {
        const existingUser = await User.findOne({ email });
        const existingUser2 = await User.findOne({ name })
        if (existingUser) {
          return res.send("email sudah di gunakan")
          } else if (existingUser2) {
            return res.send('name sudah digunakan');
        }
        const apikey = uuidv4();
        const tokenn = gen(6)
        const newUser = new User({ name, email, password: pass, apikey, admin: false, limit: 400, daily: 0, weekly: 0, verified: false, verificationToken: tokenn });
        await newUser.save();
        sendVerificationEmail(email, tokenn); // Fungsi untuk mengirim email verifikasi
        res.send('Registrasi berhasil. Silakan verifikasi email Anda');
    } catch (err) {
        res.status(500).send('Terjadi kesalahan server');
    }
});

app.post('/login', async (req, res) => {
    const { email, pass, 'g-recaptcha-response': token } = req.body;
    if (!await verifyRecaptcha(token)) {
        return res.status(400).send('Recaptcha verification failed');
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send('Pengguna tidak ditemukan');
        }
        if (user.password !== pass) {
            return res.status(400).send('Password salah');
        }
        if (!user.verified) {
            return res.status(400).send('Email belum diverifikasi');
        }
        req.session.name = user.name;
        return res.redirect("/")
    } catch (err) {
        res.send('buka url / secara manual, karna tidak dapat redirect') + err;
    }
});


app.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ verificationToken: token });
        console.log(user)
        if (!user) {
            res.status(400).send('Token verifikasi tidak valid');
        } else {
            user.verified = true;
            user.verificationToken = undefined; // Remove the token after verification
            await user.save();
            res.send('Email berhasil diverifikasi. Anda sekarang dapat login.');
        }
    } catch (err) {
        res.status(500).send('Terjadi kesalahan server' + err);
    }
});
app.get('/login', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AL REST - API</title>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
        }
        h1 {
            text-align: center;
        }
        h1 .al-rest {
            color: white;
        }
        h1 .api {
            color: red;
        }
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;
        }
        input[type="email"],
        input[type="password"] {
            padding: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            color: black;
            background-color: white;
        }
        button {
            padding: 10px 20px;
            font-size: 18px;
            background-color: blue;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: darkblue;
        }
    </style>
</head>
<body>
    <h1><span class="al-rest">AL REST</span> - <span class="api">API</span></h1>
    <form id="yeh" action="/login" method="post">
        <input type="email" name="email" placeholder="Masukkan email" required />
        <input type="password" name="pass" placeholder="Masukkan password" required />
        <div class="g-recaptcha" data-sitekey="${process.env.RECAPTCHA_SITE_KEY}"></div>
        <button type="submit">Submit</button>
    </form>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js"></script>
    <script>
$(document).ready(function() {
$('#yeh').submit(function() {
$(this).ajaxSubmit({
error: function(xhr) {
status('Error: ' + xhr.status);
},
success: function(response) {
alert(response.responseDesc);
}
});
return false; // to disable page refresh
});
});
</script>
</body>
</html>
    `);
});

app.get('/signup', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AL REST - API</title>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
        }
        h1 {
            text-align: center;
        }
        h1 .al-rest {
            color: white;
        }
        h1 .api {
            color: red;
        }
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
            padding: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            color: black;
            background-color: white;
        }
        button {
            padding: 10px 20px;
            font-size: 18px;
            background-color: blue;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: darkblue;
        }
    </style>

</head>
<body>
    <h1><span class="al-rest">AL REST</span> - <span class="api">API</span></h1>
    <form id="yeh" action="/signup" method="post">
        <input type="text" name="name" placeholder="Masukkan nama" required />
        <input type="email" name="email" placeholder="Masukkan email" required />
        <input type="password" name="pass" placeholder="Masukkan password" required />
        <div class="g-recaptcha" data-sitekey="${process.env.RECAPTCHA_SITE_KEY}"></div>
        <button type="submit">Register</button>
    </form>
    <p>sudah punya akun? => <a href="/login">login</a></p>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js"></script>
    <script>
$(document).ready(function() {
$('#yeh').submit(function() {
$(this).ajaxSubmit({
error: function(xhr) {
status('Error: ' + xhr.status);
},
success: function(response) {
alert(response.responseDesc);
}
});
return false; // to disable page refresh
});
});
</script>
</body>
</html>
    `);
});


app.get('/getapikey', async (req, res) => {
  const { name } = req.session;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      res.status(404).send('Pengguna tidak ditemukan');
    } else {
      res.json({ apikey: user.apikey });
    }
  } catch (err) {
    res.status(500).send('Terjadi kesalahan server');
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).send(generateErrorPage(status, err.message || 'Internal Server Error'));
});

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).send(generateErrorPage(404, 'Page Not Found'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
console.log("Web Siap Di Akses Sekarang " + global.baseurl);
