const rp = require('request-promise');
const cheerio = require('cheerio');

class MobileSearchClient {

  constructor() {
    this.cookieJar = rp.jar();
    this.isInitialized = false;
  }

  async blog(keyword, start = 1, display = 15) {
    if (!this.isInitialized) await this.initialize();

    const $ = await rp({
      uri: `https://m.search.naver.com/search.naver`,
      headers: {
        'Accept-Encoding': '',
        'Accept-Language': 'ko-kr',
        'Connection': 'keep-alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Host': 'm.search.naver.com',
        'Referer': 'https://m.search.naver.com/search.naver',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5'
      },
      qs: {
        where: 'm_blog',
        query: keyword,
        start
      },
      jar: this.cookieJar,
      transform: body => cheerio.load(body)
    });

    // 데이터 확인
    const response = { items: [] };
    $('.lst_total > li').each((index, list) => {
      const item = $(list);

      // 블로그 정보
      const title = item.find($('.total_tit')).text();
      const link = item.find('a').attr('href');
      const description = item.find($('.total_dsc')).text();
      const bloggername = item.find($('.etc_dsc_inner .sub_name')).text();
      const postdate = item.find($('.etc_dsc_area .sub_time')).attr('datetime');

      response.items.push({ title, link, description, bloggername, postdate });
    });

    return response;
  }

  async initialize() {
    this.cookieJar = rp.jar();
    this.isInitialized = true;
    await rp({ uri: 'https://m.naver.com', jar: this.cookieJar });
  }
}

module.exports = MobileSearchClient;