const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, RF_TOKEN_URL, ACTIVE_TOKEN_SECRET } = process.env;

class GenerateToken {
    accessToken(payload) {
        const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        return token;
    }
    refreshToken(payload, res) {
        const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.cookies('v_token', token, {
            httpOnly: true,
            path: `${RF_TOKEN_URL}`,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return token;
    }

    activeToken(payload) {
        const token = jwt.sign(payload, ACTIVE_TOKEN_SECRET, { expiresIn: '5m' });
        return token
    }
}

module.exports = GenerateToken;