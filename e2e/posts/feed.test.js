require('mocha-generators').install();
const Nightmare = require('nightmare');
const { assert } = require('chai');

describe('Feed', () => {
  it('should display the website feed', done => {
    this.timeout('15s');

    const nightmare = Nightmare();

    nightmare
      .goto('http://localhost:3000')
      .wait(5000)
      .evaluate(() => document.querySelectorAll('div.post'))
      .end()
      .then(posts => {
        assert.isAbove(posts.length, 0);
        done();
      })
      .catch(e => {
        console.error(e);
        done();
      });
  });
});
