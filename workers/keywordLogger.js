const Worker = require('./worker');
const KeywordLog = require('../models/keywordLog');
const Keyword = require('../models/keyword');

// OpenApi Client
const OpenApiRestClient = require('../modules/openApi/openApiRestClient');
const openApiRestClient = new OpenApiRestClient(process.env.OPEN_API_KEY, process.env.OPEN_API_SECRET);
const SearchClient = require('../modules/openApi/restClient/searchClient');

// Naver Mobile Client
const HttpClient = require('../modules/naverMobile/httpClient');
const httpClient = new HttpClient();
const MobileSearchClient = require('../modules/naverMobile/searchClient');

class KeywordLogger extends Worker {

  constructor() {
    super();
    // this.searchClient = new SearchClient(openApiRestClient);
    this.searchClient = new MobileSearchClient(httpClient);
  }

  async work() {
    const keywords = await Keyword.find();
    for (let i = 0; i < keywords.length; i++) {
      const { _id, targetUri, title } = keywords[i];
      const display = 15;
      const max = 150;

      // 키워드 랭킹 확인
      for (let start = 1; start < max; start += display) {
        const blogList = await this.searchClient.blog(title, start, display);

        // 아이템 주소 수정하고, 아이템에 랭크 정보를 넣어줌
        const items = blogList.items.map((item, index) => {
          item.link = item.link.replace('&amp;', '&');
          item.rank = start + index;
          return item
        }).filter(item => item.link === targetUri);

        // 일치하는 항목이 있을 경우 데이터를 저장하고 다음 키워드를 검색한다
        if (items.length >= 1) {
          const item = items[0];
          const keywordLog = new KeywordLog(Object.assign({}, { keyword: _id, rank: item.rank }, item));
          await keywordLog.save();

          // 키워드 로그에 추가
          const keyword = await Keyword.findById(_id);
          keyword.logs.push(keywordLog._id);
          await keyword.save();
          break;
        }
      }
    }
  }

}

module.exports = KeywordLogger;