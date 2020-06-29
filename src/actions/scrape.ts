import { Scrape } from '../interfaces';

const scrape: Scrape = function scrape() {
  return this.getPage('/', async page => {
    const filterStocksSelector = 'button.css-7vi4et:nth-child(1)';
    await page.waitForSelector(filterStocksSelector);

    await page.click(filterStocksSelector);

    const loadMoreStocksSelector = '.css-xi606m > button:nth-child(1)';
    await page.waitForSelector(loadMoreStocksSelector);

    while (true) {
      const paginateButton = await page.$(loadMoreStocksSelector);

      if (!paginateButton) {
        break;
      }

      await paginateButton.click();
      await page.waitFor(1000);
    }

    const elements = await page.$$('div.css-1x5bobx');
    for (let i = 0; i < elements.length; i++) {
      try {
        let stockName = await elements[i].$('div.css-1x5bobx > a:nth-child(1) > div:nth-child(3) > div:nth-child(1) > span:nth-child(1)');
        let stockNameText = await page.evaluate(el => el.innerText, stockName);
        stockNameText = stockNameText.trim()

        const newPage = await this.openPage();
        await newPage.goto(`https://fundamentei.com/br/${stockNameText}`, { waitUntil: 'load' });

        const rankingSelector = '.css-v0mgew';

        await newPage.waitFor(rankingSelector);

        const ranking = await newPage.$(rankingSelector);
        let ranking_text = await newPage.evaluate(el => el.innerText, ranking);
        ranking_text = ranking_text.split('/')[0].trim();

        console.log(`${stockNameText},${ranking_text}`);
        newPage.close();
      } catch(err) {
        break
      }
    }
  });
};

export { scrape };
