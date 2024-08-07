export default async function tools(req, res, User) {
var apikey = await (await User.findOne({ name: req.session.name })).apikey
res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu tools</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
        }
        .header .logo {
            display: flex;
            align-items: center;
        }
        .logo img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
        .box {
            margin: 20px;
            padding: 20px;
            border: 1px solid #333;
        }
        .box .box-header {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .box table {
            width: 100%;
            border-collapse: collapse;
        }
        .box table, .box th, .box td {
            border: 1px solid #333;
        }
        .box th, .box td {
            padding: 10px;
            text-align: left;
        }
    </style>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>

<div class="header">
    <div class="logo">
        <img src="https://telegra.ph/file/a7e3f488f4abec257234b.jpg" alt="Logo">
        <h1>AL - REST API</h1>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/docs">Back to docs</a>
                    </li>
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
                        <a class="nav-link" href="/profile">profile</a>
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
</div>

<div class="box">
    <div class="box-header">Features</div>
    <table>
        <tr>
            <th>Nama</th>
            <th>Method</th>
            <th>URL</th>
        </tr>
        <tr>
            <td>Screen shoot web</td>
            <td>GET</td>
            <td><a href="/api/tools/ssweb?url=https://alands.xyz&type=sshp&apikey=${apikey}">check</a></td>
        </tr>
        <tr>
          <td>encrypted</td>
          <td>GET</td>
          <td><a href="/api/tools/encrypt?text=const%20ikan&password=pwsiningab&apikey=${apikey}">check</a></td>
        </tr>
                <tr>
          <td>decrypted</td>
          <td>GET</td>
          <td><a href="/api/tools/decrypt?text=const%20ikan&password=pwsiningab&apikey=${apikey}">check</a></td>
        </tr>
                <tr>
          <td>pixivsearch</td>
          <td>GET</td>
          <td><a href="/api/tools/pixivsearch?query=Elaina&apikey=${apikey}">check</a></td>
        </tr>
               <tr>
          <td>pinterest search</td>
          <td>GET</td>
          <td><a href="/api/tools/pinterestsearch?query=Elaina&apikey=${apikey}">check</a></td>
        </tr>

    </table>
</div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>

</body>
</html>
`)
}