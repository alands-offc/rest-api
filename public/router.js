export default async function router (app, User) {
  app.get("/", async (req, res) => {
    await (await import("../views/Home.js?v=" + Date.now())).default(req, res)
    });

app.get("/docs", (req, res) => {
	async function k(){
    await (await import("../views/Docs.js?v=" + Date.now())).default(req, res)
    }
    k()
});
app.get('/claim-rewards', async (req, res) => {
  const apikey = req.query.apikey;
  let dailyMessage = '';
  let weeklyMessage = '';

  if (!apikey) {
    res.send('API key is required');
    return;
  }

  try {
    const dailyReward = await claimDailyReward(apikey);
    dailyMessage = dailyReward;
  } catch (error) {
    dailyMessage = error.message;
  }

  try {
    const weeklyReward = await claimWeeklyReward(apikey);
    weeklyMessage = weeklyReward;
  } catch (error) {
    weeklyMessage = error.message;
  }

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claim Rewards</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
        .container {
            margin-top: 50px;
        }
        .reward-box {
            background-color: #333;
            color: #fff;
            padding: 20px;
            border-radius: 5px;
        }
        .reward-box h3 {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="reward-box">
                <h3>Daily Reward</h3>
                <p>${dailyMessage}</p>
            </div>
            <div class="reward-box mt-4">
                <h3>Weekly Reward</h3>
                <p>${weeklyMessage}</p>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+8q8i1lwC9e9xK7B1RY4Op5QZ2gzp" crossorigin="anonymous"></script>
</body>
</html>
  `);
});
app.get("/profile", async (req, res)=> {
  var {name} = req.session
  var user = await User.findOne({name:name})
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
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
        .b {
          background-color: black;
        }

        .profile-container {
            background-color: gray;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
        }

        .profile-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .profile-header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }

        .profile-info {
            list-style: none;
            padding: 0;
        }

        .profile-info li {
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }

        .profile-info li:last-child {
            border-bottom: none;
        }

        .profile-info span {
            font-weight: bold;
            display: inline-block;
            width: 100px;
        }

        @media (max-width: 480px) {
            .profile-container {
                padding: 15px;
            }

            .profile-header h1 {
                font-size: 20px;
            }
        }
    </style>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
<header>
      <div class="logo">
        <img src="https://telegra.ph/file/a7e3f488f4abec257234b.jpg" alt="Logo">
        <h1>AL - REST API</h1>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/menu/downloader">downloader</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/menu/ai">ai</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/menu/tools">tools</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/princing">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<div class="b">
<div class="profile-container">
    <div class="profile-header">
        <h1>Profil Pengguna</h1>
    </div>
    <ul class="profile-info">
        <li><span>Nama:</span> ${user.name}</li>
        <li><span>API Key:</span> ${user.apikey}</li>
        <li><span>Limit:</span> ${user.limit}</li>
        <li><span>Admin:</span> ${user.admin}</li>
        <li><span>Waktu saat ini:</span> <span id="clock"></span></li>
    </ul>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
<script type="text/javascript" charset="utf-8">
    setInterval(function() {
        let waktu = new Date();
        let clock = document.getElementById("clock");
        clock.innerHTML =
            waktu.getHours() + ":" +
            (waktu.getMinutes() < 10 ? '0' : '') + waktu.getMinutes() + ":" +
            (waktu.getSeconds() < 10 ? '0' : '') + waktu.getSeconds();
    }, 1000);
</script>

</body>
</html>
`)
})
app.get("/menu/downloader", async (req, res) => {
  await (await import("../views/downloader.js")).default(req, res, User)
})
app.get("/menu/tools", async (req,res)=>{
  await (await import("../views/tools.js")).default(req,res,User)
})
app.get("/menu/ai", async (req, res) => {
  await (await import("../views/ai.js")).default(req, res, User)
})
app.get("/menu/image", async (req, res) => {
  await (await import("../views/img.js")).default(req, res, User)
})
app.get("/menu/others", async (req, res) => {
  await (await import("../views/others.js")).default(req, res, User)
})
}