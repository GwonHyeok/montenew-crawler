const rp = require('request-promise');

class MobileSearchClient {

  constructor(httpClient) {
    this.cookieJar = rp.jar();
    this.isInitialized = false;
    this.httpClient = httpClient;
  }

  async blog(keyword, start = 1, display = 15) {
    const $ = await this.httpClient.request({
      qs: {
        where: 'm_blog',
        query: keyword,
        start
      }
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

  async web(keyword, start = 1, display = 15) {
    const $ = await this.httpClient.request({
      qs: {
        where: 'm_web',
        query: keyword,
        start
      }
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

}

module.exports = MobileSearchClient;