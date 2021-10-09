const ScraperModel = require('./scrapModel');
const puppeteer = require('puppeteer');

exports.getAll = async (req, res) => {
  try {
    const jobs = await ScraperModel.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Sever Error' });
  }
};

exports.scrapJobs = async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://remoteok.io/remote-javascript-jobs');

  /* Run javascript inside the page */
  const data = await page.evaluate(() => {
    const list = [];
    const items = document.querySelectorAll('tr.job');

    for (const item of items) {
      list.push({
        company: item.querySelector('.company h3').innerHTML,
        position: item.querySelector('.company h2').innerHTML,
        tag: item.querySelector('.tags h3').innerHTML,
        link: 'https://remoteok.io' + item.getAttribute('data-href'),
      });
    }

    return list;
  });
  await ScraperModel.insertMany(data);
  res.json(data);
  await browser.close();
};
exports.scrapVideos = async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/');

  /* Run javascript inside the page */
  const data = await page.evaluate(() => {
    const list = [];
    const items = document.querySelectorAll('div.ytd-rich-item-renderer');

    for (const item of items) {
      list.push({
        title: item.querySelector('#video-title').innerHTML,
        channel: item.querySelector(".yt-formatted-string").innerText,
        metadata: item.querySelector("#metadata-line").innerText,
        // link: 'https://remoteok.io' + item.getAttribute('data-href'),
      });
    }

    return list;
  });
  // await ScraperModel.insertMany(data);
  await res.json(data);
  await browser.close();
};
