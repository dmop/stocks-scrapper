import puppeteer from 'puppeteer';

interface UserCredentials {
  email: string;
  password: string;
}

interface Browser {
  getPage: GetPage;
  close: CloseBrowser;
  authenticate: Authenticate;
  scrape: Scrape;
  openPage: OpenPage;
}

type GetPage = (url: string, callback: (page: puppeteer.Page) => Promise<any>) => any;

type CloseBrowser = () => Promise<void>;

type OpenPage = () => Promise<any>;

type Authenticate = (this: Browser, credentials: UserCredentials) => Promise<boolean>;

type Scrape = (this: Browser) => Promise<void>;

type CreateBrowser = () => Promise<Browser>;

export {
  UserCredentials,
  Browser,
  GetPage,
  CloseBrowser,
  Authenticate,
  CreateBrowser,
  Scrape,
  OpenPage
};
