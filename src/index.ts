import { createBrowser } from './browser';
import { auth as authConfig } from './config';

(async () => {
  try {
    const browser = await createBrowser();
    await browser.authenticate(authConfig);
    await browser.scrape();

    // schedule(
    //   [
    // new jobs.FollowJob([[0, 5], [11, 14], [17, 21], [22, 23]]),
    // new jobs.UnfollowJob([[6, 10], [13, 18], [21, 24]]),
    // ],
    // browser,
    // );
  } catch (e) {
    console.log(e);
  }
})();
