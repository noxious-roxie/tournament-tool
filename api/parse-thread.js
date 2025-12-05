import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing ?url=" });

    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);

    // OP post is always .message-body class, first element
    const op = $(".message-body").first().text();

    res.status(200).json({ op });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
