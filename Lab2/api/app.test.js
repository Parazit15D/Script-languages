//app.test.js
const app = require('./app');
const supertest = require('supertest');
const request = supertest(app);

it("чи дійсно сервіс повертає - Hello World", async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Worldsss');
}); 
