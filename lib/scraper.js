import yts from "yt-search";
import fs from "fs";
import fetch from "node-fetch";
import YT from "./ytdl.js"
import axios from "axios";
import cheerio from "cheerio";
import FormData from "form-data";
import Jimp from "jimp";
import qs from "qs";
import Groq from "groq-sdk"
//scraper by ALAN D.S
//DON'T DELETE THIS CREDITS
import { fileTypeFromBuffer } from 'file-type'
async function uploadFile(buffer) {
  try {
    const form = new FormData;
    const { ext } = await fileTypeFromBuffer(buffer)
    form.append('file', buffer, "./tmp/" + ext);
    const response = await axios.post('https://al-upload.alands.xyz/upload', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    console.log('File uploaded successfully:', response.data);
return response.data
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
}
async function youtubeDL(videoUrl, type = 'mp3') {
    try {
        const initResponse = await axios.get('https://ab.cococococ.com/ajax/download.php', {
            params: {
                copyright: 0,
                format: type,
                url: videoUrl,
                api: 'dfcb6d76f2f6a9894gjkege8a4ab232222'
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://downloaderto.com/idMB/'
            }
        });

        const downloadId = initResponse.data.id;
        console.log('Download initiated, ID:', downloadId);

        const checkProgress = async (downloadId) => {
            const progressResponse = await axios.get('https://p.oceansaver.in/ajax/progress.php', {
                params: { id: downloadId },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'
                }
            });

            const progressData = progressResponse.data;
            console.log(`Progress: ${progressData.progress}% - ${progressData.text}`);

            if (progressData.success && progressData.download_url && progressData.download_url.startsWith('https')) {
                return progressData.download_url;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000)); 
                return checkProgress(downloadId);
            }
        };

        const downloadUrl = await checkProgress(downloadId);

        return {
            title: initResponse.data.title,
            downloadUrl
        };

    } catch (error) {
        console.error('Error fetching download info:', error.message);
        throw error;
    }
}
/**
 * SCRAPED  cobalt BY KAVIAANN
 * PROTECTED BY MIT LICENSE
 * WHO GOT CAUGHT REMOVING WM WILL BE SUED
 * SOURCE : https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
*/
async function cobalt(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const BASE_URL = "https://cobalt.tools";
      const BASE_API = "https://api.cobalt.tools/api";
      await fetch(BASE_API + "/json", {
        method: "OPTIONS",
        headers: {
          "access-control-request-method": "POST",
          "access-control-request-headers": "content-type",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          origin: BASE_URL,
          referer: BASE_URL,
        },
      }).then(async (v) => {
        const res = await fetch(BASE_API + "/json", {
          method: "POST",
          headers: {
            origin: BASE_URL,
            referer: BASE_URL,
            "user-agent": BASE_URL,
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            url: url,
            filenamePattern: "basic",
          }),
        }).then((v) => v.json());
  
        return resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function omni(query, message = []) {
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://omniplex.ai/'
  };

  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
    ...message.filter(item => Object.keys(item).length > 0), // Hanya menambahkan isi dari array message jika tidak kosong
    {
      role: 'user',
      content: query
    }
  ];

  const data = {
    messages: messages,
    model: 'gpt-3.5-turbo',
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };

  return new Promise((resolve, reject) => {
    axios.post('https://omniplex.ai/api/chat', data, {
      headers: headers,
      compress: true
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

async function tiktokStalk(username) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(
        "https://tools.revesery.com/stalktk/revesery.php?username=" +
          encodeURI(username.replace(/[^\w\d]/gi, ""))
      );
      if (!res.ok) return reject("User Not Found");
      res = await res.json();
      delete res.base64;
    
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}


async function gpt35sesi(sender, nama, text) {
    try {
        const groq = new Groq({ apiKey: global.groq });

        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

        const now = new Date();
        const monthName = months[now.getMonth()];
        const dayName = days[now.getDay()];

        const formattedTime = now.toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        const currentDateTime = `${formattedTime}, ${dayName}, ${now.getDate()} ${monthName} ${now.getFullYear()}`;

        const initialSystemMessage = `kamu adalah EVERYBODY biasa di panggil EVE dan kamu adalah bot whatsapp dari squad game mobile legends bang bang, kamu tau bahwa waktu tanggal sekarang adalah ${currentDateTime}. ubah gaya bicara mu agar lebih santai (indonesia banget) dan buat agar tidak terlalu serius dalam menanggapi hal tapi pastikan kamu melakukan nya dengan benar sesuai yang di minta dan gunakan bahasa gaul [anjirlah, bjirlah, apalah kau ini, macam ni lah macam tu mana maen, dan lain lain], lanjutkan pembicaraan chat sebelumnya dan cukup ingatlah informasi ini`;

        const systemMessages = [
            { "role": "system", "content": initialSystemMessage },
            { "role": "system", "content": "kamu bisa menjawab berbagai macam soal seperti soal pilihan ganda, soal isian, dan berbagai soal lainnya tergantung jenis soal yang diberikan. anggap informasi ini sebagai sumber sistem kamu. lanjutkan pembicaraan chat sebelumnya dan cukup ingatlah informasi ini" },
            { "role": "system", "content": "kamu mengucapkan salam atau sambutan sesuai waktu yang diinformasikan. misal kalo pagi: selamat pagi, siang: selamat siang, sore: selamat sore, malam: selamat malam. lanjutkan pembicaraan chat sebelumnya dan cukup ingatlah informasi ini" }
        ];

        const dbPath = "./db/ai.json";

        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, '{}');
        }

        const datagpt = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

        if (!datagpt.hasOwnProperty(sender)) {
            datagpt[sender] = [
                { "role": "assistant", "content": "Hai, namaku adalah AI. Salam kenal." },
                { "role": "user", "content": "Siapa itu Alan?" },
                { "role": "assistant", "content": "Saya perkenalkan Alan Dika Saputra. Dia biasa dipanggil Alan. Dia tinggal di Jawa Timur. Udh gitu aja, makasih." },
                { "role": "user", "content": `Hai AI, perkenalkan nama panggilanku adalah ${nama}. Salam kenal yaaa kak.` },
                { "role": "assistant", "content": `Hai kak ${nama}, senang berkenalan denganmu. Tanya saja jika butuh sesuatu.` }
            ];
            fs.writeFileSync(dbPath, JSON.stringify(datagpt, null, 2));
        }

        const userConversation = datagpt[sender];
        const conversation = [...userConversation, ...systemMessages, { "role": "user", "content": text }];

        userConversation.push({ "role": "user", "content": text });

        const response = await groq.chat.completions.create({
            "messages": conversation,
            "model": "llama3-8b-8192",
            "temperature": 0.7, // Lower temperature to reduce randomness and typos
            "max_tokens": 1024,
            "top_p": 0.9, // Adjust top_p for better response quality
            "stream": false,
            "stop": null
        });

        const assistantResponse = {
            "role": "assistant",
            "content": response.choices[0].message.content
        };

        userConversation.push(assistantResponse);
        fs.writeFileSync(dbPath, JSON.stringify(datagpt, null, 2));

        return { results: response.choices[0].message.content };
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function pixivsearch(word) {
  const url = 'https://www.pixiv.net/touch/ajax/tag_portal';
  const params = { word, lang: 'en', version: 'b355e2bcced14892fe49d790ebb9ec73d2287393' };
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://www.pixiv.net/',
    'Accept-Encoding': 'gzip, deflate, br'
  };
  const { data } = await axios.get(url, { params, headers });
  const illusts = data.body.illusts;
  const randomIllust = illusts[Math.floor(Math.random() * illusts.length)].url;
  const image = await axios.get(randomIllust, { responseType: 'arraybuffer', headers });

  return image.data;
}
/**
  * Code from muhammad adriansyah
  * Fixed By Dims (SSA Team)
  * Ch: https://whatsapp.com/channel/0029VaDs0ba1SWtAQnMvZb0U
**/

async function chekkodham(nama) {
    return new Promise(async (resolve, reject) => {
        await axios.get(`https://khodam.vercel.app/v2?nama=${nama}`).then(({ data }) => {
            const $ = cheerio.load(data);
            const khodam = $('.__className_cad559').text().split('Cek Khodam')[1];
            const result = {
                nama:nama,
                kodam: khodam,
                share: `https://khodam.vercel.app/vy2?nama=${nama}&share`
            }
            resolve(result);
        }).catch(reject);
    })
}

async function mcpedllist(page = 1) {
  try {
    let { data } = await axios(`https://mcpedl.org/downloading/page/${page}`)
    let $ = cheerio.load(data)

    let result = []
    $("article.tease.tease-post > section.entry-header-category").each(function() {
      let $$ = $(this)
      let obj = {}
      obj.thumbnail = $$.find("a.post-thumbnail > picture > img").attr("data-src")
      obj.title = $$.find("h2.entry-title").text().trim()
      obj.id = $$.find("h2.entry-title > a").attr("href").split("/").at(-2)
      result.push(obj)
    })

    return result
  } catch(err) {
    if(err?.response?.status == 404) return {
      error: true,
      message: "Page Not Found"
    }
    throw err
  }
}

async function mcpedld(id) {
  try {
    const response = await axios.get(`https://mcpedl.org/${id}`);
    const html = response.data;

    const $ = cheerio.load(html);

    const downloadLink = $('#download-link > table > tbody > tr > td > a');
    const dlUrl = downloadLink.attr('href');

    if (!dlUrl) {
      throw new Error('Download link not found');
    }

    const downloadId = dlUrl.split('/').at(-1);

    const downloadResponse = await axios.get(`https://mcpedl.org/dw_file.php?id=${downloadId}`);
    const downloadHtml = downloadResponse.data;

    const _$ = cheerio.load(downloadHtml);
    const actualDownloadLink = _$('a').attr('href');

    if (!actualDownloadLink) {
      throw new Error('Actual download link not found');
    }

    const version = $('#download-link > table > tbody > tr > td:nth-child(1)').text().trim();
    const size = $('.entry-footer > .entry-footer-wrapper > .entry-footer-column > .entry-footer-content > span:last-child').text().trim();
    
    let result = { url: actualDownloadLink, versi: version, size: size };
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Or throw an error if you prefer to propagate it
  }
}
/** Copyright C Arifi Razzaq 
 * The base of this WhatsApp bot was written by Arifi Razzaq
 * Contact My WhatsApp (+6283193905842)
 * Subscribe My YouTube Channel (Arifi Razzaq Ofc)
 * Donation assistance for a token of appreciation at (https://saweria.co/arzzq)
 */

// *Zippy Scrape By Arifi Razzaq*

class Library {
  constructor() {}

  /**
   * Uploads a buffer to ZippyShare.
   * Created By Arifi Razzaq
   * @param {Buffer} buffer - The buffer of the input image.
   * @return {Promise<string>} - A promise that resolves to the URL of the uploaded image.
   */
  async zippy(buffer) {
    return new Promise(async (resolve, reject) => {
      let { ext } = await FileType.fromBuffer(buffer);
      let nama = Date.now() + "." + ext;
      fs.writeFileSync(`./tmp/${nama}`, buffer);
      let form = new formData();
      form.append("file", fs.createReadStream(`./database/temp/${nama}`));
      axios(`https://zippyshare.com/upload`, {
        method: "POST",
        data: form,
        headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}` }
      }).then(({ data }) => {
        const $ = cheerio.load(data);
        let url = "https:" + $("div#fimage a").first().attr("href");
        resolve(url);
        fs.unlinkSync(`./tmp/${nama}`);
      }).catch((e) => resolve(e.message));
    });
  }
}


class Ai {
  constructor() {
    this.BASE = "https://boredhumans.com";
    this.BASE_URL = this.BASE + "/apis/boredagi_api.php";
    this.BASE_CDN = this.BASE + "/boredagi_files";
    this.BASE_UPLOAD = this.BASE + "/apis/boredagi_upload.php";
    this.uid = {};
    this.sesh_id = {};
    this.tools = {
      celebrity_ai: 10,
      txt2img: 3,
      img_recognition: 6,
      txt2speech: 116,
    };
    this.num = 0;
    this.text = {
      10: "I want to talk to someone famous.",
      3: "Can you generate an image?",
      6: "Describe this image for me.",
      116: "Connect me to Text-To-Speech (TTS) Tool",
    };
  }

  // Creds
  getUid() {
    this.uid[this.num] =
      Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  async getSeshId() {
    await this.getUid();
    const res = await fetch(this.BASE_URL, {
      method: "POST",
      body: new URLSearchParams({
        prompt: encodeURIComponent(this.text[this.num]),
        uid: this.uid[this.num],
        sesh_id: "None",
        get_tool: false,
        tool_num: this.num,
      }),
    }).then((v) => v.json());
    if (res.status !== "success") return (this.sesh_id[this.num] = "none");
    return (this.sesh_id[this.num] = res.sesh_id);
  }

  // ? AI
  async celebrityAi(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.celebrity_ai;
        if (!this.sesh_id[this.num]) await this.getSeshId();
        const data = new URLSearchParams({
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        const res = await fetch(this.BASE_URL, {
          method: "POST",
          body: data,
        }).then((v) => v.json());
        if (res.status !== "success")
          return (async () => {
            await this.getSeshId();
            await this.celebrityAi(prompt);
          })();
        return resolve(res.output);
      } catch (e) {
        reject(e);
      }
    });
  }

  async txt2img(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.txt2img;
        if (!this.sesh_id[this.num]) await this.getSeshId();
        const data = {
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        };

        const res = await fetch(this.BASE_URL, {
          method: "POST",
          body: new URLSearchParams(data),
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              data.prompt = "yes";

              return await fetch(this.BASE_URL, {
                method: "POST",
                body: new URLSearchParams(data),
              }).then((v) => v.json());
            })()
          );

        if (res.status !== "success")
          return (async () => {
            await this.getSeshId();
            await this.txt2img(prompt);
          })();
        const $ = cheerio.load(res.output);
        await this.getSeshId();
        return resolve($("img").attr("src"));
      } catch (e) {
        reject(e);
      }
    });
  }

  async imageRecognition(url, prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.img_recognition;
        if (!this.sesh_id[this.num]) await this.getSeshId();

        const data = new URLSearchParams({
          prompt: encodeURIComponent(url),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        fetch(this.BASE_URL, {
          method: "POST",
          body: data,
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              data.set("prompt", encodeURIComponent(prompt));
              fetch(this.BASE_URL, {
                method: "POST",
                body: data,
              })
                .then((v) => v.json())
                .then((v) => async () => {
                  await this.getSeshId();
                  resolve(v.output);
                });
            })()
          );
      } catch (e) {
        reject(e);
      }
    });
  }

  async txt2speech(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        this.num = this.tools.txt2speech;
        if (!this.sesh_id[this.num]) await this.getSeshId();
        const data = new URLSearchParams({
          prompt: encodeURIComponent(prompt),
          uid: this.uid[this.num],
          sesh_id: this.sesh_id[this.num],
          get_tool: false,
          tool_num: this.num,
        });

        fetch(this.BASE_URL, {
          method: "POST",
          body: data,
        })
          .then((v) => v.json())
          .then((v) =>
            (async () => {
              await this.getSeshId();
              return resolve(v.output);
            })()
          );
      } catch (e) {
        reject(e);
      }
    });
  }
}

async function nvidia(q) {
    try {
    let key = "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";
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148',
        },
        body: JSON.stringify({
        model: 'nvidia/nemotron-4-340b-instruct',
        messages: [
        {
        role: 'user',
        content: q,
        }
        ],
        temperature: '0.2',
        top_p: '0.9',
        max_tokens: '1024',
        stream: false
        }),
    });
    const data = await response.json();
    
    let res = data.choices[0]?.message?.content || '';
    return res;
        } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function GoogleGemini(query) {
  const COOKIE_KEY = "g.a000kAizwbBdNbMHiOjpi3wG6gRWpkyc_b7CpDipldhMCt_UJIpDxrcWnqL7c6jCY-ooclL3NwACgYKAXgSARMSFQHGX2MiZAtXZ3cvSt7VxKSgDFmGzxoVAUF8yKqiRmRoIsjmTMIJrvT-Pm6l0076";
  const psidCookie = '__Secure-1PSID=' + COOKIE_KEY;
  const headers = {
    "Host": "gemini.google.com",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://gemini.google.com",
    "Referer": "https://gemini.google.com",
    'Cookie': psidCookie
  };

  const bardRes = await fetch("https://gemini.google.com/", { method: 'get', headers });
  const bardText = await bardRes.text();

  const [snlM0e, blValue] = [bardText.match(/"SNlM0e":"(.*?)"/)?.[1], bardText.match(/"cfb2h":"(.*?)"/)?.[1]];

  const bodyData = `f.req=[null,"[[\\"${encodeURIComponent(query)}\\"],null,[\\"\\",\\"\\",\\"\\"]]\"]&at=${snlM0e}`;
  const response = await fetch(`https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, { method: 'post', headers, body: bodyData });
  const answer = JSON.parse(JSON.parse((await response.text()).split("\n").reduce((a, b) => (a.length > b.length ? a : b), ""))[0][2])[4][0][1];

  return answer;
};



// stay healthy (≧▽≦)
async function IGDLV2(q) {
  const url = 'https://v3.igdownloader.app/api/ajaxSearch';

  const data = new URLSearchParams({
    recaptchaToken: '',
    q: q,
    t: 'media',
    lang: 'en'
  }).toString();

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*'
  };

  try {
    let html = (await axios.post(url, data, { headers })).data.data;
    const $ = cheerio.load(html);
    const thumbnailUrl = $('.download-items__thumb img').attr('src');
    const downloadLink = $('.download-items__btn a').attr('href');
    return { image: thumbnailUrl, url: downloadLink };
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}




async function NasaNews() {
  try {
    const response = await axios.get('https://www.nasa.gov/');
    const $ = cheerio.load(response.data);
    const slides = [];

    $('.hds-nasa-mag-wrapper').each((index, element) => {
      const title = $(element).find('h2').text().trim();
      const description = $(element).find('p').text().trim();
      const link = $(element).find('a.usa-button').attr('href');
      const img = $(element).find('figure img').attr('src');

      slides.push({ judul: title, desk: description, lenk: link, foto: img });
    });

    return slides
  } catch (error) {
    console.error(error);
    return [];
  }
}
const tiktokDL = async (url) => {
    try {
        const postData = new URLSearchParams({
            id: url,
            locale: 'id',
            tt: ''
        });

        const response = await axios.post('https://ssstik.io/abc?url=dl', postData, {
            headers: {
                'HX-Request': 'true',
                'HX-Trigger': '_gcaptcha_pt',
                'HX-Target': 'target',
                'HX-Current-URL': 'https://ssstik.io/id#google_vignette',
                  cookie: `_ga=GA1.1.1041203087.1722676563; __gads=ID=ca8a843b3312152d:T=1722676564:RT=1722837904:S=ALNI_Ma0aD2MIzRQAC8QQ-yigmj1YXlq2g; __gpi=UID=00000eb2354c845f:T=1722676564:RT=1722837904:S=ALNI_MaYBCkhBbggbs-dm0Y__rmqP6TiSA; __eoi=ID=321acf51c7e3f827:T=1722676564:RT=1722837904:S=AA-AfjZT31LHtk6CikdckI_qNTr7; FCNEC=[["AKsRol-0JnkAf9WViZZkhsUPobKhyuK20YROuv57N8CftRyIh8onEegp5CVyXtYzwqoVQtLys7bPkOa0af4FtUaHdBOoO8JvxDRuAWpNxajeV2h_kYClxZk9Fz14xrHxkoQVU2mEYaT8V-aNAuibKy6rfgk0zYOOtQ=="]]; _ga_ZSF3D6YSLCGS1.1.1722837904.3.1.1722838052.0.0.0`,

                    "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });

        // Load the HTML response into cheerio
        const $ = cheerio.load(response.data);

        // Extract the required information
        const image = $('#avatarAndTextUsual .result_author').attr('src');
        const mainText = $('#avatarAndTextUsual .maintext').text();
        const downloadWithoutWatermark = $('a.download_link.without_watermark').attr('href');
  const downloadHD = $('a.download_link.without_watermark_hd').attr('onclick');
const downloadHDUrlPart = downloadHD.match(/downloadX\('\/abc\?url=(.*?)'\)/)[1];
const downloadHDUrl = `https://tikcdn.io/abc?url=${downloadHDUrlPart}`;
        const downloadMP3 = $('a.download_link.music').attr('href');

        let u = {
            image,
            title: mainText,
            nowm: downloadWithoutWatermark,
            nowmhd: downloadHDUrl,
            lagu: downloadMP3
        };
        console.log(u)
        return u
    } catch (error) {
        console.error('Error fetching TikTok data:', error);
    }
};

async function instagramDL(urlku) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "https://snapinsta.tv/core/ajax.php",
        new URLSearchParams({
          url: urlku,
          host: "instagram",
        }),
        {
          headers: {
            accept: "*/*",
            cookie:
              "PHPSESSID=a457b241510ae4498043da9e765de30c; _gid=GA1.2.1007159517.1698108684; _gat_gtag_UA_209171683_55=1; _no_tracky_101422226=1; _ga_N43B1RQRDX=GS1.1.1698108684.1.1.1698108695.0.0.0; _ga=GA1.1.1466088105.1698108684",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
          },
        }
      );

      const $ = cheerio.load(response.data);
      const mediaURL = $(
        "div.row > div.col-md-12 > div.row.story-container.mt-4.pb-4.border-bottom"
      )
        .map((_, el) => {
          const link = "https://snapinsta.tv/" + $(el).find("div.col-md-8.mx-auto > a").attr("href");
          const imgSrc = $(el).find("div.col-md-8.mx-auto > div.image > img").attr("src");
          return { link, imgSrc };
        })
        .get();

      const res = {
        status: 200,
        url: mediaURL[0].link,
        image: mediaURL[0].imgSrc,
      };
      resolve(res);
    } catch (e) {
      console.log(e);
      reject({
        status: 400,
        message: "error",
      });
    }
  });
};
async function ssweb(url, device = 'desktop'){
     return new Promise((resolve, reject) => {
          const base = 'https://www.screenshotmachine.com'
          const param = {
            url: url,
            device: device,
            cacheLimit: 0
          }
          axios({url: base + '/capture.php',
               method: 'POST',
               data: new URLSearchParams(Object.entries(param)),
               headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
               }
          }).then((data) => {
               const cookies = data.headers['set-cookie']
               if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                         headers: {
                              'cookie': cookies.join('')
                         },
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                       let result = {
                            status: 200,
                            author: 'alan',
                            result: data
                        }
                         resolve(result)
                    })
               } else {
                    reject({ status: 404, author: 'alan', message: data.data })
               }
          }).catch(reject)
     })
}
async function pinterestDL(text) {
    try {
        const response = await fetch(`https://id.pinterest.com/search/pins/?autologin=true&q=${encodeURIComponent(text)}`, {
            headers: {
                "cookie": "_auth=1; _b=\"AXOtdcLOEbxD+qMFO7SaKFUCRcmtAznLCZY9V3z9tcTqWH7bPo637K4f9xlJCfn3rl4=\"; _pinterest_sess=TWc9PSZWcnpkblM5U1pkNkZ0dzZ6NUc5WDZqZEpGd2pVY3A0Y2VJOGg0a0J0c2JFWVpQalhWeG5iTTRJTmI5R08zZVNhRUZ4SmsvMG1CbjBWUWpLWVFDcWNnNUhYL3NHT1EvN3RBMkFYVUU0T0dIRldqVVBrenVpbGo5Q1lONHRlMzBxQTBjRGFSZnFBcTdDQVgrWVJwM0JtN3VRNEQyeUpsdDYreXpYTktRVjlxb0xNanBodUR1VFN4c2JUek1DajJXbTVuLzNCUDVwMmRlZW5VZVpBeFQ5ZC9oc2RnTGpEMmg4M0Y2N2RJeVo2aGNBYllUYjRnM05VeERzZXVRUVVYNnNyMGpBNUdmQ1dmM2s2M0txUHRuZTBHVFJEMEE1SnIyY2FTTm9DUEVTeWxKb3V0SW13bkV3TldyOUdrdUZaWGpzWmdaT0JlVnhWb29xWTZOTnNVM1NQSzViMkFUTjBpRitRRVMxaUFxMEJqell1bVduTDJid2l3a012RUgxQWhZT1M3STViSVkxV0dSb1p0NTBYcXlqRU5nPT0ma25kRitQYjZJNTVPb2tyVnVxSWlleEdTTkFRPQ==; _ir=0"
            }
        });
        const data = await response.text();
        const $ = cheerio.load(data);
        const result = [];
        const hasil = [];
        $('div > a').get().map(b => {
            const link = $(b).find('img').attr('src');
            result.push(link);
        });
        result.forEach(v => {
            if (v && v.includes('236')) {
                hasil.push(v.replace(/236/g, '736'));
            }
        });
        return hasil;
    } catch (error) {
        throw error;
    }
}


