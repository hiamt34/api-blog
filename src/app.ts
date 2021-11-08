import express from 'express'
import config from 'config'
import log from '../logger'
import connect from './db/connect'
import router from './router'
import cors from 'cors'
const port = config.get('port') as number
const host = config.get('host') as string
const allowedOrigins = ['http://localhost:3000','http://localhost:1998','http://localhost:8080'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
const app = express();
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/access', express.static('access'));
app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`)

    connect();   

    router(app); 
})