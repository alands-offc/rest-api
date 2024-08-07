import fetch from "node-fetch"
import axios from "axios"
import Groq from "groq-sdk"
import {minl} from "../db/limit.js"
const scraper = (await import("../lib/scraper.js"))
import OpenAI from "openai"
export default async function ai(app, User){
app.get("/api/ai/gpt-3.5-turbo", async (req, res) => {
  var { text, apikey } = req.query
if (!text && !apikey) return res.send("text, apikey diperlukan")
var cek = await User.findOne({apikey})
if (!cek) return res.send("apikey mu tidak di temukan")
if(!minl(apikey, 20)) return res.json({msg: "limit mu kurang 20"})
const groq = new Groq({
  apikey: "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"
});
const chatCompletion = await groq.chat.completions.create({
    "messages": [{
"role": "system",
"content": "kamu adalah Ai CHAT GPT DENGAN NAME CODE/VERSION GPT 3.5 TURBO"
            },
            {
            "role": "user",
            "content": text
           }],
    "model": "llama3-8b-8192",
    "temperature": 0.7,
    "max_tokens": 512,
    "top_p": 0.9,
    "stream": false,
    "stop": null
  });
return res.json(chatCompletion)

})
app.get("/api/ai/gpt-3.5-turbo-sesi", async (req, res) => {
  let { text, nama, id, apikey } = req.query
  if (!text && !nama && !id && !apikey) return res.status(400).json({msg: "masukan parameter text, nama, id "})
  let c = await User.findOne({ apikey: apikey})
  if (c) {
    if (!minl(apikey, 20)) {
  let h = await scraper.gpt35sesi(id, nama, text)
  return res.json(h)
    } else { 
      return res.json("apikey mu ga cukup limitnya ")
 }
 } else {
    return res.json({msg: "apikey tidak di temukan"})
  }
})
}
