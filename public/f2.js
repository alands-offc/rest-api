var scraper = await (await import("../lib/scraper.js"))
import { minl } from "../db/limit.js";
import { encrypt, decrypt } from "node-encryption";
var { ssweb } = scraper
export default async function (app, User) {
  app.get("/api/tools/ssweb", async (req, res) => {
    const { url, type, apikey } = req.query;
    if (!url) {
      return res.json({
        status: 400,
        error: true,
        creator: "ALAN D.S",
        msg: "Please input parameter url and type. type = ssweb, sshp, sspc"
      });
    }

    try {
      const checked = await User.findOne({ apikey: apikey });
      if (!checked) {
        return res.json({
          msg: "apikey tidak ada"
        });
      }
      if (!minl(checked.apikey, 8)) {
        return res.send(global.inf.apil);
      }

      let hasil;
      if (type === "sshp") {
        hasil = await ssweb(url, "phone");
      } else if (type === "sspc") {
        hasil = await ssweb(url, "tablet");
      } else if (type === "ssweb") {
        hasil = await ssweb(url, "desktop");
      } else {
        return res.status(400).json({
          error: true,
          status: 400
        });
      }
      var img = Buffer.from(hasil.result, 'base64');

       res.writeHead(200, {
         'Content-Type': 'image/png',
         'Content-Length': img.length
       });
      return res.end(img);
    } catch (error) {
      console.error("Error in /api/tools/ssweb:", error);
      return res.status(500).json({
        error: true,
        msg: "Internal server error\n" + error
      });
    }
  });
app.get("/api/tools/pixivsearch", async (req, res) => {
  var { query, apikey } = req.query;
  if (!query && !apikey) return res.json({msg: "require query and apikey parameters "})
        const checked = await User.findOne({ apikey: apikey });
      if (!checked) {
        return res.json({
          msg: "apikey tidak ada"
        });
      }
      if (!minl(checked.apikey, 8)) {
        return res.send(global.inf.apil);
      }
var data = await scraper.pixivsearch(query.toLowerCase())
var img = Buffer.from(data, 'base64');
       res.writeHead(200, {
         'Content-Type': 'image/png',
         'Content-Length': img.length
       });
      return res.end(img);
})
app.get("/api/tools/pinterestsearch", async (req, res) => {
var { query, apikey} = req.query
if (!query && !apikey) return res.status(500).json({msg: "query and apikey parameters required"})
var you = await User.findOne({ apikey })
if (you) {
  if(!minl) return res.json({msg: global.inf.apil})
  var pin = await pinterestDL(query)
 var js = {
   status: true,
   msg: "sucses",
   results: {
     array: pin
   }
 }
 return res.json(js)
} else {
  return
}
})
  app.get("/api/tools/encrypt", async (req, res) => {
    const { text, password, apikey } = req.query;
    if (!text || !password) {
      return res.send("masukan text dan password text yg ingin enc");
    }

    try {
      const checked = await User.findOne({ apikey: apikey });
      if (!checked) {
        return res.json({
          msg: "apikey tidak ada"
        });
      }
      if (!minl(checked.apikey, 8)) {
        return res.send(global.inf.apil);
      }

      const h = await encrypt(text, password);
      res.json({ result: h });
    } catch (error) {
      console.error("Error in /api/tools/encrypt:", error);
      return res.status(500).json({
        error: true,
        msg: "Internal server error"
      });
    }
  });

  app.get("/api/tools/decrypt", async (req, res) => {
    const { text, password, apikey } = req.query;
    if (!text || !password) {
      return res.send("masukan text dan password text yg di enc");
    }

    try {
      const checked = await User.findOne({ apikey: apikey });
      if (!checked) {
        return res.json({
          msg: "apikey tidak ada"
        });
      }
      if (!minl(checked.apikey, 8)) {
        return res.send(global.inf.apil);
      }

      const h = await decrypt(text, password);
      res.json({ result: h.toString() });
    } catch (error) {
      console.error("Error in /api/tools/decrypt:", error);
      return res.status(500).json({
        error: true,
        msg: "Internal server error"
      });
    }
  });
}
