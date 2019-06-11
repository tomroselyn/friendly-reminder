let app = require('../server.js');
let testServer = require('supertest');

describe('test that the routes are protected', () => {
    
    test('it should protect the DELETE route', async () => {
        const response = await testServer(app).delete('/api/friend/2');
        expect(response.statusCode).toBe(403);
    });

    test('it should protect the GET route', async () => {
        const response = await testServer(app).get('/api/friend');
        expect(response.statusCode).toBe(403);
    });

    test('it should protect the POST route', async () => {
        const response = await testServer(app).post('/api/friend');
        expect(response.statusCode).toBe(403);
    });

    test('it should protect the PUT everything route', async () => {
        const response = await testServer(app).put('/api/friend/3');
        expect(response.statusCode).toBe(403);
    });

    test('it should protect the PUT extra day route', async () => {
        const response = await testServer(app).put('/api/friend/extraday/3');
        expect(response.statusCode).toBe(403);
    });

    test('it should protect the PUT mark contacted route', async () => {
        const response = await testServer(app).put('/api/friend/contact/3');
        expect(response.statusCode).toBe(403);
    });

});

test('it should return user friend list when logged in', async () => {
    let agent = testServer.agent(app);

    const response = await agent
        .post('/api/user/login')
        .send({ username: 'tgroselyn@gmail.com', password: '1234' });
    expect(response.statusCode).toBe(200);

    const userResponse = await agent.get('/api/friend');
    expect(userResponse.statusCode).toBe(200);
});