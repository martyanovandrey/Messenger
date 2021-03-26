import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index.js'

chai.should();

chai.use(chaiHttp);

describe("GET /  - login page", () => {
    it("It should GET data", (done) => {
        chai.request(server)
            .get('/')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
})

describe("GET /chats", () => {
    it("It should GET data", (done) => {
        chai.request(server)
            .get('/chats')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })

    it("It should NOT GET data", (done) => {
        chai.request(server)
            .get('/chat')
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })
})

describe("GET /profile", () => {
    it("It should GET data", (done) => {
        chai.request(server)
            .get('/profile')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
})










