const rp = require('request-promise');

class OpenApiRestClient {
  constructor(apiKey, apiSecret) {
    this.API_KEY = apiKey;
    this.API_SECRET = apiSecret;
    this.defaultOptions = {
      json: true,
      headers: {
        'X-Naver-Client-Id': this.API_KEY,
        'X-Naver-Client-Secret': this.API_SECRET
      }
    };
    this.SERVICE_URI = 'https://openapi.naver.com/v1';
  }

  request(options) {
    const genOptions = Object.assign({}, this.defaultOptions, options, {
      uri: `${this.SERVICE_URI}${options.endPoint}`
    });

    return rp(genOptions)
  }

}

module.exports = OpenApiRestClient;