import { cobalt, tiktokDL, youtubeDL, instagramDL, IGDLV2 } from "../lib/scraper.js"
import yts from "yt-search"
import { v4 as uuidv4 } from 'uuid';
import { gen } from 'n-digit-token';
import { platform } from 'process';
import { minl } from "../db/limit.js"
import fs from 'fs';
import mime from 'mime-types';
import path, { join } from 'path';
export default async function down(app, User, ytdl) {
app.get("/file", (req, res) => {
    const filePath = req.query.path;
    const fileName = req.query.filename || path.basename(filePath);

    if (!filePath) {
        return res.status(400).send("Path query parameter is required");
    }

    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
        return res.status(404).send("File not found");
    }

    const stat = fs.statSync(absolutePath);
    const fileSize = stat.size;
    const fileMime = mime.lookup(absolutePath);

    if (!fileMime) {
        return res.status(400).send("Unable to determine file MIME type");
    }

    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return;
        }

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(absolutePath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': fileMime,
            'Content-Disposition': `attachment; filename="${fileName}"`,
        });

        file.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': fileMime,
            'Content-Disposition': `attachment; filename="${fileName}"`,
        });

        fs.createReadStream(absolutePath).pipe(res);
    }
});

app.get("/api/downloader/youtube3", async (req, res) => {
	let url = req.query.link
	var api = req.query.apikey
	 if (!url && !api) return res.send("masukan link dan apikey")
	 let asilapi = await User.findOne({apikey: api})
	 if (!asilapi) return res.send("apikey tidak di temukan atau sudah di non aktifkan")
	 if(!minl(asilapi.apikey, 2)) return res.send(global.inf.apil)
	let hasil = await youtubeDL.mp3(url)
	let k = hasil.meta
	let u = hasil.path
    return res.json({k, downloadurl: baseurl + "file?path=" + u})
	})
	app.get("/api/downloader/youtube4", async (req, res) => {
	 let url = req.query.link
	 var api = req.query.apikey
	 if (!url && !api) return res.send("masukan link dan apikey")
	 let asilapi = User.findOne({apikey: api})
	 if (!asilapi) return res.send("apikey tidak di temukan atau sudah di non aktifkan")
	 	 if(!minl(asilapi.apikey, 2)) return res.send(global.inf.apil)
	 let hasil = await youtubeDL.mp4(url)
	 res.json(hasil)
	})
app.get("/api/downloader/youtubedl", async (req, res) => {
let { text, apikey } = req.query
if (!text) return res.send("masukan parameter judul")
let api = apikey
let asilapi = User.findOne({apikey: api})
if (!asilapi) return res.send("apikey tidak ditemukan mohon masukan yang benar")
	 if(!minl(apikey, 2)) return res.send(global.inf.apil)
let tes = await yts(text)
let url = tes.videos[0].url
let hasil = await ytdl(url)
console.log(hasil)
return res.json(hasil)
	})
app.get("/api/downloader/tiktok", async (req,res) => {
  const { url, apikey } = req.query
  if (!url) return res.send("masukan parameter url")
  if (!apikey) return res.send("masukan apikey")
  let asilapi = User.findOne({apikey: apikey})
	 if (!asilapi) return res.send("apikey tidak di temukan atau sudah di non aktifkan")
	 	 if(!minl(apikey, 2)) return res.send(global.inf.apil)
  try {
    let ha = await tiktokDL(url)
    return res.json(ha)
  } catch (error) {
    res.status(404).send("not found 404 error code")
  }
})
app.get("/api/downloader/igdl", async (req,res) => {
  var { url, type, apikey} = req.query
  if (!url && !type) return res.send("masukan url dan type contoh type 1 atau 2 ")
  let asilapi = User.findOne({apikey: apikey})
	 if (!asilapi) return res.send("apikey tidak di temukan atau sudah di non aktifkan")
	 	 if(!minl(asilapi.apikey, 2)) return res.send(global.inf.apil)
	 if (type === 1) {
	   let hasil = await instagramDL(url)
	   return res.json(hasil)
	 } else if (type === 2) {
	   let hasil = await IGDLV2(url)
	   return res.json(hasil)
	 } else {
	   return res.json({error: true, creator: "ALAN"})
	 }
})
app.get("/api/downloader/cobalt", async (req,res) => {

  const { url, apikey } = req.query

  if (!url) return res.send("masukan parameter url")
  if (!apikey) return res.send("masukan apikey")
  let asilapi = User.findOne({apikey: apikey})
	 if (!asilapi) return res.send("apikey tidak di temukan atau sudah di non aktifkan")
	 	 if(!minl(asilapi.apikey, 2)) return res.send(global.inf.apil)
  try {
    let ha = await cobalt(url)
    return res.json(ha)
  } catch (error) {
    res.status(404).send("not found 404 error code")
  }
})
}