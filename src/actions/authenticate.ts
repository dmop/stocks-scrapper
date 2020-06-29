import { Authenticate } from '../interfaces';

const authenticate: Authenticate = function authenticate({ email, password }) {
  return this.getPage('/login', async page => {
    await page.waitForSelector('input[name="email"]');

    const emailInput = await page.$('input[name="email"]');
    const passwordInput = await page.$('input[name="password"]');

    await emailInput.type(email, { delay: 100 });
    await passwordInput.type(password, { delay: 100 });

    // const logInButtonSelector = await page.evaluate(() => {
    //   const { scraper } = window as any;
    //
    //   const logInButton = scraper.findOneWithText({
    //     selector: 'button',
    //     text: 'Log in',
    //   });
    //
    //   if (!logInButton) {
    //     return '';
    //   }
    //   console.log('bugou');
    //
    //   return logInButton
    //     .setscraperAttr('logInButton', 'logInButton')
    //     .getSelectorByscraperAttr('logInButton');
    // });
    //
    // if (!logInButtonSelector) {
    //   throw new Error('Failed to auth');
    // }
    const logInButtonSelector = '.css-1p18osi';
    const logInButton = await page.$(logInButtonSelector);

    await logInButton.click();

    await page.waitFor(4000);
  });
};

export { authenticate };
