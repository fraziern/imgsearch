var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it('responds to basic GET', function(done) {
  chai.request('http://localhost:8080')
  .get('/')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res).to.be.html;
    done();
  });
});
