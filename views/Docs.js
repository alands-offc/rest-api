import fs from "fs"
export default async function docs(req, res){
res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REST API DOCS</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            transition: background-color 0.3s, color 0.3s;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: white;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .logo {
            display: flex;
            align-items: center;
        }

        .logo img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        .logo h1 {
            font-weight: bold;
            animation: rgbAnimation 3s infinite;
        }

        @keyframes rgbAnimation {
            0% { color: red; }
            33% { color: green; }
            66% { color: blue; }
            100% { color: red; }
        }

        .content {
            padding: 100px 20px;
        }

        .description p {
            background-color: black;
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            position: relative;
            animation: bounce 2s infinite;
            margin-bottom: 20px;
        }

        .description p span {
            animation: rgbText 3s infinite;
        }

        @keyframes rgbText {
            0% { color: red; }
            33% { color: green; }
            66% { color: blue; }
            100% { color: red; }
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .description p::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 2px solid;
            border-image: linear-gradient(45deg, red, yellow, green, cyan, blue, magenta, red) 1;
            animation: borderAnimation 5s infinite linear;
            border-radius: 15px;
            pointer-events: none;
        }

        @keyframes borderAnimation {
            0% { border-image-source: linear-gradient(45deg, red, yellow, green, cyan, blue, magenta, red); }
            100% { border-image-source: linear-gradient(45deg, red, magenta, blue, cyan, green, yellow, red); }
        }

        .dark-mode {
            background-color: black;
            color: white;
        }

        .dark-mode header {
            background-color: #333;
        }

        .theme-toggle {
            cursor: pointer;
        }

        .description a {
            color: inherit;
            text-decoration: underline;
        }

        .description a:hover {
            text-decoration: none;
        }

        .navbar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 0;
            overflow-x: hidden;
            transition: 0.5s;
            background-color: white;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
            z-index: 999;
            border-radius: 0 0 0 15px;
            border: 2px solid transparent;
            border-image: linear-gradient(45deg, red, yellow, green, cyan, blue, magenta, red);
            border-image-slice: 1;
        }

        .navbar a {
            padding: 10px 20px;
            text-decoration: none;
            font-size: 25px;
            color: black;
            display: block;
            transition: 0.3s;
            position: relative;
        }

        .navbar a:hover {
            color: #f1f1f1;
        }

        .navbar .closebtn {
            position: absolute;
            top: 20px;
            right: 25px;
            font-size: 36px;
            color: black;
            cursor: pointer;
        }

        .navbar .openbtn {
            font-size: 30px;
            cursor: pointer;
            background-color: transparent;
            border: none;
            color: black;
        }

        .dark-mode .navbar {
            background-color: #333;
            color: white;
            border-image: linear-gradient(45deg, red, yellow, green, cyan, blue, magenta, red);
        }

        .dark-mode .navbar a {
            color: white;
        }

        .dark-mode .navbar .openbtn,
        .dark-mode .navbar .closebtn {
            color: white;
        }

        .loading-animation {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Roboto', sans-serif;
            font-size: 24px;
            color: black;
            text-align: center;
        }

        .loading-animation.show {
            display: block;
            animation: loadingAnimation 1s infinite;
        }

        @keyframes loadingAnimation {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        .navbar-item::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,0,0,0), rgba(255,0,0,1));
            transition: width 1s;
        }

        .navbar-item:hover::after {
            width: 100%;
            transition: width 1s;
        }

        .navbar-border {
            border: 2px solid transparent;
            border-image: linear-gradient(45deg, rgba(255,0,0,1), rgba(255,255,0,1), rgba(0,255,0,1), rgba(0,255,255,1), rgba(0,0,255,1), rgba(255,0,255,1), rgba(255,0,0,1)) 1;
        }
        .navbar-border {
    border: 2px solid transparent;
    border-image: linear-gradient(45deg, rgba(255,0,0,1), rgba(255,255,0,1), rgba(0,255,0,1), rgba(0,255,255,1), rgba(0,0,255,1), rgba(255,0,255,1), rgba(255,0,0,1));
    border-image-slice: 1;
}