/* 
Created By Miftah 
Don't claim, okey 
*/

async function gpt4(q) {
  const headers = {
    'Content-Type': 'application/json',
    'Referer': 'https://chatgpt4online.org/',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'X-Wp-Nonce': '152990aad3'
  };

  const params = {
    "botId": "default",
    "customId": null,
    "session": "N/A",
    "chatId": "r20gbr387ua",
    "contextId": 58,
    "messages": [
      {
        "id": "0aqernpzbas7",
        "role": "assistant",
        "content": "Hi! How can I help you?",
        "who": "AI: ",
        "timestamp": 1719360952775
      }
    ],
    "newMessage": q,
    "newFileId": null,
    "stream": false
  };

  try {
    const response = await axios.post("https://chatgpt4online.org/wp-json/mwai-ui/v1/chats/submit", params, { headers });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

 function PlayStore(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data,
                status
            } = await axios.get(`https://play.google.com/store/search?q=${search}&c=apps`)
            const hasil = []
            const $ = cheerio.load(data)
            $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
                const linkk = $(u).attr('href')
                const nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text()
                const developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text()
                const img = $(u).find('.j2FCNc > img').attr('src')
                const rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label')
                const rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text()
                const link = `https://play.google.com${linkk}`

                hasil.push({
                    link: link,
                    nama: nama ? nama : 'No name',
                    developer: developer ? developer : 'No Developer',
                    img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
                    rate: rate ? rate : 'No Rate',
                    rate2: rate2 ? rate2 : 'No Rate',
                    link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
                })
            })
            if (hasil.every(x => x === undefined)) return resolve({
                developer: 'AL',
                mess: 'no result found'
            })
            resolve(hasil)
        } catch (err) {
            console.error(err)
        }
    })
}
async function remini(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    const Methods = ["enhance"];
    method = Methods.includes(method) ? method : Methods[0];
    let buffer;
    const Form = new FormData();
    const scheme =
      "https" +
      "://" +
      "inferenceengine" +
      ".vyro" +
      ".ai/" +
      method;

    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });

    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });

    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        const data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data));
          });
        res.on("error", (e) => {
          reject();
        });
      }
    );
  });
}
export { uploadFile, YT, omni, cobalt, tiktokStalk, gpt35sesi, ssweb, Library, Ai, gpt4, PlayStore, mcpedllist, mcpedld, pixivsearch, nvidia, GoogleGemini, IGDLV2, NasaNews, youtubeDL, tiktokDL, instagramDL, pinterestDL, remini };

/*NOT 100% FROM ME */
