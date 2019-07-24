const { expect } = require(`chai`);

const helper = require(`../helpers`),
  CoinpaymentsError = require(`../../lib/error`);

let client, mock;

const defaultPayload = {
  cmd: `update_pbn_tag`
};

before(function() {
  client = helper.getClient();
});

afterEach(function() {
  if (mock) expect(mock.isDone()).equals(true);
  mock = false;
});

it(`Should be valid payload callback`, function(done) {
  const payload = {
    tagid: `someTag`
  };
  const mockPayload = Object.assign({}, defaultPayload, payload);

  mock = helper.prepareMock(mockPayload);
  client.updateTagProfile(payload, function(err, response) {
    expect(err).equal(null);
    expect(response).equal(true);
    return done();
  });
});

it(`Should be valid payload promise`, function(done) {
  const payload = {
    tagid: `someTag`
  };
  const mockPayload = Object.assign({}, defaultPayload, payload);

  mock = helper.prepareMock(mockPayload);
  client.updateTagProfile(payload).then(function(response) {
    expect(response).equal(true);
    return done();
  });
});

it(`Should return error on bad payload (tagid)`, function(done) {
  const payload = {};
  client.updateTagProfile(payload).catch(function(err) {
    expect(err).to.be.an.instanceof(CoinpaymentsError);
    expect(err).to.have.property(`name`);
    expect(err).to.have.property(`message`);
    expect(err).to.have.property(`extra`);
    return done();
  });
});
