import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index.js';

chai.should();

chai.use(chaiHttp);

describe('POST /api/v1/auth/signin', () => {
  it('It should POST data', (done) => {
    const user = {
      login: 'test',
      password: 'test',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        done();
      });
  });

  it('It should NOT POST data', (done) => {
    const user = {
      login: '',
      password: '',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, response) => {
        response.should.have.status(403);
        response.text.should.be.eq('{"server_msg":"Wrong login or password"}');
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('It should POST data', (done) => {
    const user = {
      id: '1',
      first_name: '1',
      second_name: '1',
      display_name: '1',
      login: '1',
      email: '1',
      password: '1',
      phone: 'test',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        done();
      });
  });

  it('It should NOT POST data. Fields cant be empty', (done) => {
    const user = {
      id: '1',
      first_name: '',
      second_name: '2',
      display_name: '',
      login: '',
      email: '3',
      password: '',
      phone: '4',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, response) => {
        response.should.have.status(400);
        response.text.should.be.eq('{"message":"Fields cant be empty!"}');
        done();
      });
  });
});
