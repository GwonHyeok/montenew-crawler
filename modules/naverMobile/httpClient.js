const rp = require('request-promise');
const cheerio = require('cheerio');

class HttpClient {

  constructor() {
    this.SERVICE_URI = 'https://m.search.naver.com/search.naver';

    this.cookieJar = rp.jar();
    this.isInitialized = false;

    this.defaultOptions = {
      uri: this.SERVICE_URI,
      headers: {
        'Accept-Encoding': '',
        'Accept-Language': 'ko-kr',
        'Connection': 'keep-alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Host': 'm.search.naver.com',
        'Referer': 'https://m.search.naver.com/search.naver',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5'
      },
      jar: this.cookieJar,
      transform: body => cheerio.load(body)
    };
  }

  async request(options) {
    if (!this.isInitialized) await this.initialize();

    const genOptions = Object.assign({}, this.defaultOptions, options);

    return rp(genOptions)
  }

  async initialize() {
    this.cookieJar = rp.jar();
    this.isInitialized = true;
    await rp({ uri: 'https://m.naver.com', jar: this.cookieJar });
  }

}

module.exports = HttpClient;