var express = require('express');
var jwt = require("jsonwebtoken");
const crypto = require('crypto');
const app = express();
const user = express();

// generate public and private key
function generateRSAKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: 
        {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    return { publicKey, privateKey };
}

// generates JWKS format using provided key
function generateJWKS(publicKey) {
    return { keys: [{
                alg: 'RS256',
                kty: 'RSA',
                use: 'sig',
                kid: 'rsa1',
                n: Buffer.from(publicKey.split('-----')[2], 'base64').toString('base64'),
                e: 'AQAB',
                "exp" : 1672574859
            }]};
}

let { publicKey, privateKey } = generateRSAKeyPair();

// test connection
app.get('/check', function(req, res) {
    res.json({
        text: 'hello world'
    });
});

// serves the public keys in JWKS format
app.get('/.well-known/jwks.json', function(req, res) {
    const jwks = generateJWKS(publicKey);
    res.json(jwks);
});

// returns an unexpired, signed JWT
app.post('/auth', function(req, res) {
    const user = { id: 3 };
    const token = jwt.sign({ user }, 'my_secret_key', { expiresIn: '1h' });
    publicKey = generateRSAKeyPair();
    res.json({
        token: token
    });
});

app.listen(8080, function () {
    console.log('App listening on port 8080')
});