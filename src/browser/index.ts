// import * as path from 'path';
import puppeteer from 'puppeteer';
import * as actions from '../actions';
import { GetPage, CloseBrowser, CreateBrowser, OpenPage } from '../interfaces';

const getUrl = (endpoint: string): string => `https://fundamentei.com${endpoint}`;

const createBrowser: CreateBrowser = async () => {
  let browser = await puppeteer.launch({
    headless: false,
    args: ['--lang=pt-BR,pt'],
  });

  const getPage: GetPage = async function getPage(endpoint, fn) {
    let page: puppeteer.Page;
    let result;

    const url = getUrl(endpoint);
    console.log(url);
    page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'load' });

      // page.on('console', msg => {
      //   const leng = msg.args().length;
      //   for (let i = 0; i < leng; i += 1) {
      //     console.log(`${i}: ${msg.args()[i]}`);
      //   }
      // });

      // await page.addScriptTag({
      //   path: path.join(__dirname, '../../../src/common/scraper/scraper.js'),
      // });

      result = await fn(page);
      await page.close();
    } catch (e) {
      if (page) {
        await page.close();
      }

      throw e;
    }

    return result;
  };

  const close: CloseBrowser = async function close() {
    await browser.close();
    // browser = null;
  };

  const openPage: OpenPage = async function openPage() {
    return await browser.newPage();
  };

  return {
    getPage,
    close,
    openPage,
    ...actions,
  };
};

export { createBrowser };
