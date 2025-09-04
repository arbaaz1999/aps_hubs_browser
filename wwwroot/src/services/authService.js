class AuthService {
    async getAccessToken(callback) {
        try {
            const resp = await fetch('/api/auth/token');
            if (!resp.ok) {
                throw new Error(await resp.text());
            }
            const { access_token, expires_in } = await resp.json();
            callback(access_token, expires_in);
        } catch (err) {
            // alert('Could not obtain access token. See the console for more details.');
            console.error(err);
        }
    }

    async getProfile() {
        const resp = await fetch('/api/auth/profile');
        if (!resp.ok) {
            throw new Error('Not authenticated');
        }
        return resp.json();
    }
}

export const authService = new AuthService();