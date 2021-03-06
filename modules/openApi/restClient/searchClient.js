class SearchClient {

  constructor(openApiRestClient) {
    this.openApiRestClient = openApiRestClient;
    this.endPoints = {
      blog: '/search/blog.json',
      shop: '/search/shop.json'
    }
  }

  blog(keyword, start = 1, display = 10) {
    return this.openApiRestClient.request(
      Object.assign(
        {},
        {
          method: 'GET',
          endPoint: this.endPoints.blog,
          qs: { query: keyword, display, start }
        }
      )
    );
  }

  shop(keyword, start = 1, display = 10) {
    return this.openApiRestClient.request(
      Object.assign(
        {},
        {
          method: 'GET',
          endPoint: this.endPoints.shop,
          qs: { query: keyword, display, start }
        }
      )
    );
  }

}

module.exports = SearchClient;