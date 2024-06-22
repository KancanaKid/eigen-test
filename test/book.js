import {expect, use} from 'chai';
import chaiHttp from "chai-http";

const chai = use(chaiHttp);
it('succeeds silently!', () => {   
    chai.request.execute('http://localhost:8000')
    .get('/api/books/availableBook')
    .then((res) => {
        expect(res).to.have.status(200);
    });
  });

