const scraper = await (await import("../lib/scraper.js"));
import { minl } from "../db/limit.js";

export default async function image(app, User) {
  app.get("/api/image/remini", async (req, res) => {
        const { url, apikey } = req.query;
        if (!url || !apikey) return res.send("Masukan parameter url dan apikey");
        
        let user = await User.findOne({ apikey });
        if (!user) return res.send("Apikey tidak ditemukan");
        if (!minl(apikey, 10)) return res.json({ msg: "Limit apikey mu habis, silahkan membeli" });
        
        const k = await scraper.remini(url, "enhance");
        var img = Buffer.from(k, 'base64');

       res.writeHead(200, {
         'Content-Type': 'image/png',
         'Content-Length': img.length
       });
      return res.end(img);
    });
}
