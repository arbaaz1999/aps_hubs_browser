const request = require('supertest');
const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('../routes/auth');

jest.mock('../services/aps', () => ({
    getAuthorizationUrl: jest.fn(() => 'https://developer.api.autodesk.com/authentication/v2/authorize'),
    authCallbackMiddleware: (req, res, next) => { req.session = {}; next(); },
    authRefreshMiddleware: (req, res, next) => { req.publicOAuthToken = { token: 'public' }; req.internalOAuthToken = { access_token: 'token' }; next(); },
    getUserProfile: jest.fn(() => Promise.resolve({ name: 'Test User' })),
}));

describe('Auth Routes', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use(cookieSession({ name: 'session', keys: ['test'], maxAge: 24 * 60 * 60 * 1000 }));
        app.use(authRouter);
    });

    test('GET /api/auth/login redirects to auth URL', async () => {
        const res = await request(app).get('/api/auth/login');
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe('https://developer.api.autodesk.com/authentication/v2/authorize');
    });

    test('GET /api/auth/logout clears session and redirects', async () => {
        const res = await request(app).get('/api/auth/logout');
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe('/');
    });

    test('GET /api/auth/callback redirects to /', async () => {
        const res = await request(app).get('/api/auth/callback');
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe('/');
    });

    test('GET /api/auth/token returns publicOAuthToken', async () => {
        const res = await request(app).get('/api/auth/token');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ token: 'public' });
    });

    test('GET /api/auth/profile returns user profile', async () => {
        const res = await request(app).get('/api/auth/profile');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'OK', success: true, data: { name: 'Test User' } });
    });
});