.dark-mode .navbar-border {
    border-image: linear-gradient(45deg, rgba(255,0,0,1), rgba(255,255,0,1), rgba(0,255,0,1), rgba(0,255,255,1), rgba(0,0,255,1), rgba(255,0,255,1), rgba(255,0,0,1));
}

    </style>
</head>
<body>

<header>
    <div class="logo">
        <img src="https://telegra.ph/file/a7e3f488f4abec257234b.jpg" alt="Logo">
        <h1>AL - REST API</h1>
    </div>
    <button class="openbtn" onclick="toggleNav()">&#9776;</button>
    <div class="theme-toggle" id="theme-toggle">
        🌙
    </div>
</header>

<div id="myNav" class="navbar navbar-border">
    <a href="javascript:void(0)" class="closebtn" onclick="toggleNav()">&times;</a>
    <div id="loadingAnimation" class="loading-animation">LOADING...</div>
    <div id="loadingText" class="loading-animation" style="display: none;">LOADING success</div>
    <div id="loadingRocket" class="loading-animation" style="display: none;">LETS GO</div>
    <div id="menuContent" style="display: none;">
        <a href="/menu/downloader" class="navbar-item">downloader</a>
        <a href="/menu/ai" class="navbar-item">ai</a>
        <a href="/menu/tools" class="navbar-item">tools</a>
        <a href="/menu/image" class="navbar-item">image</a>
        <a href="/profile" class="navbar-item">profile</a>
        <a href="#" class="navbar-item">disabled</a>
    </div>
</div>

<div class="content">
    <div class="description" data-aos="fade-up">
        <p>
            <span>Welcome to our REST API page.</span> This API allows you to access various resources and perform operations such as fetching and post data. Our API is designed to be easy to use and integrates seamlessly with your applications.
        </p>
        <p>
            <span>To get started, you need to obtain an</span> <a href="/getapikey" style="color: white;">API key</a> <span>and follow our comprehensive documentation that guides you through the different endpoints and methods available. Whether you are building a mobile app,
            a web application, or a backend service, our REST API provides the functionality and flexibility you need.</span>
        </p>
        <p>
            <span>If you encounter any issues or have any questions, our support team is here to help you. We are committed to ensuring your success and look forward to seeing what you build with our API.</span>
        </p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>

<script>
    AOS.init();

    const nav = document.getElementById('myNav');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function toggleNav() {
        if (nav.style.width === '250px') {
            closeNav();
        } else {
            openNav();
        }
    }

    function openNav() {
        nav.style.width = '250px';
        document.getElementById('menuContent').style.display = 'none';
        setTimeout(() => {
            document.getElementById('loadingAnimation').classList.add('show');
            setTimeout(() => {
                document.getElementById('loadingAnimation').classList.remove('show');
                document.getElementById('loadingText').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('loadingText').style.display = 'none';
                    document.getElementById('loadingRocket').style.display = 'block';
                    setTimeout(() => {
                        document.getElementById('loadingRocket').style.display = 'none';
                        document.getElementById('menuContent').style.display = 'block';
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 300);
    }

    function closeNav() {
        nav.style.width = '0';
        document.getElementById('menuContent').style.display = 'none';
    }

    themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '☀️';
    } else {
        themeToggle.innerHTML = '🌙';
    }
    // Menambahkan atau menghapus kelas navbar-border sesuai dengan mode gelap
    const nav = document.getElementById('myNav');
    if (body.classList.contains('dark-mode')) {
        nav.classList.add('navbar-border');
    } else {
        nav.classList.remove('navbar-border');
        nav.classList.add('navbar-border'); // Tambahkan kembali untuk memastikan efek tetap ada
    }
});


    document.querySelector('.openbtn').addEventListener('click', () => {
        document.querySelector('.openbtn').innerHTML = document.querySelector('.openbtn').innerHTML === '&#9776;' ? '&times;' : '&#9776;';
    });
</script>

</body>
</html>

`)
}