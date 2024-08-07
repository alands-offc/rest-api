export default async function Home(req, res) {
res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ALMD - APIs</title>
    <meta name="google-site-verification" content="oIx98k_QqyFoTp4rm_SopYhsPI_cungtn3fA5NFV5KM" />
    <meta name="description" content="AL-RestApi Adalah Rest api gratis untuk semua orang dengan fitur yang bagus">
    <link rel="shortcut icon" type="image/x-icon" href="https://telegra.ph/file/a7e3f488f4abec257234b.jpg" />
    <link rel="icon" sizes="192x192" href="https://telegra.ph/file/a7e3f488f4abec257234b.jpg" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"/>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Ubuntu:wght@400;500;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            text-decoration: none;
        }
        html {
            scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        section {
            padding: 100px 0;
        }
        .max-width {
            max-width: 1300px;
            padding: 0 80px;
            margin: auto;
        }
        footer {
            font-family: 'Poppins', sans-serif;
            background: #111;
            padding: 15px 23px;
            color: #fff;
            text-align: center;
        }
        footer span a {
            color: crimson;
            text-decoration: none;
        }
        footer span a:hover {
            text-decoration: underline;
        }
        .navbar {
            position: fixed;
            width: 100%;
            z-index: 999;
            padding: 30px 0;
            font-family: 'Ubuntu', sans-serif;
            transition: all 0.3s ease;
        }
        .navbar.sticky {
            padding: 15px 0;
            background: crimson;
        }
        .navbar .max-width {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .navbar .logo a {
            color: black;
            font-size: 35px;
            font-weight: 600;
        }
        .navbar .logo a span {
            color: crimson;
            transition: all 0.3s ease;
        }
        .navbar.sticky .logo a span {
            color: #fff;
        }
        .navbar .menu li {
            list-style: none;
            display: inline-block;
        }
        .navbar .menu li a {
            display: block;
            color: #fff;
            font-size: 18px;
            font-weight: 500;
            margin-left: 25px;
            transition: color 0.3s ease;
        }
        .navbar .menu li a:hover {
            color: crimson;
        }
        .navbar.sticky .menu li a:hover {
            color: #fff;
        }
        .menu-btn {
            color: #fff;
            font-size: 23px;
            cursor: pointer;
            display: none;
        }
        .scroll-up-btn {
            position: fixed;
            height: 45px;
            width: 42px;
            background: crimson;
            right: 30px;
            bottom: 10px;
            text-align: center;
            line-height: 45px;
            color: #fff;
            z-index: 9999;
            font-size: 30px;
            border-radius: 6px;
            cursor: pointer;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }
        .scroll-up-btn.show {
            bottom: 30px;
            opacity: 1;
            pointer-events: auto;
        }
        .scroll-up-btn:hover {
            filter: brightness(90%);
        }
        .home {
            display: flex;
            background: url("https://media.tenor.com/0Asf9chQOssAAAAC/majo-no-tabitabi-the-journey-of-elaina.gif") no-repeat center;
            height: 100vh;
            color: #fff;
            min-height: 500px;
            background-size: cover;
            background-attachment: fixed;
            font-family: 'Ubuntu', sans-serif;
        }
        .home .max-width {
            width: 100%;
            display: flex;
        }
        .home .home-content .text-1 {
            font-size: 27px;
        }
        .home .home-content .text-2 {
            font-size: 75px;
            font-weight: 600;
            margin-left: -3px;
        }
        .home .home-content .text-3 {
            font-size: 40px;
            margin: 5px 0;
        }
        .home .home-content span {
            color: crimson;
            font-weight: 500;
        }
        .home .home-content a {
            display: inline-block;
            background: crimson;
            color: #fff;
            font-size: 25px;
            padding: 12px 36px;
            margin-top: 20px;
            font-weight: 400;
            border-radius: 6px;
            border: 2px solid crimson;
            transition: all 0.3s ease;
        }
        .home .home-content a:hover {
            color: crimson;
            background: none;
        }
        @media (max-width: 1104px) {
            .about .about-content .left img {
                height: 350px;
                width: 350px;
            }
        }
        @media (max-width: 991px) {
            .max-width {
                padding: 0 50px;
            }
        }
        @media (max-width: 947px) {
            .menu-btn {
                display: block;
                z-index: 999;
            }
            .menu-btn i.active:before {
                content: "\f00d";
            }
            .navbar .menu {
                position: fixed;
                height: 100vh;
                width: 100%;
                left: -100%;
                top: 0;
                background: #111;
                text-align: center;
                padding-top: 80px;
                transition: all 0.3s ease;
            }
            .navbar .menu.active {
                left: 0;
            }
            .navbar .menu li {
                display: block;
            }
            .navbar .menu li a {
                display: inline-block;
                margin: 20px 0;
                font-size: 25px;
            }
            .home .home-content .text-2 {
                font-size: 70px;
            }
            .home .home-content .text-3 {
                font-size: 35px;
            }
        }
        @media (max-width: 500px) {
            .home .home-content .text-2 {
                font-size: 50px;
            }
            .home .home-content .text-3 {
                font-size: 27px;
            }
            .about .about-content .right .text,
            .skills .skills-content .left .text {
                font-size: 19px;
            }
            .contact .right form .fields {
                flex-direction: column;
            }
            .contact .right form .name,
            .contact .right form .email {
                margin: 0;
            }
            .right form .error-box {
                width: 150px;
            }
            .scroll-up-btn {
                right: 15px;
                bottom: 15px;
                height: 38px;
                width: 35px;
                font-size: 23px;
                line-height: 38px;
            }
        }
    </style>
</head>
<body>
    <div class="scroll-up-btn">
        <i class="fas fa-angle-up"></i>
    </div>
    <nav class="navbar">
        <div class="max-width">
            <div class="logo"><a href="#">AL Rest -<span> Api</span></a></div>
            <ul class="menu">
                <li><a href="/" class="menu-btn">Home</a></li>
                <li><a href="/documentasi" class="menu-btn">Documentation</a></li>
            </ul>
            <div class="menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>
    <section class="home" id="home">
        <div class="max-width">
            <div class="home-content">
                <div class="text-1">
                Hello, My Name Is</div>
                <div class="text-2">ALAN D. S</div>
                <div class="text-3">AL REST - API</div>
                <span class="typing"></span>
                <div></div>
                <span class="typing2"></span>
                <a href="/docs">Documentation</a>
            </div>
        </div>
    </section>
    <footer>
        <span>Copyright <span class="far fa-copyright"></span> 2023 <a href="/about">ALAN</a>. All rights reserved.</span>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.11/typed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
    <script>
        $(document).ready(function(){
            $(window).scroll(function(){
                if(this.scrollY > 20){
                    $('.navbar').addClass("sticky");
                }else{
                    $('.navbar').removeClass("sticky");
                }
                if(this.scrollY > 500){
                    $('.scroll-up-btn').addClass("show");
                }else{
                    $('.scroll-up-btn').removeClass("show");
                }
            });
            $('.scroll-up-btn').click(function(){
                $('html').animate({scrollTop: 0});
                $('html').css("scrollBehavior", "auto");
            });
            $('.navbar .menu li a').click(function(){
                $('html').css("scrollBehavior", "smooth");
            });
            $('.menu-btn').click(function(){
                $('.navbar .menu').toggleClass("active");
                $('.menu-btn i').toggleClass("active");
            });
            var typed = new Typed(".typing", {
                strings: ["Welcome!!", "Simple Secure Register and sign in"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
            var typed2 = new Typed(".typing2", {
                strings: ["${req.session.name || 'anonymous'}", "Rest - Full Api"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
            $('.carousel').owlCarousel({
                margin: 20,
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    600: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 3,
                        nav: false
                    }
                }
            });
        });
    </script>
</body>
</html>
`)
}