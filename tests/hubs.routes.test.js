const request = require('supertest');
const express = require('express');
const hubsRouter = require('../routes/hubs');

// Mock APS service functions
jest.mock('../services/aps', () => ({
    authRefreshMiddleware: (req, res, next) => { req.internalOAuthToken = { access_token: 'token' }; next(); },
    getHubs: jest.fn(() => Promise.resolve([{ id: '1', attributes: { name: 'Hub1' } }])),
    getProjects: jest.fn(() => Promise.resolve([{ id: 'p1', attributes: { name: 'Project1' } }])),
    getProjectContents: jest.fn(() => Promise.resolve([{ id: 'f1', attributes: { displayName: 'Folder1' }, type: 'folders' }])),
    getItemVersions: jest.fn(() => Promise.resolve([{ id: 'v1', attributes: { createTime: '2023-01-01T00:00:00Z' } }])),
}));

describe('Hubs Routes', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use(hubsRouter);
    });

    test('GET /api/hubs returns hubs', async () => {
        const res = await request(app).get('/api/hubs');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: '1', name: 'Hub1' }]);
    });

    test('GET /api/hubs/:hub_id/projects returns projects', async () => {
        const res = await request(app).get('/api/hubs/1/projects');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 'p1', name: 'Project1' }]);
    });

    test('GET /api/hubs/:hub_id/projects/:project_id/contents returns contents', async () => {
        const res = await request(app).get('/api/hubs/1/projects/p1/contents');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 'f1', name: 'Folder1', folder: true }]);
    });

    test('GET /api/hubs/:hub_id/projects/:project_id/contents/:item_id/versions returns versions', async () => {
        const res = await request(app).get('/api/hubs/1/projects/p1/contents/f1/versions');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 'v1', name: '2023-01-01T00:00:00Z' }]);
    });
});
