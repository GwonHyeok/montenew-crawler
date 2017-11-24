class Worker {

  async work() {
    throw new Error('work 함수가 구현되지 않았습니다')
  }

}

module.exports = Worker;