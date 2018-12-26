const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function() {
    it('true should be true', function () {
        expect(true).to.be.true;
    });
    
    it('2 + 2 should equal 4', function () {
      expect(2 + 2).to.equal(4);
    });
    
});

describe('Express static', function () {
    it('GET request "/" should return the index page', function() {
        return chai.request(app)
            .get('/')
            .then(function (res) {
                expect(res).to.exist;
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });
});

describe('404 handler', function() {
    it('should respond with 404 when given a bad path', function(){
        return chai.request(app)
            .get('/DOES/NOT/EXIST')
            .then(res => {
                expect(res).to.have.status(404);
            });
    });
});

describe('GET /api/notes',function () {
    it('should return the default of 10 Notes as an array', function () {
        return chai.request(app)
            .get('/api/notes')
            .then(function(res) {
                expect(res).to.exist;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body).to.be.lengthOf(10);
                expect(res.body[0]).to.have.keys(['id', 'title', 'content']);
            });
    });
});

describe('GET /api/notes', function () {
    it('should return correct recipes for valid search', function () {
        const searchTerm = 10;
        return chai.request(app)
            //.get('/search')
            //.query({name: searchTerm })
            .get(`/api/notes/?searchTerm=${searchTerm}`)
            .then(function(res) {
                expect(res).to.exist;
                expect(res.body).to.have.lengthOf(2);
            });
    });

    it('should return empty array for invalid search', function () {
        const fakeSearch = 'bobs';
        return chai.request(app)
            .get(`/api/notes/?searchTerm=${fakeSearch}`)
            .then(function(res) {
                expect(res).to.exist;
                expect(res.body).to.have.lengthOf(0);
            });
    });
});

describe('GET /api/notes/:id', function() {
    it('should return correct note with "id", "title", and "content"', function() {
        const testID = 1001;
        return chai.request(app)
            .get(`/api/notes/${testID}`)
            .then(function(res) {
                expect(res).to.exist;
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.keys(['id','title','content']);
            });
    });

    it('should respond with a 404 for an invalid id', function () {
        const fakeID = 999;
        return chai.request(app)
            .get(`/api/notes/${fakeID}`)
            .then(res => {
                expect(res).to.have.status(404);
            });
    });
});

describe('POST /api/notes', function() {
    it('should update, return a note object when given valid data', function() {
        return chai.request(app)
            .post('/api/notes')
            .send({
                "name": "mom",
                "ingredients": ["piss", "vinegar"]
            })
            .then(function(res) {
                expect(res).to.have.status(200);
            })
    })
})
