import 'dotenv/config'
export default {
    port: process.env.PORT || 1998,
    host: process.env.HOST || 'localhost',
    dbUri: 'mongodb://localhost:27017/api-instagram',

    genSaltBcrypt: 12,

    privateKey: 'hiamt06',
    accessTokenLife: '7d',
    refreshTokenLife: '365d',

    auth: {
        user: 'codetoanbug06@gmail.com',
        pass: 'havit123'
    }
    
}